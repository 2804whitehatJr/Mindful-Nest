 // ============================================
        // MOOD TRACKER
        // ============================================
        function logDailyMood(score) {
            const today = new Date().toISOString().split('T')[0];
            const moods = JSON.parse(localStorage.getItem('dailyMoods') || '{}');
            
            // Only log once per day
            moods[today] = score;
            localStorage.setItem('dailyMoods', JSON.stringify(moods));
            
            // Visual feedback
            document.querySelectorAll('#page-mood .mood-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
            event.target.closest('.mood-icon').classList.add('selected');
            
            // Update chart
            initMoodChart();
            
            alert('Mood logged for today!');
        }

        function initMoodChart() {
            const moods = JSON.parse(localStorage.getItem('dailyMoods') || '{}');
            const labels = [];
            const data = [];
            
            // Get last 14 days
            for (let i = 13; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                const displayDate = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
                
                labels.push(displayDate);
                data.push(moods[dateStr] || null);
            }
            
            const ctx = document.getElementById('moodChart');
            
            if (moodChart) {
                moodChart.destroy();
            }
            
            moodChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Mood Score',
                        data: data,
                        borderColor: '#D4845F',
                        backgroundColor: 'rgba(212, 132, 95, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#D4845F',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        spanGaps: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#1A2A4A',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            padding: 12,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 6,
                            ticks: {
                                stepSize: 1,
                                callback: function(value) {
                                    const labels = ['', 'Hard', 'Low', 'Okay', 'Good', 'Great'];
                                    return labels[value] || '';
                                },
                                color: '#5C5652'
                            },
                            grid: {
                                color: 'rgba(201, 184, 168, 0.3)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#5C5652'
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }