async function fetchData() {
  const res = await fetch("/api/latest");
  const json = await res.json();
  if (json && json.weight && json.tempInside && json.tempOutside && json.humidity) {
    // Обновляем графики
    chartTemp.data.labels.push("");
    chartTemp.data.datasets[0].data.push(json.tempInside);
    chartTemp.data.datasets[1].data.push(json.tempOutside);
    chartTemp.update();

    chartWeight.data.labels.push("");
    chartWeight.data.datasets[0].data.push(json.weight);
    chartWeight.update();

    chartHumidity.data.labels.push("");
    chartHumidity.data.datasets[0].data.push(json.humidity);
    chartHumidity.update();
  } else {
    console.log("Нет данных");
  }
  setTimeout(fetchData, 5000);
}

// Конфигурация графиков
const chartTemp = new Chart(document.getElementById('chartTemp'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Температура внутри', borderColor: 'red', data: [], fill: false },
      { label: 'Температура снаружи', borderColor: 'yellow', data: [], fill: false }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Температура (°C)',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Дата/время',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }]
    }
  }
});

const chartWeight = new Chart(document.getElementById('chartWeight'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Вес', borderColor: 'green', data: [], fill: false }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Вес (кг)',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Дата/время',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }]
    }
  }
});

const chartHumidity = new Chart(document.getElementById('chartHumidity'), {  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Влажность', borderColor: 'blue', data: [], fill: false }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Влажность (%)',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }],
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'DD.MM.YYYY'
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Дата',
          fontSize: 14,
          fontStyle: 'bold'
        },
        ticks: {
          fontSize: 12
        }
      }]
    },
    zoom: {
      enabled: true,
      drag: true,
      mode: 'xy',
      rangeMin: { x: null, y: null },
      rangeMax: { x: null, y: null },
      speed: 0.1
    }
  }
});

fetchData();