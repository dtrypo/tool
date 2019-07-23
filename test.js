var data = [];
var labels = [];


function formSub() {
    var skill = document.getElementById('skill').value;
    var location = document.getElementById('location').value;
    console.log(skill);
    console.log(location);

    function getStats() {
        fetch(`https://we9eqn7xfi.execute-api.eu-west-1.amazonaws.com/default/emp_stats?skill_id=${skill}&location_id=${location}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (stats) {
                console.log(stats);
                if (!stats.found_js_pop) {
                    document.getElementById("message").innerHTML = "Δεν υπάρχουν αρκετά στοιχεία για αυτή την περιοχή σας δείχνουμε στατιστικά για το πλήθος των στοιχείων που έχουμε.";
                    labels = stats.age_dist.labels;
                    data = stats.age_dist.values;
                    x = stats.xp_dist.labels;
                    y = stats.xp_dist.values;
                    charts();
                    chart2();
                } else {
                    document.getElementById("message").innerHTML = "";
                    labels = stats.age_dist.labels;
                    data = stats.age_dist.values;
                    x = stats.xp_dist.labels;
                    y = stats.xp_dist.values;
                    charts();
                    chart2();
                }
            })
    }

    getStats();


    function charts() {
        var ctx = document.getElementById('myChart').getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ηλικίες',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function chart2() {
        var ctx = document.getElementById('myChart2').getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: x,
                datasets: [{
                    label: 'Χρόνια προυπηρεσίας',
                    data: y,
                    backgroundColor: [
                        'rgba(25, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(25, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

