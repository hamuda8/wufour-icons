import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class WufourIconsEngine {
    constructor() {
        // This holds only the icons you explicitly tell it to load
        this.registry = {}; 
    }

    // Call this in app.js to load a full folder into memory
    loadCategory(categoryName) {
        const dirPath = path.join(__dirname, 'icons', categoryName);
        if (!fs.existsSync(dirPath)) {
            console.warn(`[WufourIcons] Category '${categoryName}' does not exist.`);
            return;
        }
        
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.svg'));
        for (const file of files) {
            const iconName = file.replace('.svg', '');
            const svgContent = fs.readFileSync(path.join(dirPath, file), 'utf8').trim();
            this.registry[`${categoryName}.${iconName}`] = svgContent;
        }
        console.log(`[WufourIcons] Loaded category: ${categoryName} (${files.length} icons)`);
    }

    // Call this in app.js if you only want ONE specific icon
    loadIcon(categoryName, iconName) {
        const filePath = path.join(__dirname, 'icons', categoryName, `${iconName}.svg`);
        if (fs.existsSync(filePath)) {
            this.registry[`${categoryName}.${iconName}`] = fs.readFileSync(filePath, 'utf8').trim();
        }
    }

    // Call this inside renderFile.js to magically inject the SVGs
    render(htmlString) {
        // Looks for <w-icon name="category.name" class="optional" />
        const regex = /<w-icon\s+name="([^"]+)"(?:\s+class="([^"]*)")?\s*\/?>/g;

        return htmlString.replace(regex, (match, fullName, className) => {
            let svg = this.registry[fullName];
            
            // If icon wasn't loaded in app.js, leave the tag alone or return empty
            if (!svg) return match; 

            // If a class was provided, inject it into the <svg> tag
            if (className) {
                svg = svg.replace('<svg ', `<svg class="${className}" `);
            }

            return svg;
        });
    }
}

// Export a single instance to be shared across your backend
export const WufourIcons = new WufourIconsEngine();
