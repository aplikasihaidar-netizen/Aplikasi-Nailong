// Registrasi service worker + alur pembaruan tanpa versi campuran.
// Worker baru menunggu (waiting) sampai pengguna menekan "Muat ulang".
(function () {
  if (!("serviceWorker" in navigator)) return;
  const bar = document.getElementById("upd"), btn = document.getElementById("updb");
  let reloading = false;
  let hasController = !!navigator.serviceWorker.controller;   // false pada kunjungan pertama
  function offer(w) {
    if (!bar || !btn) return;
    bar.hidden = false;
    btn.onclick = () => w.postMessage({ type: "SKIP_WAITING" });
  }
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hasController) { hasController = true; return; }   // klaim pertama saat instalasi: jangan reload
    if (reloading) return; reloading = true; location.reload();
  });
  addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(reg => {
      if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
      reg.addEventListener("updatefound", () => {
        const w = reg.installing; if (!w) return;
        w.addEventListener("statechange", () => {
          if (w.state === "installed" && navigator.serviceWorker.controller) offer(w);
        });
      });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    }).catch(() => {});
  });
})();
