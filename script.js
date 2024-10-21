// Button click interaction
document.getElementById("exploreBtn").addEventListener("click", function () {
  const modal = document.getElementById("myModal");
//   modal.style.display = "block";
  document
    .getElementById("interactiveSection")
    .scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".navbar a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
});

// Close modal when clicking the close button
document.querySelector(".close").addEventListener("click", function () {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
});

// Close modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Pumpkin hover interaction
const pumpkins = document.querySelectorAll(".pumpkin");

pumpkins.forEach((pumpkin) => {
  pumpkin.addEventListener("mouseover", function () {
    const surprise = this.getAttribute("data-surprise");
    this.textContent = surprise;
  });

  pumpkin.addEventListener("mouseout", function () {
    this.textContent = "🎃";
  });
});

pumpkins.forEach((pumpkin) => {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  document.body.appendChild(tooltip);

  pumpkin.addEventListener("mouseover", function (e) {
    const surprise = this.getAttribute("data-surprise");
    tooltip.textContent = surprise;
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY - 30}px`;
    tooltip.style.display = "block";
  });

  pumpkin.addEventListener("mousemove", function (e) {
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY - 30}px`;
  });

  pumpkin.addEventListener("mouseout", function () {
    tooltip.style.display = "none";
  });
});

//Saves the sent data in a google sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzhLT3gou5VKNVUdgqt_0GqPYkQl5U7HH1T1DeI0Ojs-ns5TDlTXEpS9-e9Kx4zq6XRHA/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Show the message immediately
  msg.innerHTML = "Submitting...";

  // Proceed with form submission via fetch
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully :)";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 2000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
