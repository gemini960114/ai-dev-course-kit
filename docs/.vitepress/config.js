import { defineConfig } from 'vitepress'
import { githubSlugify } from '../../scripts/slugify.mjs'

export default defineConfig({
  lang: 'zh-TW',
  title: 'AI 協作開發與研究',
  description: '和 AI 一起寫程式、做研究，並且學會不盲目相信它',
  head: [
    ['meta', { name: 'theme-color', content: '#0284c7' }]
  ],
  base: '/ai-dev-course-kit/',
  // 內部連結壞掉時讓建置失敗；localhost 是示範用網址
  ignoreDeadLinks: ['localhostLinks'],
  // GitHub 風格的標題錨點，README 中的 #錨點 在 GitHub 與網站上都能用
  markdown: {
    anchor: { slugify: githubSlugify }
  },
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '課程總覽', link: '/guide/00_course_overview' },
      {
        text: '階段導覽',
        items: [
          { text: '01 安裝環境', link: '/guide/01_install' },
          { text: '02 AI 整理文獻', link: '/guide/02_organize_data' },
          { text: '03 連線 GitHub', link: '/guide/03_hello_github' },
          { text: '04 網頁小遊戲', link: '/guide/04_web_game' },
          { text: '05 AI 交叉審查', link: '/guide/05_review_loop' },
          { text: '06 寫研究論文', link: '/guide/06_research_paper' },
          { text: '07 超級電腦（老師示範）', link: '/guide/07_hpc_demo' }
        ]
      },
      { text: 'AI 規則 (AGENTS.md)', link: '/guide/agents_md' },
      { text: '給老師', link: '/guide/teacher_guide' }
    ],
    sidebar: [
      {
        text: '🚀 開始',
        items: [
          { text: '📌 課程總覽', link: '/guide/00_course_overview' },
          {
            text: '🧰 01 安裝環境',
            link: '/guide/01_install',
            items: [
              { text: '第 0 步：安裝 Antigravity IDE', link: '/guide/01_antigravity' },
              { text: 'Windows 安裝指南', link: '/guide/01_windows' },
              { text: 'macOS 安裝指南', link: '/guide/01_macos' }
            ]
          }
        ]
      },
      {
        text: '🧪 基礎練習',
        items: [
          { text: '📚 02 AI 整理文獻', link: '/guide/02_organize_data' },
          { text: '🔗 03 連線 GitHub', link: '/guide/03_hello_github' },
          { text: '🎮 04 網頁小遊戲', link: '/guide/04_web_game' }
        ]
      },
      {
        text: '🔍 檢查與研究',
        items: [
          {
            text: '🔁 05 AI 交叉審查',
            link: '/guide/05_review_loop',
            items: [
              { text: '審查流程（REVIEW-LOOP）', link: '/guide/05_review_loop_process' },
              { text: '示範案例', link: '/guide/05_example' },
              { text: '練習題', link: '/guide/05_assignment' }
            ]
          },
          { text: '📝 06 寫研究論文', link: '/guide/06_research_paper' }
        ]
      },
      {
        text: '🖥️ 老師示範',
        items: [
          { text: '⚡ 07 超級電腦', link: '/guide/07_hpc_demo' }
        ]
      },
      {
        text: '📜 規則與教師資料',
        items: [
          { text: '🛡️ AI 規則（AGENTS.md）', link: '/guide/agents_md' },
          { text: '👩‍🏫 教師手冊', link: '/guide/teacher_guide' },
          { text: '🗓️ 05 課程規劃', link: '/guide/teacher_05_course_plan' },
          { text: '🎬 07 示範腳本', link: '/guide/teacher_07_demo_script' }
        ]
      }
    ],
    outline: { level: [2, 3], label: '本頁目錄' },
    docFooter: { prev: '上一頁', next: '下一頁' },
    darkModeSwitchLabel: '外觀',
    sidebarMenuLabel: '選單',
    returnToTopLabel: '回到頂端',
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gemini960114/ai-dev-course-kit' }
    ],
    footer: {
      message: 'AI 很快，但會出錯，要自己檢查。',
      copyright: 'Copyright © 2026 AI 協作開發與研究課程'
    }
  }
})
