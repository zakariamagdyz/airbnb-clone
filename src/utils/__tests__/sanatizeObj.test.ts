import { omitFields, selectFields } from '../sanatizeObj'

describe('sanatizeObj', () => {
  describe('selectFields', () => {
    it('should return an object with only the keys that are in the schema', () => {
      // Arrange
      const obj = {
        name: 'John',
        email: 'john@ymail.com',
        password: '12345678',
      }
      // act
      const sanatizedObj = selectFields(obj, ['name', 'email'])

      // Assert
      expect(sanatizedObj).toEqual({
        name: 'John',
        email: 'john@ymail.com',
      })
    })
  })

  describe('omitFields', () => {
    it('should return an object with only the keys that are in the schema', () => {
      // Arrange
      const obj = {
        name: 'John',
        email: 'Jhon@ymail.com',
        password: '12345678',
        role: 'admin',
      }
      // act
      const sanatizedObj = omitFields(obj, ['password', 'role'])

      // Assert
      expect(sanatizedObj).toEqual({
        name: 'John',
        email: 'Jhon@ymail.com',
      })
    })
  })
})
