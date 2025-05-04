describe('Testando Jest', () => {
  it('deve reconhecer jest.mock', () => {
    jest.mock('algum-modulo', () => ({}))
    expect(true).toBe(true)
  })
})

export {}; 