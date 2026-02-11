// 用户脚本设置
const userConfig = {
  thisAttempts: Math.max(0, Number(settings.thisAttempts || "15")),
  playbacks: (settings.playbacks || "19910311143.json")
    .replace(/，/g, ",")
    .split(",")
    .map((str: string) => str.trim())
    .filter(Boolean),
  deleteStageSaveKeyword: settings.deleteStageSaveKeyword || "19910311143",
}

export { userConfig }
