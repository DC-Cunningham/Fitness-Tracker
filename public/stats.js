// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}
function populateChart(data) {
  console.log(data);
  console.log(new Date().setDate(new Date().getDate()));

  let durations = duration(data);
  let kgs = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let donut = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: getDayLabels(),
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: getDayLabels(),
      datasets: [
        {
          label: "Kilograms",
          data: kgs,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Kilograms Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercise breakdown by duration (mins)",
      },
    },
  });

  let donutChart = new Chart(donut, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: kgs,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercise breakdown by weight (kgs)",
      },
    },
  });
}

function duration(data) {
  let durations = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}

function getDayLabels() {
  var baseDate = new Date();
  var weekDays = [];
  for (i = 0; i < 7; i++) {
    weekDays.unshift(baseDate.toLocaleDateString("en-AU", { weekday: "long" }));
    baseDate.setDate(baseDate.getDate() - 1);
  }
  return weekDays;
}
