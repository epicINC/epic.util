import { FlagEnums } from '../src/flags'


enum FlagType {
  View = 1 << 0,
  Insert = 1 << 1,
  Update = 1 << 2,
  Delete = 1 << 3,
  Recover = 1 << 4,
  Modify = Insert | Update | Delete,
  All = View | Modify | Recover
}



describe('Flags Enum all Test', () => {



  test('exists single', () => {
    expect(FlagEnums.all(FlagType.All, FlagType.Insert)).toBe(true)
  })

  test('exists mutil', () => {
    expect(FlagEnums.all(FlagType.All, FlagType.Modify)).toBe(true)
  })

  test('not exists single', () => {
    expect(FlagEnums.all(FlagType.Modify, FlagType.View)).toBe(false)
  })

  test('not exists mutil', () => {
    expect(FlagEnums.all(FlagType.Modify, FlagType.View | FlagType.Recover)).toBe(false)
  })

  test('not exists part mutil', () => {
    expect(FlagEnums.all(FlagType.Modify, FlagType.All)).toBe(false)
  })


})



describe('Flags Enum any Test', () => {

  test('exists single', () => {
    expect(FlagEnums.any(FlagType.All, FlagType.Insert)).toBe(true)
  })

  test('exists mutil', () => {
    expect(FlagEnums.any(FlagType.Modify, FlagType.Insert | FlagType.View)).toBe(true)
  })


  test('not exists single', () => {
    expect(FlagEnums.any(FlagType.Modify, FlagType.View)).toBe(false)
  })

  test('not exists mutil', () => {
    expect(FlagEnums.any(FlagType.Modify, FlagType.View | FlagType.Recover)).toBe(false)
  })


})



describe('Flags Enum add Test', () => {

  test('exists single', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Insert)).toBe(FlagType.Insert )
  })

  test('exists mutl', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Modify)).toBe(FlagType.Modify)
  })

  test('exists spread', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Insert, FlagType.Update, FlagType.Delete)).toBe(FlagType.Modify)
  })


  test('not exists single', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Update)).toBe(FlagType.Insert | FlagType.Update)
  })

  test('not exists mutl', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Update | FlagType.Delete)).toBe(FlagType.Modify)
  })

  test('not exists spread', () => {
    expect(FlagEnums.add(FlagType.Insert, FlagType.Update, FlagType.Delete)).toBe(FlagType.Modify)
  })

})



describe('Flags Enum remove Test', () => {

  test('single', () => {
    expect(FlagEnums.remove(FlagType.Modify, FlagType.Delete)).toBe(FlagType.Insert | FlagType.Update)
  })

  test('mutl', () => {
    expect(FlagEnums.remove(FlagType.Modify, FlagType.Update | FlagType.Delete)).toBe(FlagType.Insert)
  })

  test('spread', () => {
    expect(FlagEnums.remove(FlagType.Modify, FlagType.Update, FlagType.Delete)).toBe(FlagType.Insert)
  })

})



describe('Flags Enum reverse Test', () => {

  test('add single', () => {
    expect(FlagEnums.reverse(FlagType.Insert, FlagType.Update)).toBe(FlagType.Insert | FlagType.Update)
  })


  test('remove single', () => {
    expect(FlagEnums.reverse(FlagType.Modify, FlagType.Delete)).toBe(FlagType.Insert | FlagType.Update)
  })


  test('add mutl', () => {
    expect(FlagEnums.reverse(FlagType.Insert, FlagType.Update | FlagType.Delete)).toBe(FlagType.Modify)
  })

  test('remove mutl', () => {
    expect(FlagEnums.reverse(FlagType.Modify, FlagType.Update | FlagType.Delete)).toBe(FlagType.Insert)
  })


  test('add & remove mutl', () => {
    expect(FlagEnums.reverse(FlagType.Modify, FlagType.Update | FlagType.Delete | FlagType.View)).toBe(FlagType.Insert | FlagType.View)
  })


  test('add spread', () => {
    expect(FlagEnums.reverse(FlagType.Insert, FlagType.Update, FlagType.Delete)).toBe(FlagType.Modify)
  })

  test('remove spread', () => {
    expect(FlagEnums.reverse(FlagType.Modify, FlagType.Update, FlagType.Delete)).toBe(FlagType.Insert)
  })

  test('add & remove spread', () => {
    expect(FlagEnums.reverse(FlagType.Modify, FlagType.Update, FlagType.Delete, FlagType.View)).toBe(FlagType.Insert | FlagType.View)
  })

})




describe('Flags Enum keys Test', () => {
  test('all keys', () => {
    expect(FlagEnums.keys(FlagType)).toStrictEqual(expect.arrayContaining(['View', 'Insert', 'Update', 'Delete', 'Recover', 'Modify', 'All']))
  })

  test('single', () => {
    expect(FlagEnums.keys(FlagType, FlagType.Insert)).toStrictEqual(['Insert'])
  })


  test('mutil1', () => {
    expect(FlagEnums.keys(FlagType, FlagType.Insert | FlagType.Update)).toStrictEqual(expect.arrayContaining(['Insert', 'Update']))
  })

  test('mutil2', () => {
    expect(FlagEnums.keys(FlagType, FlagType.Modify | FlagType.View)).toStrictEqual(expect.arrayContaining(['Modify', 'View']))
  })



})


