const canvas = document.getElementById("oyun");
const ctx = canvas.getContext("2d");

let balonlar = [];
let skor = 0;

function yeniBalon() {
  balonlar.push({
    x: Math.random() * 350 + 20,
    y: 500,
    r: 20 + Math.random() * 15,
    renk: `hsl(${Math.random() * 360}, 80%, 60%)`,
    hiz: 1 + Math.random() * 2
  });
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  for (let i = 0; i < balonlar.length; i++) {
    let b = balonlar[i];
    let dx = x - b.x, dy = y - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.r) {
      balonlar.splice(i, 1);
      skor++;
      break;
    }
  }
});

function hareket() {
  for (let b of balonlar) b.y -= b.hiz;
  balonlar = balonlar.filter(b => b.y + b.r > 0);
  if (Math.random() < 0.05) yeniBalon();
}

function ciz() {
  ctx.clearRect(0, 0, 400, 500);
  for (let b of balonlar) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.renk;
    ctx.fill();
  }
  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText("Skor: " + skor, 10, 20);
}

function oyunDongu() {
  hareket();
  ciz();
  requestAnimationFrame(oyunDongu);
}

oyunDongu();
