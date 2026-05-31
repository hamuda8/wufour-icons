# ⬡ Wufour Icons

![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen?style=for-the-badge)
![TwOP Architecture](https://img.shields.io/badge/Architecture-TwOP-4f46e5?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**Wufour Icons** is a minimalist, zero-dependency, dynamically injected inline SVG icon library. 

Built specifically to align with the **[TwOP (Two Origins Principle) Architecture]**, this library provides a native Web Component that fetches `.svg` files on demand and injects them directly into the DOM. This allows for total CSS control over your icons (`fill`, `stroke`, etc.) without bloating your initial JavaScript bundles or relying on heavy third-party frameworks.

---

## ✨ Features

* **Zero Dependencies:** Pure Vanilla JavaScript using native Web Components.
* **Fully Inline:** Icons are injected as raw `<svg>` tags, meaning full support for CSS transitions, hover states, and dynamic coloring.
* **Dot-Notation Routing:** Call icons cleanly using their folder structure: `<wufour-icon name="actions.trash"></wufour-icon>`.
* **Infinitely Scalable:** Adding a new icon is as simple as dropping an `.svg` file into the `icons/` folder. Zero JavaScript updates required.
* **TwOP Compliant:** Maintains strict separation between Private (logic) and Public (assets) origins.

---

## 📦 Installation

Install directly from GitHub via npm:

```bash
npm install github:yourusername/wufour-icons
