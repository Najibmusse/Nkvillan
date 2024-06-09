// main.js
const schedule = document.getElementById('weekly-table');

const currentDate = new Date();

const rows = schedule.getElementsByTagName('tr');

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const day = currentDate.getDay() + i - 1;
  const date = currentDate.getDate() + i - 1;
  const month = currentDate.getMonth() + 1;
  const formattedDate = `${date}/${month}`;

  row.cells[0].textContent = formattedDate;
}