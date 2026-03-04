// ============================================
// STAGGER ANIMATIONS
// ============================================

function initStaggerAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stagger-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
}