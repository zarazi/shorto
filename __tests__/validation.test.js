const { validateOriginalUrl } = require('../lib/validators')

describe('Validation Tests', () => {
  describe('#validateOriginalUrl', () => {
    test('should throw new Error()', async () => {
      const validation = async _ => validateOriginalUrl()
      await expect(validation()).rejects.toEqual(new Error())
    })

    // TODO: more tests
  })
})
