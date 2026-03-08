// ============================================
        // COMMUNITY SYSTEM
        // ============================================
        function createPost() {
            const category = document.getElementById('postCategory').value;
            const content = document.getElementById('postContent').value.trim();
            
            if (!category) {
                alert('Please select a category.');
                return;
            }
            
            if (!content) {
                alert('Please write something to share.');
                return;
            }
            
            const post = {
                id: Date.now(),
                date: new Date().toISOString(),
                category: category,
                content: content,
                upvotes: 0,
                comments: []
            };
            
            const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
            posts.unshift(post);
            localStorage.setItem('communityPosts', JSON.stringify(posts));
            
            // Clear form
            document.getElementById('postCategory').value = '';
            document.getElementById('postContent').value = '';
            
            loadCommunityPosts();
        }

        function loadCommunityPosts() {
            const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
            const container = document.getElementById('communityPosts');
            
            if (posts.length === 0) {
                container.innerHTML = '<p class="text-center" style="color: var(--text-muted);">No posts yet. Be the first to share.</p>';
                return;
            }
            
            const categoryLabels = {
                'stress': 'Stress',
                'relationships': 'Relationships',
                'family': 'Family',
                'study': 'Study Pressure',
                'healing': 'Healing'
            };
            
            container.innerHTML = posts.map(post => {
                const date = new Date(post.date);
                const formattedDate = date.toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                return `
                    <div class="community-post">
                        <div class="flex justify-between items-start mb-3">
                            <span class="category-tag">${categoryLabels[post.category] || post.category}</span>
                            <span class="text-sm" style="color: var(--text-muted);">${formattedDate}</span>
                        </div>
                        <p class="mb-4" style="color: var(--text-dark);">${post.content}</p>
                        <div class="flex items-center gap-4">
                            <button class="flex items-center gap-2 text-sm" style="color: var(--saffron-muted);" onclick="upvotePost(${post.id})">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                </svg>
                                ${post.upvotes}
                            </button>
                            <button class="text-sm" style="color: var(--text-muted);" onclick="toggleCommentForm(${post.id})">Reply</button>
                        </div>
                        <div id="commentForm-${post.id}" class="hidden mt-4">
                            <input type="text" class="w-full p-2 rounded-lg border-2 mb-2" style="border-color: var(--border-warm); background: var(--bg-warm);" placeholder="Write a supportive reply..." id="commentInput-${post.id}">
                            <button class="btn-primary text-sm py-2 px-4" onclick="addComment(${post.id})">Post Reply</button>
                        </div>
                        <div id="comments-${post.id}" class="mt-3">
                            ${post.comments.map(comment => `
                                <div class="ml-4 p-3 rounded-lg mt-2" style="background: var(--bg-warm);">
                                    <p class="text-sm" style="color: var(--text-dark);">${comment.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }

        function upvotePost(postId) {
            const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.upvotes++;
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                loadCommunityPosts();
            }
        }

        function toggleCommentForm(postId) {
            const form = document.getElementById(`commentForm-${postId}`);
            form.classList.toggle('hidden');
        }

        function addComment(postId) {
            const input = document.getElementById(`commentInput-${postId}`);
            const text = input.value.trim();
            
            if (!text) {
                alert('Please write a comment.');
                return;
            }
            
            const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.comments.push({ text: text, date: new Date().toISOString() });
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                loadCommunityPosts();
            }
        }
