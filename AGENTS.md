# AGENTS.md

Edgify 是轻度模仿 Microsoft Edge 外观的 Firefox 主题，使用 Sass 和 Vite 开发。

- `src/external-overrides.scss` 放置对 userChromeJS 脚本或扩展新增界面元素的样式覆盖，例如菜单项或地址栏按钮。Firefox 原生界面和主题已有组件的通用样式应放在对应的 `src/components/*.scss` 中。
- 引入第三方图标时，在 SVG 注释中保留来源和许可证文件引用；同一来源的完整版权及许可声明统一放在图标目录的 `LICENSE.<来源>.txt` 中，并注明适用图标，避免逐个重复。许可证须随构建产物一起分发。
- 不得擅自终止、重启或修改现有 Firefox 实例及其配置；确需重启时先取得用户明确同意。
- 调试 Firefox 界面、扩展或 userChrome 脚本前，先读取 [Firefox 调试约定](docs/firefox-debugging.md)，并使用 `debugging-firefox` skill。
