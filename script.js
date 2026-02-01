const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Hey";

document.getElementById("question").innerText =
  `${name}, will you be my Valentine? 💖`;

/* Visitor count */
fetch("https://api.countapi.xyz/hit/valentine-prank/visits")
  .then(res => res.json())
  .then(data => {
    document.getElementById("visitorCount").innerText =
      `👀 ${data.value} people visited`;
  });

/* YES count load */
fetch("https://api.countapi.xyz/get/valentine-prank/yes")
  .then(res => res.json())
  .then(data => {
    document.getElementById("yesCount").innerText =
      `💘 ${data.value || 0} people said YES`;
  });

function moveNo() {
  const no = document.getElementById("no");

  const btnWidth = no.offsetWidth;
  const btnHeight = no.offsetHeight;

  // Use visual viewport if available (zoom-aware)
  const vw = window.visualViewport
    ? window.visualViewport.width
    : window.innerWidth;

  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  // Safe movement zone (center area only)
  const padding = 20;
  const centerX = vw / 2;
  const centerY = vh * 0.6;  

  const rangeX = vw * 0.25; // only 25% left/right
  const rangeY = vh * 0.12; // very small up/down

  const minX = centerX - rangeX;
  const maxX = centerX + rangeX - btnWidth;

  const minY = centerY - rangeY;
  const maxY = centerY + rangeY - btnHeight;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  no.style.left = `${x}px`;
  no.style.top = `${y}px`;
}



function yesClick() {
  fetch("https://api.countapi.xyz/hit/valentine-prank/yes");

  document.getElementById("mainBox").innerHTML = `
    <div class="card">
      <h1>
        Awww 🥰<br>
        That “YES” means a lot 💖<br>
        Thank you for accepting 🌹 <br>  
		Oops… looks like you’re my Valentine now 😂✨
      </h1>
    </div>
  `;

  document.getElementById("bottomBar").style.display = "block";
}

/* Floating hearts */
/* Floating hearts + roses background */
setInterval(() => {
  const el = document.createElement("div");
  el.className = "floating";

  // Random heart or rose
  el.innerText = Math.random() > 0.5 ? "💖" : "🌹";

  // Random horizontal position
  el.style.left = Math.random() * 100 + "vw";

  // Random animation duration (slow & smooth)
  el.style.animationDuration = 6 + Math.random() * 4 + "s";

  // Random size
  el.style.fontSize = 14 + Math.random() * 12 + "px";

  document.body.appendChild(el);

  // Remove after animation
  setTimeout(() => {
    el.remove();
  }, 10000);
}, 400);
const noBtn = document.getElementById("no");

if (noBtn) {
  // Desktop hover
  noBtn.addEventListener("mouseenter", moveNo);

  // Mobile touch → move but NEVER click
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNo();
  });
}
