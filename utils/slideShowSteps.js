const gridSteps = document.querySelector('.grid-steps');
const steps = document.querySelectorAll('.grid-steps__step');

function slideShowSteps() {
  const gridStepsStyles = window.getComputedStyle(gridSteps);
  const gridStepsPaddingTop = parseInt(gridStepsStyles.paddingTop, 10);
  const gridStepsPaddingBottom = parseInt(gridStepsStyles.paddingBottom, 10);
  const gridStepsHeight = gridSteps.offsetHeight;
  const gridStepsHeightWithoutPadding = gridStepsHeight - gridStepsPaddingTop - gridStepsPaddingBottom;
  let sumStepsHeight = 0;
  let allStepsFit = true;

  steps.forEach((step) => {
    if (allStepsFit) {
      let currentHeight = step.offsetHeight;
      if (currentHeight + sumStepsHeight <= gridStepsHeightWithoutPadding) {
        sumStepsHeight += currentHeight;
        step.style.visibility = 'visible';
      } else {
        allStepsFit = false;
        step.style.visibility = 'hidden';
      }
    } else {
      step.style.visibility = 'hidden';
    }
  });
}

slideShowSteps();

function calculateSlidesCount() {
  const gridSteps = document.querySelector('.grid-steps');
  const steps = document.querySelectorAll('.grid-steps__step');
  const gridStepsStyles = window.getComputedStyle(gridSteps);
  const gridStepsPaddingTop = parseInt(gridStepsStyles.paddingTop, 10);
  const gridStepsPaddingBottom = parseInt(gridStepsStyles.paddingBottom, 10);
  const containerHeight = gridSteps.offsetHeight - gridStepsPaddingBottom - gridStepsPaddingTop;

  let totalHeight = 0;
  let slidesCount = 0;
  steps.forEach((step) => {
    const stepHeight = step.offsetHeight;
    if (stepHeight > containerHeight / 2) {
      if (totalHeight > 0) slidesCount++;
      slidesCount++;
      totalHeight = 0;
    } else if (totalHeight + stepHeight > containerHeight) {
      slidesCount++;
      totalHeight = stepHeight;
    } else {
      totalHeight += stepHeight;
    }
  });

  if (totalHeight > 0) {
    slidesCount++;
  }

  return slidesCount;
}

console.log('steps', steps.length);
console.log('calculateSlidesCount', calculateSlidesCount());

function addIndicators() {
  const indicatorContainer = document.querySelector('.slider-controls__buttons-container');
  const countSlides = calculateSlidesCount();
  indicatorContainer.innerHTML = '';

  for (let i = 0; i < countSlides; i++) {
    const indicator = document.createElement('button');
    indicator.classList.add('slider-controls__circle-button');
    indicator.addEventListener('click', () => {
      console.log(`click indicator ${i}`);
    })
    indicatorContainer.appendChild(indicator);
  }
}

addIndicators();
window.addEventListener('resize', slideShowSteps);

