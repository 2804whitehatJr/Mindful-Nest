// ============================================
// PAGE NAVIGATION
// ============================================

function showPage(pageName) {
    console.log('navigation.js: showPage called for', pageName);
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const page = document.getElementById(`page-${pageName}`);
    if (page) {
        page.classList.add('active');
    }
}

function toggleMobileMenu() {
    document.getElementById('mobileNav').classList.toggle('hidden');
}
