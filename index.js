export class WufourIcon extends HTMLElement {
    async connectedCallback() {
        const fullName = this.getAttribute('name'); // e.g., "cart" or "navigation.cart"
        
        if (!fullName) {
            console.error("[WufourIcons] Missing 'name' attribute.");
            return;
        }

        // Transform the dot notation into a directory path
        // "cart" -> "cart"
        // "navigation.cart" -> "navigation/cart"
        // "ui.buttons.save" -> "ui/buttons/save"
        const filePath = fullName.split('.').join('/');
        
        // Updated to point to the new "icons" folder
        const basePath = window.WUFOUR_ICONS_PATH || '/node_modules/wufour-icons/icons';
        const url = `${basePath}/${filePath}.svg`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Icon '${fullName}' not found at ${url}`);
            
            const svgText = await response.text();
            
            // Create a temporary container to sanitize the SVG
            const div = document.createElement('div');
            div.innerHTML = svgText.trim();
            const svg = div.querySelector('svg');
            
            if (svg) {
                // Carry over the exact classes from the <wufour-icon> tag
                if (this.className) {
                    svg.setAttribute('class', this.className);
                }
                
                // Final swap
                this.innerHTML = '';
                this.appendChild(svg);
            }
        } catch (err) {
            console.error(`[WufourIcons] ${err.message}`);
        }
    }
}

// Register the element
if (!customElements.get('wufour-icon')) {
    customElements.define('wufour-icon', WufourIcon);
}
