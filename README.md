# Edgify Firefox 主题

一个旨在轻度模仿 Microsoft Edge 外观和感觉的自定义 Firefox 主题。

## 安装

1.  在 Firefox 地址栏输入 `about:config` 并回车，将 `toolkit.legacyUserProfileCustomizations.stylesheets` 的值设置为 `true`。
2.  在 Firefox 地址栏输入 `about:support` 并回车，然后点击“配置文件夹”旁的“打开文件夹”按钮。
3.  如果 `chrome` 文件夹不存在，请创建一个。
4.  将 `dist` 文件夹下的所有文件和文件夹复制到 `chrome` 文件夹（没有就创建）中。
5.  重启 Firefox。

## 配置

可以在 `about:config` 中创建布尔值参数 `userChrome.edgify.alltabs-button.order-first`，控制标签栏右侧的“列出所有标签页”按钮是否移动到最前面：

- `true`：移动到最前面。
- `false`：保持默认位置。

参数不存在时按 `false` 处理。修改后需重新加载主题样式或重启 Firefox。

## 开发

本项目使用 Sass 和 Vite 进行开发。

1.  克隆本仓库。
2.  运行 `npm install`。
3.  运行 `npm run watch` 来监听文件变化并构建 CSS 文件。
4.  运行 `npm run build` 来构建 CSS 文件。

菜单图标的来源、字体轮廓坐标转换及与 Edge 的差异见[菜单图标校对](docs/menu-icons.md)。
工具栏图标覆盖范围、状态规则与资源来源见[工具栏图标](docs/toolbar-icons.md)。

`dist/external-overrides.css` 是可选的 userChromeJS 脚本和扩展界面样式覆盖，默认不由 `userChrome.css` 加载。需要这些覆盖时，将以下导入语句加入 `chrome/userChrome.css`，并确保 `external-overrides.css` 与主题输出文件一同复制到 `chrome` 目录：

```css
@import url("external-overrides.css");
```

`dist/extension-overrides.css` 是独立构建的扩展内容页覆盖，目前包含 Search by Image 弹窗样式。它应由 `chrome/userContent.css` 加载：

```css
@import url("extension-overrides.css");
```

这些样式依赖 `extensionStylesheetLoader.sys.mjs` 在扩展页面根元素添加的 `uc-extension-id` 属性；仅添加属性不会自动加载样式表。规则同时限定扩展 ID 和弹窗专有的搜索模式控件结构，不影响扩展选项页或普通网页。

## 感谢
 - [edge-frfox](https://github.com/bmFtZQ/edge-frfox)
 - [WaveFox](https://github.com/QNetITQ/WaveFox)
 - [Firefox-UI-Fix](https://github.com/black7375/Firefox-UI-Fix)
