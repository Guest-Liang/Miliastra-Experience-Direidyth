import { assertRegionAppearing } from "@bettergi/utils"
import {
  clickToChooseFirstLikeResult,
  findBeyondHallBtn,
  findConfirmBtn,
  findCreateRoomBtn,
  findEnterRoomShortcut,
  findGoToLobbyBtn,
  findHeaderTitle,
  findLeaveRoomBtn,
  findManageStagesBtn,
  findBeyondFavoritesBtn,
} from "../config/regions"
import { isInLobby } from "./lobby"

const isInRoom = () => findHeaderTitle("房间", true) !== void 0

// 打开人气奇域
const goToRecommendedWonderlands = async () => {
  log.info("打开人气奇域界面...")
  await assertRegionAppearing(
    () => findHeaderTitle("人气", true),
    "打开人气奇域界面超时",
    () => {
      keyPress("VK_F6")
    },
  )
}

// 创建并进入奇域房间
const createRoom = async () => {
  await goToRecommendedWonderlands()

  log.info("打开奇域收藏...")
  await assertRegionAppearing(
    findManageStagesBtn,
    "打开奇域收藏超时",
    async () => {
      findBeyondFavoritesBtn()?.click()
      await sleep(300)
    },
    { maxAttempts: 5 }
  )

  log.info("打开奇域介绍...")
  await assertRegionAppearing(
    findCreateRoomBtn,
    "打开奇域介绍超时",
    () => {
      const goToLobbyButton = findGoToLobbyBtn()
      if (goToLobbyButton) {
        log.info("当前不在大厅，前往大厅...")
        goToLobbyButton.click()
      } else {
        log.info("选择指定位置奇域关卡...")
        clickToChooseFirstLikeResult()
      }
    },
    { maxAttempts: 60 }
  )

  log.info("创建并进入房间...")
  await assertRegionAppearing(
    () => findHeaderTitle("房间", true),
    "创建并进入房间超时",
    () => {
      findCreateRoomBtn()?.click()
    },
    { maxAttempts: 60 },
  )
}

// 进入奇域房间
const enterRoom = async () => {
  if (isInLobby()) {
    if (findEnterRoomShortcut()) {
      log.info("当前已存在房间，进入房间...")
      await assertRegionAppearing(
        () => findHeaderTitle("房间", true),
        "进入房间超时",
        () => {
          keyPress("VK_P")
        },
      )
      return
    }
  }
  log.info("当前不在房间内，创建房间...")
  await createRoom()
}

// 离开房间
const leaveRoom = async () => {
  // 当前在大厅，且存在房间
  if ((isInLobby() && findEnterRoomShortcut() !== void 0) || isInRoom()) {
    log.info("当前存在房间，离开房间...")
    // 先进入房间
    await assertRegionAppearing(
      () => findHeaderTitle("房间", true),
      "进入房间超时",
      () => {
        keyPress("VK_P")
      },
    )
    // 离开房间
    await assertRegionAppearing(
      findBeyondHallBtn,
      "离开房间超时",
      async () => {
        findLeaveRoomBtn()?.click()
        await sleep(1e3)
        findConfirmBtn()?.click()
      },
      { maxAttempts: 5 },
    )
  }
}

export { enterRoom, goToRecommendedWonderlands, leaveRoom }
