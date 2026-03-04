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
    showPage('chat');
    goToLayer(4);
    showRegulationTool('breathing');
}

function quickGrounding() {
    closeShantiModal();
    showPage('chat');
    goToLayer(4);
    showRegulationTool('grounding');
}

// Close modal on background click
document.getElementById('shantiModal').addEventListener('click', function(e) {
    if (e.target === this) closeShantiModal();
});

// ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeShantiModal();
});