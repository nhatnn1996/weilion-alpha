let blinkTextMenuLinks = document.querySelectorAll(".blink-text-menu li a");
blinkTextMenuLinks.forEach((link) => {
  let letters = link.textContent.split("");
  link.textContent = "";
  letters.forEach((letter, i) => {
    i += 1;
    let span = document.createElement("span");
    let delay = i / 20;
    if (i % 2 === 0) {
      delay -= 0.1;
    } else {
      delay += 0.05;
    }
    let letterOut = document.createElement("span");
    letterOut.textContent = letter;
    letterOut.style.transitionDelay = `${delay}s`;
    letterOut.classList.add("out");
    span.append(letterOut);
    let letterIn = document.createElement("span");
    letterIn.textContent = letter;
    letterIn.style.transitionDelay = `${delay}s`;
    letterIn.classList.add("in");
    span.append(letterIn);
    link.append(span);
  });
});

const content_astronaut = document.getElementById("background-video_concept");

if (content_astronaut) {
  content_astronaut.volume = 0;
  content_astronaut.play();
}

// handle typer

var sourceCode = "";
var sourceContainer, sourceElement, accessMessageElement;

var startIndex = 0;
var endIndex = 0;
var cursorChar = "|";

var locked = false;

const CHARS_PER_STROKE = 1;
const load_source_code = () => {
  var client = new XMLHttpRequest();
  client.open("GET", "./code.txt");
  client.onreadystatechange = function () {
    sourceCode = client.responseText;
  };
  client.send();
};

const getElements = () => {
  sourceContainer = document.getElementById("container");
  sourceElement = document.getElementById("source");
  accessMessageElement = document.getElementById("access-msg");
};

const update_screen = () => {
  if (!locked) {
    endIndex += CHARS_PER_STROKE;
    sourceElement.textContent = sourceCode.substring(startIndex, endIndex);

    //scroll position
    // window.scrollTo(0, sourceContainer.scrollHeight);
    // update_cursor
    sourceElement.textContent += cursorChar;
    // console.log(sourceElement.textContent);
    // update access message
  }
};

function update_cursor() {
  var text = sourceElement.textContent;
  // var lastChar = text.charAt(text.length - 1);
  // console.log(lastChar, cursorChar);
  // if (lastChar === cursorChar) {
  //     sourceElement.textContent = text.substring(0, text.length - 1);
  // }
  // else {
  sourceElement.textContent += cursorChar;
  // }
}

const remove_message = () => {
  locked = false;
  accessMessageElement.removeAttribute("class");
  sourceContainer.removeAttribute("class");
};

const init = () => {
  load_source_code();
  getElements();
  window.setTimeout(update_cursor, 500);
};

init();

window.onkeydown = (e) => {
  if (e.key === "Escape") remove_message();
  else update_screen();
};

window.onload = () => {
  setInterval(() => {
    update_screen();
  }, 100);

  $(".item-wrap").hover(hoverVideo, hideVideo);

  function hoverVideo(e) {
    const element = e.currentTarget || e.target;
    const video = $(element).find("video");
    video.get(0).currentTime = 0;
    video.get(0).play();
  }

  function hideVideo(e) {
    const element = e.currentTarget || e.target;
    const video = $(element).find("video");
    video.get(0).pause();
  }

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // const video = $("#background-video");
  // video.play();

  const $$$ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const btn = $$$("#btn-music");
  let isActive = false;

  btn.onclick = function () {
    isActive = !isActive;

    if (isActive) {
      $$(".music-waves span").forEach((span) => {
        span.classList.add("disabled");
      });

      $("#audio").get(0).pause();
    } else {
      $$(".music-waves span.disabled").forEach((span) => {
        span.classList.remove("disabled");
      });
      $("#audio").get(0).play();
    }
  };

  const btnMobile = $$$("#btn-music-mobile");
  btnMobile.onclick = function () {
    isActive = !isActive;

    if (isActive) {
      $$(".music-waves span").forEach((span) => {
        span.classList.add("disabled");
      });

      $("#audio").get(0).pause();
    } else {
      $$(".music-waves span.disabled").forEach((span) => {
        span.classList.remove("disabled");
      });
      $("#audio").get(0).play();
    }
  };
};
