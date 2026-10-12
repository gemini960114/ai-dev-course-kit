// GitHub 相容的標題錨點，讓 README 中的 #錨點 連結在 GitHub 與網站上都能使用。
export function githubSlugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '')
    .replace(/ /g, '-')
}
