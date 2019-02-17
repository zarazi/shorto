const { validateOriginalUrl } = require('../lib/validators')

describe('Validation Tests', () => {
  describe('#validateOriginalUrl', () => {
    describe('- negative cases:', () => {
      ;[
        [undefined, new Error('Undefined originalUrl')],
        [null, new Error('Undefined originalUrl')]
      ].forEach(([originalUrl, error]) => {
        test(`should throw Error - ${error.message}`, async () => {
          const expected = error
          await expect(validateOriginalUrl(originalUrl)).rejects.toEqual(expected)
        })
      })
    })

    describe('- positive cases:', () => {
      test('should pass with true response', async () => {
        const originalUrl = 'http://abc.com'
        const actual = await validateOriginalUrl(originalUrl)
        expect(actual).toBeTruthy
      })
    })

    // TODO: more tests
  })
})
