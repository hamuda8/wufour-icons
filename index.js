// index.js
export class WufourIcon extends HTMLElement {
    async connectedCallback() {
        const name = this.getAttribute('name');
        const category = this.getAttribute('category');
        
        // Fetch the icon from your library's "public" folder
        // Note: You will need to ensure your build/setup makes these accessible
        const response = await fetch(`/node_modules/wufour-icons/public/${category}/${name}.svg`);
        const svgText = await response.text();
        
        // Inject the SVG content
        this.innerHTML = svgText;
        
        // Carry over any classes from the tag to the SVG
        const svg = this.querySelector('svg');
        if (this.className) {
            svg.classList.add(this.className);
        }
    }
}

// Register the custom element
customElements.define('wufour-icon', WufourIcon);
