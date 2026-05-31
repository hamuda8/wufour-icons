import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class WufourIconsEngine {
    constructor() {
        this.registry = {}; 
    }

    _loadFile(filePath, registryKey) {
        if (fs.existsSync(filePath) && filePath.endsWith('.svg')) {
            const svgContent = fs.readFileSync(filePath, 'utf8')
                .replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
            this.registry[registryKey] = svgContent;
        }
    }

    loadIcon(categoryName, iconName) {
        const key = categoryName ? `${categoryName}.${iconName}` : iconName;
        const folder = categoryName ? path.join(__dirname, 'icons', categoryName) : path.join(__dirname, 'icons');
        this._loadFile(path.join(folder, `${iconName}.svg`), key);
    }

    loadCategory(categories) {
        const cats = Array.isArray(categories) ? categories : [categories];
        cats.forEach(categoryName => {
            const dirPath = path.join(__dirname, 'icons', categoryName);
            if (!fs.existsSync(dirPath)) return;
            const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.svg'));
            for (const file of files) {
                const iconName = file.replace('.svg', '');
                this._loadFile(path.join(dirPath, file), `${categoryName}.${iconName}`);
            }
        });
    }

    loadAll() {
        const iconsDir = path.join(__dirname, 'icons');
        if (!fs.existsSync(iconsDir)) return;

        const scanDir = (dir, currentCategory = '') => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                if (fs.statSync(fullPath).isDirectory()) {
                    const nextCategory = currentCategory ? `${currentCategory}.${item}` : item;
                    scanDir(fullPath, nextCategory);
                } else if (item.endsWith('.svg')) {
                    const iconName = item.replace('.svg', '');
                    const key = currentCategory ? `${currentCategory}.${iconName}` : iconName;
                    this._loadFile(fullPath, key);
                }
            }
        };
        scanDir(iconsDir);
    }

    // THIS IS THE GENIUS PART: It outputs the script that makes the tags work in the browser!
    getScriptTag() {
        return `
        <script>
            // 1. The Dictionary
            window.__WUFOUR_ICONS__ = ${JSON.stringify(this.registry)};
            
            // 2. The Web Component (Replaces itself with the SVG)
            class WufourIcon extends HTMLElement {
                connectedCallback() {
                    const name = this.getAttribute('name');
                    if (!name) return;
                    
                    // Allow calling by full name 'nav.cart' or just 'cart'
                    let svgText = window.__WUFOUR_ICONS__[name];
                    if (!svgText) {
                        const fallbackKey = Object.keys(window.__WUFOUR_ICONS__).find(k => k.endsWith('.' + name) || k === name);
                        svgText = window.__WUFOUR_ICONS__[fallbackKey];
                    }
                    
                    if (svgText) {
                        const div = document.createElement('div');
                        div.innerHTML = svgText;
                        const svg = div.querySelector('svg');
                        
                        if (svg) {
                            if (this.className) svg.setAttribute('class', this.className);
                            this.replaceWith(svg); // Vaporizes the <wufour-icon> tag and leaves the pure <svg>
                        }
                    } else {
                        console.warn('[WufourIcons] Icon not found:', name);
                    }
                }
            }
            if (!customElements.get('wufour-icon')) {
                customElements.define('wufour-icon', WufourIcon);
            }
        </script>
        `;
    }
}

export const WufourIcons = new WufourIconsEngine();
