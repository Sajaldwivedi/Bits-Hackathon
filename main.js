// Page Navigation
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');

function navigateToPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageId);
    const selectedLink = document.querySelector(`[data-page="${pageId}"]`);
    
    if (selectedPage && selectedLink) {
        selectedPage.classList.add('active');
        selectedLink.classList.add('active');
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const pageId = link.getAttribute('data-page');
        navigateToPage(pageId);
    });
});

// Update time
function updateTime() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Initialize density chart
const ctx = document.getElementById('densityChart').getContext('2d');
const densityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['8:00', '10:00', '13:00', '16:00', '19:00'],
        datasets: [{
            label: 'Count',
            data: [200, 400, 500, 600, 400],
            borderColor: '#00ffcc',
            tension: 0.4,
            fill: false
        }, {
            label: 'Density',
            data: [0.2, 0.4, 0.6, 0.8, 0.5],
            borderColor: '#44bb44',
            tension: 0.4,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            }
        }
    }
});

// Initialize analytics chart
const analyticsCtx = document.getElementById('analyticsChart');
if (analyticsCtx) {
    const analyticsChart = new Chart(analyticsCtx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Weekly Visitors',
                data: [1500, 1800, 2200, 1900, 2500, 2800, 2000],
                borderColor: '#00ffcc',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

// Simulate real-time updates
function updateRandomData() {
    const newCount = Math.floor(Math.random() * 1000) + 2000;
    document.querySelector('.stat-value').textContent = newCount.toLocaleString();
    
    const newDensity = Math.floor(Math.random() * 30) + 50;
    const densityElements = document.querySelectorAll('.stat-value');
    densityElements[1].textContent = newDensity + '%';

    // Update chart data
    const newData = densityChart.data.datasets[0].data.slice(1);
    newData.push(Math.floor(Math.random() * 400) + 200);
    densityChart.data.datasets[0].data = newData;
    
    const newDensityData = densityChart.data.datasets[1].data.slice(1);
    newDensityData.push(Math.random() * 0.6 + 0.2);
    densityChart.data.datasets[1].data = newDensityData;
    
    densityChart.update();
}

setInterval(updateRandomData, 5000);

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
});

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Initialize progress ring animation
const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
const progress = 97;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference - (progress / 100) * circumference;