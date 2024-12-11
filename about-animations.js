// Hieroglyphic symbols collection
const hieroglyphics = [
    '𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇', '𓀈', '𓀉',
    '𓀊', '𓀋', '𓀌', '𓀍', '𓀎', '𓀏', '𓀐', '𓀑', '𓀒', '𓀓',
    '𓀔', '𓀕', '𓀖', '𓀗', '𓀘', '𓀙', '𓀚', '𓀛', '𓀜', '𓀝',
    '𓁀', '𓁁', '𓁂', '𓁃', '𓁄', '𓁅', '𓁆', '𓁇', '𓁈', '𓁉',
    '𓁊', '𓁋', '𓁌', '𓁍', '𓁎', '𓁏', '𓁐', '𓁑', '𓁒', '𓁓',
    '𓁔', '𓁕', '𓁖', '𓁗', '𓁘', '𓁙', '𓁚', '𓁛', '𓁜', '𓁝'
];

class MagicHieroglyphics {
    constructor() {
        this.teamSection = document.querySelector('.team-section');
        if (!this.teamSection) return;

        this.glyphs = [];
        this.init();
    }

    createGlyph() {
        const glyph = document.createElement('div');
        glyph.className = 'magic-glyph';
        glyph.textContent = hieroglyphics[Math.floor(Math.random() * hieroglyphics.length)];
        
        // Random position within the team section
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        glyph.style.left = `${x}%`;
        glyph.style.top = `${y}%`;
        
        // Random size between 24px and 48px
        const size = 24 + Math.random() * 24;
        glyph.style.fontSize = `${size}px`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        glyph.style.transform = `rotate(${rotation}deg)`;
        
        this.teamSection.appendChild(glyph);
        return glyph;
    }

    animateGlyph(glyph) {
        const duration = 2000 + Math.random() * 2000; // 2-4 seconds
        const delay = Math.random() * 5000; // 0-5 seconds delay

        setTimeout(() => {
            glyph.classList.add('glow');
            
            setTimeout(() => {
                glyph.classList.remove('glow');
                this.animateGlyph(glyph); // Recursive call for continuous animation
            }, duration);
            
        }, delay);
    }

    init() {
        // Create initial glyphs
        const numGlyphs = Math.floor((this.teamSection.offsetWidth * this.teamSection.offsetHeight) / 20000);
        
        for (let i = 0; i < numGlyphs; i++) {
            const glyph = this.createGlyph();
            this.glyphs.push(glyph);
            this.animateGlyph(glyph);
        }

        // Add new glyphs periodically
        setInterval(() => {
            if (this.glyphs.length < numGlyphs * 1.5) {
                const glyph = this.createGlyph();
                this.glyphs.push(glyph);
                this.animateGlyph(glyph);
            }
        }, 10000);

        // Remove excess glyphs periodically
        setInterval(() => {
            while (this.glyphs.length > numGlyphs) {
                const glyph = this.glyphs.shift();
                glyph.remove();
            }
        }, 15000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MagicHieroglyphics();
});
