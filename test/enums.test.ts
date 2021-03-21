import { Enums } from '../src/enums'


describe('Mix Enum Test', () => {


    enum MixType {
      View = 1,
      Insert = 2,
      Update = 3,
      Delete = 4,
      String = '4',
      Duplicate = 2,
    }
    
    
    test('all exists', () => {
      expect(Enums.all(MixType, 2, 3, '4')).toBe(true)
    })
    
    
    test('all not exists', () => {
      expect(Enums.all(MixType, 'x', 2)).toBe(false)
    })
    
    
    test('any exists', () => {
      expect(Enums.any(MixType, 2, 3, '4')).toBe(true)
    })
    
    
    test('any some exists', () => {
      expect(Enums.any(MixType, 2, '5')).toBe(true)
    })
    
    test('any not exists', () => {
      expect(Enums.any(MixType, 'x', 'y')).toBe(false)
    })
    
    
    
    test('keys', () => {
      expect(Enums.keys(MixType)).toStrictEqual(expect.arrayContaining([ 'View', 'Insert', 'Update', 'Delete', 'Duplicate', 'String' ]))
    })
    
    
    test('keys with single', () => {
      expect(Enums.keys(MixType, 3)).toEqual(['Update'])
    })
    
    
    test('keys with muti', () => {
      expect(Enums.keys(MixType, 2, 3, 4, '4')).toEqual(expect.arrayContaining([ 'Insert', 'Update', 'Delete', 'String' ]))
    })
    
    
    test('values', () => {
      expect(Enums.values(MixType)).toStrictEqual(expect.arrayContaining([ 1, 2, 3, 4, '4' ]))
    })
    
    
    test('values with single', () => {
      expect(Enums.values(MixType, 'Update')).toEqual([3])
    })
    
    
    test('values with muti', () => {
      expect(Enums.values(MixType, 'Insert', 'Update', 'Delete', 'String')).toEqual(expect.arrayContaining([ 2, 3, 4, '4' ]))
    })

})
