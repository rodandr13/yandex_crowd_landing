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
nextButton.addEventListener('click', () => {
  currentIndex++;
  participantsList.style.transform = `translateX(-${currentIndex * participant.offsetWidth}px)`;
  updateButtonState();
  console.log(currentIndex)
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  participantsList.style.transform = `translateX(-${currentIndex * participant.offsetWidth}px)`;
  updateButtonState();
  console.log(currentIndex)
})

function calculateVisibleParticipants(containerWidth, itemWidth) {
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

function updateButtonState() {
  const visibleItemsCount = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  prevButton.disabled = currentIndex <= 0;
  nextButton.disabled = currentIndex >= participantsLength - visibleItemsCount;
}

window.addEventListener('resize', () => {
  const visibleItems = calculateVisibleParticipants(participantsList.offsetWidth, participant.offsetWidth);
  currentParticipants.textContent = `${visibleItems}`;
  updateButtonState();

  const newOffset = currentIndex * participant.offsetWidth;
  participantsList.style.transform = `translateX(-${newOffset}px)`;

  const maxIndex = participantsLength - visibleItems;
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
    participantsList.style.transform = `translateX(-${currentIndex * participant.offsetWidth}px)`;
  }
  updateButtonState();
});
