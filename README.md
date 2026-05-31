# ⬡ Wufour Icons

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Zero Frontend JS](https://img.shields.io/badge/Frontend_JS-0KB-brightgreen?style=for-the-badge)
![TwOP Architecture](https://img.shields.io/badge/Architecture-TwOP-4f46e5?style=for-the-badge)

**Wufour Icons** is a high-performance, backend-driven SVG injection engine built specifically for the **TwOP (Two Origins Principle)** architecture.

Instead of relying on browser-side fetching, Web Components, or exposing internal `node_modules` directories to the public internet, Wufour Icons intercepts your HTML on the backend. It scans for custom `<w-icon>` tags and seamlessly replaces them with raw, inline `<svg>` code before the page is ever sent to the user.

The browser receives pure HTML and inline SVGs. Zero frontend JavaScript required. Zero network delays.

---

## ✨ Core Principles

* **TwOP Absolute Compliance:** The `node_modules` directory remains strictly Private. The Frontend handles zero logic for asset loading.
* **100% Memory Control:** You explicitly dictate which icon categories are loaded into server RAM. Unused folders consume zero memory.
* **Inline Styling:** Because the output is a raw `<svg>` tag, your CSS handles all `fill`, `stroke`, and `transition` states natively.
* **Infinite Scalability:** Drop an `.svg` file into a category folder, and it becomes instantly available. The core engine never requires maintenance.

---

## 📁 Library Structure

```text
wufour-icons/
├── package.json
├── index.js             # The backend rendering engine
└── icons/               # The repository of pure .svg files
    ├── /misc
      ├── cart.svg
