import { FlagEnums } from '../src/flagEnum'


describe('Flags Enum Test', () => {

  enum TestEnum {
    View = 1 << 0,
    Insert = 1 << 1,
    Update = 1 << 2,
    Delete = 1 << 3,
    Modfiy = Insert | Update | Delete,
    All = View | Modfiy
  }




})

