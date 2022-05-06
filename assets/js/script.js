
const scrollElement = document.getElementById("landing__counter");
const heroShow = document.querySelector(".hero__article");
const counterContainer = document.getElementById("counter");
let countFlag = false;
let heroFlag = true;

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const handleScrollAnimationCounter = () => {
  if (elementInView(scrollElement, 1.25) && countFlag === false) {
    counterContainer.classList.add("showcounter")
    countFlag = true;

    animateValue(scrollElement, 250000, 400000, 1800);
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
  }else if(document.body.getBoundingClientRect().top === 0 && heroFlag === false){
    heroFlag = true
    heroShow.classList.remove("shownow")
  }
  handleScrollAnimationCounter();
});
