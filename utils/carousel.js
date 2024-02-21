const prevButton = document.querySelector('.participants__prev-btn');
const nextButton = document.querySelector('.participants__next-btn');
const participantsList = document.querySelector('.participants__list');
const participants = document.querySelectorAll('.participant');
const participantsLength = participants.length;
const participant = document.querySelector('.participant');
const currentParticipants = document.querySelector('.participants__current-items');
const countParticipants = document.querySelector('.participants__count-items');

let currentIndex = 0;


countParticipants.textContent = `${participantsLength}`;

updateButtonState();
updateIndicator(currentIndex, calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth), participants.length);


nextButton.addEventListener('click', () => {
  const visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  currentIndex += visibleItems;
  currentIndex = Math.min(currentIndex, participantsLength - visibleItems);
  const offset = currentIndex * (participant.offsetWidth + (window.innerWidth > 1350 ? 20 : 0));
  participantsList.style.transform = `translateX(-${offset}px)`;
  updateButtonState();
  updateIndicator(currentIndex, calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth), participants.length);
});

prevButton.addEventListener('click', () => {
  const visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  currentIndex -= visibleItems;
  currentIndex = Math.min(currentIndex, participantsLength - visibleItems);
  const offset = currentIndex * (participant.offsetWidth + (window.innerWidth > 1350 ? 20 : 0));
  participantsList.style.transform = `translateX(-${offset}px)`;
  updateButtonState();
  updateIndicator(currentIndex, calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth), participants.length);

})

function calculateVisibleParticipants(containerWidth, itemWidth) {
  const windowWidth = window.innerWidth;
  let gap = 0;

  if (windowWidth > 1350) {
    gap = 20;
  }

  const totalItemWidth = itemWidth + gap * (participantsLength - 1);
  const tolerance = 0.05;
  const exactCount = containerWidth / itemWidth;
  const roundedCount = Math.floor(exactCount);

  const fraction = exactCount - roundedCount;

  if (1 - fraction <= tolerance) {
    return roundedCount + 1;
  } else {
    return roundedCount;
  }
}

function updateIndicator(currentIndex, visibleItemsCount, totalItemsCount) {
  const endIndex = Math.min(currentIndex + visibleItemsCount, totalItemsCount);
  currentParticipants.textContent = `${endIndex}`;
}

function updateButtonState() {
  const visibleItemsCount = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  prevButton.disabled = currentIndex <= 0;
  nextButton.disabled = currentIndex >= participantsLength - visibleItemsCount;
}

window.addEventListener('resize', () => {
  const visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  currentParticipants.textContent = `${visibleItems}`;

  const maxIndex = participantsLength - visibleItems;
  if (currentIndex > maxIndex) {
    currentIndex = Math.max(0, maxIndex);
  }

  const gap = window.innerWidth > 1350 ? 20 : 0;
  const offset = currentIndex * (participant.offsetWidth + gap);
  participantsList.style.transform = `translateX(-${offset}px)`;

  updateButtonState();
  updateIndicator(currentIndex, visibleItems, participants.length);
});
