import express from 'express'
const app = express()
import { faker } from '@faker-js/faker';

import { normalize, schema } from 'normalizr';
const dataJson = {
    id: "1000",
    nombre: "Coderhouse",
    gerente: {
        id: "2",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20442639",
        direccion: "CABA 457",
        telefono: "1567811544"
    },
    encargado: {
        id: "3",
        nombre: "Pablo",
        apellido: "Blanco",
        DNI: "20442640",
        direccion: "CABA 458",
        telefono: "1567811545"
    },
    empleados: [
        {
            id: "1",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543"
        },
        {
            id: "2",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20442639",
            direccion: "CABA 457",
            telefono: "1567811544"
        },
        {
            id: "3",
            nombre: "Pablo",
            apellido: "Blanco",
            DNI: "20442640",
            direccion: "CABA 458",
            telefono: "1567811545"
        }
    ]
}

const PORT = 8080
app.listen(PORT, () => console.log('Servidor corriendo en http://localhost:' + PORT))

app.set('view engine', 'ejs')

app.get('/productos-test', (req, res) => {
    const numberOfItems = req.query.cantidad || 5

    const products = []
    for(let i = 0; i < Number(numberOfItems); i++){
        const product = {
            id:     faker.database.mongodbObjectId(),
            title:  faker.commerce.product(),
            price:  faker.commerce.price(),
            url:    faker.image.food(50, 50),
        }
        products.push(product)
    }

    res.render('index', {data: products, cantidad: numberOfItems})
})


app.get('/normalizar', (req, res) => {
    const empleadosSchema = new schema.Entity('empleados')
    const encargadoSchema = new schema.Entity('encargado')
    const gerenteSchema = new schema.Entity('gerente')
    const empresaSchema = new schema.Entity('empresa', {
        gerente: gerenteSchema,
        encargado: encargadoSchema,
        empleados: [empleadosSchema]
    })
    const dataNormalizr = normalize(dataJson, empresaSchema)
    const lengthObjNormalizr = JSON.stringify(dataNormalizr).length

    res.json({
        dataNormalizr,
        lengthObjNormalizr,
    })
})