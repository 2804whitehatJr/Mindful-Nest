// ============================================
// GLOBAL STATE
// ============================================
let currentPage = 'home';
let currentLayer = 1;
let chatState = {
    emotion: null,
    situation: null,
    duration: null,
    thoughts: null,
    cognitiveResponse: null
};
let journalMood = null;
let moodChart = null;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initStaggerAnimations();

    console.log('main.js: DOMContentLoaded');

    // Show the chat page if the page exists
    if (document.getElementById('page-chat')) {
        console.log('main.js: showing chat page');
        showPage('chat');
        if (typeof initChat === 'function') {
            initChat();
        } else {
            console.warn('initChat not defined');
        }
    }

    // Initialize with sample community posts if none exist
    if (!localStorage.getItem('communityPosts')) {
        const samplePosts = [
            {
                id: 1,
                date: new Date(Date.now() - 86400000).toISOString(),
                category: 'healing',
                content: 'Today I realized that it\'s okay to not be okay. Taking small steps is still progress.',
                upvotes: 5,
                comments: []
            },
            {
                id: 2,
                date: new Date(Date.now() - 172800000).toISOString(),
                category: 'study',
                content: 'Board exams are stressing me out, but the breathing exercises here really help calm my nerves before studying.',
                upvotes: 3,
                comments: []
            }
        ];
        localStorage.setItem('communityPosts', JSON.stringify(samplePosts));
    }
});