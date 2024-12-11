document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.security-services-modal');
    const modalContent = document.querySelector('.security-modal-content');
    const exploreButton = document.querySelector('.explore-security-services');
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
    const serviceCards = document.querySelectorAll('.security-service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.security-service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.security-service-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Add shield pulse effect to security icons
    function pulseShield() {
        const icons = document.querySelectorAll('.security-service-icon');
        icons.forEach(icon => {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Pulse shields periodically
    setInterval(pulseShield, 3000);
});
