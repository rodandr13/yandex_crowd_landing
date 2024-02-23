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

window.addEventListener('resize', slideShowSteps);

