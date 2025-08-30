const audio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volume = document.getElementById('volume');
const fileInput = document.getElementById('fileInput');
const photo = document.getElementById('photo');

// Volume awal
audio.volume = parseFloat(volume.value);

// Autoplay (kalau browser izinkan)
window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(() => console.log("Autoplay diblokir"));
});

// Unlock audio saat interaksi user
function unlockAudio() {
  audio.play().catch(()=>{});
  window.removeEventListener('click', unlockAudio);
  window.removeEventListener('touchstart', unlockAudio);
}
window.addEventListener('click', unlockAudio);
window.addEventListener('touchstart', unlockAudio);

// Tombol kontrol
playBtn.addEventListener('click', ()=> audio.play());
pauseBtn.addEventListener('click', ()=> audio.pause());
volume.addEventListener('input', ()=> audio.volume = parseFloat(volume.value));

// Upload foto
fileInput.addEventListener('change', (ev)=>{
  const f = ev.target.files[0];
  if(f) photo.src = URL.createObjectURL(f);
});

// Confetti
(function confetti(){
  const c = document.getElementById('confetti');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
  const pieces = [];
  function rand(min,max){ return Math.random()*(max-min)+min }
  for(let i=0;i<120;i++){
    pieces.push({x:rand(0,W),y:rand(-H,0),r:rand(6,12),d:rand(2,6),
      s:rand(2,6),c:`hsl(${~~rand(0,360)},80%,60%)`,rot:rand(0,360)});
  }
  window.addEventListener('resize', ()=>{
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  });
  function step(){
    ctx.clearRect(0,0,W,H);
    for(const p of pieces){
      p.y += p.s;
      p.x += Math.sin(p.d + Date.now()/600)*1.5;
      p.rot += 5;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.6);
      ctx.restore();
      if(p.y>H+20){ p.y=-20; p.x=rand(0,W); }
    }
    requestAnimationFrame(step);
  }
  step();
})();
