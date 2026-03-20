// ============================================
        // JOURNAL SYSTEM
        // ============================================
        function selectJournalMood(mood) {
            journalMood = mood;
            document.querySelectorAll('#page-journal .mood-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
            event.target.closest('.mood-icon').classList.add('selected');
        }

        function saveJournalEntry() {
            const text = document.getElementById('journalText').value.trim();
            
            if (!text) {
                alert('Please write something in your journal.');
                return;
            }
            
            if (!journalMood) {
                alert('Please select how you\'re feeling.');
                return;
            }
            
            const entry = {
                id: Date.now(),
                date: new Date().toISOString(),
                mood: journalMood,
                text: text
            };
            
            const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
            entries.unshift(entry);
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            
            // Clear form
            document.getElementById('journalText').value = '';
            journalMood = null;
            document.querySelectorAll('#page-journal .mood-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
            
            loadJournalEntries();
        }

        function clearJournalForm() {
            document.getElementById('journalText').value = '';
            journalMood = null;
            document.querySelectorAll('#page-journal .mood-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
        }

        function loadJournalEntries() {
            const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
            const container = document.getElementById('journalEntries');
            
            if (entries.length === 0) {
                container.innerHTML = '<p class="text-center" style="color: var(--text-muted);">No journal entries yet. Start writing above.</p>';
                return;
            }
            
            const moodLabels = {
                'great': { label: 'Great', color: '#E8A87C' },
                'okay': { label: 'Okay', color: '#D4C4B5' },
                'meh': { label: 'Neutral', color: '#C9B8A8' },
                'low': { label: 'Low', color: '#8B4557' },
                'struggling': { label: 'Struggling', color: '#2C3E50' }
            };
            
            container.innerHTML = entries.map(entry => {
                const date = new Date(entry.date);
                const formattedDate = date.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const moodInfo = moodLabels[entry.mood] || { label: entry.mood, color: '#C9B8A8' };
                
                return `
                    <div class="journal-entry" onclick="toggleJournalEntry(this)">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-sm" style="color: var(--text-muted);">${formattedDate}</span>
                            <span class="category-tag" style="background: ${moodInfo.color}20; color: ${moodInfo.color};">${moodInfo.label}</span>
                        </div>
                        <p style="color: var(--text-dark);">${entry.text.substring(0, 100)}${entry.text.length > 100 ? '...' : ''}</p>
                        <div class="content mt-3 pt-3" style="border-top: 1px solid var(--border-warm);">
                            <p style="color: var(--text-dark);">${entry.text}</p>
                            <button class="mt-3 text-sm" style="color: var(--maroon-soft);" onclick="event.stopPropagation(); deleteJournalEntry(${entry.id})">Let it go</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function toggleJournalEntry(element) {
            element.classList.toggle('expanded');
        }

        function deleteJournalEntry(id) {
            if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
                // Fade animation
                const entry = event.target.closest('.journal-entry');
                entry.style.opacity = '0';
                entry.style.transform = 'translateX(-20px)';
                entry.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
                    const filtered = entries.filter(e => e.id !== id);
                    localStorage.setItem('journalEntries', JSON.stringify(filtered));
                    loadJournalEntries();
                }, 300);
            }
        }