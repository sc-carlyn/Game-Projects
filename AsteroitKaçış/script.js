const canvas = document.getElementById("oyun");
const ctx = canvas.getContext("2d");

let oyuncu = { x: 50, y: 180, w: 20, h: 20 };
let asteroitler = [];
let skor = 0;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && oyuncu.y > 0) oyuncu.y -= 20;
  if (e.key === "ArrowDown" && oyuncu.y < 380 - oyuncu.h) oyuncu.y += 20;
});

function yeniAsteroit() {
  asteroitler.push({
    x: 500,
    y: Math.random() * 380,
    w: 20,
    h: 20,
    hiz: 3 + Math.random() * 3
  });
}

function hareket() {
  for (let a of asteroitler) {
    a.x -= a.hiz;
  }
  asteroitler = asteroitler.filter(a => a.x + a.w > 0);
}

function ciz() {
  ctx.clearRect(0, 0, 500, 400);
  ctx.fillStyle = "lime";
  ctx.fillRect(oyuncu.x, oyuncu.y, oyuncu.w, oyuncu.h);

  ctx.fillStyle = "red";
  for (let a of asteroitler) {
    ctx.fillRect(a.x, a.y, a.w, a.h);
  }

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Skor: " + skor, 10, 20);
}

function carpisti(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function oyunDongu() {
  if (Math.random() < 0.03) yeniAsteroit();
  hareket();
  for (let a of asteroitler) {
    if (carpisti(oyuncu, a)) {
      alert("💥 Çarptın! Skor: " + skor);
      document.location.reload();
      return;
    }
  }
  skor++;
  ciz();
  requestAnimationFrame(oyunDongu);
}

oyunDongu();
