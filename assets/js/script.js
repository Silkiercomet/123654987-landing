
const scrollElement = document.getElementById("landing__counter");
const heroShow = document.querySelector(".hero__article");
const counterContainer = document.getElementById("counter");
let timeOut = f => f;
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

    animateValue(scrollElement, 300000, 400000, 1200);
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
    clearTimeout(timeOut)
      heroFlag = false
      heroShow.classList.add("shownow")
  }else if(document.body.getBoundingClientRect().top === 0 && heroFlag === false){

    timeOut = setTimeout(()=> {
      heroShow.classList.remove("shownow")
    }, 7000)
  }else if(heroShow.getBoundingClientRect().bottom < 100){
    heroFlag = true
  }
  handleScrollAnimationCounter();
});
