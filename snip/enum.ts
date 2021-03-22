


enum FlagType {
  View = 1 << 0,
  Insert = 1 << 1,
  Update = 1 << 2,
  Delete = 1 << 3,
  Modify = Insert | Update | Delete,
  All = View | Modify
}


console.log(FlagEnums.comboObject(FlagType))
