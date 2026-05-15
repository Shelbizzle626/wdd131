
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");

    
    if (nav.classList.contains("open")) {
        hamburger.textContent = "✕";
    } else {
        hamburger.textContent = "☰";
    }
});