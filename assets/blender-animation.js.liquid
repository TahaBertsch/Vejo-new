const html = document.querySelector('.sctn-block-1');
const canvas = document.querySelector('.blender-scroll-animation');
const context = canvas.getContext('2d');

const baseAsset = $('#blender-animation').data('animation-src');

const currentFrame = index => (
  baseAsset.replace('-1', '-' + index)
);

const frameCount = 91;

canvas.width = 1000;
canvas.height = 800;
const img = new Image();
img.src = currentFrame(1);
img.onload = function() {
  context.drawImage(img, 0, 150, 1000, 800, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 150, 1000, 800, 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {
  const elDistanceToTop = window.pageYOffset + html.getBoundingClientRect().top
  let scrollTop = $(window).scrollTop() - elDistanceToTop;
  if ($(window).width() > 640) {
    scrollTop = $(window).scrollTop() - elDistanceToTop + 200;
  }
  // duration
  const maxScrollTop = 250;
  const scrollFraction = (scrollTop / maxScrollTop);
  const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};