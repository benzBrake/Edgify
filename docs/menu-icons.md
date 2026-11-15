# 菜单图标校对

## 资源来源与坐标

`src/images/menu-icons` 中的字体轮廓 SVG 来自 Segoe Fluent Icons 1.49 版，并非从 Edge 提取的原生菜单资源。文件使用语义化名称，`popup.scss` 通过 `FluentIcon('search')` 等名称引用；原 Unicode 码点保留在下方对照表中，便于追溯来源。

字体轮廓的 Y 轴向上，SVG 的 Y 轴向下。现有资源使用 `viewBox="0 0 2048 2048"`，导出路径必须添加 `transform="translate(0 2048) scale(1 -1)"`，才能将字体基线坐标转换为 SVG 坐标。直接写入未经转换的轮廓会使所有图标上下镜像，尤其表现为下载箭头朝上、历史时钟和保存图标颠倒。

`popup.scss` 直接引用 SVG，Vite 将资源输出到 `dist/images`；`#addMenu-inspect-page` 和 `#addMenu-viewinfo` 按现有配置保留内嵌图标。修改资源后运行 `npm run build`，再重新加载主题样式即可生效。

`new-tab.svg`、`new-window.svg` 和 `new-private-window.svg` 来自 [edge-frfox 的 SVG 资源](https://github.com/bmFtZQ/edge-frfox/tree/main/chrome/icons)，分别对应 `new-tab-image.svg`、`window.svg`、`private-window.svg`，补充了显式的 `viewBox`。它们直接使用 SVG 坐标，不进行字体纵轴翻转。授权文本保存在 `src/images/menu-icons/LICENSE.edge-frfox.txt`，并通过 `popup.scss` 的保留注释随构建后的 CSS 分发。

`help.svg`、`search-page.svg`、`zoom-out.svg`、`plus.svg`、`fullscreen.svg`、`fullscreen-exit.svg` 同样取自 edge-frfox，补充显式 `viewBox` 并沿用上述授权。`zoom-in.svg` 为按截图绘制的放大镜与加号，专用于缩放行。`#appMenu-zoom-controls::before` 使用 `background-image` 显示该 SVG，并关闭原有遮罩；通过 `-moz-context-properties: fill, fill-opacity` 将菜单文字颜色传入 SVG，适配深浅主题。减号、加号和全屏按钮分别设置图标变量，并移除图像节点的静态圆形底色，保留按钮的悬停、禁用及点击行为。

书签菜单的侧栏入口、搜索书签和书签工具栏入口分别使用侧栏、搜索和书签工具栏图标；“在标签页中打开”使用外部打开图标，“分享窗口”使用分享图标。工具栏“从工具栏移除”使用关闭图标。

`image.svg` 为主题绘制的图片轮廓图标，用于“新建标签页打开图像”；“截图”菜单项复用 `toolbar-icons/screenshot.svg`。

标签页右键菜单的群组操作使用主题绘制的 `tab-group.svg`（外框内的叠放标签）；添加分屏及反转分屏使用 `split-view.svg`（窗口内竖向分栏），拆分分屏使用 `separate-split-view.svg`（分离的两个窗格）。取消标签页群组使用群组图标。这些菜单不再复用表示字体大小的 `font-size.svg`；将分屏加入新群组的 `#context_moveSplitViewToNewGroup` 同样使用群组图标。

撤销和重做使用主题绘制的 `undo.svg`、`redo.svg`。Edgify 对照 edge-frfox 的菜单映射补入专用资源：无跟踪复制、媒体静音、标签移动、容器标签、图片复制/保存、画中画、播放速度、权限、Pocket、工具栏自定义、源码、粘贴并搜索、拼写词典和报告损坏网站图标。`#context_bookmarkTab` 使用工具栏空心书签图标；AI 聊天复用 `toolbar-icons/chat.svg`；`#context_unloadTab` 使用暂停图标表示卸载/挂起（edge-frfox 当前未覆盖该 ID）。这些上游 SVG 沿用 edge-frfox MIT 授权。`addMenuPlus` 的 `#identity-box-contextmenu` 是动态菜单，单项图标由各项配置提供。

地址栏、搜索栏等浏览器输入框使用 `.textbox-contextmenu`，其原生编辑项没有 `#context-copy` 等网页菜单 ID。主题通过 `data-l10n-id="text-action-*"` 匹配撤销、重做、剪切、复制、粘贴、删除和全选，避免依赖不同 Firefox 版本的 `cmd` / `command` 属性差异。脚本插入的 `[anonid="ucjs_clearfield_menu"]` 清除项复用删除图标。

书签菜单的“按名称排序”（`#placesContext_sortBy\:name`）使用主题绘制的 `sort.svg`，以向下箭头和依次缩短的横线表示排序。

## 字体图标命名对照

下表记录原码点与当前文件名。重命名保留原 SVG 内容及菜单映射；`zoom-in-font.svg` 用于右键缩放，与主菜单缩放行的 `zoom-in.svg` 区分。

| 原码点 | 当前文件名 |
| --- | --- |
| `E710` | `add.svg` |
| `E711` | `close.svg` |
| `E712` | `more.svg` |
| `E713` | `settings.svg` |
| `E718` | `pin.svg` |
| `E721` | `search.svg` |
| `E728` | `favorites-list.svg` |
| `E72A` | `forward.svg` |
| `E72B` | `back.svg` |
| `E72C` | `refresh.svg` |
| `E72D` | `share.svg` |
| `E740` | `expand.svg` |
| `E749` | `print.svg` |
| `E74D` | `delete.svg` |
| `E74E` | `save.svg` |
| `E74F` | `mute.svg` |
| `E768` | `play.svg` |
| `E769` | `pause.svg` |
| `E774` | `translate.svg` |
| `E77F` | `paste.svg` |
| `E7B3` | `repair.svg` |
| `E7E8` | `power.svg` |
| `E81C` | `history.svg` |
| `E890` | `view.svg` |
| `E896` | `download.svg` |
| `E89A` | `document.svg` |
| `E8A3` | `zoom-in-font.svg` |
| `E8A4` | `list.svg` |
| `E8A7` | `open-external.svg` |
| `E8B3` | `select-all.svg` |
| `E8C6` | `cut.svg` |
| `E8C8` | `copy.svg` |
| `E8D2` | `font-size.svg` |
| `E8D7` | `key.svg` |
| `E8EE` | `repeat.svg` |
| `E921` | `minus.svg` |
| `EA86` | `extensions.svg` |

已删除未引用的 `E727.svg`、`E72E.svg`、`E78B.svg`、`E897.svg`，对应功能已使用替代资源。工具栏的 `sidebars-right.svg` 也已删除，侧栏位置变化由 `sidebars.svg` 水平翻转实现。

## 与 Edge 截图的差异

下表以本次提供的 Windows Edge 菜单截图为参照，不代表所有 Edge 版本。

| 菜单项 | 原映射 | 校对结果 |
| --- | --- | --- |
| 新建标签页 | `E710`，加号 | 改为 `new-tab.svg`，标签页轮廓内有三个点；新建书签使用 `add.svg` 加号 |
| 新建窗口 | `E78B`，NewWindow | 改为 `new-window.svg`，普通窗口轮廓与顶栏 |
| 新建隐私窗口 | `E727`，InPrivate | 改为 `new-private-window.svg`，带 InPrivate 标识的窗口 |
| 书签/收藏夹 | `E8A4`，Bookmarks | 主菜单改为 `favorites-list.svg`（原 `E728`，FavoriteList）；右键顶部的收藏当前页面按钮改用 `toolbar-icons/bookmark-hollow.svg`，存在原生 `starred` 属性时切换为 `bookmark.svg` 实心星；其余书签操作使用 `list.svg` |
| 历史记录 | `E81C`，History | 修正纵轴后恢复时钟指针和回转箭头方向 |
| 下载 | `E896`，Download | 码点正确；修正纵轴后箭头朝下、横线位于底部 |
| 密码 | `E72E`，Lock | 改为 `key.svg`（原 `E8D7`，Permissions）；原映射为锁，选型不符 |
| 打印、保存 | `E749`、`E74E` | 修正纵轴后恢复正常方向 |
| 在页面中查找 | `E721`，Search | 改为 `search-page.svg`，页面与放大镜；其他搜索操作保留原映射 |
| 帮助反馈 | `E897`，Help | 改为 `help.svg`，圆圈内问号 |
| 缩放 | 缺少图标，按钮使用 Firefox 原生图像 | 添加带加号的放大镜；减号、加号和全屏按钮使用 SVG |

本次修正了字体轮廓转换错误及收藏夹、密码的选型。通用字体字形与 Edge 专用图标仍存在设计差异，不能仅凭相同功能或 Unicode 码点声称与 Edge 原生图标完全一致。后续替换应逐项核对目标 Edge 版本的实际图形，并记录来源。

## 参考

- [Segoe Fluent Icons 官方码点与名称](https://learn.microsoft.com/en-us/windows/apps/design/iconography/segoe-fluent-icons-font)
- [FontTools SVGPathPen](https://fonttools.readthedocs.io/en/latest/pens/svgPathPen.html)
- [FontTools TransformPen](https://fonttools.readthedocs.io/en/latest/pens/transformPen.html)
