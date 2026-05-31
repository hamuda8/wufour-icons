export class WufourIcon extends HTMLElement {
    async connectedCallback() {
        const fullName = this.getAttribute('name'); // e.g., "navigation.cart"
        
        if (!fullName || !fullName.includes('.')) {
            console.error("[WufourIcons] Invalid name format. Use 'category.iconName'");
            return;
        }

        const [category, iconName] = fullName.split('.');
        
        // Use the global path or default to standard node_modules path
        const basePath = window.WUFOUR_ICONS_PATH || '/node_modules/wufour-icons/public';
        const url = `${basePath}/${category}/${iconName}.svg`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Icon '${fullName}' not found at ${url}`);
            
            const svgText = await response.text();
            
            // Create a temporary container to sanitize the SVG
            const div = document.createElement('div');
            div.innerHTML = svgText;
            const svg = div.querySelector('svg');
            
            if (svg) {
                // Apply classes from the <wufour-icon> tag to the SVG
                if (this.className) svg.classList.add(this.className);
                
                // Final swap
                this.innerHTML = '';
                this.appendChild(svg);
            }
        } catch (err) {
            console.error(`[WufourIcons] ${err.message}`);
        }
    }
}

customElements.define('wufour-icon', WufourIcon);
