import { findBeyondHallBtn, findPaimon } from "../config/regions"

// 判断是否处于奇域大厅
const isInLobby = () =>
  findPaimon() !== void 0 && findBeyondHallBtn() !== void 0

export { isInLobby }
