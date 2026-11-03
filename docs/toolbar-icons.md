# 工具栏图标

`src/components/toolbar-buttons.scss` 为导航工具栏及溢出列表中的 Firefox 内置按钮映射 Edge 风格 SVG。图标只赋给按钮自身及其直接图像节点，避免继承到按钮内的菜单项。

## 覆盖范围

- 导航：后退、前进、刷新、停止、主页。
- 浏览操作：收藏夹、历史、保存、打开文件、页面查找、打印、分享、修复文字编码、剪切、复制、粘贴、邮件、同步标签页、发送到设备。
- 管理：密码、设置、抹去足迹、隐私窗口、开发者、新建窗口、我的足迹、Firefox View、截图。
- 工具栏入口：下载、扩展、侧栏、溢出列表、三点主菜单。
- 侧栏内置入口：AI 聊天、同步标签页、历史、收藏夹、设置及更多工具。`src/components/sidebar-icons.scss` 使用原生 `--button-icon-content` 替换 Shadow DOM 内的图像。
- 全屏按钮：覆盖导航栏及自定义状态栏中的 `#fullscreen-button`，进入和退出全屏分别使用对应图标。
- 其他图像节点：账户默认头像、地址栏收藏星标、翻译按钮、独立搜索框的放大镜。
- 标签页默认图标：`src/components/tab-icons.scss` 将 `.tab-icon-image` 的 Firefox 默认 `chrome://branding/content/icon32.png` 替换为 Edge 三点标签页 SVG，横向和纵向标签页共用。导航到网站后，`src` 变化会自动退出匹配，不覆盖网站 favicon。

有明确应用身份的第三方扩展图标、自定义脚本按钮不进行通配替换。

## 状态规则

- 保留 Firefox 的按钮尺寸、悬停背景、禁用透明度、命令与点击行为。
- 刷新与停止分别映射各自按钮，沿用 Firefox 的显隐切换及动画层。
- 下载按钮的空闲指示图像使用 Edge 风格下载箭头；活动下载仍由原生进度及通知图层显示。
- 账户通过 `:root` 上的 `--avatar-image-url` 替换默认头像，不限定 `fxastatus`。已登录但未设置自定义头像的账户也使用 Edge 风格默认图标；Firefox 为自定义头像设置的内联变量仍优先于主题默认值。`#fxa-avatar-image` 继续使用 Firefox 原生的 `list-style-image: var(--avatar-image-url)`。ESR 当前状态值为 `signed_in`，不能只匹配旧写法 `signedin` 或 `not_configured`。
- 侧栏按钮复用同一 SVG：存在 `sidebar-positionend` 时只将图像水平翻转（`scaleX(-1)`），属性移除后恢复原方向（`scaleX(1)`）。
- 侧栏图标规则限定浏览器主文档及原生按钮的 `view` 标识，保留第三方扩展图标。用户样式可匹配 Shadow DOM 内节点，但不能通过外层祖先选择器跨越边界，因此不使用 `#sidebar-container moz-button`。
- 地址栏收藏星标区分空心与已收藏实心两种状态。
- 使用 `context-fill` / `context-fill-opacity`，线条继承按钮当前颜色。

## 来源

`src/images/toolbar-icons` 的第三方 SVG 来自 [edge-frfox 固定版本](https://github.com/bmFtZQ/edge-frfox/tree/637f2f49f356822f41c10ad10bfcbde4dba1b8d2/chrome/icons)，增加显式 `viewBox="0 0 16 16"`。授权文本为同目录下的 `LICENSE.edge-frfox.txt`；编译后的 CSS 保留作者署名及 MIT 授权全文。

`account.svg`、`text-encoding.svg` 和 `chat.svg` 为本主题绘制的细线图标。新窗口、隐私窗口、页面查找和全屏复用现有 `menu-icons` 资源；其来源见[菜单图标校对](menu-icons.md)。这些是 Edge 风格主题资源，并非从当前 Edge 程序提取的全套原始图标。

修改后运行 `npm run build`，构建产物以内联 SVG 发布，不依赖运行时网络或系统字体。

## 验证

Firefox ESR `153.6.0`（build `20261022211647`）中临时加载编译后的工具栏规则，已确认现有的 33 个映射按钮接收到内联 SVG，并截取实际导航工具栏检查渲染。禁用按钮仍显示为灰色。临时规则移除后恢复原样式，未改变标签页、选择项或配置。

同一 ESR 中另以用户样式临时加载侧栏及全屏规则，确认五个内置侧栏入口、更多工具及状态栏全屏图标接收到内联 SVG，并截图检查实际显示；三个扩展图标未改变。移除临时用户样式后图标、标签页顺序及选择项均恢复。未切换实际全屏状态来验证退出图标。

未触发下载、登录、全屏或页面导航来测试业务行为；这些动态状态仅检查了规则边界，不能据此声称完整行为测试通过。其他 Firefox 版本的节点结构及侧栏位置属性仍需按实际版本验证。
