// ------------------------------------------------------
// This script handles the typing effect for the role header on the main page
// ------------------------------------------------------
const roles = [
    "Web Developer ",
    "Software Engineer ",
    "Ethical Hacker ",
    "Cybersecurity Researcher ",
    "Open Source Contributor ",
    "Tech Enthusiast ",
    "Fighting Autism ",
    "Lifelong Learner "
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;
const typeSpeed = 100;
const eraseSpeed = 50;
const delayBetweenRoles = 2000;
const roleElement = document.getElementById("mft-role-header");

function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        roleElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typeSpeed);
    } else {
        typing = false;
        setTimeout(eraseRole, delayBetweenRoles);
    }
}

function eraseRole() {
    if (charIndex > 0) {
        roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, eraseSpeed);
    } else {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, typeSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    roleElement.textContent = "";
    typeRole();
});

// ----------------------------------------------------------
// This script adds a mouse cursor spinner effect on the main page
// ----------------------------------------------------------
const spinnerFrames = ['/', '|', '\\', '-'];
    const trailDuration = 1000; // ms
    const frameInterval = 80; // ms

    const interactiveDiv = document.querySelector('.mft-interactive');

    interactiveDiv.addEventListener('mousemove', (e) => {
      // Get mouse position relative to the div
      const rect = interactiveDiv.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSpinner(x, y);
    });

    function createSpinner(x, y) {
      const spinner = document.createElement('span');
      spinner.className = 'spinner';
      spinner.style.left = (x - 8) + 'px';
      spinner.style.top = (y - 12) + 'px';
      spinner.textContent = spinnerFrames[0];
      interactiveDiv.appendChild(spinner);

      let frame = 0;
      const spin = setInterval(() => {
        frame = (frame + 1) % spinnerFrames.length;
        spinner.textContent = spinnerFrames[frame];
      }, frameInterval);

      setTimeout(() => {
        spinner.style.opacity = 0;
        clearInterval(spin);
        setTimeout(() => spinner.remove(), 500);
      }, trailDuration);
    }

    document.addEventListener('DOMContentLoaded', () => {
    const interactive = document.querySelector('.mft-interactive');
    const colors = ['#ffbf00', '#0000FF', '#00FF00', '#FFFFFF'];
    let colorIndex = 0;

    interactive.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        document.documentElement.style.setProperty('--mft-terminal-proper', colors[colorIndex]);
    });
    });