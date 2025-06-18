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

  chartWeight.data.labels.push("");
  chartWeight.data.datasets[0].data.push(json.weight);

  chartTemp.update();
  chartWeight.update();
}

const chartTemp = new Chart(document.getElementById('chartTemp'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Температура внутри', borderColor: 'red', data: [], fill: false },
      { label: 'Температура снаружи', borderColor: 'blue', data: [], fill: false }
    ]
  },
  options: { responsive: true }
});

const chartWeight = new Chart(document.getElementById('chartWeight'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Вес', borderColor: 'green', data: [], fill: false }
    ]
  },
  options: { responsive: true }
});

setInterval(fetchData, 5000);
fetchData();