const sumar = require('./suma')

test('test function sumar', () => {
    expect(sumar(1, 2)).toBe(3)
})