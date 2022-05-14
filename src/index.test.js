/* eslint-env jest */

const txt = require('./jest.test.txt')

describe('index', () => {
  it('should load text properly', () => {
    expect(txt).toBe('Jest test text\n')
  })
})
