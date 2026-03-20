 小小数学探险家 - 实现计划                                               │
│                                                                         │
│ Context                                                                 │
│                                                                         │
│ 从零开始构建一个面向6-12岁小学生的网页数学游戏，基于                    │
│ D:\MyTestProjects\MathGame\设计模型方案.txt 的设计文档。                │
│ 用户选择本地开发服务器预览（npm run dev → localhost:5173）。            │
│                                                                         │
│ 技术栈                                                                  │
│                                                                         │
│ - Vite + TypeScript（vanilla，不用 Phaser.js）                          │
│ - CSS animations 替代游戏引擎                                           │
│ - Web Audio API 做音效                                                  │
│ - localStorage 存储进度                                                 │
│                                                                         │
│ 项目结构（13个源文件）                                                  │
│                                                                         │
│ MathGame/                                                               │
│ ├── index.html                                                          │
│ ├── package.json                                                        │
│ ├── tsconfig.json                                                       │
│ ├── vite.config.ts                                                      │
│ ├── src/                                                                │
│ │   ├── main.ts              # 屏幕路由器                               │
│ │   ├── types.ts             # 所有共享类型                             │
│ │   ├── store.ts             # localStorage 封装                        │
│ │   ├── audio.ts             # Web Audio 音效                           │
│ │   ├── screens/                                                        │
│ │   │   ├── home.ts          # 头像+昵称选择                            │
│ │   │   ├── map.ts           # 世界地图                                 │
│ │   │   └── battle.ts        # 核心战斗循环                             │
│ │   ├── engine/                                                         │
│ │   │   ├── questions.ts     # 题目生成+难度调整                        │
│ │   │   └── combat.ts        # HP/连击/星级逻辑                         │
│ │   └── styles/                                                         │
│ │       ├── main.css         # CSS变量+全局样式                         │
│ │       ├── map.css                                                     │
│ │       └── battle.css                                                  │
│ └── public/                                                             │
│                                                                         │
│ MVP 范围（3个岛屿，其余显示"即将开放"）                                 │
│                                                                         │
│ - 加法海滩（始终解锁）                                                  │
│ - 减法森林（2级解锁）                                                   │
│ - 乘法峡谷（4级解锁）                                                   │
│ - 除法洞穴（Lv6）：表内除法，dividend ÷ divisor = ?，难度1-3对应不同数值范围，怪物是洞穴蝙蝠🦇
  - 几何乐园（Lv8）：正方形/长方形的周长和面积计算，难度递进（周长→面积→大数），怪物是几何魔方🎲
  - 逻辑迷宫（Lv10）：等差数列找规律填空（如 2, 4, ?, 8, 10），怪物是迷宫幽灵👻                                             │
│                                                                         │
│ 实现顺序                                                                │
│                                                                         │
│ Phase 1 - 基础设施                                                      │
│                                                                         │
│ 1. 运行 npm create vite@latest . -- --template vanilla-ts && npm        │
│ install                                                                 │
│ 2. src/types.ts - Player, Question, BattleState, Monster 等接口         │
│ 3. src/store.ts - localStorage 读写，默认玩家状态                       │
│ 4. src/styles/main.css - CSS变量（暖黄+清爽蓝），Quicksand字体          │
│ 5. index.html - 引入 Google Fonts Quicksand                             │
│ 6. src/main.ts - 屏幕路由（navigate函数）                               │
│                                                                         │
│ Phase 2 - 首页                                                          │
│                                                                         │
│ 7. src/screens/home.ts - 头像选择（emoji卡片）+ 昵称输入                │
│                                                                         │
│ Phase 3 - 战斗核心（最重要）                                            │
│                                                                         │
│ 8. src/engine/questions.ts - 加减乘法题目生成器                         │
│ 9. src/engine/combat.ts - HP计算、连击、星级评定                        │
│ 10. src/audio.ts - 答对/答错音效（Web Audio API）                       │
│ 11. src/screens/battle.ts - 战斗循环（计时器用setInterval）             │
│ 12. src/styles/battle.css - HP条、倒计时环、shake/flash动画             │
│                                                                         │
│ Phase 4 - 地图+进度                                                     │
│                                                                         │
│ 13. src/screens/map.ts - 岛屿网格，锁定状态                             │
│ 14. src/styles/map.css                                                  │
│ 15. 战斗结束后的XP/金币/解锁逻辑                                        │
│                                                                         │
│ 关键设计决策                                                            │
│                                                                         │
│ 屏幕路由                                                                │
│                                                                         │
│ 每个 screen 模块导出 mount(container: HTMLElement, params?)             │
│ 函数，路由器替换 innerHTML。                                            │
│                                                                         │
│ 战斗计时器                                                              │
│                                                                         │
│ 用 setInterval 每100ms更新，存储 interval ID 以便清除。                 │
│                                                                         │
│ CSS动画（无canvas）                                                     │
│                                                                         │
│ - shake: translateX 左右抖动（答错时）                                  │
│ - flash: 黄色背景闪烁（答对时）                                         │
│ - HP条: transition: width 0.4s ease-out                                 │
│                                                                         │
│ 音效                                                                    │
│                                                                         │
│ AudioContext 懒加载（首次点击时创建），避免浏览器自动播放限制。         │
│                                                                         │
│ 星级计算                                                                │
│                                                                         │
│ - 3星：满血 + 用时 < 60% 总时限                                         │
│ - 2星：剩余HP ≥ 2                                                       │
│ - 1星：其余情况                                                         │
│                                                                         │
│ CSS 设计变量                                                            │
│                                                                         │
│ --color-primary: #FFB830    /* 暖黄 */                                  │
│ --color-secondary: #4A90D9  /* 清爽蓝 */                                │
│ --color-bg: #FFF9F0                                                     │
│ --color-danger: #FF6B6B                                                 │
│ --color-success: #6BCB77                                                │
│ max-width: 480px，移动端友好。                                          │
│                                                                         │
│ 验证方式                                                                │
│                                                                         │
│ 1. 在 D:\MyTestProjects\MathGame 运行 npm run dev                       │
│ 2. 浏览器访问 http://localhost:5173                                     │
│ 3. 测试流程：创建角色 → 选择加法海滩 → 完成一场战斗 → 查看星级评定 