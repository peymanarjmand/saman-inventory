const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');

const $ = id => document.getElementById(id);
const defaultGames = [
  'Astro Bot', 'Battlefield 6', 'Call Of Duty - Black Ops 7', 'Clair Obscur Expedition 33',
  'CTR', 'Crimson Desert', 'Elden Ring - Shadow Of The Erdtree', 'GTA V',
  'God Of War - Ragnarok', 'It Takes Two', 'Minecraft', 'Mortal Kombat 1', 'NBA 26',
  'NFS Heat', 'NFS Unbound', 'Pragmata', 'Red Dead Redemption II', 'Resident Evil - Requiem',
  'Rayman Legend', 'Sonic Frontiers', 'Spider-Man 2', 'Split Fiction', 'Starfield',
  'Tekken 8', 'The Last Of Us I & II', 'W2K 26'
];

let logoImage = new Image();
logoImage.crossOrigin = 'anonymous';
logoImage.src = 'assets/logo.jpeg';
logoImage.onload = renderPoster;

$('gamesInput').value = defaultGames.join('\n');

const persianDigits = value => String(value ?? '')
  .replace(/0/g, '۰').replace(/1/g, '۱').replace(/2/g, '۲').replace(/3/g, '۳').replace(/4/g, '۴')
  .replace(/5/g, '۵').replace(/6/g, '۶').replace(/7/g, '۷').replace(/8/g, '۸').replace(/9/g, '۹');

const englishDigits = value => String(value ?? '')
  .replace(/۰/g, '0').replace(/۱/g, '1').replace(/۲/g, '2').replace(/۳/g, '3').replace(/۴/g, '4')
  .replace(/۵/g, '5').replace(/۶/g, '6').replace(/۷/g, '7').replace(/۸/g, '8').replace(/۹/g, '9');

function fitText(text, maxWidth, fontSize, family = 'Tahoma, Arial') {
  let size = fontSize;
  do {
    ctx.font = `700 ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 1;
  } while (size > 16);
  return size;
}

function roundRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawGlowLine(x1, y1, x2, y2, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawBackground() {
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, '#071023');
  g.addColorStop(.48, '#0a132a');
  g.addColorStop(1, '#050814');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 90; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = `rgba(120, 155, 255, ${Math.random() * .12})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  ctx.strokeStyle = 'rgba(85, 128, 255, .13)';
  ctx.lineWidth = 1;
  for (let i = -200; i < 1200; i += 110) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 620, canvas.height);
    ctx.stroke();
  }

  const rg = ctx.createRadialGradient(430, 110, 30, 430, 110, 280);
  rg.addColorStop(0, 'rgba(45,183,255,.38)');
  rg.addColorStop(.5, 'rgba(148,60,255,.16)');
  rg.addColorStop(1, 'transparent');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, canvas.width, 420);
}

function drawLogo(cx, cy, radius) {
  ctx.save();
  ctx.shadowColor = '#26bfff';
  ctx.shadowBlur = 26;
  ctx.strokeStyle = '#26bfff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowColor = '#9f38ff';
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 14, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#fff';
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  if (logoImage.complete) {
    const s = Math.min(logoImage.width, logoImage.height);
    const sx = (logoImage.width - s) / 2;
    const sy = (logoImage.height - s) / 2;
    ctx.drawImage(logoImage, sx, sy, s, s, cx - radius, cy - radius, radius * 2, radius * 2);
  }
  ctx.restore();
}

function drawHeader() {
  drawLogo(432, 110, 70);

  const title = $('channelTitle').value.trim() || 'قیمت همکاری - سامان';
  const titleSize = fitText(title, 660, 58);
  ctx.font = `900 ${titleSize}px Tahoma, Arial`;
  ctx.textAlign = 'center';
  ctx.direction = 'rtl';
  const tg = ctx.createLinearGradient(180, 220, 680, 220);
  tg.addColorStop(0, '#7f35ff');
  tg.addColorStop(.45, '#ffffff');
  tg.addColorStop(1, '#21c2ff');
  ctx.fillStyle = tg;
  ctx.shadowColor = 'rgba(89, 112, 255, .35)';
  ctx.shadowBlur = 18;
  ctx.fillText(title, 432, 255);
  ctx.shadowBlur = 0;

  ctx.font = '700 28px Tahoma, Arial';
  ctx.fillStyle = '#6fb7ff';
  ctx.fillText($('subtitle').value.trim() || 'لیست موجودی', 432, 325);
  drawGlowLine(172, 326, 304, 326, '#21baff');
  drawGlowLine(560, 326, 692, 326, '#9c38ff');

  const y = persianDigits(englishDigits($('year').value).padStart(4, '0'));
  const m = persianDigits(englishDigits($('month').value).padStart(2, '0'));
  const d = persianDigits(englishDigits($('day').value).padStart(2, '0'));
  const date = `${y}/${m}/${d}`;

  ctx.save();
  ctx.shadowColor = '#6539ff';
  ctx.shadowBlur = 22;
  ctx.strokeStyle = '#963cff';
  ctx.fillStyle = 'rgba(9, 20, 45, .82)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(300, 372);
  ctx.lineTo(564, 372);
  ctx.lineTo(604, 406);
  ctx.lineTo(564, 440);
  ctx.lineTo(300, 440);
  ctx.lineTo(260, 406);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.font = '900 36px Tahoma, Arial';
  ctx.fillStyle = '#5dafff';
  ctx.fillText(date, 432, 418);
  ctx.restore();
}

function drawTable(games) {
  const x = 62, y = 458, w = 740;
  const rowH = Math.min(43, Math.max(28, Math.floor((1018 - 60) / Math.max(games.length, 1))));
  const headerH = 56;
  const h = headerH + rowH * games.length + 28;

  ctx.save();
  ctx.shadowColor = 'rgba(86, 171, 255, .55)';
  ctx.shadowBlur = 22;
  roundRect(x, y, w, h, 18);
  ctx.fillStyle = 'rgba(8, 17, 36, .86)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(188, 213, 255, .72)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  const headerGrad = ctx.createLinearGradient(x, y, x + w, y);
  headerGrad.addColorStop(0, 'rgba(32, 142, 255, .78)');
  headerGrad.addColorStop(1, 'rgba(158, 58, 255, .78)');
  roundRect(x + 18, y + 18, w - 36, headerH, 4);
  ctx.fillStyle = headerGrad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(179, 200, 255, .25)';
  ctx.beginPath();
  ctx.moveTo(x + 600, y + 18);
  ctx.lineTo(x + 600, y + h - 18);
  ctx.stroke();

  ctx.font = '900 24px Tahoma, Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.direction = 'rtl';
  ctx.fillText('ردیف', x + 670, y + 55);
  ctx.fillText('نام بازی', x + 335, y + 55);

  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  games.forEach((game, i) => {
    const ry = y + headerH + 18 + i * rowH;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.018)';
    ctx.fillRect(x + 18, ry, w - 36, rowH);

    ctx.fillStyle = '#4b68ff';
    ctx.beginPath();
    ctx.moveTo(x + 44, ry + rowH / 2 - 8);
    ctx.lineTo(x + 56, ry + rowH / 2);
    ctx.lineTo(x + 44, ry + rowH / 2 + 8);
    ctx.closePath();
    ctx.fill();

    ctx.font = `700 ${Math.min(23, Math.max(16, rowH - 15))}px Tahoma, Arial`;
    ctx.fillStyle = '#f7faff';
    const name = game.length > 41 ? game.slice(0, 38) + '...' : game;
    ctx.fillText(name, x + 75, ry + rowH / 2 + 8);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(persianDigits(i + 1), x + 670, ry + rowH / 2 + 8);
    ctx.textAlign = 'left';
  });

  ctx.restore();
}

function drawFooter() {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '700 20px Tahoma, Arial';
  ctx.fillStyle = 'rgba(124, 178, 255, .7)';
  ctx.fillText('🎮  🏆  ★', 432, 1500);
  ctx.restore();
}

function renderPoster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawHeader();
  const games = $('gamesInput').value.split('\n').map(v => v.trim()).filter(Boolean);
  drawTable(games);
  drawFooter();
}

function downloadPoster() {
  renderPoster();
  const link = document.createElement('a');
  link.download = `saman-inventory-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

['channelTitle', 'subtitle', 'year', 'month', 'day', 'gamesInput'].forEach(id => {
  $(id).addEventListener('input', renderPoster);
});

$('renderBtn').addEventListener('click', renderPoster);
$('downloadBtn').addEventListener('click', downloadPoster);
$('addSample').addEventListener('click', () => { $('gamesInput').value = defaultGames.join('\n'); renderPoster(); });
$('clearList').addEventListener('click', () => { $('gamesInput').value = ''; renderPoster(); });
$('logoUpload').addEventListener('change', event => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    logoImage = new Image();
    logoImage.onload = renderPoster;
    logoImage.src = reader.result;
    $('brandLogoPreview').src = reader.result;
  };
  reader.readAsDataURL(file);
});

renderPoster();
