/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { getErrorMessage, isHostException } from "@bettergi/utils"
import { userConfig } from "../config/config"
import { enterRoom, leaveRoom } from "../modules/room"
import { availablePlaybackFiles, exitStage, playStage } from "../modules/stage"
import { deleteStageSave } from "../modules/save"

const execWeeklyTask = async () => {
  // 确保通关回放文件存在
  const files = availablePlaybackFiles()
  const playbacks = userConfig.playbacks
    .map((file: any) => `assets/playbacks/${file}`)
    .filter((path: any) => files.includes(path))
  if (playbacks.length === 0) {
    log.warn("未找到任何通关回放文件，请确保已录制回放并拷贝到 assets/playbacks 目录下")
    return
  }

  // 离开当前所在房间（如果存在）
  await leaveRoom()
  // 迭代尝试
  for (let i = 0; i < userConfig.thisAttempts; i++)
    try {
      log.info(`尝试本周第 ${i + 1} / ${userConfig.thisAttempts} 次奇域挑战...`)
      // 删除关卡存档
      await deleteStageSave()
      // 进入房间
      await enterRoom()
      // 游玩关卡
      await playStage(playbacks)
    } catch (err) {
      // 发生主机异常（如：任务取消异常等），无法再继续执行
      if (isHostException(err)) throw err
      // 发生脚本流程异常，尝试退出关卡（如果在关卡中）
      await exitStage()
      log.error("脚本执行出错: {error}", getErrorMessage(err))
    }
  await genshin.returnMainUi()
}

export { execWeeklyTask }
