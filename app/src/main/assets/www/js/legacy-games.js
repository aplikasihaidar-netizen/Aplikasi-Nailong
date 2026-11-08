const IMG="assets/img/img01-577c6ab4.jpg";
const $=id=>document.getElementById(id);
$("m1").src=IMG;$("m3").src=IMG;$("m4").src=IMG;$("m5").src=IMG;
let AC;function beep(f,d){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;o.type="triangle";g.gain.value=.12;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.stop(AC.currentTime+d)}catch(e){}}
try{const s=JSON.parse(localStorage.getItem("nl")||"{}");$("to").value=s.to||"";}catch(e){}
const words=["Hihi!","Ngakak!","Lidah~","Yeyyy Selamat Yaa Sayang","Gemes!","Auw!","Lagi!"];
let score,left,speed,loop,clock,n,best=0;
try{best=+localStorage.getItem("nlbest")||0}catch(e){}
function rnd(a,b){return a+Math.random()*(b-a)}
function place(el,w){const P=$("play");el.style.left=rnd(8,P.clientWidth-w-8)+"px";el.style.top=rnd(60,P.clientHeight-w-8)+"px"}
function flash(x,y,t){const f=document.createElement("div");f.className="fl";f.textContent=t;f.style.left=Math.max(4,Math.min(x,$("play").clientWidth-(t.length*11+10)))+"px";f.style.whiteSpace="nowrap";f.style.top=y+"px";$("play").appendChild(f);setTimeout(()=>f.remove(),900)}
function add(p){score+=p;$("sc").textContent=score+" ⭐"}
function start(){
 try{localStorage.setItem("nl",JSON.stringify({to:$("to").value,from:$("from").value,note:$("note").value}))}catch(e){}
 qn=0;score=0;left=30;speed=1000;add(0);$("tm").textContent=left;
 scr("play");
 const t=document.createElement("img");t.className="t";t.src=IMG;t.alt="Nailong";$("play").appendChild(t);place(t,92);
 t.onpointerdown=e=>{e.preventDefault();add(1);beep(500+Math.random()*500,.15);flash(t.offsetLeft,t.offsetTop,words[Math.floor(Math.random()*words.length)]);t.classList.remove("pop");void t.offsetWidth;t.classList.add("pop");place(t,92);speed=Math.max(450,speed-15);reset()};
 function hop(){place(t,92);if(Math.random()<.18)heart()}
 function reset(){clearInterval(loop);loop=setInterval(hop,speed)}
 function heart(){const h=document.createElement("div");h.className="h";h.textContent="💖";$("play").appendChild(h);place(h,58);h.onpointerdown=e=>{e.preventDefault();add(5);beep(880,.3);flash(h.offsetLeft,h.offsetTop,"+5 sayang!");h.remove()};setTimeout(()=>h.remove(),1500)}
 reset();
 clock=setInterval(()=>{left--;$("tm").textContent=left;if(left<=0){clearInterval(clock);clearInterval(loop);t.remove();document.querySelectorAll(".h,.fl").forEach(x=>x.remove());end()}},1000);
}
let qok=0,qn=0;
function quiz(B,K){
 const bank=B||ST;const _o=[
["Kalau Nailong lagi ngambek, cara bujuknya pakai apa?","Dikasih makanan enak","Dikasih tugas kuliah","Betul! Nailong langsung ngakak 🤣","Salah! Nailong pingsan sambil melet 😝"],
["Apa yang terjadi kalau Nailong disuruh diet?","Nangis sambil makan","Lari pagi 10 km","Betul! Nailong jujur banget 😭🍔","Bohong! Lari 3 langkah, langsung tidur 😴"],
["Siapa yang bilang 'sebentar lagi' padahal sudah sejam?","Kita semua, tanpa kecuali","Nailong, dia cuma bisa melet","Ketahuan! Hehehe 🤭","Nailong protes pakai lidah melet 😛"],
["Kenapa Nailong melet terus?","Lagi ngeledek sambil sayang","Lidahnya kebesaran, nggak muat","Tepat sekali! Muah 😘","Itu alasan versi Nailong yang lagi ngeles 🤣"],
["Kalau Nailong jadi presiden, kebijakan pertamanya?","Senin dihapus dari kalender","Wajib bangun subuh","Rakyat bersorak! 🎉","Nailong dilengserkan dalam 5 menit 😂"],
["Siapa yang paling susah bangun pagi?","Kita berdua, ngaku aja","Ayam tetangga","Kompak banget kita 😂","Ayam tetangga ngambek, mogok berkokok 🐔"],
["Tebak, Nailong lagi mikirin apa?","Camilan, camilan, camilan","Teori relativitas","Tepat! Otaknya 100% isi camilan 🍟","Nailong sendiri nggak ngerti teorinya 🤯"]
];
 const qs=pick(bank,K||"x");
 qok=0;qn=qs.length;let i=0;const g0=qgen;
 if(!qn){end();return}
 $("play").classList.add("hide");$("s4").classList.remove("hide");
 function show(){
  if(i>=qn){fin("Kuis selesai, #!","Jawaban benar "+qok+" dari "+qn+" · "+qok*10+" poin");return}
  const r=qs[i];$("qq").textContent=r[0];pz("m4",[9]);$("qi").textContent="Pertanyaan "+(i+1)+" dari "+qn;$("qf").textContent="";
  const box=$("qo");box.innerHTML="";
  const o=[[r[1],1],[r[2],0]];if(Math.random()<.5)o.reverse();
  o.forEach(([t,ok])=>{const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=()=>{
   box.querySelectorAll("button").forEach(x=>{x.disabled=true});
   if(ok){qok++;pz("m4",[1,2,4]);conf(14);beep(880,.3);$("qf").textContent=(r[3]||rr(RC))+" +10 💖"}else{pz("m4",[3,7,10]);beep(200,.3);$("qf").textContent=r[4]||rr(RW)}
   i++;setTimeout(()=>{if(g0==qgen)show()},2300)};box.appendChild(b)});
 }
 show();
}
function end(){
 const to=$("to").value.trim()||"Kamu",fr=$("from").value.trim();
 const nb=score>best;if(nb){best=score;try{localStorage.setItem("nlbest",best)}catch(e){}}
 $("big").textContent="HAHAHAHAHAHA";
 $("res").textContent="Skor "+score+" ⭐ · Rekor "+best+(nb?" (baru!)":"")+(qn?" · Kuis "+qok+"/"+qn:"");
 $("out").textContent="Yeyyy selamat cantik";
 scr("s3");beep(660,.4);
}
function scr(id){["s1","play","s3","s4","s5","s6","s7","s8"].forEach(x=>$(x).classList.toggle("hide",x!==id));if(id!="s6"){const cw=$("cw");if(cw)cw.remove();if(curR){try{curR.leave()}catch(e){}curR=null}}$("bk").classList.toggle("hide",["s1","s5","s8"].includes(id));if(id=="s3"){pz("m3",[1,2,4]);conf(40)}if(id=="s5"){$("hi2").textContent=$("kb").value.trim()?"Kabarmu: "+$("kb").value.trim()+" 💛":"Mau ngapain hari ini?";$("hi").textContent="Halo, "+nm()+"!";pz("m9",[1,2,4,5])}}
function fin(b,r){const to=$("to").value.trim()||"Kamu",fr=$("from").value.trim();$("big").textContent="HAHAHAHAHAHA";$("res").textContent=r;$("out").textContent="Yeyyy selamat cantik";scr("s3");beep(660,.4)}
let tm2;
function memory(){clearInterval(tm2);scr("s6");const g=$("gb"),T=$("gt");g.innerHTML="";g.style.cssText="display:grid;grid-template-columns:repeat(4,70px);gap:8px;justify-content:center";
 const em=["🍔","🍟","💖","🍰","🍦","🎈"],d=em.concat(em).sort(()=>Math.random()-.5);let a=null,lock=false,mv=0,ok=0;T.textContent="Pasang pasangannya! Langkah: 0";
 d.forEach(e=>{const c=document.createElement("div");c.className="cd";c.style.backgroundImage='url("'+IMG+'")';c.onclick=()=>{if(lock||c.dataset.o)return;c.dataset.o=1;c.style.backgroundImage="none";c.textContent=e;beep(500,.1);
  if(!a){a=c;return}
  mv++;T.textContent="Pasang pasangannya! Langkah: "+mv;
  if(a.textContent===e){a=null;ok++;beep(880,.2);if(ok==6)setTimeout(()=>fin("Pintar, #!","Semua kartu cocok dalam "+mv+" langkah"),600)}
  else{lock=true;const p=a;a=null;setTimeout(()=>{[p,c].forEach(x=>{x.textContent="";x.style.backgroundImage='url("'+IMG+'")';delete x.dataset.o});lock=false},700)}};g.appendChild(c)})}
function tickle(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");T.textContent="Gelitikin Nailong! Ketuk terus!";g.style.cssText="";
 g.innerHTML='<img id="tk" class="mascot" style="width:190px;height:190px;cursor:pointer" alt="Nailong"><div style="width:240px;height:18px;border:3px solid var(--acc);border-radius:99px;margin:14px auto 6px;overflow:hidden"><div id="tf" style="height:100%;width:0;background:var(--pink)"></div></div><div id="tx" style="font-weight:800;font-size:22px;min-height:30px"></div>';
 const k=$("tk");k.src=IMG;let p=0;
 k.onpointerdown=e=>{e.preventDefault();p=Math.min(100,p+7);$("tf").style.width=p+"%";$("tx").textContent=["Hihi!","HAHAHA!","Geli!","Ampun~","Wkwk!"][Math.floor(Math.random()*5)];k.classList.remove("sh");void k.offsetWidth;k.classList.add("sh");beep(400+p*8,.12);if(p>=100){clearInterval(tm2);setTimeout(()=>fin("Nailong ngakak, #!","Geli sampai guling-guling 🤣"),400)}};
 tm2=setInterval(()=>{const f=$("tf");if(!f){clearInterval(tm2);return}p=Math.max(0,p-2);f.style.width=p+"%"},200)}
function pagi(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="";
 g.innerHTML='<div id="pa" style="position:relative;width:min(340px,92vw);height:min(440px,62vh);border-radius:20px;overflow:hidden;background:linear-gradient(#ffd89a,#ffb1a1 60%,#ffe9a8);touch-action:none"><img id="pn" alt="Nailong" style="position:absolute;bottom:4px;left:40%;width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid var(--acc)"></div>';
 const A=$("pa"),N=$("pn");N.src=IMG;let sc=0,t=25,items=[],live=true,x=A.clientWidth/2;N.style.left=(x-32)+"px";
 function upd(){T.textContent="Geser Nailong, tangkap sarapan, hindari 💤 · "+sc+" ⭐ · "+t+"s"}
 function mv(e){const r=A.getBoundingClientRect();x=Math.max(32,Math.min(r.width-32,e.clientX-r.left));N.style.left=(x-32)+"px"}
 A.onpointermove=mv;A.onpointerdown=mv;
 const names=["🍳","🥐","☕","🍞","🥛"];
 const sp=setInterval(()=>{const el=document.createElement("div"),bad=Math.random()<.25;el.textContent=bad?"💤":names[Math.floor(Math.random()*5)];const L=rnd(4,A.clientWidth-44);el.style.cssText="position:absolute;font-size:34px;top:-40px;left:"+L+"px";A.appendChild(el);items.push({el,L,y:-40,bad,v:rnd(2.5,4.5)})},650);
 function stop(){live=false;clearInterval(sp);clearInterval(tm2)}
 function step(){if(!live||!$("pa")){stop();return}
  const H=A.clientHeight;
  items=items.filter(o=>{o.y+=o.v;o.el.style.top=o.y+"px";
   if(o.y>H-72&&o.y<H-10&&Math.abs(o.L+17-x)<44){o.el.remove();if(o.bad){sc=Math.max(0,sc-2);beep(200,.25)}else{sc++;beep(700+Math.random()*300,.12)}upd();return false}
   if(o.y>H){o.el.remove();return false}return true});
  requestAnimationFrame(step)}
 tm2=setInterval(()=>{t--;upd();if(t<=0){stop();setTimeout(()=>fin("Selamat pagi, #!","Sarapan tertangkap: "+sc+" 🍳"),200)}},1000);
 upd();requestAnimationFrame(step)}
let prog=[];try{prog=JSON.parse(localStorage.getItem("nlp")||"[]")}catch(e){}
function saveP(){try{localStorage.setItem("nlp",JSON.stringify(prog))}catch(e){}}
const WN=["Pagi","Siang","Sore","Malam"],WB=["#ffd89a,#ffe9a8","#bfe6ff,#c9f0b0","#ff9a76,#ffd1a1","#1b2a52,#3a4a7a"];
function sum(){return prog.reduce((a,b)=>a+(b||0),0)}
function map(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");T.textContent="Peta Petualangan · "+sum()+" ⭐";g.style.cssText="max-width:340px";g.innerHTML="";
 for(let w=0;w<4;w++){const h=document.createElement("div");h.textContent="Dunia "+(w+1)+": "+WN[w];h.style.cssText="font-weight:800;margin:8px 0 4px";g.appendChild(h);const row=document.createElement("div");row.style.cssText="display:flex;gap:6px;justify-content:center";
  for(let i=0;i<5;i++){const l=w*5+i,b=document.createElement("button"),s=prog[l]||0,open=l==0||prog[l-1]>0;b.className="cd";b.style.cssText="width:56px;height:56px;font-size:16px;flex-direction:column;line-height:1.1;opacity:"+(open?1:.45);b.innerHTML=(open?(l+1):"🔒")+"<small>"+"⭐".repeat(s)+"</small>";b.onclick=()=>{if(open)lv(l)};row.appendChild(b)}
  g.appendChild(row)}
 const m=document.createElement("button");m.className="opt";m.textContent="Kembali ke menu";m.onclick=()=>scr("s5");g.appendChild(m)}
function lv(l){clearInterval(tm2);scr("s6");const w=Math.floor(l/5),goal=10+l*2,time=25+w*3,n=1+Math.floor(l/6),dc=l<3?0:1+Math.floor((l-3)/6),sp=Math.max(520,1150-l*30);
 const T=$("gt"),g=$("gb");g.style.cssText="";
 g.innerHTML='<div id="pa" style="position:relative;width:min(340px,92vw);height:min(440px,62vh);border-radius:20px;overflow:hidden;touch-action:none;background:linear-gradient('+WB[w]+')"></div>';
 const A=$("pa");let sc=0,t=time,live=true;
 function upd(){T.textContent="Level "+(l+1)+" · Target "+goal+" · "+sc+" ⭐ · "+t+"s"}
 function put(el){el.style.left=rnd(4,A.clientWidth-84)+"px";el.style.top=rnd(4,A.clientHeight-84)+"px"}
 function mk(k){const el=document.createElement(k=="n"?"img":"div");el.className="t";
  if(k=="n"){el.src=IMG;el.alt="Nailong";el.style.cssText="width:76px;height:76px"}else{el.textContent=k=="d"?"🍅":"💖";el.style.cssText="width:76px;height:76px;font-size:54px;border:0;background:none;line-height:76px;text-align:center"}
  put(el);A.appendChild(el);
  el.onpointerdown=e=>{e.preventDefault();if(!live)return;
   if(k=="h"){sc+=3;beep(900,.25);el.remove();upd();return}
   if(k=="n"){sc++;beep(500+Math.random()*500,.12)}else{sc=Math.max(0,sc-2);beep(180,.25)}
   el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");put(el);upd()};
  return el}
 const els=[];for(let i=0;i<n;i++)els.push(mk("n"));for(let i=0;i<dc;i++)els.push(mk("d"));
 const hp=setInterval(()=>{if(!live||!$("pa")){clearInterval(hp);return}els.forEach(put);if(Math.random()<.15){const h=mk("h");setTimeout(()=>h.remove(),1500)}},sp);
 function btn(txt,f){const b=document.createElement("button");b.className="opt";b.textContent=txt;b.onclick=f;g.appendChild(b)}
 function done(){const st=sc>=goal*1.5?3:sc>=goal*1.25?2:sc>=goal?1:0;
  if(st>(prog[l]||0)){prog[l]=st;saveP()}
  g.innerHTML="";g.style.cssText="max-width:320px";
  T.textContent=st?"Level "+(l+1)+" selesai! "+"⭐".repeat(st):"Belum berhasil...";
  const m=document.createElement("div");m.className="msg";m.textContent=st?["Mantap! Nailong senang 🥰","Keren banget! 🤩","Sempurna! Nailong joget 🕺"][st-1]:"Skor "+sc+", target "+goal+". Nailong bilang: sekali lagi ya! 💪";g.appendChild(m);
  if(st&&l<19)btn("Level berikutnya",()=>lv(l+1));
  if(st&&l==19)btn("Selesai 🎉",()=>fin("Juara petualangan, #!","Semua level tamat · "+sum()+" ⭐"));
  btn("Main lagi",()=>lv(l));btn("Peta level",map);beep(st?770:220,.4)}
 tm2=setInterval(()=>{t--;upd();if(t<=0){live=false;clearInterval(hp);clearInterval(tm2);done()}},1000);
 upd()}
$("go").onclick=()=>scr("s5");$("again").onclick=()=>scr("s5");
$("g1").onclick=start;$("g2").onclick=memory;$("g3").onclick=tickle;$("g4").onclick=()=>{score=0;scr("s4");quiz()};const HB=[
["Pertanyaan paling berbahaya yang jangan ditanyakan hari ini?","Kamu lagi PMS ya?","Mau dipeluk?","Betul! Kamu selamat dari marabahaya 😅","Itu pertanyaan aman! Pelukan selalu benar 🤗"],
["Makanan penyelamat saat haid?","Coklat, es krim, dan gorengan","Brokoli rebus tanpa bumbu","Betul! Itu obat dunia akhirat 🍫","Brokoli menangis di pojokan 🥦😭"],
["Saat perut nyeri, hal terbaik dari teman atau pasangan?","Diam dan bawakan kompres hangat","Ceramah panjang soal hormon","Hebat! Kamu teman idaman 🤍","Nailong menutup telinga, nggak kuat 🙉"],
["Berapa kali boleh minta jajan saat haid?","Sebanyak yang dibutuhkan","Maksimal satu kali","Sah! Pasal 1: jajan itu hak asasi 📜","Pasal itu dibatalkan oleh rakyat 😤"],
["Kenapa tiba-tiba pengin nangis lihat kucing tidur?","Boleh, kucingnya memang menggemaskan","Nggak boleh, harus kuat","Betul! Nangis itu valid, kucingnya juga 😿","Nailong menolak aturan itu dan ikut nangis 😭"],
["Posisi paling nyaman saat haid?","Gulung selimut kayak lumpia","Duduk tegak delapan jam","Lumpia Nailong siap disantap 🌯","Punggungmu mengajukan protes 🪑"],
["Siapa yang harus mengalah kalau rebutan remote?","Yang nggak lagi haid","Yang paling tinggi","Keputusan sidang: sah! ⚖️","Hakim Nailong tidak setuju 🔨"],
["Obat ampuh bad mood ala Nailong?","Dipeluk dan dibiarkan rebahan","Disuruh olahraga 5 km","Betul! Pelukan Nailong gratis 🤗","Nailong pingsan membayangkannya 😵"]
];
$("g5").onclick=pagi;$("g6").onclick=map;const ST=`Nailong paling jago olahraga apa?|Rebahan marathon|Lari sprint 100 meter|Juara dunia rebahan! 🛌|Nailong lari 2 langkah, ngos-ngosan 😮‍💨
Apa warna favorit Nailong?|Kuning, sekuning kebahagiaan|Hitam, biar misterius|Kuning cerah, secerah kamu ☀️|Nailong nggak sekeren itu, dia kuning 🐥
Nailong kalau lapar jadi...?|Lebih lucu dan lebih lemas|Lebih tenang dan bijak|Betul! Lemes tapi tetap gemes 🥺|Mana ada, Nailong ngomel minta jajan 🍪
Hobi rahasia Nailong?|Mengintip kulkas jam 2 pagi|Membaca ensiklopedia|Ketahuan! Kulkasnya ikut melet 🧊|Ensiklopedianya malah dijadiin bantal 📚
Nailong diajak lomba tidur, hasilnya?|Menang tanpa latihan|Kalah karena gelisah|Juara bertahan, nggak terkalahkan 🏆|Nailong tersinggung, langsung tidur lagi 😴
Kalau Nailong bisa terbang, dia...?|Terbang cuma ke dapur|Keliling dunia sendirian|Tujuan utamanya: camilan ✈️🍟|Nailong takut ketinggian, pingsan 😵
Hal paling ditakuti Nailong?|Diet mendadak|Gempa bumi|Betul! Diet adalah monster 😱|Gempa? Nailong santai, lanjut makan 🍔
Nailong disuruh bersih-bersih kamar, ia...?|Pura-pura sibuk|Langsung rapi dalam semenit|Aktor terbaik tahun ini 🎬|Baru nyapu satu lantai, lalu istirahat 🧹
Siapa teman terbaik Nailong?|Orang yang bawa makanan|Orang yang bawa PR|Teman sejati bawa camilan! 🍿|PR bikin Nailong menjauh 🏃
Suara tawa Nailong seperti...?|Hihihi sambil guling-guling|Tawa elegan seorang bangsawan|Hihihi, kamu ikut ketawa kan? 😄|Nailong nggak bisa elegan, dia ngakak 🤣
Nailong ikut kontes kecantikan, bakatnya apa?|Melet sambil melambaikan tangan|Menyanyi opera|Juara bakat! Panitia terpesona 👑|Opera Nailong cuma bunyi nguuung 🎤
Kalau Nailong jadi detektif, kasus pertamanya?|Siapa yang makan kuenya|Siapa pencuri berlian|Pelakunya... Nailong sendiri 🍰|Berliannya ternyata permen 💎
Cara Nailong minta maaf?|Memberi pelukan hangat|Kirim surat 10 halaman|Dimaafkan! Peluk dulu 🤗|Suratnya malah jadi alas tidur 📄
Nailong dikasih kerja kantoran, hasilnya?|Tidur di meja jam 10|Naik jabatan dalam seminggu|Karyawan teladan versi tidur 💼|Baru sampai lobi sudah izin pulang 🏢
Apa yang Nailong lakukan saat hujan?|Rebahan dengar hujan|Berlari keliling lapangan|Betul! Hujan waktunya selimutan ☔|Nailong basah, lalu masuk angin 🤧
Bahasa gaul andalan Nailong?|Gemes banget sih|Siap laksanakan, komandan|Gemes banget sih, kamu juga! 🥰|Nailong bukan tentara, dia pelukis senyum 🪖
Kalau Nailong ulang tahun, kadonya?|Kue segede ban|Buku pelajaran|Kue segede ban, langsung habis! 🎂|Nailong menangis, kadonya nggak bisa dimakan 😭
Nailong lagi galau, lagu yang diputar?|Lagu sedih sambil makan keripik|Lagu semangat buat joget|Galau tapi kenyang, mantap 🎧|Nailong joget, galaunya hilang 🕺
Kalau Nailong jadi superhero, kekuatannya?|Bikin semua orang ketawa|Melihat tembus tembok|Kekuatan paling sakti sedunia 💥|Nailong lihat tembus, isinya kulkas 🧊
Kata terakhir Nailong sebelum tidur?|Lima menit lagi, ya|Selamat malam semuanya|Lima menit versi Nailong = 5 jam 🕔|Nailong sudah mendengkur duluan 💤
Apa yang paling sering hilang di rumah?|Charger dan kaus kaki sebelah|Kunci surga|Betul! Misteri dunia terpecahkan 🔌|Surga aman, yang hilang cuma kaus kaki 🧦
Notifikasi paling bikin deg-degan?|Baterai tinggal 1 persen|Promo diskon sepatu|Deg-degan sampai ubun-ubun 🔋|Promo bikin dompetmu yang deg-degan 💸
Ritual wajib sebelum tidur?|Scroll HP sampai mata berat|Meditasi dua jam|Betul! Jempol kerja lembur 📱|Meditasi dua jam? Nailong sudah tidur 🧘
Kapan paling semangat bangun pagi?|Saat ada jajan gratis|Saat alarm berbunyi|Jajan gratis = alarm paling merdu 🍩|Alarm cuma bikin kamu pencet snooze ⏰
Siapa raja paling berkuasa di rumah?|Remote TV|Ayah dan ibu|Betul! Siapa pegang, dia raja 👑|Remote lebih berkuasa, Nailong yakin 📺
Dompet di akhir bulan isinya...?|Doa dan struk lama|Tumpukan uang|Betul! Isinya penuh harapan 🙏|Uang? Nailong cari-cari, nggak ada 🕵️
Musuh terbesar rebahan?|Panggilan 'tolong ambilkan itu'|Matahari pagi|Betul! Rebahan terganggu 😤|Matahari cuma numpang lewat 🌅
Setelah bilang 'cuma sebentar', apa yang terjadi?|Tiga jam kemudian baru selesai|Benar-benar sebentar|Waktu punya kamus sendiri ⏳|Sebentar versi Nailong = sehari 😆
Makanan yang lebih enak jam 12 malam?|Mie instan rebus telur|Salad sayur segar|Mie jam 12 malam itu surga 🍜|Salad? Nailong tertawa sampai batuk 🥗
Siapa paling berisik di grup chat?|Yang cuma kirim stiker|Yang kirim jurnal ilmiah|Stiker lebih ramai dari kata-kata 🖼️|Jurnal ilmiah? Grup langsung hening 🤫
Alasan paling klasik telat?|Macet, padahal baru bangun|Berangkat 2 jam lebih awal|Macet di kasur, paling parah 🛏️|Berangkat awal? Nailong nggak kenal 😅
Apa yang dilakukan saat sinyal hilang?|Mengacungkan HP ke langit|Membaca buku tebal|Betul! Sinyal turun dari langit 📡|Baca buku? Nailong lihat kamu panik 🙃
Yang paling susah ditolak?|Ajakan makan bareng|Ajakan lembur|Makan bareng, semua setuju 🍽️|Lembur? Nailong pura-pura nggak dengar 🙈
Kenapa kamu nonton ulang film yang sama?|Karena nyaman, bukan karena lupa|Karena belum paham|Film favorit = pelukan hangat 🎬|Sudah paham, tetap nonton, hehe 🍿
Kesalahan terbesar belanja saat lapar?|Beli semua yang dilihat|Beli satu sayur saja|Troli penuh, dompet menjerit 🛒|Sayur sendirian, Nailong kasihan 🥦
Suhu AC ideal menurut penghuni rumah?|Selalu diperdebatkan|Semua sepakat 24 derajat|Sidang AC tak pernah usai ❄️|Sepakat? Nailong takjub, mimpi kali ya 😆
Hal paling lega sedunia?|Melepas sepatu setelah lelah|Menghadiri rapat panjang|Lega sampai ke tulang! 👟|Rapat panjang bikin Nailong tidur 😴
Kalau ada lalat masuk kamar?|Perang dimulai tengah malam|Dibiarkan jadi teman|Pertarungan epik, lalat menang 🪰|Teman lalat? Nailong nggak setuju 🙅
Apa yang bikin hati hangat saat pulang?|Disambut senyum orang tersayang|Dapat tugas tambahan|Betul! Pulang obat segala lelah 🏡|Tugas tambahan? Nailong ikut cemberut 😒
Kunci kebahagiaan menurut Nailong?|Cukup tidur dan banyak jajan|Kerja tanpa henti|Betul! Hidup sederhana itu enak 🌈|Kerja terus? Nailong demo di kasur 📢
Hal paling bikin hati meleleh?|Dibilangin 'hati-hati di jalan'|Dikasih tugas dadakan|Meleleh seperti es krim 🍦|Tugas dadakan bikin hati beku 🥶
Kalau kamu bilang 'aku nggak lapar', artinya?|Sebenarnya mau, tapi nunggu ditawari|Beneran kenyang|Jawaban rahasia terkuak 🤭|Beneran kenyang? Nailong curiga 🧐
Hadiah paling berkesan?|Perhatian kecil yang tulus|Barang mahal tanpa makna|Betul! Hal kecil, dampaknya besar 🎁|Barang mahal tanpa makna? Nailong nolak 🙅
Cara terbaik membuatmu tersenyum?|Kirim stiker lucu tiba-tiba|Kirim email panjang resmi|Stiker lucu = vitamin senyum 😄|Email resmi? Nailong menguap lebar 🥱
Kalau lagi kesal, kamu butuh...?|Dipeluk, bukan diceramahi|Dikasih tugas lebih banyak|Pelukan: obat kesal paling mujarab 🤗|Tugas banyak, kesalnya numpuk 😤
Panggilan sayang terbaik?|Yang bikin senyum sendiri|Nomor induk lengkap|Panggilan manis, senyum manis 🥰|Nomor induk? Nailong cekikikan 📛
Cara minta maaf paling manjur?|Bawa makanan kesukaan|Kirim surat resmi|Makanan kesukaan = maaf diterima 🍫|Surat resmi bikin makin curiga ✉️
Siapa yang paling sering bilang 'terserah'?|Hampir semua orang, tapi ada maunya|Cuma Nailong|Terserah itu kode keras, hehe 🙃|Nailong bilang terserah sambil lirik jajan 🍟
Momen paling manis?|Ditemani saat sedang capek|Rapat jam 2 pagi|Ditemani itu lebih berharga dari emas 💛|Rapat jam 2 pagi? Nailong ngamuk 😡
Hal paling bikin kangen?|Obrolan receh yang nggak penting|Laporan keuangan|Obrolan receh, kenangan paling mahal 💬|Laporan keuangan? Nailong ngorok 😴
Ucapan 'sudah makan belum?' artinya?|Aku peduli sama kamu|Aku lagi cari bahan rapat|Betul! Kasih sayang paling sederhana 🍚|Rapat? Nailong bingung, mana makanannya 🤔
Apa yang bikin suasana hati langsung naik?|Dipuji tulus|Dikritik tajam|Dipuji, kamu langsung mekar 🌸|Dikritik, Nailong ikut melorot 🥀
Cara terbaik memberi semangat?|Bilang 'aku bangga sama kamu'|Bilang 'cepetan, udah telat'|Kalimat ajaib, semangat bangkit 🌟|Kalimat itu bikin makin telat 🏃
Apa yang kamu lakukan saat kangen?|Kirim stiker tanpa alasan|Menyimpannya selamanya sendiri|Stiker kangen terkirim 📮|Disimpan terus? Nailong gemas, kirim dong 💌
Pelukan terbaik datang dari?|Orang yang paling kamu percaya|Orang asing di jalan|Pelukan itu rumah yang bisa dibawa 🏠|Orang asing? Nailong siaga satu 🚨
Kata yang bikin tenang?|Pelan-pelan, ada aku di sini|Cepat, nanti ketinggalan|Tenang seperti air danau 🌊|Cepat-cepat bikin jantung kejar-kejaran 💓
Apa yang bikin hari biasa jadi spesial?|Ada orang tersayang di dekatmu|Hujan deras tanpa payung|Hari biasa jadi pesta kecil 🎈|Hujan tanpa payung? Nailong kuyup 🌧️
Siapa yang selalu jadi penyemangat?|Orang yang percaya padamu|Alarm pagi hari|Betul! Percaya itu bahan bakar 🔥|Alarm pagi? Nailong ngambek 😒
Kalau kamu diam, sebenarnya...?|Menunggu ditanya kenapa|Sedang menghitung bintang|Ketahuan! Tanyakan dengan lembut 🫶|Hitung bintang? Nailong ikut bengong ⭐
Hal paling indah di dunia?|Tertawa bareng sampai sakit perut|Mengerjakan pajak|Tawa bareng, obat paling manjur 😂|Pajak? Nailong menghilang cepat 💨
Makanan yang tidak pernah salah?|Nasi goreng dan telur ceplok|Sayur tanpa bumbu|Nasi goreng, juara sepanjang masa 🍳|Sayur tanpa bumbu? Nailong menangis 🥬
Rasa es krim paling populer di hati?|Yang sedang dimakan sekarang|Yang kehabisan stok|Betul! Yang di tangan paling enak 🍦|Kehabisan stok? Nailong sedih 😢
Apa yang bikin gorengan makin enak?|Sambal pedas dan cabai rawit|Dimakan diam-diam sendirian|Pedasnya bikin nagih 🌶️|Diam-diam? Nailong lihat semuanya 👀
Kalau dibagi dua, porsi Nailong...?|Selalu lebih besar sedikit|Persis sama rata|Rahasia umum dunia perjajanan 🍰|Sama rata? Nailong pura-pura nggak lihat 🤨
Kapan makanan paling enak?|Saat lapar berat|Saat sedang diet|Lapar adalah koki terbaik 👨‍🍳|Diet bikin aroma makin menggoda 😭
Es teh atau teh hangat?|Tergantung cuaca dan mood|Selalu air putih|Betul! Teh punya banyak wajah 🍵|Air putih? Nailong geleng, harus ada rasa 🥤
Cara terbaik makan bakso?|Banyak sambal, banyak kuah|Bakso polos tanpa kuah|Mangkuk bersih, hati puas 🍲|Tanpa kuah? Nailong lemas 😵
Siapa paling cepat menghabiskan camilan?|Orang yang bilang 'sedikit aja'|Orang yang diet ketat|Sedikit versi dia = satu bungkus 🍿|Diet ketat juga jebol, Nailong tahu 😏
Kenapa martabak malam-malam enak?|Karena nggak bisa ditolak|Karena sehat sekali|Martabak punya kekuatan magis 🧇|Sehat? Nailong tertawa terpingkal 🤣
Cokelat itu sebenarnya...?|Obat tanpa resep dokter|Musuh abadi|Cokelat, dokter hati terbaik 🍫|Musuh? Nailong langsung memeluk cokelatnya 🥰
Pilih mana: kopi atau tidur?|Kopi dulu, tidur nanti|Tidur terus tanpa kopi|Kopi: bahan bakar manusia ☕|Tidur terus? Nailong iri 😴
Makan siang paling nikmat?|Dimakan bareng teman|Dimakan sambil rapat|Makan bareng, rasa dobel 🍛|Sambil rapat? Nailong curi lauknya 🍗
Kalau ada kue, siapa yang memotong?|Yang paling lapar|Yang paling sabar|Yang lapar paling cekatan 🔪|Sabar? Nailong keburu nyomot 🎂
Jajanan sekolah tak terlupakan?|Seblak dan es mambo|Sayur hijau segar|Nostalgia rasa pedas manis 🍧|Sayur hijau? Nailong menjerit 😱
Apa yang bikin nasi hangat makin nikmat?|Telur dadar dan kecap|Hanya garam|Kombinasi sederhana, nikmat luar biasa 🍚|Hanya garam? Nailong sedih 🥲
Hal paling berat di pagi hari?|Membuka mata|Mengangkat beban 50 kilo|Kelopak mata lebih berat dari gajah 😪|Beban 50 kilo? Nailong mah nggak kuat 🏋️
Setelah mematikan alarm, kamu...?|Tidur lagi lima menit (jadi sejam)|Langsung olahraga|Lima menit versi kamu = sejam 😴|Langsung olahraga? Nailong ketawa 🤣
Selimut itu fungsinya...?|Benteng pertahanan paling kuat|Hiasan kasur|Benteng nyaman, sulit ditembus 🛡️|Hiasan? Nailong menolak 🙅
Hari Senin adalah...?|Ujian nyali mingguan|Hari paling santai|Senin: sang penguji kesabaran 😮‍💨|Santai? Nailong lihat jadwalmu 📅
Alasan paling sah tidak mandi pagi?|Airnya dingin banget|Terlalu semangat mandi|Alasan sahih, sulit dibantah 🥶|Terlalu semangat? Nailong terkejut 🚿
Posisi tidur Nailong?|Telentang sambil melet|Berdiri sambil bernyanyi|Pose tidur paling damai 😛|Berdiri? Nailong bukan kuda 🐴
Kalau libur, jam bangun terbaik?|Saat matahari di atas kepala|Jam 4 pagi|Libur adalah hak bangun siang ☀️|Jam 4 pagi? Nailong pura-pura pingsan 😵
Kenapa bantal begitu istimewa?|Teman setia tempat curhat|Alat olahraga|Bantal tahu semua rahasiamu 🤫|Olahraga? Nailong pakai buat peluk 🛏️
Bagian terbaik dari pagi hari?|Aroma kopi dan roti hangat|Suara klakson macet|Pagi wangi, hati riang 🥐|Klakson bikin Nailong menutup telinga 🚗
Sarapan favorit Nailong?|Apa saja yang ada di meja|Menu diet seimbang|Apa saja boleh, asal enak 🥞|Menu diet? Nailong menangis halus 😭
Sebelum tidur, pikiran paling ramai tentang?|Hal memalukan sepuluh tahun lalu|Cara menyelamatkan dunia|Pikiran tengah malam ramai betul 🌙|Menyelamatkan dunia? Nailong cuma mau tidur 💤
Matahari terbit di mata Nailong adalah...?|Tanda harus tidur lagi|Waktu olahraga 10 km|Lanjut tidur, kata Nailong 🌅|Olahraga? Nailong langsung ngacir 💨
Setelah tiga kali snooze, apa yang terjadi?|Panik karena telat|Bangun segar bugar|Panik pagi, olahraga gratis 🏃|Segar bugar? Itu cuma di iklan 📺
Piyama favorit?|Yang sudah lusuh tapi nyaman|Yang kaku dan mahal|Lusuh itu pelukan hangat 🧸|Kaku? Nailong nggak bisa gerak 😅
Kegiatan terbaik hari Minggu?|Rebahan seharian tanpa rasa bersalah|Rapat mendadak|Minggu: hari suci para pemalas 🛋️|Rapat mendadak? Nailong kabur 🏃
Siapa paling heboh saat foto bareng?|Yang minta ulang terus|Yang kabur duluan|Sepuluh kali foto, sepuluh gaya 📸|Kabur? Nailong ikut kabur 🏃
Kenapa lagu lama selalu enak?|Karena penuh kenangan|Karena nadanya rumit|Lagu lama, hati kembali muda 🎶|Nadanya rumit? Nailong pusing 🤯
Kalau hujan deras, kamu pilih?|Menyeruput hangat di dalam rumah|Lari-lari tanpa tujuan|Hujan + minuman hangat = surga ☕|Lari-lari? Nailong basah, flu 🤧
Alasan paling lucu menunda pekerjaan?|Menunggu mood yang tak kunjung datang|Sudah selesai kemarin|Mood-nya lagi liburan 🏖️|Selesai kemarin? Nailong bengong 😲
Kunci pertemanan awet?|Ketawa bareng hal receh|Selalu serius|Receh itu perekat persahabatan 🤝|Serius terus? Nailong ngantuk 😴
Hal paling tidak masuk akal?|Bilang 'nggak sengaja' tapi berkali-kali|Matahari terbit di barat|Nggak sengaja kok rutin? 🤨|Matahari terbit di barat? Alamat kiamat 🌅
Cara menghadapi hari buruk?|Tidur lalu makan enak|Marah ke seluruh dunia|Tidur dan makan, solusi universal 🍕|Marah? Nailong ikut bete 😤
Siapa yang bilang 'aku sibuk' padahal rebahan?|Hampir semua orang, jujur saja|Nailong yang paling jujur|Sibuk versi rebahan, sah! 🛋️|Nailong memang jujur, tapi tetap rebahan 😆
Obat segala penat menurut Nailong?|Tidur, jajan, dan dipeluk|Lembur sampai pagi|Resep tiga serangkai paling ampuh 💊|Lembur? Nailong menolak resep itu 🙅
Kalimat penutup terbaik hari ini?|Terima kasih sudah bertahan hari ini|Besok kita lembur lagi|Kamu hebat, peluk dari Nailong 🤗|Lembur? Nailong kabur bawa selimut 🛌`.trim().split("\n").map(s=>s.split("|"));
function pick(b,k){let s=[];try{s=JSON.parse(localStorage.getItem("nq"+k)||"[]")}catch(e){}
 let f=b.filter(r=>!s.includes(r[0]));if(f.length<5){f=b.slice();s=[]}
 f.sort(()=>Math.random()-.5);const p=f.slice(0,5);s=s.concat(p.map(r=>r[0]));try{localStorage.setItem("nq"+k,JSON.stringify(s))}catch(e){}return p}
const TB=[
["Kapan tugas paling produktif dikerjakan?","Lima menit sebelum deadline","Seminggu sebelumnya","Betul! Kekuatan deadline tak terkalahkan ⚡","Bohong! Nailong tahu kamu kepepet 🤣"],
["Berapa tab browser terbuka saat ngerjain tugas?","Banyak, satu pun bukan tugas","Satu, fokus penuh","Ketahuan! Tab YouTube kedip-kedip 📺","Nailong nggak percaya, dia lihat sendiri 👀"],
["Rumus ampuh biar tugas selesai?","Mulai dulu, nangisnya belakangan","Rebahan sampai ilham datang","Betul! Mulai itu setengah selesai 💪","Ilhamnya nyasar, nggak sampai-sampai 😴"],
["Apa yang kamu lakukan saat tugas buntu?","Ketik judul, lalu bengong 30 menit","Langsung nulis kesimpulan gemilang","Kursor kedip-kedip mengejekmu ✍️","Kesimpulan gemilang masih di ujung dunia 🌏"],
["Teman terbaik saat begadang tugas?","Kopi, camilan, dan lagu sedih","Tidur nyenyak delapan jam","Trio penyelamat malam! ☕🍟","Tidur nyenyak itu cuma mitos 😭"],
["Apa yang terjadi saat dosen bilang 'dikumpulkan hari ini'?","Jantung lari maraton","Tenang, minum teh santai","Betul! Jantungmu juara satu lomba lari 🏃","Tehnya tumpah, tugasnya belum ada 🍵"],
["Nama file tugas yang paling dicintai?","final_revisi_fix_beneran_2.docx","tugas.docx","Pasti ada kata 'beneran' di namanya 😂","Nailong geleng, pasti kamu punya versi FINAL3 📁"],
["Hadiah terbaik setelah tugas selesai?","Rebahan tanpa rasa bersalah","Langsung kerjakan tugas berikutnya","Hak asasi pelajar! 🛌","Nailong menyita laptopmu, istirahat dulu 💻🚫"],
["Semangat tugas paling besar datang dari...?","Kata-kata orang tersayang","Notifikasi tugas baru","Betul! Kamu hebat sudah sejauh ini 🤍","Notifikasi itu bikin Nailong nangis 🔔"],
["Berapa kali bilang 'sebentar lagi mulai' sebelum mulai?","Sampai lupa hitungannya","Cuma sekali","Rekor dunia dipegang kamu! 🏆","Sekali? Nailong tertawa terbahak 🤣"]
];
const SB=[
["Alarm subuh paling kejam bunyi kapan?","Tepat saat mimpi lagi seru","Pas kamu sudah bangun duluan","Betul! Mimpinya belum tamat 😴","Mana ada bangun duluan, Nailong kaget 😳"],
["Hal tersulit di pondok?","Antre kamar mandi saat semua buru-buru","Bingung mau ngapain karena kosong","Betul! Antrean terpanjang sejagat 🚿","Kosong? Nailong guling-guling ketawa 🤣"],
["Sandal yang hilang di depan masjid biasanya...?","Pindah tangan, entah ke mana","Pulang sendiri ke kamar","Betul! Sandal pun ikut hijrah 🩴","Sandalnya malah ikut pesantren kilat 😂"],
["Menu andalan akhir bulan?","Mie instan dengan kreasi tak terbatas","Steak sapi impor","Chef santri bintang lima! 🍜","Nailong ngiler, tapi dompetnya tidak 💸"],
["Apa yang paling bikin kantuk saat ngaji?","Angin sepoi dan suara yang merdu","Kopi tiga gelas","Betul! Kepala mengangguk setuju terus 😴","Kopi tiga gelas malah bikin kamu joget 🕺"],
["Hafalan paling cepat hilang?","Yang dihafal semalam sebelum setoran","Yang diulang-ulang tiap hari","Betul! Hilang saat dipanggil ustaz 😅","Yang diulang itu tahan banting, Nailong bangga 🌟"],
["Saat libur pulang, hal pertama yang dicari?","Masakan rumah dan kasur empuk","Jadwal piket tambahan","Betul! Rindu rumah itu nyata 🏠","Nailong menyobek jadwal piketnya 📄"],
["Cara bertahan saat capek di pondok?","Ingat niat dan teman seperjuangan","Pura-pura sakit tiap hari","Betul! Capekmu tidak sia-sia 🌙","Nailong tahu, ustaznya juga tahu 🤭"],
["Siapa penyelamat saat sabun cuci habis?","Teman yang rela berbagi","Sabun jatuh dari langit","Teman sepondok itu keluarga kedua 🤝","Nailong menunggu sabun sampai lebaran 🧼"],
["Waktu paling dinanti sepanjang hari?","Jam istirahat dan kiriman jajan","Jam tambahan pelajaran","Betul! Kiriman jajan = hari raya 🍪","Nailong pura-pura tidak dengar 🙉"]
];
const KB=[
["Cucian temanmu menumpuk sampai...?","Membentuk gunung kecil bernama Everest","Rapi dilipat di lemari","Betul! Siap didaki 🏔️","Nailong lihat, bajunya masih di kursi 🪑"],
["Sapu kamar paling sering dipakai temanmu untuk...?","Garuk punggung atau jadi gitar","Menyapu tiap pagi","Betul! Sapu serba guna 🎸","Menyapu? Nailong pingsan kaget 😵"],
["Saat giliran piket tiba, temanmu tiba-tiba...?","Sakit mendadak, sembuh pas jajan","Mengepel sambil tersenyum","Penyakit ajaib! 🤒🍔","Senyum itu cuma ada di mimpi 😂"],
["Siapa yang akhirnya mengepel lantai?","Kamu lagi, sambil mendengus","Temanmu yang rajin sekali","Betul! Pahlawan tanpa tanda jasa 🦸","Rajin? Nailong nggak percaya 🙄"],
["Baju bersih temanmu datang dari mana?","Dipinjam diam-diam dari lemarimu","Dicuci sendiri tiap Minggu","Ketahuan! Bajumu sering hilang 🕵️","Nailong cek kalender, Minggunya kosong 🗓️"],
["Kata sakti temanmu saat ditegur?","Nanti, nanti, nanti","Siap, langsung kukerjakan","Betul! Nanti artinya tidak pernah ⏳","Siap tapi nggak gerak, Nailong melet 😛"],
["Cara paling ampuh menyadarkannya?","Tempel jadwal piket besar-besar","Mengepel sendirian selamanya","Jadwal besar, malunya juga besar 📋","Kamu butuh strategi, bukan otot berlebih 😅"],
["Isi ember cucian temanmu biasanya...?","Baju seminggu, aromanya ikut berkomentar","Wangi bunga mawar","Betul! Hidungmu sudah kebal 👃","Nailong cium mawar, lalu pingsan karena kenyataan 🌹"],
["Kenapa kamu tetap sabar dengannya?","Dia lucu dan baik hati juga","Takut sepi katanya","Sahabat tak sempurna itu manis 🥰","Kamu punya Nailong, nggak bakal sepi 🐥"],
["Hadiah untuk temanmu yang akhirnya menyapu?","Tepuk tangan meriah dan jajan","Pingsan karena kaget","Betul! Pujian itu pupuk kebiasaan baik 👏","Boleh pingsan sebentar, lalu bangun senyum 😂"]
];
const P=t=>t.trim().split("\n").map(s=>s.split("|")),rr=a=>a[Math.floor(Math.random()*a.length)];
const RC=["Betul! Nailong bangga 🥳","Tepat sekali! 🎯","Juara! Kamu paham banget 🏆","Yes! Nailong melet bahagia 😛","Mantap, jawabanmu sah! ✅","Tepat! Nailong joget 🕺","Benar banget, tos dulu 🙌","Cerdas dan lucu, cocok! 😄","Betul! Nailong guling-guling ketawa 🤣","Kamu memang ahlinya ✨"];
const RW=["Hmm, Nailong geleng-geleng 😅","Belum tepat, tapi lucu kok 😂","Salah! Nailong melet meledek 😛","Hampir! Nailong tetap sayang 🤗","Waduh, Nailong ketawa dulu 🤭","Bukan itu, tapi kamu tetap menggemaskan 🥰","Nailong pura-pura nggak lihat 🙈","Coba lagi di pertanyaan berikut! 💪","Nailong menutup muka sambil ngakak 🤣","Jawaban kreatif, tapi salah 😆"];
HB.push(...P(`Kalimat yang sebaiknya dihindari hari ini?|Ah, kamu lebay deh|Mau aku pijitin?
Benda paling berharga saat nyeri perut?|Kompres hangat|Dumbel
Camilan wajib stok bulanan?|Cokelat dan keripik|Brokoli mentah
Reaksi terbaik saat dia tiba-tiba sedih?|Peluk dan tanya mau apa|Bilang itu cuma perasaanmu
Alasan sah minta dipesankan makanan?|Lagi hari pertama|Lagi pengin diet
Kenapa mood naik turun kayak roller coaster?|Hormon lagi sibuk kerja|Cuma pura-pura
Pakaian paling nyaman saat haid?|Daster atau celana kolor|Gaun ketat berkancing
Posisi tidur andalan?|Meringkuk bawa guling|Plank semalaman
Minuman penghangat perut?|Teh jahe hangat|Es batu sebaskom
Cara bijak menghadapi pasangan yang lagi haid?|Sedia cokelat, sabar, dan peluk|Debat soal hal sepele
Apa yang dibutuhkan dompet saat haid?|Banyak jajan online|Hari tanpa jajan
Olahraga paling ideal hari pertama?|Rebahan dengan stretching ringan|Lari maraton
Tontonan yang cocok?|Drama atau film manis|Film horor sendirian jam 2
Kenapa tiba-tiba nangis nonton iklan?|Iklannya terlalu menyentuh|Karena iklannya buruk
Yang paling berbahaya dilakukan ke orang haid?|Menghabiskan camilannya|Menawarkan pijatan
Kata sakti yang menenangkan?|Kamu istirahat saja, aku urus|Cepetan dong, jangan lemah
Apa fungsi bantal pemanas?|Penyelamat perut hangat|Hiasan kamar
Kenapa pembalut harus selalu ada di tas?|Antisipasi tamu datang tiba-tiba|Pajangan tas
Makanan penghibur nomor satu?|Es krim dan cokelat|Salad tanpa dressing
Cara terbaik memberi semangat?|Kasih pelukan dan jajan|Suruh kerja lebih cepat
Siapa yang berhak memilih menu makan hari ini?|Yang sedang haid|Yang paling sabar
Kata ajaib menghibur?|Mau dibelikan apa, sayang?|Udah, jangan manja
Kenapa rasanya pengin makan semuanya?|Perut lagi demo minta jajan|Karena nggak punya kerjaan
Aktivitas paling cocok saat nyeri?|Rebahan sambil dipijat|Mendaki gunung
Jawaban aman saat ditanya 'aku cantik nggak hari ini?'|Cantik banget, selalu|Hmm, lumayan
Barang wajib di kamar?|Selimut, guling, dan camilan|Setrika dan penggorengan
Bahan obrolan paling aman?|Makanan enak apa hari ini|Kapan kamu mau berubah
Kenapa kadang tiba-tiba marah?|Hormon lagi naik panggung|Karena lagi bahagia
Cara membuatnya tersenyum?|Kirim stiker dan cokelat|Kirim tugas tambahan
Hari paling aman bagi sekitar?|Hari saat dia disayang lebih|Hari saat dia diganggu
Kata-kata yang menguatkan?|Kamu hebat sudah bertahan|Itu nggak sakit kok
Pembalut itu ibarat apa?|Pahlawan tak terlihat|Barang mewah
Kenapa susah bangun pagi saat haid?|Tubuh minta istirahat|Karena malas saja
Hal yang paling bikin lega?|Kompres hangat dan rebahan|Dibilang lebay
Apa yang dibawa saat menjenguk?|Cokelat dan wajah hangat|Surat komplain
Siapa paling berjasa di hari pertama?|Teman yang menyiapkan camilan|Teman yang cerewet
Kenapa rasa kantuk lebih besar?|Tubuh sedang bekerja ekstra|Biar bisa menghindar tugas
Tindakan penyelamat hari buruk?|Dipeluk dan didengarkan|Diceramahi panjang
Teman yang baik akan...?|Tanya 'perlu apa?' tanpa menghakimi|Menyuruh biasa saja
Pilihan aman buat hadiah?|Cokelat dan hangatnya perhatian|Timbangan badan
Tanda sayang paling sederhana?|Mengantar pulang dan bawa camilan|Memberi nasihat panjang
Bagaimana melewati hari berat?|Pelan-pelan, banyak istirahat|Dipaksa produktif penuh
Kenapa lagu sedih terasa menusuk?|Perasaan lagi sensitif|Karena nadanya salah
Pelukan hari ini rasanya...?|Dobel nyamannya|Biasa saja
Hal paling bikin terharu?|Dibawakan teh hangat tanpa diminta|Dikasih tugas dadakan
Hal yang tak boleh diremehkan?|Rasa lelah dan sakitnya|Selera makannya
Solusi camilan tengah malam?|Dibelikan, bukan diceramahi|Disuruh tidur saja
Cara terbaik mengerti suasana hatinya?|Dengarkan tanpa menyela|Cari kesalahannya
Kenapa cokelat selalu dicari?|Bikin hati lebih hangat|Cuma gaya-gayaan
Pesan terbaik untuk hari ini?|Kamu kuat, istirahat dulu ya|Ayo cepat, jangan lemah`));
TB.push(...P(`Apa musuh utama deadline?|Kebiasaan menunda|Kopi dingin
Kapan ide cemerlang datang?|Sejam setelah dikumpul|Seminggu sebelum deadline
Saat laptop mati mendadak, kamu...?|Menahan tangis lalu ngerjain ulang|Tertawa lalu tidur
Hal paling sering lupa disimpan?|File tugas yang hampir selesai|Foto makanan
Kata paling ditakuti saat kerja?|Not Responding|Selesai disimpan
Kenapa Wi-Fi mati saat upload?|Takdir suka bercanda|Karena kamu terlalu cepat
Berapa kali revisi dosen pembimbing?|Sampai lupa hitungan|Sekali, langsung ACC
Siapa pahlawan tengah malam?|Mie instan dan kopi|Kasur empuk
Rumus sakti ngerjain makalah?|Cari sumber, tulis pelan-pelan|Tulis 100 halaman dari nol
Kenapa tugas kelompok sering berat?|Yang kerja cuma dua orang|Semua kerja keras bareng
Hal paling menegangkan?|Menekan tombol kirim|Menulis nama sendiri
Apa arti 'tinggal sedikit lagi'?|Masih separuh jalan|Benar-benar tinggal sedikit
Isi folder Tugas Baru?|Sepuluh file bernama revisi|Satu file rapi
Camilan wajib saat ngerjain tugas?|Apa saja asal ada|Brokoli rebus
Penyebab utama sakit kepala?|Revisi tanpa ujung|Terlalu banyak tidur
Kenapa catatan kuliah sulit dibaca?|Ditulis sambil ngantuk|Ditulis sangat rapi
Siapa penolong saat bingung?|Teman yang sudah paham|Sendiri saja
Isi pesan grup menjelang deadline?|Ada yang sudah selesai?|Santai, masih lama
Cara menghadapi tugas banyak?|Satu per satu pelan-pelan|Panik berputar-putar
Senjata andalan kala buntu?|Jalan-jalan sebentar|Menatap layar tujuh jam
Waktu tidur sehat menurut mahasiswa?|Setelah subuh|Jam sembilan malam
Apa yang dilakukan sebelum mengerjakan?|Membersihkan meja dulu|Langsung fokus
Kapan semangat mengerjakan datang?|Saat tinggal setengah jam|Tiga hari sebelumnya
Saat revisi disetujui?|Senyum selebar lapangan|Biasa saja
Siapa bantu tugas saat panik?|Teman yang punya contoh|Kucing tetangga
Alasan klasik telat kumpul?|Sinyal bermasalah|Terlalu cepat selesai
Warna mata saat begadang?|Merah menyala|Bersinar segar
Apa teman setia tugas?|Kopi, camilan, dan tekad|Kasur empuk
Hal paling melegakan?|Tugas dikumpulkan tepat waktu|Dapat tugas tambahan
Penyelamat saat listrik padam?|Power bank dan doa|Tidur tenang
Hal paling menegangkan di presentasi?|Pertanyaan tak terduga|Salam pembuka
Cara cerdas bertahan?|Istirahat teratur dan minum air|Terus-menerus tanpa henti
Kenapa catatan banyak coretan?|Ide datang tidak teratur|Karena terlalu rapi
Siapa bilang 'santai aja'?|Teman yang tugasnya sudah selesai|Teman yang belum mulai
Saat salah kirim file?|Jantung berhenti sedetik|Biasa saja
Tab paling sering terbuka?|Mesin pencari dan video lucu|Hanya dokumen tugas
Hadiah kecil setelah tugas selesai?|Es krim dan tidur siang|Tugas lain
Kapan baterai laptop habis?|Saat belum disimpan|Saat sudah selesai
Mood saat menerima revisi?|Naik turun seperti roller coaster|Datar dan tenang
Yang bikin tenang di ujung deadline?|Teman yang menemani begadang|Notifikasi baru
Penghapus terbaik?|Tombol undo|Tipe-x tebal
Ritual sebelum menulis?|Menata playlist dulu|Langsung mengetik
Siapa disalahkan saat telat?|Jam yang berjalan terlalu cepat|Diri sendiri sepenuhnya
Hal yang selalu terasa singkat?|Waktu sebelum deadline|Waktu libur
Aroma khas begadang?|Kopi dan mi instan|Parfum mewah
Siapa menyalakan semangat?|Orang tersayang yang percaya|Alarm tugas baru
Makna 'sekali lagi cek'?|Cek sepuluh kali lagi|Cek sekali saja
Kata yang ingin didengar?|Tugasmu diterima|Tolong perbaiki lagi
Penyebab bengong terlama?|Layar kosong tanpa ide|Menonton kartun
Pesan penyemangat ampuh?|Pelan-pelan, kamu pasti bisa|Cepat, jangan banyak alasan`));
SB.push(...P(`Siapa penguasa dapur pondok?|Kakak pengurus dan panci besar|Chef bintang lima
Yang paling sering dipinjam tanpa izin?|Sandal dan sabun|Mobil sedan
Kapan antrean kamar mandi paling panjang?|Menjelang subuh|Tengah hari bolong
Penyelamat saat lapar malam?|Mie instan dan teman sekamar|Restoran bintang lima
Musuh bebuyutan saat ngaji?|Rasa kantuk|Pendingin ruangan
Siapa yang bangunin subuh?|Pengurus bersuara lantang|Burung beo
Yang paling dirindukan di pondok?|Masakan rumah|Antre kamar mandi
Barang paling berharga di asrama?|Sabun dan kasur|Mobil pribadi
Siapa yang paling rajin menabung?|Santri akhir bulan|Santri awal bulan
Kata andalan saat lapar?|Ada yang punya mie?|Mari makan malam mewah
Hal menegangkan sebelum setoran?|Hafalan hilang mendadak|Tidur nyenyak
Tanda kiriman datang?|Teman mendadak jadi baik|Jadwal ngaji berubah
Jam favorit sepanjang hari?|Jam istirahat|Jam setoran
Yang paling sering hilang?|Sandal dan kaus kaki|Tanggung jawab
Isi lemari santri?|Sarung, kitab, dan mie|Tas mewah
Cara menghibur teman kangen rumah?|Ajak makan bareng dan cerita|Marahi supaya kuat
Kenapa jam kosong terasa singkat?|Karena tidur siang|Karena olahraga berlebihan
Penyelamat saat sakit?|Teman sekamar dan teh hangat|Dokter spesialis
Hal paling sulit dilawan?|Kantuk saat pengajian|Semangat belajar
Jika terlambat?|Siap-siap dapat ta'zir ringan|Diberi hadiah
Siapa cepat habiskan kiriman?|Santri yang berbagi|Santri yang menyimpan
Pelajaran dari antre mandi?|Sabar itu penting|Cepat itu segalanya
Yang dibawa saat mudik?|Cucian dan oleh-oleh|Kitab saja
Kenapa cuci baju bikin pegal?|Jemuran tak pernah cukup|Mesin cuci terlalu canggih
Siapa senang saat hujan?|Santri yang bisa tidur siang|Yang menjemur baju
Camilan paling ngangenin?|Kerupuk dan gorengan|Steak impor
Hal paling melegakan?|Libur dan pulang kampung|Ujian bertubi-tubi
Isi obrolan malam?|Cerita lucu dan curhat|Rapat serius
Kenapa sandal sering tertukar?|Banyak yang mirip|Karena sengaja
Ukuran dompet santri?|Tipis tapi penuh mimpi|Tebal berisi emas
Makna 'nanti dulu' dari teman?|Tidak akan pernah|Segera dikerjakan
Siapa yang paling sabar?|Penjaga kamar mandi|Penjual es
Yang bikin rindu pondok?|Kebersamaan dan canda|Antrean panjang
Ucapan wajib tiap awal bulan?|Alhamdulillah kiriman datang|Alhamdulillah ujian tiba
Pemandangan khas pagi hari?|Jemuran berbaris rapi|Kemacetan kota
Siapa membangunkan paling kejam?|Teman sekamar yang usil|Alarm lembut
Saat kehabisan sabun?|Pinjam teman dulu|Beli yang mahal
Kenapa nasi pondok nikmat?|Dimakan bareng teman|Dimakan sendirian
Alasan ampuh minta izin?|Mau beli perlengkapan|Mau jalan-jalan
Yang bikin semangat bangun?|Teman seperjuangan|Alarm kencang
Yang paling dirindukan alumni?|Kebersamaan di pondok|Antrean makan
Kegiatan paling santai?|Tidur siang usai makan|Rapat pengurus
Siapa menguasai jemuran?|Yang bangun paling pagi|Yang paling malas
Teman setia santri?|Sarung dan sandal jepit|Jas dan dasi
Cara bertahan saat capek?|Bercanda bareng teman|Menyimpan sendiri
Kebiasaan paling lucu?|Berebut gorengan|Berebut tugas
Yang dicari saat lapar?|Teman yang punya kiriman|Teman yang puasa
Yang selalu dinanti?|Hari libur dan kiriman|Hari ujian
Yang menguatkan hati?|Doa orang tua|Nilai tinggi saja
Pesan terbaik untuk santri capek?|Capekmu pasti ada hasilnya|Tidur terus sampai lulus`));
KB.push(...P(`Siapa penguasa tumpukan cucian?|Temanmu yang malas|Mesin cuci baru
Teman setia sapu di kamar?|Debu yang betah|Tukang bersih profesional
Kata sakti saat diminta mengepel?|Nanti, aku lagi capek|Siap, langsung sekarang
Isi ember cucian teman?|Baju seminggu penuh aroma|Baju wangi bunga
Siapa yang selalu menyapu?|Kamu, lagi dan lagi|Temanmu yang rajin
Cara teman menghindari piket?|Tiba-tiba sakit|Maju sukarela pertama
Kapan lantai kamar dipel?|Saat tamu mau datang|Setiap pagi tepat waktu
Hal paling bikin kesal?|Piring kotor menumpuk|Kamar wangi tertata
Sapu paling sering dipakai untuk?|Main gitar-gitaran|Menyapu lantai
Siapa yang selalu bilang besok?|Teman yang tak pernah mulai|Teman yang rajin
Bau yang sering muncul?|Aroma cucian terlupakan|Wangi taman bunga
Pemilik kaus kaki tercecer?|Temanmu yang berantakan|Kamu yang rapi
Senjata andalan bujuk teman?|Jajan atau cokelat|Marah panjang lebar
Mengapa kamar selalu berantakan?|Ada yang tak mau beres|Karena terlalu rapi
Yang bikin teman mau piket?|Jadwal besar dan jajan|Ancaman panjang
Siapa menikmati kasur luas?|Teman yang tak merapikan|Teman yang rapi
Musuh bersama sekamar?|Debu dan cucian|Wangi lavender
Penyelamat saat tamu datang?|Kamu yang buru-buru beres|Teman yang santai
Kata paling sering diucapkan?|Tolong dong, bersihkan|Terima kasih sudah bersih
Isi lemari teman malas?|Baju bersih pinjaman|Baju tersetrika rapi
Nasib piring kotor?|Menunggu keajaiban|Dicuci langsung
Siapa pura-pura tidur?|Saat jadwal piket tiba|Saat jajan datang
Kenapa jemuran tak pernah penuh?|Karena belum dicuci|Karena terlalu banyak
Fungsi jadwal piket?|Hiasan dinding|Panduan yang dipatuhi
Siapa paling cepat menghilang?|Teman saat disuruh bersih-bersih|Teman saat bagi jajan
Yang bikin kamar bersih?|Kerja sama bareng|Berharap keajaiban
Musuh sapu?|Teman yang malas|Debu tipis
Teman malas jago apa?|Cari alasan|Bersih-bersih
Siapa ahli ngeles?|Teman yang malas piket|Teman yang rajin
Siapa selalu beres-beres?|Yang tak tahan lihat berantakan|Yang tak peduli
Mengapa kamu jadi sabar?|Karena sudah terbiasa|Karena selalu marah
Hadiah buat teman yang rajin?|Jajan dan pujian|Tugas tambahan
Nasib sapu di sudut?|Berdebu tak tersentuh|Dipakai setiap hari
Yang tercium dari kamarmu?|Misteri dari cucian lama|Bunga mawar
Jurus pamungkas teman malas?|Tidur pura-pura nyenyak|Mengepel tanpa disuruh
Mengapa kamu selalu mengalah?|Karena sayang pada teman|Karena suka mengepel
Pahlawan kebersihan kamar?|Kamu yang tak pernah mengeluh|Teman yang rebahan
Kapan teman mendadak rajin?|Saat dijanjikan jajan|Saat dimarahi
Hal yang bikin tersenyum?|Teman tiba-tiba menyapu|Teman pulang larut
Setelah mencuci, kamu...?|Menjemur lalu rebahan|Setrika sampai rapi
Ekspresi saat melihat kamar?|Tarik napas panjang|Tepuk tangan meriah
Sapu dan pel itu seperti...?|Pahlawan tak dihargai|Hiasan kamar
Cara paling halus menegur?|Tempel jadwal lucu bergambar|Marah di grup
Tanda teman mau beres-beres?|Mendadak ngajak jajan|Mendadak hilang
Siapa raja alasan?|Teman yang malas|Teman yang disiplin
Harapan terbesar sekamar?|Teman jadi rajin|Kamar makin berantakan
Yang tertinggal saat mudik?|Cucian dan debu|Kamar mengilap
Siapa yang selalu menghela napas?|Kamu saat lihat lantai|Teman saat tidur
Cara bahagia sekamar?|Pembagian tugas jelas|Diam-diaman berminggu-minggu
Pesan penutup buat teman malas?|Yuk bersih bareng, nanti kutraktir|Terserah kamu saja`));
$("g7").onclick=()=>{score=0;scr("s4");quiz(HB,"h")};
$("g8").onclick=()=>{score=0;scr("s4");quiz(TB,"t")};$("g9").onclick=()=>{score=0;scr("s4");quiz(SB,"s")};$("g10").onclick=()=>{score=0;scr("s4");quiz(KB,"k")};

const POSE=["assets/img/img02-64f88b59.webp", "assets/img/img03-c1d328ad.webp", "assets/img/img04-7cf4ac03.webp", "assets/img/img05-0749f5b0.webp", "assets/img/img06-9a2c2a83.webp", "assets/img/img07-700371f7.webp", "assets/img/img08-d1d1c37f.webp", "assets/img/img09-bcf12962.webp", "assets/img/img10-1fbf2385.webp", "assets/img/img11-0fe5fa80.webp", "assets/img/img12-e10462b0.webp"];
let qgen=0,it8=[];
const nm=()=>$("to").value.trim()||"Kamu";
function pz(id,a){const e=$(id);e.src=POSE[rr(a)];e.classList.add("pz")}
function conf(n){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;const E=["🎉","✨","💛","🌟","🎈","🐥"];for(let i=0;i<n;i++){const e=document.createElement("div");e.className="cf";e.textContent=rr(E);e.style.cssText="left:"+rnd(0,96)+"vw;animation-duration:"+rnd(1.8,3.4)+"s;animation-delay:"+rnd(0,.8)+"s;font-size:"+rnd(16,30)+"px";document.body.appendChild(e);setTimeout(()=>e.remove(),4500)}}
const FX=["🐥","💛","✨","🎈","⭐","💖"];
for(let i=0;i<12;i++){const e=document.createElement("i");e.textContent=FX[i%6];e.style.cssText="left:"+rnd(0,96)+"vw;font-size:"+rnd(18,34)+"px;animation-duration:"+rnd(10,20)+"s;animation-delay:-"+rnd(0,15)+"s";$("fx").appendChild(e)}
POSE.forEach(p=>{const i=document.createElement("img");i.src=p;i.alt="";$("pr").appendChild(i)});
pz("m1",[1,2,4]);pz("m3",[2]);pz("m4",[9]);
function save(){try{localStorage.setItem("nl",JSON.stringify({to:$("to").value,from:$("from").value,note:$("note").value}))}catch(e){}}
function home(){clearInterval(loop);clearInterval(clock);clearInterval(tm2);qgen++;$("gb").innerHTML="";document.querySelectorAll("#play .t,#play .h,#play .fl").forEach(x=>x.remove());scr("s5")}
function intro(){scr("s8");const n=nm(),f=$("from").value.trim(),S=(p,t,s,c)=>{pz("iv",p);$("it").textContent=t;$("is").textContent=s;[$("iv"),$("it")].forEach(e=>{e.classList.remove("in");void e.offsetWidth;e.classList.add("in")});if(c)conf(c);beep(500+Math.random()*300,.2)};
 const st=[[0,()=>S([9],"Psst...","Ada yang mau ketemu kamu 👀")],[2000,()=>S([1],"Halo, "+n+"!","Nailong datang bawa senyum",30)],[4200,()=>S([4],f?"Salam dari "+f+" 💛":"Siap-siap ketawa!","Jangan lupa tarik napas dulu",30)],[6400,()=>S([2],"Yuk, mulai!","Ada game, kuis, dan semangat",60)],[8200,()=>scr("s5")]];
 it8.forEach(clearTimeout);it8=st.map(([t,g])=>setTimeout(g,t))}
const CAT={game:["🎮 Game",[["☁️","Nailong Terbang","Ketuk biar terbang","f:terbang"],["🧩","Puzzle Geser","Susun gambar Nailong","f:geser"],["🎵","Ikuti Gaya Nailong","Hafalkan urutannya","f:gaya"],["🐥","Tangkap Nailong","Ketuk sebelum kabur","g1"],["🃏","Pasang Kartu","Cocokkan pasangan","g2"],["🤣","Gelitik Nailong","Ketuk sampai ngakak","g3"],["☀️","Sarapan Pagi","Tangkap sarapan","g5"],["🗺️","Petualangan Nailong","Level demi level","g6"]]],

duel:["👥 Duel 2 Pemain",[["💪","Tarik Tambang","Adu cepat mengetuk","f:tarik"],["⚡","Reaksi Kilat","Siapa paling sigap","f:reaksi"],["⭕","Tic-Tac-Toe Nailong","Giliran bergantian","f:xo"]]],
kuis:["❓ Kuis",[["🎲","Kuis Kocak Acak","Selalu ada kejutan","g4"],["🌸","Manja Hari Haid","Dipeluk dulu","g7"],["📚","Capek Tugas","Semangat, ya!","g8"],["🕌","Santri Capek","Cerita pondok","g9"],["🧹","Teman Kamar Mager","Sabar, ya","g10"]]],
semangat:["💌 Semangat",[["😮‍💨","Lagi capek","Aku temani istirahat","capek"],["🥺","Lagi sedih","Dipeluk dari jauh","sedih"],["🔥","Butuh semangat","Dorongan kecil","semangat"],["🧚‍♀️","Puisi Bidadari","Kejutan manis menunggumu","puisi"],["💌","Pesan khusus","Titipan untukmu","pesan"]]]};
function cat(k){const c=CAT[k];scr("s7");$("h7").textContent=c[0];pz("m7",[1,2,4,5]);const l=$("l7");l.innerHTML="";c[1].forEach(([e,t,s,id])=>{const b=document.createElement("button");b.className="card";b.innerHTML="<span>"+e+"</span><div><b>"+t+"</b><small>"+s+"</small></div>";b.onclick=()=>/^g\d+$/.test(id)?$(id).onclick():id.startsWith("f:")?window[id.slice(2)]():id.startsWith("o:")?(alert("Fitur online tidak disertakan dalam versi ini."),null):motiv(id);l.appendChild(b)})}
const MQ={capek:["Istirahat bukan tanda menyerah, tapi cara mengumpulkan tenaga lagi.","Capekmu valid. Rebahan dulu, dunia bisa menunggu sebentar.","Kamu sudah berjalan sejauh ini. Itu bukan hal kecil.","Pelan-pelan juga tetap maju, kok.","Minum air, tarik napas, lalu peluk dirimu sendiri.","Tidak semua hari harus produktif. Hari ini boleh jadi hari bernapas.","Kamu bukan mesin. Boleh berhenti sebentar, lalu lanjut dengan hati lebih ringan.","Setiap lelah yang kamu tahan, ada ganjarannya di waktu yang tepat.","Satu tugas selesai lebih baik daripada sepuluh tugas yang cuma dipikirkan.","Nailong bilang: tidur dulu, besok kita hadapi bareng."],
sedih:["Tidak apa-apa tidak baik-baik saja hari ini. Kamu tidak sendirian.","Air mata bukan kelemahan, itu tanda hatimu sedang bekerja keras.","Badai selalu berlalu, meski kadang terasa lama sekali.","Kamu berharga, bahkan di hari ketika kamu tidak merasa begitu.","Ceritakan pada orang yang kamu percaya. Beban lebih ringan kalau dibagi.","Hari ini berat, tapi kamu tetap bertahan. Itu hebat.","Peluk jauh dari Nailong, hangat sampai ke hatimu.","Kadang yang pergi memberi ruang untuk yang lebih baik.","Pelan-pelan, sembuh tidak perlu terburu-buru.","Kamu dicintai lebih banyak dari yang kamu kira."],
semangat:["Hari ini kesempatan baru. Mulai saja dari langkah kecil.","Kamu lebih kuat dari yang kamu kira, dan lebih dekat dari yang kamu sangka.","Mimpi besar dimulai dari satu langkah yang berani.","Percayalah pada prosesmu, hasilnya akan menyusul.","Setiap usaha kecil menabung jadi keberhasilan besar.","Gagal itu cuma tikungan, bukan akhir jalan.","Kamu bisa. Nailong sudah melet bangga duluan!","Fokus pada kemajuan, bukan kesempurnaan.","Doa dan usaha berjalan beriringan, jangan lelah mencoba.","Hari ini milikmu. Jadikan seru!"]};
const MP={capek:[8,6,0],sedih:[5,3,7],semangat:[2,4,1],pesan:[1,2]};
function nxt(b,k){let s=[];try{s=JSON.parse(localStorage.getItem("mq"+k)||"[]")}catch(e){}let f=b.filter(x=>!s.includes(x));if(!f.length){f=b.slice();s=[]}const x=rr(f);s.push(x);try{localStorage.setItem("mq"+k,JSON.stringify(s))}catch(e){}return x}
function motiv(k){if(k=="puisi")return puisi();clearInterval(tm2);scr("s6");const g=$("gb");$("gt").textContent="Kartu Semangat";g.style.cssText="max-width:340px";g.innerHTML="";
 const q=k=="pesan"?($("note").value.trim()||"Semoga harimu seceria Nailong hari ini.")+($("from").value.trim()?" — "+$("from").value.trim():""):nxt(MQ[k],k);
 const im=document.createElement("img");im.className="mascot pz";im.src=POSE[rr(MP[k])];g.appendChild(im);
 const m=document.createElement("div");m.className="msg";m.style.cssText="font-size:21px;margin:12px auto";m.textContent=q;g.appendChild(m);
 const b=(t,f)=>{const x=document.createElement("button");x.className="opt";x.textContent=t;x.onclick=f;g.appendChild(x)};
 if(k!="pesan")b("Kartu lain",()=>motiv(k));b("Pilih suasana lain",()=>cat("semangat"));conf(24);beep(660,.3)}
const PS=`Katanya bidadari tinggal di surga / ternyata satu nyasar ke chat-ku, dan aku nggak mau dia pulang
Kamu ngambek pun tetap menggemaskan / aku bingung mau minta maaf atau foto dulu
Nailong aja kalah gemes sama kamu / dia melet, kamu senyum, dunia memilih kamu
Kalau cinta bisa dimakan / kamu pasti porsi jumbo yang nggak pernah bikin kenyang
Terima kasih sudah sabar menghadapi aku / yang suka lupa, tapi selalu ingat kamu
Tidurmu ngorok pelan kayak kucing capek / dan itu lagu pengantar tidur favoritku sedunia
Kamu bilang aku lebay / tapi kamu juga yang tersenyum paling lebar saat aku lebay
Bidadari punya sayap buat kabur / kamu punya hati yang memilih tinggal
Aku bukan pujangga, cuma tukang ketawa / tapi buat kamu, ketawaku jadi puisi
Kamu galak sebentar, manis seharian / aku rela dimarahi asal besoknya ditraktir senyum
Dunia ribut soal harga cabai / aku cuma khawatir kamu sudah makan atau belum
Kalau pelukmu dijual, aku gadaikan semua jajan / asal bisa langganan seumur hidup
Kamu lupa kunci, lupa dompet, lupa jalan / tapi tak pernah lupa menanyakan kabarku
Matamu berbinar lihat gorengan / dan hatiku berbinar lihat kamu bahagia
Kamu itu bidadari versi hemat energi / senyum sedikit, dunia langsung pulih
Aku sering salah, kamu sering memaafkan / entah siapa yang lebih ajaib di antara kita
Kamu bilang nggak cantik hari ini / padahal kaca pun diam-diam minta foto bareng
Kantuk dan kamu sama-sama menang atasku / bedanya, kamu menang dengan senyuman
Kamu bukan sempurna, kamu pas / pas buat mengisi bagian hatiku yang kosong
Cantikmu bikin lupa password / tapi tak pernah bikin lupa jalan pulang
Ngambekmu seperti petasan kecil / meledak lucu, lalu hening menggemaskan
Kalau bidadari ikut lomba senyum / kamu juara, juri pun lupa menilai
Terima kasih pernah duduk di sampingku / saat dunia sibuk menyalahkanku
Kamu suka bilang aku bawel / padahal kamu yang paling betah mendengarkan
Aku nggak butuh bintang di langit / bintangku duduk di sebelahku sambil makan keripik
Kamu itu alarm paling lembut / membangunkan semangat tanpa teriak
Bidadari punya selendang ajaib / kamu punya sabar yang tak ada habisnya
Kamu telat dua jam, aku tetap menunggu / karena senyummu selalu sepadan
Hariku buruk, lalu kamu datang pura-pura jadi badut / aku pura-pura ketawa, lama-lama beneran
Dompet tipis pun terasa tebal / kalau kamu tertawa di sebelahku
Kamu pelukan terhangat se-RT / bahkan se-kelurahan kalau ada yang protes
Setiap kamu bilang aku nggak apa-apa / aku jadi percaya, padahal tadi nangis
Cantikmu bukan alasan aku bertahan / tapi baik hatimu yang bikin aku pulang
Kamu nawar harga sambil senyum / pedagangnya malah kasih bonus dan ikut jatuh hati
Nailong boleh melet sepuasnya / yang bikin aku meleleh tetap kamu
Kalau kamu capek, istirahatlah / biar aku yang jaga dunia sebentar
Terima kasih sudah bertahan / bahkan di hari ketika kamu ingin berhenti
Kamu salah sebut namaku sekali / dan aku mengingatnya sambil senyum tiga tahun
Aku jago bohong soal diet / tapi jujur banget soal sayang sama kamu
Bidadari pun butuh teman nonton drama / dan aku mendaftar jadi kursinya
Kamu bilang takut gelap / padahal kamu sendiri sumber terang paling meyakinkan
Kamu dan hujan sama-sama bikin ngantuk / bedanya, hujan nggak bikin hatiku hangat
Pelan-pelan kamu jadi alasan / aku semangat bangun walau hari Senin
Aku hafal tawamu lebih dari lagu favorit / dan nggak pernah bosan diputar ulang
Sayapmu mungkin tak terlihat / tapi aku terbang tiap kamu bilang aku bisa
Kamu manja seperlunya, kuat sesukamu / kombinasi yang bikin aku jatuh tiap hari
Kadang kamu cemberut tanpa alasan / dan aku jatuh cinta lagi tanpa alasan juga
Doaku tiap malam cuma satu / semoga kamu bahagia, sisanya urusan Tuhan
Kalau kamu minta bulan, aku bingung / tapi kalau minta martabak, aku langsung berangkat
Senyummu tuh vitamin gratis / efek sampingnya baper berkepanjangan
Kamu nggak pernah minta dipuji / makanya aku ingin terus memuji
Kamu kuat, tapi boleh lelah / pundakku sedia kapan saja
Terima kasih untuk tawa receh / yang diam-diam menyembuhkan hari berat
Kamu lucu waktu bingung / aku lucu waktu salah tingkah di depanmu
Katanya bidadari nggak bisa nangis / kamu bisa, dan itu yang bikin kamu paling kusayang
Kalau sedih datang, bilang ya / aku bawa pelukan dan sisa gorengan
Satu pesan darimu cukup / bikin HP yang mati rasa mendadak hidup lagi
Kamu tak perlu jadi sempurna / cukup jadi kamu, itu sudah ajaib
Setiap kamu pamit pulang / hatiku diam-diam ikut mengantar sampai pintu
Aku sering lupa tanggal penting / tapi tak pernah lupa bersyukur ada kamu
Kamu nggak sadar betapa hebatnya / makanya kubisikkan lewat puisi receh ini
Cantik itu relatif katanya / tapi kamu kasus pengecualian
Kamu rebahan pun tampak bijak / seperti filsuf yang lagi mikirin camilan
Aku bukan pangeran berkuda / cuma orang biasa dengan hati yang penuh buat kamu
Kalau bumi ini taman / kamu bunga yang memilih mekar di sebelahku
Kamu bilang aku lucu / padahal aku cuma gugup di dekatmu
Jika dunia menolakmu / datanglah, di sini pintu selalu terbuka
Bidadari mengajarkanku satu hal / sayang itu sederhana, hadir, mendengar, tinggal
Kamu menertawakan leluconku yang garing / dan itu kebaikan paling mewah yang pernah kuterima
Seandainya aku punya satu permintaan / aku minta kamu selalu tersenyum, itu saja
Tiap kamu tersenyum, aku catat / buat bukti kalau hidup ini baik-baik saja
Kamu nyasar di jalan pulang / tapi tepat sekali sampai di hatiku
Kamu sering bilang makasih / padahal akulah yang berutang seumur hidup
Kalau hidup adalah drama / kamu pemeran utama yang paling kutunggu episodenya
Kamu nangis nonton film sedih / aku nangis lihat kamu nangis, kita sama-sama konyol dan hangat
Kamu tak butuh sayap jadi bidadari / cukup tangan yang menggenggam siapa pun yang jatuh
Aku bukan penyair, aku cuma penggemarmu / yang tak pernah minta tanda tangan, cukup senyum
Pagi cerah karena kamu bangun / bukan karena mataharinya rajin
Kamu bilang butuh waktu sendiri / aku tunggu sambil menjaga pintu hatimu tetap hangat
Kamu jarang minta tolong / jadi sekali minta, aku langsung jadi pahlawan lebay
Katanya cinta itu buta / tapi aku melihatmu jelas banget, dan itu cukup
Kamu itu karunia / bukan tiap hari, tapi setiap detik
Bidadari tak harus bersayap / kadang cukup berbaju sederhana dan berhati selembut kamu
Terima kasih sudah memilih bertahan / saat mudah sekali memilih pergi
Rindu itu repot / tapi kalau untukmu, aku rela repot seumur hidup
Tawamu kutaruh di saku / kukeluarkan tiap hari buruk datang
Kamu gabungan teh hangat dan pelukan / obat segala lelah tanpa resep dokter
Meski kita kadang bertengkar soal hal sepele / aku tak pernah ragu soal siapa yang kupilih
Kamu cantik waktu bangun tidur / dan cantik juga waktu marah, aku nyerah, kamu menang
Dunia boleh lupa ulang tahunmu / tapi hatiku mencatatnya rapi di halaman paling depan
Nailong menitip salam / katanya, jaga bidadari ini baik-baik, dia langka
Kamu doa ibuku yang terkabul / dalam bentuk senyum yang sabar
Kalau suatu hari kamu merasa kecil / ingatlah, kamu alasan seseorang bersyukur
Hari ini kamu sudah cukup / tak perlu lebih, tak perlu sempurna
Terima kasih untuk kebaikan yang kau anggap biasa / padahal itu istimewa buatku
Aku sering bercanda berlebihan / tapi sungguh, kamu hal paling serius dalam doaku
Jika kelak aku lupa banyak hal / semoga aku tak lupa cara berterima kasih padamu
Kamu mungkin bukan segalanya / tapi kamu bagian terbaik dari semuanya
Kamu hadir tanpa banyak janji / dan menepati semuanya dengan diam yang hangat
Yeyyy Selamat Yaa Sayang, kamu juara hatiku / bidadari paling cantik, paling kucinta, versi Nailong 🥰`.trim().split("\n");
function puisi(){clearInterval(tm2);scr("s6");const g=$("gb");$("gt").textContent="Puisi untuk "+nm();g.style.cssText="max-width:340px";g.innerHTML="";
 const q=nxt(PS,"p").split(" / ").join("\n");
 const im=document.createElement("img");im.className="mascot pz";im.src=POSE[rr([2,4,1,5])];g.appendChild(im);
 const m=document.createElement("div");m.className="msg";m.style.cssText="font-size:20px;margin:12px auto;white-space:pre-line";m.textContent="✨ "+q+" ✨";g.appendChild(m);
 const b=(t,f)=>{const x=document.createElement("button");x.className="opt";x.textContent=t;x.onclick=f;g.appendChild(x)};
 b("Puisi lain",puisi);b("Kembali",()=>cat("semangat"));conf(30);beep(660,.3)}
const PWH="1235cf6fb361461cbabacc887a4a464699dca5b823f4bf47498faeb319a36d4e";
function terbang(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="";
 g.innerHTML='<canvas id="cv" width="340" height="440" style="width:min(340px,92vw);border-radius:20px;touch-action:none;display:block;margin:auto"></canvas>';
 const c=$("cv"),x=c.getContext("2d"),W=340,H=440,GY=H-50,im=new Image();im.src=POSE[1];
 let y=200,v=0,P=[],fr=0,sc=0,st=0,best=0;const cl=[[30,70,1],[190,120,.7],[290,50,1.2]];
 try{best=+localStorage.getItem("nlf")||0}catch(e){}
 T.textContent="Nailong Terbang · Rekor "+best;
 const fb=document.createElement("button");fb.className="opt";fb.textContent="Selesai";fb.onclick=()=>fin("#","Skor terbaik "+best);g.appendChild(fb);
 function flap(){if(st==2){y=200;v=0;P=[];fr=0;sc=0;st=0;T.textContent="Nailong Terbang · Rekor "+best;return}st=1;v=-6.4;beep(620,.08)}
 c.onpointerdown=e=>{e.preventDefault();flap()};
 function die(){if(st==2)return;st=2;beep(160,.45);if(sc>best){best=sc;try{localStorage.setItem("nlf",best)}catch(e){}}}
 function txt(t,yy){x.font="800 24px sans-serif";x.textAlign="center";x.lineWidth=5;x.strokeStyle="#3a2a00";x.strokeText(t,W/2,yy);x.fillStyle="#fff";x.fillText(t,W/2,yy)}
 function step(){if(!$("cv"))return;
  if(st==1){v+=.4;y+=v;fr++;const gap=Math.max(110,150-sc*2),sp=2.4+Math.min(sc,25)*.05;
   if(fr%Math.round(200/sp)==1)P.push({x:W,t:rnd(50,GY-gap-50),g:gap,s:0});
   P.forEach(o=>o.x-=sp);if(P.length&&P[0].x<-70)P.shift();
   P.forEach(o=>{if(!o.s&&o.x+52<70){o.s=1;sc++;beep(900,.1);T.textContent="Nailong Terbang · "+sc+" · Rekor "+Math.max(best,sc)}});
   const bx=74,by=y+6,bw=40,bh=38;
   if(y<-6||y+bh+6>GY)die();
   P.forEach(o=>{if(bx+bw>o.x&&bx<o.x+52&&(by<o.t||by+bh>o.t+o.g))die()})}
  else if(st==0)y=200+Math.sin(Date.now()/260)*8;
  cl.forEach(k=>{k[0]-=.3*k[2];if(k[0]<-70)k[0]=W+30});
  const gr=x.createLinearGradient(0,0,0,GY);gr.addColorStop(0,"#7fd0ff");gr.addColorStop(1,"#d8f3ff");x.fillStyle=gr;x.fillRect(0,0,W,H);
  x.fillStyle="#ffffffcc";cl.forEach(k=>{x.beginPath();x.arc(k[0],k[1],22*k[2],0,7);x.arc(k[0]+24*k[2],k[1]+4,18*k[2],0,7);x.arc(k[0]-22*k[2],k[1]+6,16*k[2],0,7);x.fill()});
  P.forEach(o=>{x.fillStyle="#ff9ec1";x.fillRect(o.x,0,52,o.t);x.fillRect(o.x,o.t+o.g,52,H);x.fillStyle="#ff6fa3";x.fillRect(o.x-4,o.t-16,60,16);x.fillRect(o.x-4,o.t+o.g,60,16)});
  x.fillStyle="#8fd36a";x.fillRect(0,GY,W,50);x.fillStyle="#6cb84a";x.fillRect(0,GY,W,8);
  x.save();x.translate(94,y+25);x.rotate(Math.max(-.4,Math.min(.9,v*.07)));x.drawImage(im,-27,-26,54,52);x.restore();
  if(st==0)txt("Ketuk untuk terbang!",H/2-60);if(st==2){txt("Skor "+sc+" · Rekor "+best,H/2-70);txt("Ketuk untuk lagi",H/2-35)}
  requestAnimationFrame(step)}
 step()}
function gaya(){clearInterval(tm2);scr("s6");const g0=qgen,T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";
 const Q=[1,3,5,8],tone=[523,440,659,392];let seq=[],pos=0,lock=true;
 const grid=document.createElement("div");grid.style.cssText="display:grid;grid-template-columns:repeat(2,130px);gap:12px;justify-content:center";g.appendChild(grid);
 const B=Q.map((q,i)=>{const b=document.createElement("button");b.className="cd";b.style.cssText="width:130px;height:130px;background:var(--card);padding:6px;transition:transform .15s";const im=document.createElement("img");im.src=POSE[q];im.style.cssText="max-width:100%;max-height:100%";b.appendChild(im);b.onclick=()=>tap(i);grid.appendChild(b);return b});
 const mk=(t,f)=>{const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=f;g.appendChild(b)};
 function lit(i,ms){const b=B[i];b.style.transform="scale(1.12)";b.style.boxShadow="0 0 0 6px #ff7aa8";beep(tone[i],.3);setTimeout(()=>{b.style.transform="";b.style.boxShadow=""},ms)}
 function play(){lock=true;T.textContent="Perhatikan Nailong... ronde "+seq.length;seq.forEach((s,k)=>setTimeout(()=>{if(g0==qgen)lit(s,450)},700+k*750));setTimeout(()=>{if(g0==qgen){lock=false;pos=0;T.textContent="Giliranmu! Ronde "+seq.length}},700+seq.length*750)}
 function next(){seq.push(Math.floor(Math.random()*4));play()}
 function tap(i){if(lock)return;lit(i,200);
  if(i!=seq[pos]){lock=true;beep(150,.5);T.textContent="Yah, berhenti di ronde "+(seq.length-1);mk("Main lagi",gaya);mk("Selesai",()=>fin("#","Sampai ronde "+(seq.length-1)));return}
  pos++;if(pos==seq.length){lock=true;if(seq.length>=10){setTimeout(()=>fin("#","Hafal semua 10 ronde!"),500);return}conf(8);setTimeout(()=>{if(g0==qgen)next()},800)}}
 next()}
function geser(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";
 const a=[...Array(9).keys()];let bp=8,mv=0;
 const nb=p=>{const r=Math.floor(p/3),c=p%3,o=[];if(r>0)o.push(p-3);if(r<2)o.push(p+3);if(c>0)o.push(p-1);if(c<2)o.push(p+1);return o};
 for(let i=0;i<150;i++){const o=nb(bp),q=o[Math.floor(Math.random()*o.length)];[a[bp],a[q]]=[a[q],a[bp]];bp=q}
 const pv=document.createElement("img");pv.src=IMG;pv.alt="";pv.style.cssText="width:64px;height:64px;border-radius:12px;border:3px solid var(--acc);margin-bottom:8px";g.appendChild(pv);
 const bd=document.createElement("div");bd.style.cssText="position:relative;width:306px;height:306px;margin:auto";g.appendChild(bd);
 function draw(){bd.innerHTML="";a.forEach((id,p)=>{if(id==8)return;const t=document.createElement("div");
  t.style.cssText="position:absolute;width:100px;height:100px;border-radius:12px;border:2px solid var(--acc);box-sizing:border-box;background:url("+IMG+") "+(-(id%3)*100)+"px "+(-Math.floor(id/3)*100)+"px/300px 300px;left:"+(p%3*103)+"px;top:"+(Math.floor(p/3)*103)+"px;cursor:pointer";
  t.onclick=()=>{const q=a.indexOf(8);if(nb(p).includes(q)){[a[p],a[q]]=[a[q],a[p]];mv++;T.textContent="Susun gambarnya! Langkah: "+mv;beep(500,.08);draw();if(a.every((v,i)=>v==i))setTimeout(()=>fin("#","Puzzle tersusun dalam "+mv+" langkah"),500)}};bd.appendChild(t)})}
 T.textContent="Susun gambarnya! Langkah: 0";draw()}
function mkb(g,t,f){const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=f;g.appendChild(b)}
function tarik(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="";T.textContent="Tarik Tambang · Tap secepatnya!";
 g.innerHTML='<div style="width:min(340px,92vw);height:min(440px,62vh);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;touch-action:none;margin:auto"><div class="tb" id="a2" style="background:#ffd6e6;transform:rotate(180deg)"></div><div class="tb" id="a1" style="background:#ffe9a8"></div></div>';
 const A=[0,$("a1"),$("a2")];let p=0,done=false;
 [1,2].forEach(i=>{A[i].innerHTML='<img src="'+POSE[i==1?2:4]+'" alt=""><div>Pemain '+i+' · TAP!</div>';A[i].style.flexGrow=10;
  A[i].onpointerdown=e=>{e.preventDefault();if(done)return;p+=i==1?1:-1;A[1].style.flexGrow=10+p;A[2].style.flexGrow=10-p;beep(300+Math.abs(p)*30,.05);
   if(Math.abs(p)>=10){done=true;T.textContent="🏆 Pemain "+(p>0?1:2)+" menang!";conf(40);mkb(g,"Main lagi",tarik);mkb(g,"Selesai",()=>fin("#","Pemain "+(p>0?1:2)+" menang!"))}}});
}
function reaksi(){clearInterval(tm2);scr("s6");const g0=qgen,T=$("gt"),g=$("gb");g.style.cssText="";T.textContent="Reaksi Kilat · Duluan 3 poin";
 g.innerHTML='<div style="position:relative;width:min(340px,92vw);height:min(440px,62vh);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;touch-action:none;margin:auto"><div class="tb" id="r2" style="background:#ffd6e6;transform:rotate(180deg)"></div><div class="tb" id="r1" style="background:#ffe9a8"></div><img id="rm" alt="" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);height:110px;display:none;pointer-events:none"></div>';
 const R=[0,$("r1"),$("r2")],s=[0,0,0];let go=false,over=false,busy=false,tm;
 function show(m){[1,2].forEach(i=>{R[i].innerHTML='<div>Pemain '+i+'</div><b style="font-size:44px">'+s[i]+'</b><div>'+m+'</div>'})}
 function round(){go=false;busy=false;show("Tunggu...");$("rm").style.display="none";tm=setTimeout(()=>{if(g0!=qgen||over)return;go=true;show("TAP SEKARANG!");$("rm").src=POSE[rr([0,2,4])];$("rm").style.display="block";beep(900,.2)},rnd(1500,4500))}
 function point(p,m){clearTimeout(tm);go=false;busy=true;s[p]++;beep(660,.2);if(s[p]>=3){over=true;show("");T.textContent="🏆 Pemain "+p+" menang!";conf(40);mkb(g,"Main lagi",reaksi);mkb(g,"Selesai",()=>fin("#","Pemain "+p+" menang "+s[p]+" : "+s[3-p]));return}show(m);setTimeout(()=>{if(g0==qgen)round()},1400)}
 [1,2].forEach(i=>{R[i].onpointerdown=e=>{e.preventDefault();if(over||busy)return;if(go)point(i,"Pemain "+i+" paling cepat!");else if(R[i].dataset.l!="1"){R[i].dataset.l="1";clearTimeout(tm);point(3-i,"Pemain "+i+" kecepetan, poin untuk lawan");setTimeout(()=>{R[i].dataset.l=""},1500)}}});
 round()}
function xo(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";T.textContent="Giliran Pemain 1";
 const M=[1,5],b=Array(9).fill(0),L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let t=0,done=false;
 const lg=document.createElement("div");lg.style.cssText="display:flex;gap:18px;justify-content:center;align-items:center;margin-bottom:8px;font-weight:800";lg.innerHTML='<span>Pemain 1 <img src="'+POSE[1]+'" style="height:34px;vertical-align:middle" alt=""></span><span>Pemain 2 <img src="'+POSE[5]+'" style="height:34px;vertical-align:middle" alt=""></span>';g.appendChild(lg);
 const bd=document.createElement("div");bd.style.cssText="display:grid;grid-template-columns:repeat(3,100px);gap:6px;justify-content:center";g.appendChild(bd);
 function fin2(){conf(30);mkb(g,"Main lagi",xo);mkb(g,"Selesai",()=>fin("#",T.textContent))}
 const cells=b.map((_,i)=>{const c=document.createElement("button");c.className="cd";c.style.cssText="width:100px;height:100px;padding:4px";
  c.onclick=()=>{if(done||b[i])return;b[i]=t+1;const im=document.createElement("img");im.src=POSE[M[t]];im.alt="";im.style.cssText="max-width:100%;max-height:100%";c.appendChild(im);beep(t?440:660,.1);
   const w=L.find(l=>l.every(k=>b[k]==t+1));
   if(w){done=true;w.forEach(k=>{cells[k].style.boxShadow="0 0 0 5px #ff7aa8"});T.textContent="🏆 Pemain "+(t+1)+" menang!";fin2()}
   else if(b.every(x=>x)){done=true;T.textContent="Seri! Sama-sama hebat";fin2()}
   else{t=1-t;T.textContent="Giliran Pemain "+(t+1)}};
  bd.appendChild(c);return c})}
const OT={ket:"Lomba Ketik",c4:"4 Berjajar",chat:"Obrolan",xo:"Tic-Tac-Toe",tarik:"Tarik Tambang",suit:"Suit Nailong",dadu:"Balap Dadu",rx:"Reaksi Kilat",qz:"Kuis Adu Cepat"};
async function lobby(kind){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");T.textContent="Game Online · "+OT[kind];g.style.cssText="max-width:340px";g.innerHTML="";
 const info=document.createElement("div");info.className="msg";info.style.fontSize="16px";info.textContent="Kamu dan lawanmu buka link ini di HP masing-masing, lalu masukkan kode ruang yang sama. Hanya orang yang sudah diundang dan masuk akun yang bisa ikut.";g.appendChild(info);
 const ip=document.createElement("input");ip.placeholder="Kode ruang (sama di kedua HP)";ip.maxLength=20;ip.style.marginTop="10px";try{ip.value=localStorage.getItem("nlc")||""}catch(e){}g.appendChild(ip);
 const st=document.createElement("div");st.style.cssText="min-height:24px;font-weight:800;margin-top:6px";
 mkb(g,"Masuk ruang",async()=>{const code=ip.value.trim().toLowerCase().replace(/[^a-z0-9]/g,"");if(code.length<3){st.textContent="Isi kode ruang minimal 3 huruf atau angka";return}
  try{localStorage.setItem("nlc",code)}catch(e){}
  if(curR){try{curR.leave()}catch(e){}curR=null}st.textContent="Menghubungkan...";let R=null;try{const r=await claude.use("room");if(r)R=await r.join("nl-"+kind+"-"+code)}catch(e){}
  if(!R){st.textContent="Online belum tersedia di sini. Pastikan kamu sudah masuk akun dan diundang dengan akses edit, atau main berdua di satu HP.";return}
  ({ket:ketOn,c4:c4On,chat:chatOn,xo:xoOn,tarik:tarikOn,suit:suitOn,dadu:daduOn,rx:rxOn,qz:qzOn})[kind](R,code);if(kind!="chat")chatDock(R)});g.appendChild(st)}
var curR=null,onNew=()=>{};
const b64=u=>btoa(String.fromCharCode(...u)),ub=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function mkE2(){const kp=await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveKey"]),j=await crypto.subtle.exportKey("jwk",kp.publicKey);
 return {my:{x:j.x,y:j.y},async key(p){const k=await crypto.subtle.importKey("jwk",{kty:"EC",crv:"P-256",x:p.x,y:p.y,ext:true},{name:"ECDH",namedCurve:"P-256"},false,[]);return crypto.subtle.deriveKey({name:"ECDH",public:k},kp.privateKey,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}}}
async function safe(a,b){const s=[a.x+a.y,b.x+b.y].sort().join(""),h=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)));return [...h.slice(0,6)].map(x=>String(x%100).padStart(2,"0")).join(" ")}
function chatUI(host,R){
 host.innerHTML='<div id="ph"></div><div id="cl"></div><div id="ty"></div><div id="rc" hidden></div><div id="cr"><button id="cg" type="button" aria-label="Kirim gambar">🖼️</button><input id="ci" maxlength="300" placeholder="Menyiapkan enkripsi..." disabled><button id="cs" type="button">Kirim</button></div><input id="cf" type="file" accept="image/*" hidden>';
 const l=$("cl"),inp=$("ci"),pr=$("ph"),tyl=$("ty"),rc=$("rc");let ck=null,opub="",E=null,rp=null,code6="",tt=0;const imgs={};
 const el=(t,x,c)=>{const e=document.createElement(t);if(x!==undefined)e.textContent=x;if(c)e.className=c;return e};
 const me=()=>({name:($("to").value.trim()||"Pemain").slice(0,20),em:$("kb").value||"🙂"});
 const oth=()=>R.peers().find(p=>!p.sameTab&&p.kind=="viewer"&&p.presence&&p.presence.name);
 const full=()=>R.peers().filter(p=>p.kind=="viewer").length>2;
 const nm=()=>String(oth()&&oth().presence.name||"Lawan").slice(0,20);
 function prof(){const o=oth(),m=me();pr.innerHTML="";pr.appendChild(el("b",o?(o.presence.em||"🙂")+" "+nm():"Menunggu lawan..."));pr.appendChild(el("small",o?"🟢 Online":"⚪ Offline"));pr.appendChild(el("small","Kamu: "+m.em+" "+m.name));pr.appendChild(el("small",full()?"Ruang penuh":ck?"🔒 Terenkripsi · kode "+code6:"🔓 Menyiapkan enkripsi..."))}
 async function sync(){const o=oth();prof();tyl.textContent=o&&o.presence.typing===true?nm()+" sedang mengetik...":"";
  if(!o){ck=null;opub="";inp.disabled=true;return}
  const p=o.presence.pub;if(!p||typeof p.x!="string"||typeof p.y!="string"||full())return;const pj=JSON.stringify(p);
  if(pj!==opub&&E){opub=pj;try{ck=await E.key(p);code6=await safe(E.my,p);inp.disabled=false;inp.placeholder="Tulis pesan...";prof()}catch(e){ck=null}}}
 const enc=async o=>{const iv=crypto.getRandomValues(new Uint8Array(12)),c=await crypto.subtle.encrypt({name:"AES-GCM",iv},ck,new TextEncoder().encode(JSON.stringify(o)));return {iv:b64(iv),c:b64(new Uint8Array(c))}};
 const dec=async d=>JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:ub(d.iv)},ck,ub(d.c))));
 const tx=async o=>{if(ck)await R.emit("chat",await enc(o))};
 function bub(id,mine,who,text,src,rq){const d=el("div","",mine?"me":"th");if(!mine)d.appendChild(el("small",who+":","nm"));if(rq)d.appendChild(el("div",rq,"qt"));if(src){const im=new Image();im.src=src;im.alt="gambar";d.appendChild(im)}if(text)d.appendChild(el("span",text));
  d.onclick=()=>{rp={who:mine?"Kamu":who,rq:((src?"🖼️ Gambar":text)||"").slice(0,60)};rc.hidden=false;rc.textContent="↩ Membalas "+rp.who+": "+rp.rq+"  ✕";inp.focus()};l.appendChild(d);l.scrollTop=l.scrollHeight;if(!mine)onNew()}
 rc.onclick=()=>{rp=null;rc.hidden=true};
 async function send(){const t=inp.value.trim().slice(0,300);if(!t||!ck)return;inp.value="";const id=Math.random().toString(36).slice(2,8),q=rp?rp.who+": "+rp.rq:"";bub(id,true,"",t,null,q);await tx({t:"m",id,x:t,rq:q});rp=null;rc.hidden=true;clearTimeout(tt);R.presence({typing:false})}
 $("cs").onclick=send;inp.addEventListener("keydown",e=>{if(e.key=="Enter")send()});
 inp.oninput=()=>{R.presence({typing:true});clearTimeout(tt);tt=setTimeout(()=>R.presence({typing:false}),2500)};
 $("cg").onclick=()=>{if(ck)$("cf").click()};
 $("cf").onchange=async e=>{const f=e.target.files[0];e.target.value="";if(!f||!ck)return;try{const bm=await createImageBitmap(f);let u="";for(const w of [220,170,130]){const r=Math.min(1,w/Math.max(bm.width,bm.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(bm.width*r));c.height=Math.max(1,Math.round(bm.height*r));c.getContext("2d").drawImage(bm,0,0,c.width,c.height);u=c.toDataURL("image/jpeg",.6);if(u.length<=13000)break}
  if(u.length>13000)return;const id=Math.random().toString(36).slice(2,8),n=Math.ceil(u.length/2400);bub(id,true,"","",u);for(let k=0;k<n;k++){await tx({t:"i",id,k,n,d:u.slice(k*2400,k*2400+2400)});await new Promise(r=>setTimeout(r,60))}}catch(x){}};
 R.on("chat",async m=>{if(m.isMe||!ck||full())return;let o;try{o=await dec(m.data)}catch(e){return}const w=nm();
  if(o.t=="m"&&typeof o.x=="string"){bub(String(o.id||"").slice(0,8),false,w,o.x.slice(0,300),null,typeof o.rq=="string"?o.rq.slice(0,90):"");beep(700,.08)}
  else if(o.t=="i"&&Number.isInteger(o.k)&&Number.isInteger(o.n)&&o.n>0&&o.n<=8&&o.k>=0&&o.k<o.n&&typeof o.d=="string"&&o.d.length<=2400&&typeof o.id=="string"){const q=imgs[o.id]=imgs[o.id]||{n:o.n,p:{}};q.p[o.k]=o.d;
   if(Object.keys(q.p).length==q.n){const u=Array.from({length:q.n},(_,i)=>q.p[i]).join("");delete imgs[o.id];if(/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(u)&&u.length<=20000){bub(o.id.slice(0,8),false,w,"",u);beep(700,.08)}}}});
 R.onPeers(()=>sync());prof();mkE2().then(e=>{E=e;R.presence({...me(),pub:e.my,typing:false});sync()})}
function chatDock(R){curR=R;const old=$("cw");if(old)old.remove();const w=document.createElement("div");w.id="cw";w.innerHTML='<button id="cb" type="button" aria-label="Obrolan">💬<i id="cn" hidden></i></button><div id="cp" hidden></div>';document.body.appendChild(w);
 chatUI($("cp"),R);const p=$("cp"),n=$("cn");let un=0;onNew=()=>{if(p.hidden){un++;n.textContent=un;n.hidden=false}};$("cb").onclick=()=>{p.hidden=!p.hidden;if(!p.hidden){un=0;n.hidden=true}}}
function chatOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";T.textContent="Obrolan Online · ruang "+code;chatDock(R);$("cw").classList.add("big");$("cp").hidden=false}
const KT=["Nailong melet lalu tidur lagi sampai siang","Aku sayang kamu lebih banyak dari jumlah camilan","Rebahan itu bukan malas tapi mengisi tenaga","Kopi dulu baru semangat menghadapi dunia","Senyummu bikin hariku jadi lebih ringan","Bidadari boleh iri sama tawa kita berdua","Gorengan hangat dan hujan adalah kombinasi terbaik","Hari ini kita menang walau belum sarapan"];
function ketOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="width:min(560px,94vw)";g.innerHTML="";
 const sb=document.createElement("div");sb.className="msg";sb.style.cssText="font-size:20px;line-height:1.5;text-align:left;max-width:none";g.appendChild(sb);
 const bars=document.createElement("div");g.appendChild(bars);
 const ip=document.createElement("input");ip.style.cssText="width:100%;margin-top:8px;font-size:18px";ip.disabled=true;ip.autocomplete="off";ip.placeholder="Menunggu...";g.appendChild(ip);
 const st=document.createElement("div");st.style.cssText="font-weight:800;min-height:26px;margin:6px 0";g.appendChild(st);
 let S=null,t0=0,mine=null,theirs=null,over=false,run=false,mp=0,gr=0;
 const o=duo(R,()=>{if(o.my==0&&o.n==2&&!S){const i=Math.floor(Math.random()*KT.length);R.emit("ket",{k:"s",i});go(i)}upd()});
 const tp=()=>{const p=R.peers().find(x=>!x.sameTab&&x.kind=="viewer");return p&&p.presence&&Number.isInteger(p.presence.tp)?p.presence.tp:0};
 function upd(){const L=S?S.length:1,a=Math.min(100,mp*100/L),b=Math.min(100,tp()*100/L);sb.textContent=S||(o.n<2?"Menunggu lawan... kode: "+code:"Menyiapkan kalimat...");
  bars.innerHTML=[["Kamu",a,"#ffc928"],["Lawan",b,"#ff7aa8"]].map(x=>'<div style="text-align:left;font-weight:800;margin:4px 0">'+x[0]+'<div style="height:14px;border-radius:8px;background:#0002;overflow:hidden"><div style="height:100%;width:'+x[1]+'%;background:'+x[2]+'"></div></div></div>').join("");T.textContent="Lomba Ketik · Siapa paling cepat"}
 function go(i){S=KT[i];let c=3;st.textContent="Bersiap... "+c;const iv=setInterval(()=>{c--;if(c>0)st.textContent="Bersiap... "+c;else{clearInterval(iv);run=true;t0=performance.now();st.textContent="MULAI MENGETIK!";ip.disabled=false;ip.value="";ip.placeholder="Ketik kalimat di atas";ip.focus()}},900);upd()}
 ip.oninput=()=>{if(!run||over)return;const v=ip.value;let k=0;while(k<v.length&&v[k]==S[k])k++;ip.style.background=k==v.length?"":"#ffc2c2";mp=k;R.presence({tp:k});upd();
  if(v==S){mine=Math.round(performance.now()-t0);run=false;ip.disabled=true;R.emit("ket",{k:"d",ms:mine});settle()}};
 function settle(){if(over)return;if(mine!==null&&theirs!==null)return end2();if(!gr)gr=setTimeout(end2,1500)}
 function end2(){if(over)return;over=true;run=false;ip.disabled=true;const w=mine!==null&&(theirs===null||mine<=theirs);const f=x=>x===null?"-":(x/1000).toFixed(1)+" dtk";st.textContent=(w?"🏆 Kamu menang!":"Lawan menang, semangat!")+" · Kamu "+f(mine)+" · Lawan "+f(theirs);conf(w?40:0);beep(w?880:200,.3)}
 R.on("ket",m=>{if(m.isMe)return;const d=m.data;if(!d)return;if(d.k=="s"&&!S&&Number.isInteger(d.i)&&d.i>=0&&d.i<KT.length)go(d.i);else if(d.k=="d"&&Number.isInteger(d.ms)&&d.ms>0&&d.ms<600000){theirs=d.ms;settle()}});
 mkb(g,"Selesai",()=>fin("#",st.textContent));upd()}
function c4On(R,code){const T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";const C=7,Rw=6;let b=Array(42).fill(0),t=0,n=0;
 const bd=document.createElement("div");bd.id="c4";bd.style.cssText="display:grid;grid-template-columns:repeat(7,var(--s,min(42px,11vw)));gap:5px;justify-content:center;background:#2b6cb0;padding:8px;border-radius:14px;margin:auto;width:fit-content";g.appendChild(bd);
 const cells=[...Array(42)].map((_,i)=>{const c=document.createElement("button");c.type="button";c.style.cssText="width:var(--s,min(42px,11vw));height:var(--s,min(42px,11vw));border-radius:50%;border:0;background:#fff;padding:0;box-shadow:inset 0 3px 4px #0003";c.onclick=()=>drop(i%C);bd.appendChild(c);return c});
 const o=duo(R,ch=>{if(ch.joined.length&&n>0&&o.my>=0&&o.my<2)R.emit("c4",{b,t,n});paint()});
 function win(){for(let r=0;r<Rw;r++)for(let c=0;c<C;c++){const v=b[r*C+c];if(!v)continue;for(const[dr,dc]of[[0,1],[1,0],[1,1],[1,-1]]){let k=1;while(k<4){const a=r+dr*k,e=c+dc*k;if(a<0||a>=Rw||e<0||e>=C||b[a*C+e]!=v)break;k++}if(k==4)return v}}return 0}
 function drop(c){if(o.n<2||o.my<0||o.my>1||t!=o.my||win()||b.every(x=>x))return;for(let r=Rw-1;r>=0;r--)if(!b[r*C+c]){b[r*C+c]=o.my+1;t=1-o.my;n++;R.emit("c4",{b,t,n});beep(500,.1);paint();return}}
 function paint(){cells.forEach((c,i)=>{c.style.background=b[i]==1?"#ffc928":b[i]==2?"#ff5c8a":"#fff"});const w=win(),full=b.every(x=>x);let m;
  if(o.n<2)m="Menunggu lawan... kode: "+code;else if(o.my<0||o.my>1)m="Ruang penuh";else if(w){m=w-1==o.my?"🏆 Kamu menang!":"Lawan menang, semangat!";if(w-1==o.my)conf(30)}else if(full)m="Seri! Sama-sama hebat";else m=t==o.my?"Giliranmu!":"Giliran lawan...";
  T.textContent="4 Berjajar · "+m+(o.my==0?" (kamu kuning)":o.my==1?" (kamu pink)":"")}
 R.on("c4",m=>{if(m.isMe)return;const d=m.data;if(d&&Array.isArray(d.b)&&d.b.length==42&&d.b.every(x=>x===0||x===1||x===2)&&(d.t===0||d.t===1)&&Number.isInteger(d.n)&&(d.n>=n||d.n==0)){b=d.b;t=d.t;n=d.n;paint()}});
 mkb(g,"Main lagi",()=>{b=Array(42).fill(0);t=0;n=0;R.emit("c4",{b,t,n});paint()});mkb(g,"Selesai",()=>fin("#",T.textContent));paint()}
function duo(R,cb){const o={n:1,my:-1},f=()=>{const ps=R.peers().map(p=>p.peer).sort(),me=R.peers().find(p=>p.sameTab);o.n=ps.length;o.my=me?ps.indexOf(me.peer):-1};R.onPeers(ch=>{f();cb(ch)});f();return o}
function suitOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="max-width:340px";g.innerHTML="";
 const S=["✊","✌️","✋"];let r=0,mine=-1,theirs=-1,sc=[0,0],buf={},over=false,rev="";
 const box=document.createElement("div");box.className="msg";box.style.cssText="font-size:21px;min-height:84px;white-space:pre-line";g.appendChild(box);
 const row=document.createElement("div");row.style.cssText="display:flex;gap:10px;justify-content:center;margin:10px 0";g.appendChild(row);
 const bt=S.map((e,i)=>{const b=document.createElement("button");b.className="ee";b.style.cssText="width:84px;height:84px;font-size:44px;border-radius:22px";b.textContent=e;b.onclick=()=>{if(mine>=0||over||o.n<2||o.my<0||o.my>1)return;mine=i;R.emit("suit",{c:i,r});beep(500,.1);paint();res()};row.appendChild(b);return b});
 const o=duo(R,ch=>{if(ch.joined.length&&mine>=0)R.emit("suit",{c:mine,r});paint()});
 function paint(){T.textContent="Suit Online · Skor "+sc[0]+" : "+sc[1];let m;
  if(o.n<2)m="Menunggu lawan... kode: "+code;else if(o.my<0||o.my>1)m="Ruang penuh";else if(over)m=rev+"\n"+(sc[0]>sc[1]?"🏆 Kamu juara!":"Lawan juara, semangat!");else if(rev)m=rev;else m=mine<0?"Pilih jurusmu! (duluan 3 poin)":"Menunggu pilihan lawan...";
  box.textContent=m;bt.forEach(b=>{b.disabled=mine>=0||over||o.n<2||o.my<0||o.my>1})}
 function res(){if(mine<0||theirs<0||rev||over)return;const d=(theirs-mine+3)%3;let w;if(d==1){sc[0]++;w="Kamu menang ronde ini!"}else if(d==2){sc[1]++;w="Lawan menang ronde ini"}else w="Seri!";rev=S[mine]+" vs "+S[theirs]+"\n"+w;beep(d==1?880:d==2?200:500,.2);
  if(sc[0]>=3||sc[1]>=3){over=true;conf(sc[0]>=3?40:0)}else setTimeout(()=>{r++;mine=-1;theirs=buf[r]!==undefined?buf[r]:-1;rev="";paint();res()},1800);paint()}
 R.on("suit",m=>{if(m.isMe)return;const d=m.data;if(!d||!Number.isInteger(d.c)||d.c<0||d.c>2||!Number.isInteger(d.r))return;if(d.r==r&&theirs<0){theirs=d.c;res()}else if(d.r>r)buf[d.r]=d.c;paint()});
 mkb(g,"Selesai",()=>fin("#",T.textContent));paint()}
function daduOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="max-width:340px";g.innerHTML="";
 const J={4:14,9:18,20:29,17:6,24:12,27:15};let p=[0,0],t=0,cnt=0,msg="";
 const box=document.createElement("div");box.className="msg";box.style.cssText="font-size:19px;min-height:64px;white-space:pre-line";g.appendChild(box);
 const bars=document.createElement("div");bars.style.margin="8px 0";g.appendChild(bars);
 const rb=document.createElement("button");rb.className="opt";rb.style.fontSize="24px";rb.textContent="🎲 Lempar dadu";g.appendChild(rb);
 const o=duo(R,ch=>{if(ch.joined.length&&cnt>0&&o.my>=0&&o.my<2)R.emit("dadu",{p,t,n:cnt,v:0,j:0});paint()});
 function paint(){const w=p[0]>=30?0:p[1]>=30?1:-1;
  bars.innerHTML=[0,1].map(i=>'<div style="margin:6px 0;text-align:left;font-weight:800">'+(i==o.my?"Kamu":"Lawan")+' · kotak '+Math.min(p[i],30)+'/30<div style="height:16px;border-radius:9px;background:#0002;overflow:hidden"><div style="height:100%;width:'+Math.min(100,p[i]*100/30)+'%;background:'+(i==0?"#ffc928":"#ff7aa8")+'"></div></div></div>').join("");
  let m;if(o.n<2)m="Menunggu lawan... kode: "+code;else if(o.my<0||o.my>1)m="Ruang penuh";else if(w>=0)m=w==o.my?"🏆 Kamu sampai duluan!":"Lawan sampai duluan, semangat!";else m=(msg?msg+"\n":"")+(t==o.my?"Giliranmu!":"Giliran lawan...");
  box.textContent=m;T.textContent="Balap Dadu · Siapa duluan ke 30";rb.disabled=!(o.n>=2&&o.my>=0&&o.my<2&&t==o.my&&w<0)}
 rb.onclick=()=>{const v=1+Math.floor(Math.random()*6);let x=p[o.my]+v,j=0,m="Kamu dapat "+v;if(J[x]){j=J[x];m+=j>x?" · naik tangga ke "+j+" 🪜":" · kena ular turun ke "+j+" 🐍";x=j}p[o.my]=x;t=1-o.my;cnt++;msg=m;beep(400+v*80,.15);R.emit("dadu",{p,t,n:cnt,v,j});if(x>=30)conf(40);paint()};
 R.on("dadu",m=>{if(m.isMe)return;const d=m.data;if(!d||!Array.isArray(d.p)||d.p.length!=2||!d.p.every(x=>Number.isInteger(x)&&x>=0&&x<=40)||(d.t!==0&&d.t!==1)||!Number.isInteger(d.n)||d.n<=cnt)return;
  const who=1-d.t,old=p[who];p=d.p;t=d.t;cnt=d.n;if(d.v>0){const x=old+d.v;msg="Lawan dapat "+d.v+(d.j?(d.j>x?" · naik tangga 🪜":" · kena ular 🐍"):"")}else msg="";paint()});
 mkb(g,"Selesai",()=>fin("#",box.textContent));paint()}
function rxOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="";
 g.innerHTML='<div id="rxa" class="tb" style="width:min(340px,92vw);height:min(380px,54vh);border-radius:20px;background:#ffd6e6;touch-action:none;margin:auto"></div>';
 const A=$("rxa");let r=0,sc=[0,0],mine=null,res={},st="idle",t0=0,tmo,over=false;
 const fm=x=>x<0?"kecepetan":x>=9999?"tidak tap":x+" ms";
 const say=(a,b)=>{A.innerHTML='<div style="font-size:26px">'+a+'</div><div style="font-size:15px;margin-top:8px">'+(b||"")+'</div>'};
 const o=duo(R,()=>{paint();kick()});
 function paint(){T.textContent="Reaksi Online · Skor "+sc[0]+" : "+sc[1];if(st!="idle"||over)return;if(o.n<2)say("Menunggu lawan...","kode: "+code);else if(o.my<0||o.my>1)say("Ruang penuh");else say("Siap?","Pemain 1 memulai ronde")}
 function kick(){if(o.my==0&&o.n==2&&st=="idle"&&!over){const d=1500+Math.floor(Math.random()*3500);R.emit("rx",{k:"s",r,d});begin(d)}}
 function begin(d){clearTimeout(tmo);st="wait";mine=null;A.style.background="#ffd6e6";say("Tunggu sinyal...","Jangan tap dulu!");tmo=setTimeout(()=>{st="go";t0=performance.now();A.style.background="#9be37a";say("TAP SEKARANG!","");beep(900,.2);tmo=setTimeout(()=>send(9999),3000)},d)}
 function send(ms){if(mine!==null||(st!="wait"&&st!="go"))return;clearTimeout(tmo);mine=ms;st="sent";R.emit("rx",{k:"t",r,ms});say(fm(ms),"Menunggu lawan...");settle()}
 A.onpointerdown=e=>{e.preventDefault();if(st=="wait")send(-1);else if(st=="go")send(Math.round(performance.now()-t0))};
 function settle(){const th=res[r];if(mine===null||th===undefined||st=="done")return;st="done";const a=mine<0?99999:mine,b=th<0?99999:th;let w;if(a<b){sc[0]++;w="Kamu menang ronde ini!"}else if(b<a){sc[1]++;w="Lawan lebih cepat"}else w="Seri!";
  A.style.background="#ffe9a8";say(w,"Kamu "+fm(mine)+" · Lawan "+fm(th));T.textContent="Reaksi Online · Skor "+sc[0]+" : "+sc[1];
  if(sc[0]>=3||sc[1]>=3){over=true;say(sc[0]>=3?"🏆 Kamu menang!":"Lawan menang, semangat!","Skor akhir "+sc[0]+" : "+sc[1]);conf(sc[0]>=3?40:0);return}
  setTimeout(()=>{if(st!="done")return;r++;st="idle";mine=null;paint();kick()},2400)}
 R.on("rx",m=>{if(m.isMe)return;const d=m.data;if(!d||!Number.isInteger(d.r))return;
  if(d.k=="s"&&o.my==1&&d.r>=r&&Number.isInteger(d.d)&&d.d>=0&&d.d<=10000&&st!="wait"&&st!="go"&&st!="sent"){r=d.r;begin(d.d)}
  else if(d.k=="t"&&Number.isInteger(d.ms)&&d.ms>=-1&&d.ms<=99999){res[d.r]=d.ms;if(d.r==r)settle()}});
 mkb(g,"Selesai",()=>fin("#",T.textContent));paint()}
function qzOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="max-width:340px";g.innerHTML="";
 const box=document.createElement("div");box.className="msg";box.style.cssText="font-size:19px;min-height:70px;white-space:pre-line";g.appendChild(box);
 const ob=document.createElement("div");g.appendChild(ob);const fb=document.createElement("div");fb.style.cssText="min-height:48px;font-weight:800;margin:8px 0";g.appendChild(fb);
 let Q=null,i=0,sc=[0,0],mine=null,res={},t0=0,tmo,locked=true,fn={};
 const o=duo(R,()=>{wait();start()});
 function wait(){if(!Q)box.textContent=o.n<2?"Menunggu lawan... kode: "+code:(o.my<0||o.my>1?"Ruang penuh":"Menyiapkan pertanyaan...")}
 function start(){if(o.my==0&&o.n==2&&!Q){const ix=[...ST.keys()].sort(()=>Math.random()-.5).slice(0,5),sw=ix.map(()=>Math.random()<.5?1:0);Q={ix,sw};R.emit("qz",{k:"q",ix,sw});show()}}
 function show(){mine=null;locked=false;t0=performance.now();const r=ST[Q.ix[i]];box.textContent=(i+1)+"/5 · "+r[0];fb.textContent="";T.textContent="Kuis Adu · Skor "+sc[0]+" : "+sc[1];
  const op=[[r[1],1],[r[2],0]];if(Q.sw[i])op.reverse();ob.innerHTML="";op.forEach(([tx,ok])=>{const b=document.createElement("button");b.className="opt";b.textContent=tx;b.onclick=()=>ans(ok==1,Math.round(performance.now()-t0));ob.appendChild(b)});
  clearTimeout(tmo);tmo=setTimeout(()=>ans(false,12000),12000)}
 function ans(ok,ms){if(locked||!Q)return;locked=true;clearTimeout(tmo);mine={ok,ms};R.emit("qz",{k:"a",q:i,ok,ms});ob.querySelectorAll("button").forEach(b=>{b.disabled=true});fb.textContent="Menunggu lawan...";settle()}
 function settle(){const th=res[i];if(!mine||!th||fn[i])return;fn[i]=1;let a=0,b=0;if(mine.ok&&th.ok){if(mine.ms<th.ms){a=2;b=1}else if(th.ms<mine.ms){a=1;b=2}else{a=2;b=2}}else if(mine.ok)a=2;else if(th.ok)b=2;
  sc[0]+=a;sc[1]+=b;const r=ST[Q.ix[i]];fb.textContent=(mine.ok?(r[3]||"Betul!"):(r[4]||"Belum tepat"))+" · +"+a+" untukmu, +"+b+" untuk lawan";beep(mine.ok?880:200,.2);T.textContent="Kuis Adu · Skor "+sc[0]+" : "+sc[1];
  setTimeout(()=>{i++;if(i>=5){ob.innerHTML="";box.textContent=(sc[0]>sc[1]?"🏆 Kamu menang!":sc[0]<sc[1]?"Lawan menang, semangat!":"Seri! Sama-sama hebat")+"\nSkor akhir "+sc[0]+" : "+sc[1];fb.textContent="";conf(sc[0]>=sc[1]?40:0)}else show()},2600)}
 R.on("qz",m=>{if(m.isMe)return;const d=m.data;if(!d)return;
  if(d.k=="q"&&!Q&&Array.isArray(d.ix)&&d.ix.length==5&&d.ix.every(x=>Number.isInteger(x)&&x>=0&&x<ST.length)&&Array.isArray(d.sw)&&d.sw.length==5){Q={ix:d.ix,sw:d.sw.map(x=>x?1:0)};show()}
  else if(d.k=="a"&&Number.isInteger(d.q)&&d.q>=0&&d.q<5&&typeof d.ms=="number"){res[d.q]={ok:d.ok===true,ms:d.ms};if(d.q==i)settle()}});
 mkb(g,"Selesai",()=>fin("#",T.textContent));wait()}
function xoOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="";g.innerHTML="";const M=[1,5],L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
 let b=Array(9).fill(0),t=0,my=-1,n=1;
 const win=()=>L.find(l=>b[l[0]]&&l.every(k=>b[k]==b[l[0]]));
 const bd=document.createElement("div");bd.style.cssText="display:grid;grid-template-columns:repeat(3,100px);gap:6px;justify-content:center";g.appendChild(bd);
 const rb=document.createElement("button");rb.className="opt";rb.textContent="Main lagi";rb.hidden=true;
 const cells=b.map((_,i)=>{const c=document.createElement("button");c.className="cd";c.style.cssText="width:100px;height:100px;padding:4px";c.onclick=()=>{if(my<0||my>1||n<2||t!=my||b[i]||win())return;b[i]=my+1;t=1-my;R.emit("xo",{b,t});beep(500,.1);paint()};bd.appendChild(c);return c});
 function paint(){cells.forEach((c,i)=>{c.innerHTML="";c.style.boxShadow="";if(b[i]){const im=document.createElement("img");im.src=POSE[M[b[i]-1]];im.alt="";im.style.cssText="max-width:100%;max-height:100%";c.appendChild(im)}});
  const w=win(),full=b.every(x=>x);let m;
  if(n<2)m="Menunggu lawan... kode: "+code;else if(my<0||my>1)m="Ruang penuh";
  else if(w){w.forEach(k=>{cells[k].style.boxShadow="0 0 0 5px #ff7aa8"});m=b[w[0]]-1==my?"🏆 Kamu menang!":"Lawan menang, semangat!"}
  else if(full)m="Seri! Sama-sama hebat";else m=t==my?"Giliranmu!":"Giliran lawan...";
  T.textContent="Duel Online · "+m;rb.hidden=!(w||full)}
 rb.onclick=()=>{b=Array(9).fill(0);t=0;R.emit("xo",{b,t});paint()};g.appendChild(rb);mkb(g,"Selesai",()=>fin("#",T.textContent));
 R.on("xo",m=>{if(m.isMe)return;const d=m.data;if(d&&Array.isArray(d.b)&&d.b.length==9&&d.b.every(x=>x===0||x===1||x===2)&&(d.t===0||d.t===1)){b=d.b;t=d.t;paint()}});
 const roles=()=>{const ps=R.peers().map(p=>p.peer).sort(),me=R.peers().find(p=>p.sameTab);n=ps.length;my=me?ps.indexOf(me.peer):-1};
 R.onPeers(ch=>{roles();if(ch.joined.length&&n>=2&&(b.some(x=>x)||t))R.emit("xo",{b,t});paint()});roles();paint()}
function tarikOn(R,code){const T=$("gt"),g=$("gb");g.style.cssText="";
 g.innerHTML='<div style="width:min(340px,92vw);height:min(400px,56vh);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;touch-action:none;margin:auto"><div class="tb" id="o2" style="background:#ffd6e6"></div><div class="tb" id="o1" style="background:#ffe9a8"></div></div>';
 const O=$("o2"),Y=$("o1");let c=[0,0],my=-1,n=1,r=0,done=false;
 O.innerHTML='<img src="'+POSE[4]+'" alt=""><div>Lawan</div>';Y.innerHTML='<img src="'+POSE[2]+'" alt=""><div>KAMU · TAP!</div>';
 const rb=document.createElement("button");rb.className="opt";rb.textContent="Main lagi";rb.hidden=true;
 function paint(){const d=my==0?c[0]-c[1]:c[1]-c[0];Y.style.flexGrow=20+d;O.style.flexGrow=20-d;
  if(n<2){T.textContent="Duel Online · Menunggu lawan... kode: "+code;return}
  if(my<0||my>1){T.textContent="Ruang penuh";return}
  if(Math.abs(d)>=20){done=true;T.textContent=d>0?"🏆 Kamu menang!":"Lawan menang, semangat!";rb.hidden=false}else{done=false;rb.hidden=true;T.textContent="Duel Online · Tap secepatnya!"}}
 Y.onpointerdown=e=>{e.preventDefault();if(done||n<2||my<0||my>1)return;c[my]++;R.emit("tap",{i:my,c:c[my],r});beep(300+Math.abs(c[0]-c[1])*20,.05);paint()};
 rb.onclick=()=>{r++;c=[0,0];done=false;R.emit("tap",{i:my,c:0,r});paint()};g.appendChild(rb);mkb(g,"Selesai",()=>fin("#",T.textContent));
 R.on("tap",m=>{if(m.isMe)return;const d=m.data;if(!d||(d.i!==0&&d.i!==1)||d.i==my||!Number.isInteger(d.c)||!Number.isInteger(d.r)||d.c<0||d.c>999)return;
  if(d.r>r){r=d.r;c=[0,0];done=false}if(d.r==r){c[d.i]=d.c;paint()}});
 const roles=()=>{const ps=R.peers().map(p=>p.peer).sort(),me=R.peers().find(p=>p.sameTab);n=ps.length;my=me?ps.indexOf(me.peer):-1};
 R.onPeers(ch=>{roles();if(ch.joined.length&&n>=2&&my>=0&&my<2)R.emit("tap",{i:my,c:c[my],r});paint()});roles();paint()}
$("go").onclick=()=>{save();intro()};
const pw=$("pw");if(pw)pw.addEventListener("keydown",ev=>{if(ev.key=="Enter")$("go").click()});$("skip").onclick=()=>{it8.forEach(clearTimeout);scr("s5")};$("bk").onclick=home;
(()=>{const E=["😄","🥰","😊","😐","😴","😢","😡"],row=$("ek");E.forEach(e=>{const b=document.createElement("button");b.type="button";b.className="ee";b.textContent=e;b.onclick=()=>{$("kb").value=e;[...row.children].forEach(x=>x.classList.toggle("on",x===b));beep(500+Math.random()*300,.08)};row.appendChild(b)})})();
/* registrasi service worker dipindah ke js/pwa.js */

/* === Ekspansi permainan lokal: tantangan, misi harian, koleksi, dan rekor === */
const NLX_KEY="nailong-extra-v1";
let nlxStop=null;
const _nlxOldHome=home;home=function(){if(nlxStop){nlxStop();nlxStop=null}_nlxOldHome()};
function nlxLoad(){try{return JSON.parse(localStorage.getItem(NLX_KEY))||{stars:0,quiz:0,plays:0,bestRush:0,streak:0,lastDay:"",badges:[]}}catch(e){return {stars:0,quiz:0,plays:0,bestRush:0,streak:0,lastDay:"",badges:[]}}}
function nlxSave(s){try{localStorage.setItem(NLX_KEY,JSON.stringify(s))}catch(e){}}
function nlxDay(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function nlxPlay(kind,score=0){const s=nlxLoad(),day=nlxDay();if(s.lastDay!==day){const y=new Date();y.setDate(y.getDate()-1);const yd=y.getFullYear()+"-"+String(y.getMonth()+1).padStart(2,"0")+"-"+String(y.getDate()).padStart(2,"0");s.streak=s.lastDay===yd?(s.streak||0)+1:1;s.lastDay=day;s.daily={rush:false,quiz:false,plays:0,stars:0}}
s.daily=s.daily||{rush:false,quiz:false,plays:0,stars:0};s.plays=(s.plays||0)+1;s.daily.plays=(s.daily.plays||0)+1;if(kind==="rush")s.daily.rush=true;if(kind==="quiz")s.daily.quiz=true;s.stars=(s.stars||0)+score;s.daily.stars=(s.daily.stars||0)+score;if(kind==="rush")s.bestRush=Math.max(s.bestRush||0,score);s.badges=s.badges||[];
const awards=[["first","Langkah Pertama",s.plays>=1],["rush10","Pemburu Bintang",(s.bestRush||0)>=10],["quiz5","Jago Kuis",(s.quiz||0)>=5],["star100","Kantong Bintang",(s.stars||0)>=100],["streak3","Rajin 3 Hari",(s.streak||0)>=3]];awards.forEach(a=>{if(a[2]&&!s.badges.includes(a[0]))s.badges.push(a[0])});nlxSave(s);return s}
function nlxBadgeName(id){return ({first:"🌱 Langkah Pertama",rush10:"⭐ Pemburu Bintang",quiz5:"🧠 Jago Kuis",star100:"💰 Kantong Bintang",streak3:"🔥 Rajin 3 Hari"})[id]||id}
function misi(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb"),s=nlxLoad(),day=nlxDay();T.textContent="🎯 Misi & Koleksi Nailong";g.style.cssText="width:min(360px,94vw);max-width:360px;max-height:68vh;overflow:auto;padding:4px";g.innerHTML="";
const daily=s.lastDay===day&&s.daily?s.daily:{rush:false,quiz:false,plays:0,stars:0};const panel=document.createElement("div");panel.className="msg";panel.style.cssText="width:100%;font-size:16px;text-align:left;line-height:1.5";panel.innerHTML='<b>🌞 Misi hari ini</b><br>'+(daily.rush?"✅":"⬜")+' Dapatkan skor di Pemburu Bintang<br>'+(daily.quiz?"✅":"⬜")+' Selesaikan Kuis Kilat<br>'+((daily.plays||0)>=3?"✅":"⬜")+' Mainkan 3 permainan<br>'+((daily.stars||0)>=20?"✅":"⬜")+' Kumpulkan 20 bintang<br><hr style="border:0;border-top:1px dashed #d5a500"><b>📊 Statistikmu</b><br>⭐ Total bintang: '+(s.stars||0)+'<br>🎮 Total permainan: '+(s.plays||0)+'<br>🔥 Rentetan hari: '+(s.streak||0)+'<br>🏆 Rekor Pemburu Bintang: '+(s.bestRush||0);g.appendChild(panel);
const title=document.createElement("h2");title.textContent="🏅 Koleksi lencana ("+(s.badges||[]).length+"/5)";title.style.cssText="font-size:20px;margin:10px 0 2px";g.appendChild(title);const bd=document.createElement("div");bd.style.cssText="display:flex;flex-wrap:wrap;gap:6px;justify-content:center";["first","rush10","quiz5","star100","streak3"].forEach(id=>{const b=document.createElement("span");b.textContent=(s.badges||[]).includes(id)?nlxBadgeName(id):"🔒 ???";b.style.cssText="background:var(--card);border:2px solid var(--acc);border-radius:14px;padding:7px 9px;font-size:13px;font-weight:800;opacity:"+((s.badges||[]).includes(id)?"1":".55");bd.appendChild(b)});g.appendChild(bd);
const b=document.createElement("button");b.className="opt";b.textContent="Mainkan tantangan!";b.onclick=()=>cat("tantangan");g.appendChild(b);mkb(g,"Kembali ke menu",home)}
function rush(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="width:min(360px,94vw);max-width:360px";g.innerHTML="";let score=0,seconds=30,combo=0,bestCombo=0,ended=false,spawn=null,timer=null;const area=document.createElement("div");area.style.cssText="position:relative;width:100%;height:min(52vh,390px);min-height:260px;overflow:hidden;border:3px solid var(--acc);border-radius:22px;background:radial-gradient(circle at 50% 15%,#fff7bd,#c5edff 72%,#a8df91);touch-action:manipulation";g.appendChild(area);const note=document.createElement("div");note.className="msg";note.style.cssText="font-size:15px;margin:6px auto";note.textContent="Ketuk ⭐ dan 💖, ambil bonus 🌈, hindari 💣!";g.appendChild(note);const exit=document.createElement("button");exit.className="opt";exit.textContent="Akhiri permainan";exit.onclick=()=>finish();g.appendChild(exit);
function hud(){T.textContent="⭐ "+score+" · ⏱️ "+seconds+" dtk · 🔥 kombo "+combo}
function spawnOne(){if(ended)return;const bomb=Math.random()<.22,bonus=!bomb&&Math.random()<.13;const b=document.createElement("button");b.type="button";b.textContent=bomb?"💣":bonus?"🌈":Math.random()<.5?"⭐":"💖";b.setAttribute("aria-label",bomb?"Bom, jangan ketuk":bonus?"Bonus pelangi":"Bintang hadiah");b.style.cssText="position:absolute;left:"+Math.round(3+Math.random()*78)+"%;top:"+Math.round(3+Math.random()*76)+"%;width:54px;height:54px;padding:0;border-radius:50%;font-size:27px;background:"+(bomb?"#ffd1d1":bonus?"#d7c5ff":"#fff4ad")+";box-shadow:0 4px 0 #b7a04c;animation:pin .15s both";let gone=false;const remove=()=>{if(!gone){gone=true;b.remove()}};b.onclick=()=>{if(ended||gone)return;remove();if(bomb){score=Math.max(0,score-5);combo=0;note.textContent="💥 Ups! Bom mengurangi 5 bintang. Tetap fokus!";beep(180,.18)}else{combo++;bestCombo=Math.max(bestCombo,combo);const p=bonus?5:(combo%5===0?3:1);score+=p;note.textContent=bonus?"🌈 BONUS! +5 bintang!":combo%5===0?"🔥 Kombo "+combo+"! +3 bintang":"Bagus! +"+p+" bintang";beep(bonus?1000:600+Math.min(combo,12)*25,.07);if(bonus)conf(8)}hud()};area.appendChild(b);setTimeout(remove,1050)}
hud();spawn=setInterval(spawnOne,560);timer=setInterval(()=>{seconds--;hud();if(seconds<=0)finish()},1000);nlxStop=()=>{ended=true;clearInterval(spawn);clearInterval(timer)};spawnOne();function finish(){if(ended)return;ended=true;clearInterval(spawn);clearInterval(timer);nlxStop=null;area.querySelectorAll("button").forEach(b=>b.disabled=true);const s=nlxPlay("rush",score);T.textContent="🏁 Tantangan selesai!";note.innerHTML="Kamu mengumpulkan <b>"+score+" bintang</b> dengan kombo terbaik "+bestCombo+". Rekor: "+s.bestRush+" ⭐";exit.textContent="Main lagi";exit.onclick=rush;const m=document.createElement("button");m.className="opt";m.textContent="Lihat misi & lencana";m.onclick=misi;g.appendChild(m);if(score>=10)conf(25);beep(score>=10?850:240,.3)}}
const NLX_QUIZ=[
["Nailong melihat ⭐. Apa yang sebaiknya dilakukan?",["Dikumpulkan","Dimasak","Dipakai jadi topi"],0],
["Kalau baterai tubuh tinggal 1%, kita perlu…",["Tambah tugas","Istirahat dan minum","Lari keliling rumah"],1],
["Mana yang paling cocok untuk combo?",["Ketuk target berturut-turut","Tutup mata","Lempar HP"],0],
["Nailong lupa makan pagi. Solusi terbaik?",["Makan yang cukup","Makan kertas","Marah ke bantal"],0],
["Jika teman sedang sedih…",["Dengarkan dengan baik","Tertawakan","Sembunyikan sepatunya"],0],
["Di game Pemburu Bintang, bom harus…",["Dipeluk","Dihindari","Dijadikan camilan"],1],
["Cara belajar yang lebih sehat adalah…",["Sedikit demi sedikit dan istirahat","Tidak tidur seminggu","Panik dulu"],0],
["Kalau kalah dalam game…",["Coba lagi dan belajar","Buang HP","Salahkan Nailong"],0],
["Emoji 🌈 dalam Pemburu Bintang memberi…",["Bonus bintang","PR tambahan","Alarm"],0],
["Apa hadiah paling penting setelah berusaha?",["Menghargai diri sendiri","Mengejek diri","Menyerah sebelum mulai"],0]
];
function quizKilat(){clearInterval(tm2);scr("s6");const T=$("gt"),g=$("gb");g.style.cssText="width:min(360px,94vw);max-width:360px;max-height:70vh;overflow:auto";g.innerHTML="";let idx=0,points=0,bank=NLX_QUIZ.slice().sort(()=>Math.random()-.5).slice(0,7),locked=false;const progress=document.createElement("div");progress.style.cssText="font-weight:800;margin:6px";g.appendChild(progress);const q=document.createElement("div");q.className="msg";q.style.cssText="font-size:19px;width:100%;margin:8px auto";g.appendChild(q);const opts=document.createElement("div");opts.style.cssText="width:100%";g.appendChild(opts);const feedback=document.createElement("div");feedback.style.cssText="font-weight:800;min-height:28px;margin:6px";g.appendChild(feedback);function show(){locked=false;feedback.textContent="";progress.textContent="Pertanyaan "+(idx+1)+" dari "+bank.length+" · Skor "+points;q.textContent=bank[idx][0];opts.innerHTML="";bank[idx][1].forEach((a,i)=>{const b=document.createElement("button");b.className="opt";b.style.fontSize="16px";b.textContent=["A. ","B. ","C. "][i]+a;b.onclick=()=>{if(locked)return;locked=true;const ok=i===bank[idx][2];if(ok){points++;feedback.textContent="Betul! +1 bintang ⭐";feedback.style.color="#218838";beep(820,.12)}else{feedback.textContent="Belum tepat 😄 Jawaban: "+bank[idx][1][bank[idx][2]];feedback.style.color="#d6336c";beep(220,.15)}[...opts.children].forEach((x,j)=>{x.disabled=true;if(j===bank[idx][2])x.style.background="#b9efb3"});const n=document.createElement("button");n.className="opt";n.textContent=idx===bank.length-1?"Lihat hasil 🎉":"Berikutnya →";n.onclick=()=>{idx++;if(idx>=bank.length)done();else show()};opts.appendChild(n)}});}
function done(){const st=nlxLoad();st.quiz=(st.quiz||0)+points;nlxSave(st);const all=nlxPlay("quiz",points);T.textContent="🧠 Kuis selesai!";q.textContent="Kamu benar "+points+" dari "+bank.length+" soal.";opts.innerHTML="";feedback.style.color="var(--ink)";feedback.textContent=points>=6?"Jago banget! Nailong bangga padamu!":"Latihan lagi, kamu pasti makin jago!";const b=document.createElement("button");b.className="opt";b.textContent="Main kuis lagi";b.onclick=quizKilat;opts.appendChild(b);const m=document.createElement("button");m.className="opt";m.textContent="Misi & koleksi";m.onclick=misi;opts.appendChild(m);conf(points>=6?25:8);beep(points>=6?900:500,.25)}show()}

// Perkaya pilihan tanpa layanan online; seluruh rekor disimpan di perangkat.
CAT.game[1].unshift(["⭐","Pemburu Bintang","30 detik, kombo, bonus, dan bom","f:rush"]);
CAT.game[1].push(["🧠","Kuis Kilat","7 soal acak, kumpulkan bintang","f:quizKilat"]);
CAT.tantangan=["🎯 Tantangan & Misi",[["⭐","Pemburu Bintang","Kejar kombo dan pecahkan rekor","f:rush"],["🧠","Kuis Kilat","Pertanyaan acak dengan skor","f:quizKilat"],["🏅","Misi & Koleksi","Misi harian, statistik, lencana","f:misi"],["🗺️","Petualangan Nailong","20 level bertahap","g6"],["🎵","Ikuti Gaya Nailong","Latih ingatan dan refleks","f:gaya"]]];
const _oldCat=cat;cat=function(k){if(k==="tantangan"){}return _oldCat(k)};
const _s5=document.getElementById("s5");if(_s5&&!document.getElementById("nlxMissionCard")){const b=document.createElement("button");b.id="nlxMissionCard";b.className="card";b.innerHTML="<span>🎯</span><div><b>Misi & Koleksi</b><small>Misi harian, rekor, dan lencana</small></div>";b.onclick=misi;_s5.appendChild(b);const c=document.createElement("button");c.id="nlxChallengeCard";c.className="card";c.innerHTML="<span>⭐</span><div><b>Tantangan Harian</b><small>Pemburu Bintang dan Kuis Kilat</small></div>";c.onclick=()=>cat("tantangan");_s5.appendChild(c)}

// Tampilkan layar pembuka saat aplikasi pertama kali dimuat.
scr("s1");
