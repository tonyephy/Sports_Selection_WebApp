// Get the context of the canvas element you want to render the chart on
const ctx = document.getElementById('progressGraph').getContext('2d');

// Initialize the chart with some example data
const progressGraph = new Chart(ctx, {
    type: 'line', // Specify the type of chart
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels
        datasets: [{
            label: 'Progress in Selected Sport',
            data: [10, 20, 30, 40], // Y-axis data points (example values)
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            borderWidth: 2,
            fill: false // Do not fill under the line
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true // Start Y-axis at zero
            }
        }
    }
});
