import { type ExtractSettingsMap, defineSettings } from "@bettergi/cli"

const settings = defineSettings([
  {
    type: "input-text",
    name: "thisAttempts",
    label: "次数(默认15)",
    default: "15",
  },
  {
    type: "input-text",
    name: "playbacks",
    label: "每周通关回放文件随机池（逗号分隔）",
    default: "19910311143.json"
  },
  {
    type: "input-text",
    name: "deleteStageSaveKeyword",
    label: "删除关卡存档查找关键字",
    default: "19910311143"
  },
])

/** 覆写脚本设置类型定义 */
type GlobalSettings = ExtractSettingsMap<typeof settings> & Record<string, any>
declare global {
  var settings: GlobalSettings
}

export default settings
