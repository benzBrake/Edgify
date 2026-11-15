# AGENTS.md

Edgify 是轻度模仿 Microsoft Edge 外观的 Firefox 主题，使用 Sass 和 Vite 开发。

- `src/external-menu-overrides.css` 专门放置对 userChromeJS 脚本或扩展新增菜单项的样式覆盖，例如为其补充主题图标、隐藏原生图标或调整菜单项图标布局。Firefox 原生菜单和主题已有菜单项的通用样式应放在对应的 `src/components/*.scss` 中。
- 不得擅自终止、重启或修改现有 Firefox 实例及其配置；确需重启时先取得用户明确同意。
- 调试 Firefox 界面、扩展或 userChrome 脚本前，先读取 [Firefox 调试约定](docs/firefox-debugging.md)，并使用 `debugging-firefox` skill。
