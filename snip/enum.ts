import { FlagEnums } from '../src/flagEnum'



enum FlagType {
  View = 1 << 0,
  Insert = 1 << 1,
  Update = 1 << 2,
  Delete = 1 << 3,
  Recover = 1 << 4,
  Modify = Insert | Update | Delete,
  All = View | Modify | Recover
}


// console.log(FlagEnums.comboObject(FlagType))

console.log(FlagEnums.keys(FlagType, FlagType.Modify | FlagType.View, FlagType.Modify | FlagType.Recover))
