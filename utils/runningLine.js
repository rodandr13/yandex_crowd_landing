const runningLineContainers = document.querySelectorAll('.running-line__container');

runningLineContainers.forEach((container) => {
  const clonedContainer = container.cloneNode(true);
  const parentSection = container.parentElement;
  parentSection.appendChild(clonedContainer);
})
