const gridSteps = document.querySelector('.grid-steps');
const steps = document.querySelectorAll('.grid-steps__step');
const prevButton = document.querySelector('.slider-controls__button_type_prev');
const nextButton = document.querySelector('.slider-controls__button_type_next');
let currentSlideIndex = 0;
let cachedSlides = calculateSlides();

function updateActiveIndicators() {
  const indicators = document.querySelectorAll('.slider-controls__circle-button');

  indicators.forEach((indicator, index) => {
    if (index === currentSlideIndex) {
      indicator.classList.add('slider-controls__circle-button_active');
    } else {
      indicator.classList.remove('slider-controls__circle-button_active');
    }
  })
}

function addIndicators() {
  const indicatorContainer = document.querySelector('.slider-controls__buttons-container');
  const slides = cachedSlides;
  indicatorContainer.innerHTML = '';

  for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement('button');
    indicator.classList.add('slider-controls__circle-button');
    indicator.addEventListener('click', () => {
      currentSlideIndex = i;
      showCurrentSlide();
    })
    indicatorContainer.appendChild(indicator);
  }

  updateActiveIndicators();
}

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
  updateActiveIndicators();

  prevButton.disabled = currentSlideIndex === 0;
  nextButton.disabled = currentSlideIndex === slides.length - 1;
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
addIndicators();
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

function updateSlidesAndIndicators() {
  cachedSlides = calculateSlides();
  currentSlideIndex = Math.min(currentSlideIndex, cachedSlides.length - 1);
  addIndicators();
  showCurrentSlide();
}



window.addEventListener('resize', updateSlidesAndIndicators);

