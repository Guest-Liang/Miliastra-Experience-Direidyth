const DEFAULT_ATTEMPTS = 15
const DEFAULT_PLAYBACK = "19910311143.json"
const DEFAULT_DELETE_STAGE_SAVE_KEYWORD = "19910311143"

const parseAttempts = (rawValue: string | undefined) => {
  const parsed = Number.parseInt((rawValue ?? "").trim(), 10)
  if (Number.isNaN(parsed)) return DEFAULT_ATTEMPTS
  // README 约定 0 表示自动判断；当前脚本按默认次数执行。
  if (parsed <= 0) return DEFAULT_ATTEMPTS
  return parsed
}

const parsePlaybacks = (rawValue: string | undefined) => {
  const value = (rawValue ?? DEFAULT_PLAYBACK).replace(/，/g, ",")
  const list = value
    .split(",")
    .map((fileName: string) => fileName.trim())
    .filter(Boolean)
  return list.length === 0 ? [DEFAULT_PLAYBACK] : list
}

// 用户脚本设置
const userConfig = {
  thisAttempts: parseAttempts(settings.thisAttempts),
  playbacks: parsePlaybacks(settings.playbacks),
  deleteStageSaveKeyword:
    settings.deleteStageSaveKeyword?.trim() || DEFAULT_DELETE_STAGE_SAVE_KEYWORD,
}

export { userConfig }
