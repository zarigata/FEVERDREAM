document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.dev-services-modal');
    const modalContent = document.querySelector('.dev-modal-content');
    const exploreButton = document.querySelector('.explore-dev-services');
    const closeButton = document.querySelector('.close-modal');

    function openModal() {
        modal.classList.add('active');
        setTimeout(() => {
            modalContent.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalContent.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
        document.body.style.overflow = 'auto';
    }

    exploreButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add hover effects and animations to service cards
    const serviceCards = document.querySelectorAll('.dev-service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.dev-service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.dev-service-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Add ripple effect to service cards
    function createRipple(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        
        ripple.className = 'ripple';
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    serviceCards.forEach(card => {
        card.addEventListener('click', createRipple);
    });
});
