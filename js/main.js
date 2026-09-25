/* =========================================
   WILDORA — main.js
   Menu · FAQ · Enquiry form → WhatsApp
   ========================================= */

// ---- Mobile menu ----
const menuBtn  = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );
}

// ---- FAQ accordion ----
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn  = item.querySelector(".faq-btn");
  const body = item.querySelector(".faq-body");
  if (!btn || !body) return;
  btn.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// ---- Destination select → auto-route advisor ----
const destSel = document.getElementById("f-dest");
if (destSel) {
  destSel.addEventListener("change", () => {
    const val = destSel.value;
    const goToSanskar = ["Char Dham","Nainital","Rishikesh"].includes(val);
    const radio = document.getElementById(goToSanskar ? "adv-sanskar" : "adv-varun");
    if (radio) radio.checked = true;
  });
}

// ---- Enquiry form → WhatsApp ----
const form = document.getElementById("enquiry-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const get = (n) => (form.elements[n] ? form.elements[n].value.trim() : "");
    const name  = get("name");
    const phone = get("phone");
    const dest  = get("destination");

    if (!name)  { flashField("f-name",  "Please enter your name.");        return; }
    if (!phone) { flashField("f-phone", "Please enter your phone number."); return; }
    if (!dest)  { flashField("f-dest",  "Please choose a destination.");    return; }

    const advisor = (document.querySelector('input[name="advisor"]:checked') || {}).value || "varun";
    const num     = advisor === "sanskar" ? "919193043188" : "919548561308";
    const adname  = advisor === "sanskar" ? "Sanskar" : "Varun";

    const date       = get("date");
    const travellers = get("travellers");
    const triptype   = get("triptype");
    const notes      = get("notes");

    const msg = [
      `Hi ${adname}, I'd like to plan a trip with Wildora.`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Destination: ${dest}`,
      date       && `Travel date: ${date}`,
      travellers && `Travellers: ${travellers}`,
      triptype   && `Trip type: ${triptype}`,
      notes      && `Notes: ${notes}`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  });
}

function flashField(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.focus();
    el.style.borderColor = "#C0562E";
    setTimeout(() => (el.style.borderColor = ""), 3000);
  }
  alert(msg);
}
