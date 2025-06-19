async function fetchData() {
  const res = await fetch("/api/latest");
  const json = await res.json();

  document.getElementById("weight").textContent = json.weight?.toFixed(2) || "--";
  document.getElementById("tempIn").textContent = json.tempInside?.toFixed(2) || "--";
  document.getElementById("tempOut").textContent = json.tempOutside?.toFixed(2) || "--";
  document.getElementById("humidity").textContent = json.humidity?.toFixed(2) || "--";

  chartTemp.data.labels.push("");
  chartTemp.data.datasets[0].data.push(json.tempInside);
  chartTemp.data.datasets[1].data.push(json.tempOutside);
  chartTemp.update();

  chartWeight.data.labels.push("");
  chartWeight.data.datasets[0].data.push(json.weight);
  chartWeight.update();

// Получаем данные о влажности
  const humidityResponse = await fetch('/api/humidity');
  const humidityData = await humidityResponse.json();

  // Обновляем график влажности
  chartHumidity.data.labels = humidityData.labels;
  chartHumidity.data.datasets[0].data = humidityData.values;
  chartHumidity.update();
}

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
          labelString: 'Влажность (кг)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Дата/время'
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
          labelString: 'Вес (кг)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Дата/время'
        }
      }]
    }
  }
});

const chartHumidity = new Chart(document.getElementById('chartHumidity'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Влажность',
      borderColor: 'blue',
      data: [],
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Влажность (%)'
        },
        ticks: {
          min: 0,
          max: 100
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Дата/время'
        }
      }]
    }
  }
});

setInterval(fetchData, 5000);
fetchData();