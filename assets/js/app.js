/**
 * Solusi Sawit Nusantara - Official Web Engine & Interactivity
 * Optimized for GitHub Pages & High Conversion Sales
 */

// ==========================================
// 1. CONFIGURATION & STATE
// ==========================================
// Ganti nomor WhatsApp di bawah ini dengan nomor aktif Anda (gunakan format 62...)
const CONFIG = {
  whatsappNumber: "6285815768319", 
  facebookUrl: "https://web.facebook.com/profile.php?id=61594555095749",
  defaultProductName: "Paket Kombo Sawit Kocor (Pelarut 1Kg + Biang Kocor 1L)",
  pricePerPackage: 395000,
  hectaresPerPackage: 2, // 1 paket untuk 2 hektar
  treesPerPackage: 270,   // ~135 pohon per hektar
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
  window.open(waUrl, "_blank");
}

// ==========================================
// 3. KALKULATOR PENGHEMATAN PUPUK
// ==========================================
function initFertilizerCalculator() {
  const slider = document.getElementById("calc-hectares");
  const displayHa = document.getElementById("display-ha");
  const displayTrees = document.getElementById("display-trees");
  const standardCostEl = document.getElementById("cost-standard");
  const savingsCostEl = document.getElementById("cost-savings");
  const comboNeedsEl = document.getElementById("combo-needs");
  const comboCostEl = document.getElementById("combo-cost");
  const netSavingsEl = document.getElementById("cost-net-savings");
  const btnApplyToForm = document.getElementById("btn-apply-calc-to-form");

  if (!slider) return;

  function calculate() {
    const ha = parseFloat(slider.value) || 1;
    const trees = Math.round(ha * 135);

    // Asumsi biaya pupuk konvensional rata-rata per hektar per aplikasi pupuk: Rp 3.500.000,-
    const standardCostPerHa = 3500000;
    const totalStandardCost = ha * standardCostPerHa;

    // Pelarut Pupuk Kimia memangkas kebutuhan pupuk makro hingga 50%
    const chemicalFertilizerSaved = totalStandardCost * 0.5;

    // Jumlah paket kombo yang dibutuhkan (1 paket = 2 hektar)
    const packagesNeeded = Math.ceil(ha / CONFIG.hectaresPerPackage);
    const comboProductCost = packagesNeeded * CONFIG.pricePerPackage;

    // Penghematan Bersih = Nilai pupuk kimia yang dihemat - Biaya beli paket kombo
    const netSavings = chemicalFertilizerSaved - comboProductCost;

    if (displayHa) displayHa.textContent = ha;
    if (displayTrees) displayTrees.textContent = trees.toLocaleString("id-ID");
    if (standardCostEl) standardCostEl.textContent = formatRupiah(totalStandardCost);
    if (savingsCostEl) savingsCostEl.textContent = formatRupiah(chemicalFertilizerSaved);
    if (comboNeedsEl) comboNeedsEl.textContent = `${packagesNeeded} Paket Kombo`;
    if (comboCostEl) comboCostEl.textContent = formatRupiah(comboProductCost);
    if (netSavingsEl) {
      netSavingsEl.textContent = formatRupiah(Math.max(0, netSavings));
    }

    if (btnApplyToForm) {
      btnApplyToForm.onclick = () => {
        const packageSelect = document.getElementById("order-packages");
        if (packageSelect) {
          packageSelect.value = packagesNeeded.toString();
          updateOrderSummary();
        }
        const orderSection = document.getElementById("pemesanan");
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: "smooth" });
        }
      };
    }
  }

  slider.addEventListener("input", calculate);
  calculate();
}

// ==========================================
// 4. FORM CHECKOUT LANGSUNG KE WHATSAPP (COD)
// ==========================================
function updateOrderSummary() {
  const qtySelect = document.getElementById("order-packages");
  const subtotalEl = document.getElementById("order-subtotal");
  const coverageEl = document.getElementById("order-coverage");

  if (!qtySelect || !subtotalEl) return;
  const qty = parseInt(qtySelect.value, 10) || 1;
  const total = qty * CONFIG.pricePerPackage;
  const coverage = qty * CONFIG.hectaresPerPackage;

  subtotalEl.textContent = formatRupiah(total);
  if (coverageEl) {
    coverageEl.textContent = `${coverage} Hektar (± ${coverage * 135} Pokok Sawit)`;
  }
}

function initOrderForm() {
  const form = document.getElementById("wa-order-form");
  const qtySelect = document.getElementById("order-packages");

  if (qtySelect) {
    qtySelect.addEventListener("change", updateOrderSummary);
    updateOrderSummary();
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("order-name")?.value.trim();
    const phone = document.getElementById("order-phone")?.value.trim();
    const province = document.getElementById("order-province")?.value.trim() || "-";
    const address = document.getElementById("order-address")?.value.trim();
    const qty = parseInt(document.getElementById("order-packages")?.value, 10) || 1;
    const note = document.getElementById("order-notes")?.value.trim() || "Mohon dikirim secepatnya ya pak.";

    if (!name || !phone || !address) {
      alert("Silakan lengkapi Nama, No. WhatsApp, dan Alamat Lengkap pengiriman Anda terlebih dahulu.");
      return;
    }

    const totalAmount = qty * CONFIG.pricePerPackage;
    const coverageHa = qty * CONFIG.hectaresPerPackage;

    const message = 
`*PESANAN PAKET SOLUSI SAWIT NUSANTARA (SISTEM COD)*
=========================================
Halo Admin Solusi Sawit Nusantara, saya ingin memesan paket kombo pupuk kocor dengan sistem *Bayar di Tempat (COD)*:

👤 *Nama Pemesan:* ${name}
📱 *No. WhatsApp/HP:* ${phone}
📍 *Wilayah/Provinsi:* ${province}
🏠 *Alamat Lengkap Pengiriman:*
${address}

📦 *Rincian Pesanan:*
• Produk: ${CONFIG.defaultProductName}
• Jumlah: ${qty} Paket (Cakupan: ${coverageHa} Hektar)
💰 *Total Tagihan COD:* ${formatRupiah(totalAmount)}
🚚 *Metode Pembayaran:* COD (Bayar Saat Barang Diterima)

📝 *Catatan Khusus:*
"${note}"
=========================================
Mohon konfirmasi dan segera proses pengiriman ke kebun saya. Terima kasih!`;

    openWhatsApp(message);
  });
}

// ==========================================
// 5. QUICK WA CONSULTATION BUTTONS
// ==========================================
function initQuickConsultation() {
  const consultBtns = document.querySelectorAll(".btn-wa-consult");
  consultBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const topic = btn.getAttribute("data-topic") || "Konsultasi Perawatan Kebun Sawit";
      const message = 
`Halo Admin Solusi Sawit Nusantara, saya ingin berkonsultasi mengenai: *${topic}*.
Bagaimana cara pemakaian Paket Kombo Rp 395.000 untuk kebun sawit saya?`;
      openWhatsApp(message);
    });
  });
}

// ==========================================
// 6. ACCORDION FAQ
// ==========================================
function initFAQ() {
  const faqToggles = document.querySelectorAll(".faq-trigger");
  faqToggles.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parent = trigger.closest(".faq-item");
      const content = parent.querySelector(".faq-content");
      const icon = trigger.querySelector(".faq-icon");

      const isOpen = !content.classList.contains("hidden");

      // Tutup semua faq lainnya
      document.querySelectorAll(".faq-content").forEach((c) => c.classList.add("hidden"));
      document.querySelectorAll(".faq-icon").forEach((i) => i.classList.remove("rotate-180"));

      if (!isOpen) {
        content.classList.remove("hidden");
        icon.classList.add("rotate-180");
      }
    });
  });
}

// ==========================================
// 7. SOCIAL PROOF NOTIFICATION TOAST
// ==========================================
const RECENT_BUYERS = [
  { name: "Pak Haji Syamsul", loc: "Rokan Hulu, Riau", qty: "2 Paket", time: "4 menit lalu" },
  { name: "Pak Wayan Sudirga", loc: "Ketapang, Kalbar", qty: "1 Paket", time: "11 menit lalu" },
  { name: "Pak Dedi Kurniawan", loc: "Muaro Jambi, Jambi", qty: "3 Paket", time: "18 menit lalu" },
  { name: "Pak Herman Silalahi", loc: "Labuhanbatu, Sumut", qty: "2 Paket", time: "27 menit lalu" },
  { name: "Pak Sukirman", loc: "Kotawaringin Timur, Kalteng", qty: "4 Paket", time: "35 menit lalu" },
  { name: "Pak Burhanuddin", loc: "Paser, Kaltim", qty: "1 Paket", time: "42 menit lalu" },
  { name: "Pak Ahmad Fauzi", loc: "Musi Banyuasin, Sumsel", qty: "2 Paket", time: "50 menit lalu" }
];

function initSocialProofToast() {
  const toast = document.getElementById("social-proof-toast");
  if (!toast) return;

  const buyerNameEl = document.getElementById("toast-buyer-name");
  const buyerLocEl = document.getElementById("toast-buyer-loc");
  const buyerQtyEl = document.getElementById("toast-buyer-qty");
  const buyerTimeEl = document.getElementById("toast-buyer-time");

  let buyerIndex = 0;

  function showToast() {
    const buyer = RECENT_BUYERS[buyerIndex];
    if (buyerNameEl) buyerNameEl.textContent = buyer.name;
    if (buyerLocEl) buyerLocEl.textContent = buyer.loc;
    if (buyerQtyEl) buyerQtyEl.textContent = buyer.qty;
    if (buyerTimeEl) buyerTimeEl.textContent = buyer.time;

    toast.classList.remove("translate-y-32", "opacity-0", "pointer-events-none");
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("translate-y-32", "opacity-0", "pointer-events-none");
    }, 5500);

    buyerIndex = (buyerIndex + 1) % RECENT_BUYERS.length;
  }

  // Tampilkan pertama setelah 4 detik, lalu setiap 16 detik
  setTimeout(showToast, 4000);
  setInterval(showToast, 16000);
}

// ==========================================
// 8. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// ==========================================
// 9. COUNTDOWN TIMER (PROMO SUBSIDI ONGKIR)
// ==========================================
function initCountdown() {
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-mins");
  const secsEl = document.getElementById("timer-secs");

  if (!hoursEl || !minsEl || !secsEl) return;

  // Set timer target 7 jam dari saat load
  let totalSeconds = 7 * 3600 + 45 * 60 + 20;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 8 * 3600; // Reset loop promo
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }, 1000);
}

// ==========================================
// 10. STICKY MOBILE BOTTOM BAR (HP)
// ==========================================
function initStickyMobileBar() {
  const bar = document.getElementById("mobile-bottom-bar");
  if (!bar) return;

  function handleScroll() {
    // Tampilkan tombol melayang bawah hanya setelah scroll melewati hero section (> 280px)
    if (window.scrollY > 280) {
      bar.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
      bar.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
    } else {
      bar.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
      bar.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ==========================================
// 11. DOM READY INITIALIZER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initFertilizerCalculator();
  initOrderForm();
  initQuickConsultation();
  initFAQ();
  initSocialProofToast();
  initMobileMenu();
  initCountdown();
  initStickyMobileBar();
});
