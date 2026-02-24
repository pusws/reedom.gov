# Civic Atlas / Freedom Compass
A lightweight, static, civic-themed bilingual landing page with animated visuals.

---

## English

### 1) Project Overview

`Civic Atlas` (Freedom Compass) is a front-end-only landing page focused on civic values such as liberty, rule of law, responsibility, and participation.  
It combines:

- A **hero section** with civic messaging and call-to-action.
- A **language toggle** for English/Chinese content.
- A **symbolic SVG visual** (rings, shield, orbit text).
- A **Three.js animated background** rendered on a full-screen canvas.
- Responsive layout for desktop and mobile.

This repository is intentionally minimal (single-page app without build tooling), making it easy to run and customize.

### 2) Tech Stack

- **HTML5** (`index.html`)
- **CSS3** (`styles.css`)
- **Vanilla JavaScript** (`main.js`)
- **Three.js** (loaded in-browser for animated background)

No framework, bundler, or backend service is required.

### 3) Repository Structure

```text
.
├── index.html   # Page structure and translatable text nodes
├── main.js      # i18n toggle logic + animation logic
├── styles.css   # Theme, layout, responsive styles, visual effects
└── README.md    # Project documentation (EN + 中文)
```

### 4) Core Features

- **Bilingual UI (EN/ZH)**
  - Defaults to English on load.
  - Toggle button switches all mapped text content.
- **Civic-themed narrative cards**
  - Three principle panels with concise thematic messaging.
- **Animated visual atmosphere**
  - SVG emblem with orbit/ring effects.
  - 3D particle/celestial style canvas background.
- **Responsive design**
  - Adapts layout for narrower viewports.

### 5) Local Development

Because this is a static site, you can run it in two easy ways:

1. **Open directly**
   - Double-click `index.html`.
2. **Serve via local static server (recommended)**
   - Example with Python:
     ```bash
     python3 -m http.server 8000
     ```
   - Then visit `http://localhost:8000`.

### 6) How i18n Works

- Translatable elements are marked with `data-i18n` keys.
- Language strings are mapped in JavaScript.
- Clicking the language button updates all mapped nodes and button labels/ARIA text.

If you add new text:

1. Add a `data-i18n="yourKey"` attribute in `index.html`.
2. Add both English and Chinese strings in `main.js` for `yourKey`.
3. Verify both languages render correctly.

### 7) Customization Guide

- **Text content:** edit in `index.html` and translation maps in `main.js`.
- **Colors and visual style:** adjust CSS variables in `styles.css` (`:root`).
- **Layout spacing/typography:** update section and heading styles in `styles.css`.
- **Animation intensity/performance:** tune particle counts/speeds in `main.js`.

### 8) Browser Compatibility

Modern Chromium, Firefox, and Safari versions are recommended.  
For best visual fidelity, use browsers with good WebGL support enabled.

### 9) Performance Notes

If rendering feels heavy on low-end devices, consider:

- Lowering particle/spark counts in `main.js`.
- Reducing animation complexity and blur effects.
- Testing on mobile early to balance visuals and smoothness.

### 10) License

No explicit license is currently defined in this repository.  
If you plan to publish or collaborate broadly, add a `LICENSE` file (e.g., MIT/Apache-2.0) and update this section.

---

## 中文

### 1）项目简介

`Civic Atlas` (Freedom Compass) 是一个纯前端静态落地页，围绕自由、法治、责任、参与等公民主题进行视觉与文案表达。  
项目包含：

- **首屏 Hero 区域**（主题文案 + 行动按钮）
- **中英双语切换**
- **象征性 SVG 图形**（环形轨道、盾形元素、环绕文字）
- **Three.js 全屏动态背景**
- **桌面端与移动端自适应布局**

仓库设计保持轻量：无构建工具、无后端依赖，开箱即用。

### 2）技术栈

- **HTML5**（`index.html`）
- **CSS3**（`styles.css`）
- **原生 JavaScript**（`main.js`）
- **Three.js**（浏览器端加载，用于动态背景）

无需框架、打包器或服务端。

### 3）目录结构

```text
.
├── index.html   # 页面结构与可翻译文本节点
├── main.js      # 多语言切换逻辑 + 动画逻辑
├── styles.css   # 主题配色、布局、自适应与视觉效果
└── README.md    # 项目文档（EN + 中文）
```

### 4）核心功能

- **中英双语界面**
  - 页面默认英文。
  - 点击右上角语言按钮可切换全部映射文本。
- **公民主题内容卡片**
  - 三个原则板块，强调法治、责任与参与。
- **动态视觉氛围**
  - SVG 徽章与环绕动效。
  - Canvas 3D 粒子背景，增强沉浸感。
- **响应式设计**
  - 窄屏场景下自动调整布局。

### 5）本地运行

这是静态站点，可用以下方式运行：

1. **直接打开**
   - 双击 `index.html`。
2. **本地静态服务器（推荐）**
   - 例如 Python：
     ```bash
     python3 -m http.server 8000
     ```
   - 浏览器访问：`http://localhost:8000`。

### 6）多语言实现说明

- 需要翻译的元素通过 `data-i18n` 标记。
- 语言文案在 JavaScript 中按 key 映射。
- 点击语言按钮后，会批量更新页面文案与按钮的可访问性文本。

如果你要新增可翻译文案：

1. 在 `index.html` 给目标节点增加 `data-i18n="yourKey"`。
2. 在 `main.js` 中为 `yourKey` 增加中英文映射。
3. 切换语言并手动核对显示是否正确。

### 7）自定义建议

- **改文案：** 修改 `index.html` + `main.js` 中语言映射。
- **改视觉：** 在 `styles.css` 的 `:root` 中调整主题变量。
- **改布局：** 调整 `styles.css` 中网格、间距、字号等规则。
- **改性能：** 在 `main.js` 中降低粒子数量与动画负载。

### 8）浏览器兼容性

建议使用现代版本的 Chromium、Firefox、Safari。  
为了获得更好的动画效果，请确保浏览器支持并启用 WebGL。

### 9）性能优化提示

若低性能设备出现卡顿，可优先尝试：

- 下调 `main.js` 中粒子/火花数量。
- 减少高开销视觉效果（如大范围模糊）。
- 尽早在移动端真机进行流畅度测试。

### 10）许可证说明

当前仓库尚未声明明确许可证。  
如需公开分发或多人协作，建议补充 `LICENSE`（如 MIT/Apache-2.0）并更新本节。
