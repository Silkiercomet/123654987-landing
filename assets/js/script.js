
const scrollElement = document.getElementById("landing__counter");
const heroShow = document.querySelector(".hero__article");
let countFlag = false;
let heroFlag = true;

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const handleScrollAnimation = () => {
  if (elementInView(scrollElement, 1.25) && countFlag === false) {
    countFlag = true;
    animateValue(scrollElement, 0, 400000, 5000);
  }
};

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

window.addEventListener("scroll", () => {
  if(heroFlag && window.screen.width > 700){
      heroFlag = false
      heroShow.classList.add("shownow")
  }
  handleScrollAnimation();
});
