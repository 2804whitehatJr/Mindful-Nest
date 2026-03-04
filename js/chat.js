// ============================================
        // CHAT SYSTEM - 5 LAYER
        // ============================================
        function initChat() {
            if (currentLayer === 1) {
                addBotMessage("Welcome to Sahaara. I'm here to walk alongside you through whatever you're experiencing. Let's take this one step at a time.");
            }
        }

        function selectEmotion(emotion) {
            chatState.emotion = emotion;
            
            // Update UI
            document.querySelectorAll('.emotion-pill').forEach(pill => {
                pill.classList.remove('selected');
            });
            event.target.classList.add('selected');
            
            // Add user message
            addUserMessage(`I'm feeling ${emotion}.`);
            
            // Bot response
            setTimeout(() => {
                const responses = {
                    'overwhelmed': "I hear you. Feeling overwhelmed can be really heavy. Let's explore this together.",
                    'anxious': "Anxiety can feel like a lot. Thank you for sharing that with me.",
                    'angry': "Anger is a valid emotion. It often signals that something important to us has been affected.",
                    'sad': "I'm sorry you're feeling sad. Your feelings matter, and it's okay to sit with them.",
                    'numb': "Numbness can be our mind's way of protecting us. Let's gently explore what might be underneath.",
                    'okay': "I'm glad you're doing okay. Is there something on your mind you'd like to explore?"
                };
                addBotMessage(responses[emotion] || "Thank you for sharing. Let's explore this together.");
                
                // Move to layer 2
                setTimeout(() => {
                    goToLayer(2);
                }, 1000);
            }, 500);
        }

        function selectSituation(situation) {
            chatState.situation = situation;
            
            document.querySelectorAll('.situation-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.classList.add('selected');
            
            checkLayer2Complete();
        }

        function selectDuration(duration) {
            chatState.duration = duration;
            
            document.querySelectorAll('.duration-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.target.classList.add('selected');
            
            checkLayer2Complete();
        }

        function checkLayer2Complete() {
            if (chatState.situation && chatState.duration) {
                setTimeout(() => {
                    addUserMessage(`This is related to ${chatState.situation} and has been ${chatState.duration === 'short' ? 'recent' : 'ongoing'}.`);
                    
                    setTimeout(() => {
                        addBotMessage(`Thank you for sharing that context. ${chatState.duration === 'long' ? 'Dealing with something ongoing can be especially draining. ' : ''}Let's dive deeper into your thoughts.`);
                        setTimeout(() => {
                            goToLayer(3);
                        }, 1000);
                    }, 500);
                }, 300);
            }
        }

        function analyzeThoughts() {
            const thoughts = document.getElementById('thoughtsInput').value.trim();
            
            if (!thoughts) {
                alert('Please share your thoughts before continuing.');
                return;
            }
            
            chatState.thoughts = thoughts;
            addUserMessage(thoughts);
            
            // Check for crisis keywords
            const crisisKeywords = ['die', 'suicide', 'kill myself', 'self harm', 'end my life', 'want to die'];
            const hasCrisis = crisisKeywords.some(keyword => thoughts.toLowerCase().includes(keyword));
            
            if (hasCrisis) {
                showEmergencyPanel();
                return;
            }
            
            // Cognitive distortion detection
            const distortionWords = ['always', 'never', 'ruined', 'everyone', 'nothing', 'nobody', 'everything', 'hate myself', 'worthless'];
            const foundDistortions = distortionWords.filter(word => thoughts.toLowerCase().includes(word));
            
            setTimeout(() => {
                if (foundDistortions.length > 0) {
                    addBotMessage("I hear the weight in your words. Phrases like 'always' and 'never' can sometimes make situations feel more absolute than they might be. It sounds very heavy. Could there be another way to look at this?");
                } else {
                    addBotMessage("Thank you for trusting me with your thoughts. It takes courage to express what's on your mind. Let's now focus on finding some calm.");
                }
                
                setTimeout(() => {
                    goToLayer(4);
                }, 1500);
            }, 500);
        }

        // Layer 4 - Emotional Regulation Tools
        let breathingInterval = null;

        function showRegulationTool(tool) {
            document.querySelectorAll('.regulation-tool').forEach(t => t.classList.add('hidden'));
            document.querySelectorAll('.regulation-tab').forEach(t => {
                t.style.background = 'var(--bg-warm)';
                t.style.color = 'var(--text-muted)';
            });
            
            document.getElementById(`${tool}Tool`).classList.remove('hidden');
            event.target.style.background = 'var(--saffron-muted)';
            event.target.style.color = 'white';
        }

        function startBreathing() {
            const circle = document.getElementById('breathingCircle');
            const text = document.getElementById('breathingText');
            const btn = event.target;
            
            btn.disabled = true;
            btn.textContent = 'Breathing...';
            
            let cycles = 0;
            const maxCycles = 3;
            
            function runBreathingCycle() {
                if (cycles >= maxCycles) {
                    text.textContent = 'Done';
                    btn.disabled = false;
                    btn.textContent = 'Start Again';
                    circle.classList.remove('inhale');
                    return;
                }
                
                // Inhale - 4 seconds
                text.textContent = 'Inhale';
                circle.classList.add('inhale');
                
                setTimeout(() => {
                    // Hold - 7 seconds
                    text.textContent = 'Hold';
                    
                    setTimeout(() => {
                        // Exhale - 8 seconds
                        text.textContent = 'Exhale';
                        circle.classList.remove('inhale');
                        
                        setTimeout(() => {
                            cycles++;
                            runBreathingCycle();
                        }, 8000);
                    }, 7000);
                }, 4000);
            }
            
            runBreathingCycle();
        }

        function toggleGrounding(element) {
            element.classList.toggle('checked');
        }

        function completeGrounding() {
            addBotMessage("Grounding helps bring us back to the present moment. You're doing great.");
            setTimeout(() => goToLayer(5), 1000);
        }

        function completeCompassion() {
            addBotMessage("Remember, being kind to yourself is not weakness — it's wisdom.");
            setTimeout(() => goToLayer(5), 1000);
        }

        // Layer 5 - Reflection
        function saveReflection() {
            const reflection1 = document.getElementById('reflection1').value.trim();
            const reflection2 = document.getElementById('reflection2').value.trim();
            
            if (!reflection1 || !reflection2) {
                alert('Please answer both reflection questions.');
                return;
            }
            
            const reflection = {
                date: new Date().toISOString(),
                emotion: chatState.emotion,
                situation: chatState.situation,
                duration: chatState.duration,
                thoughts: chatState.thoughts,
                selfUnderstanding: reflection1,
                nextStep: reflection2
            };
            
            // Save to localStorage
            const reflections = JSON.parse(localStorage.getItem('chatReflections') || '[]');
            reflections.unshift(reflection);
            localStorage.setItem('chatReflections', JSON.stringify(reflections));
            
            addBotMessage("Your reflection has been saved. Remember, every step forward — no matter how small — is meaningful. You've shown courage by engaging with this process. Take care of yourself.");
            
            document.getElementById('reflection1').value = '';
            document.getElementById('reflection2').value = '';
        }

        function goToLayer(layer) {
            currentLayer = layer;
            
            // Update stepper
            for (let i = 1; i <= 5; i++) {
                const step = document.getElementById(`step${i}`);
                const line = document.getElementById(`line${i}`);
                
                step.classList.remove('active', 'completed');
                
                if (i < layer) {
                    step.classList.add('completed');
                    if (line) line.classList.add('completed');
                } else if (i === layer) {
                    step.classList.add('active');
                }
            }
            
            // Show layer content
            document.querySelectorAll('.layer-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`layer${layer}Content`).classList.remove('hidden');
        }

        function resetChat() {
            currentLayer = 1;
            chatState = {
                emotion: null,
                situation: null,
                duration: null,
                thoughts: null
            };
            
            document.getElementById('chatMessages').innerHTML = '';
            document.querySelectorAll('.emotion-pill, .situation-btn, .duration-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.getElementById('thoughtsInput').value = '';
            document.getElementById('reflection1').value = '';
            document.getElementById('reflection2').value = '';
            
            // Reset stepper
            for (let i = 1; i <= 5; i++) {
                const step = document.getElementById(`step${i}`);
                const line = document.getElementById(`line${i}`);
                step.classList.remove('completed');
                if (line) line.classList.remove('completed');
            }
            
            goToLayer(1);
            initChat();
        }

        // Chat Message Helpers
        function addBotMessage(text) {
            const messagesDiv = document.getElementById('chatMessages');
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.textContent = text;
            messagesDiv.appendChild(msgDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function addUserMessage(text) {
            const messagesDiv = document.getElementById('chatMessages');
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message user';
            msgDiv.textContent = text;
            messagesDiv.appendChild(msgDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // Emergency Panel
        function showEmergencyPanel() {
            document.getElementById('emergencyPanel').classList.remove('hidden');
        }

        function hideEmergencyPanel() {
            document.getElementById('emergencyPanel').classList.add('hidden');
        }