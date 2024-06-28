// Check If There's Local Storage Color OPtion

let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class  From All Element
  document.querySelectorAll(".colors li").forEach((el) => {
    el.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (el.dataset.color === mainColors) {
      el.classList.add("active");
    }
  });
}

// Random background Option

let backgroundOption = true;

// Variable To Control Background The Interval

let backgroundInterval;

// Check If There's Local Storage Background Item
let backgroundLocalItem = localStorage.getItem("background-option");

// Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null) {
  // Remove Active Class  From All Element
  document.querySelectorAll(".random-background span").forEach((el) => {
    // Remove Active Class From All Elements
    el.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    // if (backgroundLocalItem === "true") {
    //   document.querySelector(".random-background .on").classList.add("active");
    // } else {
    //   document.querySelector(".random-background .off").classList.add("active");
    // }
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-background .on").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-background .off").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-setting i").onclick = function () {
  document.querySelector(".setting-box").classList.toggle("open");
  this.classList.toggle("fa-spin");
};

// Switch color

const colorLi = document.querySelectorAll(".colors li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color In Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color In Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    // Add Active Class To  Clicked Item & Remove From Others
    handelActive(e);
  });
});

// Switch Random background Option

const randomBgElement = document.querySelectorAll(".random-background span");

randomBgElement.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Add Active Class To  Clicked Item & Remove From Others
    handelActive(e);

    if (e.target.dataset.background === "on") {
      backgroundOption = true;
      randomImg();

      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Img
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Random Image

function randomImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNum = Math.floor(Math.random() * imgsArray.length);
      // Change background Image URL
      // console.log(randomNum);
      landingPage.style.backgroundImage =
        "url('images/" + imgsArray[randomNum] + "') ";
    }, 10000);
  }
}
randomImg();

// Skill Progress Bar

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skill Of Set Top
  let skillOfSetTop = ourSkills.offsetTop;
  // Skill Outer Height
  let skillOuter = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset || document.documentElement.scrollTop;
  // Calculate The Percentage From

  if (windowScrollTop >= skillOfSetTop + skillOuter - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }

  // console.log(skillOfSetTop + skillOuter - windowHeight);
};

// Create Popup With The Image

let ourGallery = document.querySelectorAll(".gallery .img-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class Name To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To page
    document.body.appendChild(overlay);
    // Create Popup Box Element
    let popupBox = document.createElement("div");

    // Add Class Name To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Class Name  For Heading
      imgHeading.className = "heading";

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To Heading
      imgHeading.appendChild(imgText);

      // Append  Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create Popup Image
    let popupImage = document.createElement("img");

    // Set Image Src
    popupImage.src = img.src;

    // Append  Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append Popup Box To Page
    document.body.appendChild(popupBox);

    // Create  Close Button
    let closeButton = document.createElement("i");

    // Create Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Add Text To Close Button
    // closeButton.appendChild(closeButtonText);

    // Add Class Name To Close Button
    // closeButton.className = "close-button fa-solid fa-xmark";
    closeButton.classList.add("close-button", "fa-solid", "fa-xmark");
    // closeButton.className = "close-button";

    // Add Close Button To Popup Box
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button fa-solid fa-xmark") {
    // Remove  The Popup Box
    // e.target.parentNode.remove();
    document.querySelector(".popup-box").remove();

    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Bullets

const allLinks = document.querySelectorAll(".header-area .links li a");

function ScrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

ScrollToSection(allBullets);
ScrollToSection(allLinks);

// Handel Active State

function handelActive(ev) {
  // Add Active Class To  Clicked Item & Remove From Others
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Show Bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .on").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .off").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (span.dataset.display == "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
  });
});

// Reset Button

document.querySelector(".reset-options").onclick = function () {
  // Clear LocalStorage

  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};

// Select Toggle Menu

let toggleMenu = document.querySelector(".header-area .toggle-menu");

let tLinks = document.querySelector(".header-area .links");

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  // Toggle Class menu-active To Toggle
  this.classList.toggle("menu-active");

  // Toggle Class open To Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleMenu.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
