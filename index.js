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

    // 1. Load specific icon: WufourIcons.loadIcon('navigation', 'cart') OR WufourIcons.loadIcon('', 'Taazur')
    loadIcon(categoryName, iconName) {
        const key = categoryName ? `${categoryName}.${iconName}` : iconName;
        const folder = categoryName ? path.join(__dirname, 'icons', categoryName) : path.join(__dirname, 'icons');
        this._loadFile(path.join(folder, `${iconName}.svg`), key);
    }

    // 2. Load category (Accepts String or Array): WufourIcons.loadCategory(['nav', 'actions'])
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

    // 3. Load EVERYTHING automatically
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
        console.log(`[WufourIcons] Loaded all icons. Total: ${Object.keys(this.registry).length}`);
    }

    render(htmlString) {
        const regex = /<w-icon\s+name="([^"]+)"(?:\s+class="([^"]*)")?\s*\/?>/g;
        return htmlString.replace(regex, (match, fullName, className) => {
            let svg = this.registry[fullName];
            if (!svg) return match; 
            if (className) svg = svg.replace('<svg ', `<svg class="${className}" `);
            return svg;
        });
    }
}

export const WufourIcons = new WufourIconsEngine();
