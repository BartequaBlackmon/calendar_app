// script.js

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthDisplay = document.getElementById('monthDisplay');
const calendar = document.getElementById('calendar');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function loadCalendar(month, year) {
  calendar.innerHTML = '';
  monthDisplay.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add blank days for the first week
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty-cell');
    calendar.appendChild(emptyCell);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = day;
    calendar.appendChild(dayCell);

    // Add event listener for opening the new event modal
    dayCell.addEventListener('click', () => {
      openNewEventModal(day);
    });
  }
}

function openNewEventModal(day) {
  const newEventModal = document.getElementById('newEventModal');
  const modalBackDrop = document.getElementById('modalBackDrop');
  newEventModal.style.display = 'block';
  modalBackDrop.style.display = 'block';
  // Additional logic to handle event creation
}

function closeModals() {
  document.getElementById('newEventModal').style.display = 'none';
  document.getElementById('deleteEventModal').style.display = 'none';
  document.getElementById('modalBackDrop').style.display = 'none';
}

backButton.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  loadCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  loadCalendar(currentMonth, currentYear);
});

document.getElementById('cancelButton').addEventListener('click', closeModals);
document.getElementById('closeButton').addEventListener('click', closeModals);

loadCalendar(currentMonth, currentYear);
