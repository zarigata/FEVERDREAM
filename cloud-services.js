document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.cloud-services-modal');
    const modalContent = document.querySelector('.modal-content');
    const exploreButton = document.querySelector('.explore-cloud-services');
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

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
});
