import { execWeeklyTask } from "./src/workflows/weekly"

(async function () {  
  // 返回主界面
  await genshin.returnMainUi()
  await execWeeklyTask()
})()
