// script.js

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = JSON.parse(localStorage.getItem('events')) || [];

const monthDisplay = document.getElementById('monthDisplay');
const calendar = document.getElementById('calendar');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const modalBackDrop = document.getElementById('modalBackDrop');
const newEventModal = document.getElementById('newEventModal');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventDateInput = document.getElementById('eventDateInput');

const deleteEventModal = document.getElementById('deleteEventModal');
const deleteButton = document.getElementById('deleteButton');
const closeButton = document.getElementById('closeButton');
const eventText = document.getElementById('eventText');

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function loadCalendar(month, year) {
  calendar.innerHTML = '';
  monthDisplay.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('empty-cell');
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = day;
    calendar.appendChild(dayCell);

    const eventsForDay = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    eventsForDay.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event');
      eventDiv.textContent = event.title;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => openDeleteEventModal(event));

      eventDiv.appendChild(deleteButton);
      dayCell.appendChild(eventDiv);
    });

    dayCell.addEventListener('click', () => openNewEventModal(day, month, year));
  }
}

function openNewEventModal(day, month, year) {
  newEventModal.style.display = 'block';
  modalBackDrop.style.display = 'block';
  eventDateInput.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function closeModals() {
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  modalBackDrop.style.display = 'none';
}

function saveEvent() {
  const eventTitle = eventTitleInput.value;
  const eventDate = eventDateInput.value;

  if (!eventTitle || !eventDate) {
    alert("Please provide both event title and date");
    return;
  }

  events.push({ title: eventTitle, date: eventDate });
  localStorage.setItem('events', JSON.stringify(events));
  closeModals();
  loadCalendar(currentMonth, currentYear);
}

function openDeleteEventModal(event) {
  deleteEventModal.style.display = 'block';
  modalBackDrop.style.display = 'block';
  eventText.textContent = event.title;

  deleteButton.onclick = () => deleteEvent(event);
}

function deleteEvent(event) {
  events = events.filter(e => e !== event);
  localStorage.setItem('events', JSON.stringify(events));
  closeModals();
  loadCalendar(currentMonth, currentYear);
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

saveButton.addEventListener('click', saveEvent);
cancelButton.addEventListener('click', closeModals);
modalBackDrop.addEventListener('click', closeModals);
closeButton.addEventListener('click', closeModals);

loadCalendar(currentMonth, currentYear);
