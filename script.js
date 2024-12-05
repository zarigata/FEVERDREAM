// Egyptian Hieroglyphs Array
const hieroglyphs = [
    '𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇', '𓀈', '𓀉',
    '𓀊', '𓀋', '𓀌', '𓀍', '𓀎', '𓀏', '𓀐', '𓀑', '𓀒', '𓀓',
    '𓀔', '𓀕', '𓀖', '𓀗', '𓀘', '𓀙', '𓀚', '𓀛', '𓀜', '𓀝',
    '𓁀', '𓁁', '𓁂', '𓁃', '𓁄', '𓁅', '𓁆', '𓁇', '𓁈', '𓁉',
    '𓁊', '𓁋', '𓁌', '𓁍', '𓁎', '𓁏', '𓁐', '𓁑', '𓁒', '𓁓',
    '𓁔', '𓁕', '𓁖', '𓁗', '𓁘', '𓁙', '𓁚', '𓁛', '𓁜', '𓁝'
];

class Hieroglyph {
    constructor(x, y, symbol) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.opacity = 0;
        this.scale = 0;
        this.maxScale = Math.random() * 0.5 + 0.5;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.rotation = Math.random() * 360;
        this.fadeInSpeed = Math.random() * 0.02 + 0.01;
        this.fadeOutSpeed = Math.random() * 0.01 + 0.005;
        this.state = 'fadingIn';
        this.glowIntensity = 0;
        this.glowSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
        this.rotation += this.rotationSpeed;

        switch(this.state) {
            case 'fadingIn':
                this.opacity += this.fadeInSpeed;
                this.scale += this.fadeInSpeed;
                if (this.opacity >= 1) {
                    this.opacity = 1;
                    this.state = 'glowing';
                }
                if (this.scale >= this.maxScale) {
                    this.scale = this.maxScale;
                }
                break;

            case 'glowing':
                this.glowIntensity += this.glowSpeed;
                if (this.glowIntensity >= Math.PI * 2) {
                    this.glowIntensity = 0;
                    this.state = 'fadingOut';
                }
                break;

            case 'fadingOut':
                this.opacity -= this.fadeOutSpeed;
                if (this.opacity <= 0) {
                    this.opacity = 0;
                    return true;
                }
                break;
        }
        return false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(this.scale, this.scale);
        
        const glow = Math.sin(this.glowIntensity) * 0.5 + 0.5;
        
        if (this.state === 'glowing') {
            ctx.shadowColor = '#8B7355'; // Darker gold
            ctx.shadowBlur = 20 * glow;
        }

        const gradient = ctx.createLinearGradient(-20, -20, 20, 20);
        gradient.addColorStop(0, '#8B7355'); // Darker Egyptian Gold
        gradient.addColorStop(1, '#DAA520'); // Darker Gold

        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.opacity;
        
        ctx.font = '40px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        
        ctx.restore();
    }
}

class HieroglyphBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.hieroglyphs = [];
        this.lastSpawn = 0;
        this.spawnInterval = 1000;
        
        this.canvas.classList.add('hieroglyph-canvas');
        document.querySelector('.animated-background').appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawnHieroglyph() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const symbol = hieroglyphs[Math.floor(Math.random() * hieroglyphs.length)];
        this.hieroglyphs.push(new Hieroglyph(x, y, symbol));
    }

    animate() {
        const now = Date.now();
        
        if (now - this.lastSpawn > this.spawnInterval) {
            this.spawnHieroglyph();
            this.lastSpawn = now;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.hieroglyphs = this.hieroglyphs.filter(hieroglyph => {
            const remove = hieroglyph.update();
            if (!remove) {
                hieroglyph.draw(this.ctx);
            }
            return !remove;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Particle System
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = ['#8B7355', '#DAA520', '#2C5B84'][Math.floor(Math.random() * 3)];
        this.opacity = Math.random() * 0.5 + 0.2;
        this.blurSize = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

        this.opacity += Math.random() * 0.02 - 0.01;
        if (this.opacity < 0.2) this.opacity = 0.2;
        if (this.opacity > 0.7) this.opacity = 0.7;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.filter = `blur(${this.blurSize}px)`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Initialize particle animation
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.querySelector('.particles');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    particlesContainer.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initParticleSystem() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Draw connecting lines between nearby particles
        particles.forEach((p1, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = p1.color;
                    ctx.globalAlpha = (1 - distance / 150) * 0.2;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticleSystem();
    });

    resizeCanvas();
    initParticleSystem();
    animate();
}

// Hieroglyphic text animation
function initHieroglyphicText() {
    const text = document.querySelector('.hieroglyph-text');
    if (!text) return;

    const originalText = text.getAttribute('data-text');
    const hieroglyphs = [
        '𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇', '𓀈', '𓀉',
        '𓀊', '𓀋', '𓀌', '𓀍', '𓀎', '𓀏', '𓀐', '𓀑', '𓀒', '𓀓',
        '𓁀', '𓁁', '𓁂', '𓁃', '𓁄', '𓁅', '𓁆', '𓁇', '𓁈', '𓁉'
    ];

    function animateLetter(index) {
        if (index >= originalText.length) return;

        let iterations = 0;
        const maxIterations = 8;
        const interval = setInterval(() => {
            text.textContent = text.textContent.split('').map((letter, i) => {
                if (i < index) return originalText[i];
                if (i === index) {
                    if (iterations >= maxIterations) {
                        clearInterval(interval);
                        setTimeout(() => animateLetter(index + 1), 100);
                        return originalText[i];
                    }
                    return hieroglyphs[Math.floor(Math.random() * hieroglyphs.length)];
                }
                return originalText[i];
            }).join('');
            
            iterations++;
        }, 50);
    }

    // Start the animation
    text.textContent = originalText;
    setTimeout(() => animateLetter(0), 500);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    new HieroglyphBackground();
    initHieroglyphicText();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
