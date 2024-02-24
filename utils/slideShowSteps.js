const gridSteps = document.querySelector('.grid-steps');
const steps = document.querySelectorAll('.grid-steps__step');
const prevButton = document.querySelector('.slider-controls__button_type_prev');
const nextButton = document.querySelector('.slider-controls__button_type_next');
let currentSlideIndex = 0;
let cachedSlides = calculateSlides();

function showCurrentSlide() {
  const slides = cachedSlides;
  steps.forEach((step) => {
    step.style.visibility = 'hidden';
    step.style.position = 'absolute';
  })
  slides[currentSlideIndex].forEach((step) => {
    step.style.visibility = 'visible';
    step.style.position = 'relative';
  })
}


nextButton.addEventListener('click', () => {
  console.log('click next');
  if (currentSlideIndex < cachedSlides.length - 1) {
    currentSlideIndex++;
    showCurrentSlide();
  }
})

prevButton.addEventListener('click', () => {
  console.log('click prev');
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showCurrentSlide();
  }
})

showCurrentSlide();

function calculateSlides() {
  const gridStepsStyles = window.getComputedStyle(gridSteps);
  const gridStepsPaddingTop = parseInt(gridStepsStyles.paddingTop, 10);
  const gridStepsPaddingBottom = parseInt(gridStepsStyles.paddingBottom, 10);
  const containerHeight = gridSteps.offsetHeight - gridStepsPaddingBottom - gridStepsPaddingTop;

  const slides = [];
  let currentSlide = [];

  let totalHeight = 0;

  steps.forEach((step) => {
    const stepHeight = step.offsetHeight;
    if (stepHeight > containerHeight / 2) {
      if (totalHeight > 0) {
        slides.push(currentSlide);
        currentSlide = [];
        totalHeight = 0;
      }
      slides.push([step]);
    } else if (totalHeight + stepHeight > containerHeight) {
      slides.push(currentSlide);
      currentSlide = [step];
      totalHeight = stepHeight;
    } else {
      currentSlide.push(step);
      totalHeight += stepHeight;
    }
  });

  if (currentSlide.length > 0) {
    slides.push(currentSlide);
  }

  return slides;
}

function addIndicators() {
  const indicatorContainer = document.querySelector('.slider-controls__buttons-container');
  const slides = cachedSlides;
  indicatorContainer.innerHTML = '';

  for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement('button');
    indicator.classList.add('slider-controls__circle-button');
    indicator.addEventListener('click', () => {
      console.log(`click indicator ${i}`);
    })
    indicatorContainer.appendChild(indicator);
  }
}

addIndicators();
window.addEventListener('resize', showCurrentSlide);

