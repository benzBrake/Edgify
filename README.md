# Edgify Firefox 主题

一个旨在轻度模仿 Microsoft Edge 外观和感觉的自定义 Firefox 主题。

## 安装

1.  在 Firefox 地址栏输入 `about:config` 并回车，将 `toolkit.legacyUserProfileCustomizations.stylesheets` 的值设置为 `true`。
2.  在 Firefox 地址栏输入 `about:support` 并回车，然后点击“配置文件夹”旁的“打开文件夹”按钮。
3.  如果 `chrome` 文件夹不存在，请创建一个。
4.  将 `dist` 文件夹下的所有文件和文件夹复制到 `chrome` 文件夹（没有就创建）中。
5.  重启 Firefox。

## 开发

本项目使用 Sass 和 Vite 进行开发。

1.  克隆本仓库。
2.  运行 `npm install`。
3.  运行 `npm run watch` 来监听文件变化并构建 CSS 文件。
4.  运行 `npm run build` 来构建 CSS 文件。

## 感谢
 - [edge-frfox](https://github.com/bmFtZQ/edge-frfox)
 - [WaveFox](https://github.com/QNetITQ/WaveFox)
 - [Firefox-UI-Fix](https://github.com/black7375/Firefox-UI-Fix)
