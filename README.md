# ⬡ Wufour Icons

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![TwOP Architecture](https://img.shields.io/badge/Architecture-TwOP-4f46e5?style=for-the-badge)

**Wufour Icons** is a high-performance, backend-driven SVG injection engine built specifically for the **TwOP (Two Origins Principle)** architecture.

This library solves the problem of using inline SVGs across both **Static HTML** and **Dynamic JavaScript** without exposing backend directories or making heavy frontend network requests. It operates in two seamless ways:
1. **Static Parsing:** Intercepts static HTML on the backend and replaces `<w-icon>` tags with raw SVGs.
2. **The "Smuggled Dictionary":** Safely passes the loaded SVG strings to the frontend `window` object, allowing your vanilla JavaScript files to inject icons instantly during DOM creation.

---

## 📁 Library Structure

```text
wufour-icons/
├── package.json
├── index.js             # The backend rendering engine
└── icons/               # The repository of pure .svg files
    ├── /misc
      ├── cart.svg
