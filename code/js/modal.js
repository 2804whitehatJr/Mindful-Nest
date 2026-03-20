// ============================================
// SHANTI MODAL
// ============================================

function openShantiModal() {
    document.getElementById('shantiModal').classList.remove('hidden');
}

function closeShantiModal() {
    document.getElementById('shantiModal').classList.add('hidden');
}

function quickBreathing() {
    closeShantiModal();
    // Check if we're on the chat page already
    if (window.location.pathname.includes('chat.html')) {
        goToLayer(4);
        showRegulationTool('breathing');
    } else {
        // Redirect to chat page with breathing parameter
        window.location.href = 'html/chat.html?tool=breathing';
    }
}

function quickGrounding() {
    closeShantiModal();
    // Check if we're on the chat page already
    if (window.location.pathname.includes('chat.html')) {
        goToLayer(4);
        showRegulationTool('grounding');
    } else {
        // Redirect to chat page with grounding parameter
        window.location.href = 'html/chat.html?tool=grounding';
    }
}

// Close modal on background click
document.getElementById('shantiModal').addEventListener('click', function(e) {
    if (e.target === this) closeShantiModal();
});

// ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeShantiModal();
});