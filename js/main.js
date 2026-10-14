const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('header nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
  });
}


/* FAQ: плавное открытие и закрытие */



document.addEventListener("DOMContentLoaded", function () {
  const accordion = document.querySelector("#accordion");

  if (!accordion) return;

  accordion.querySelectorAll(".questions-box").forEach(function (item) {
    const link = item.querySelector(".link");
    const submenu = item.querySelector(".submenu-faq");

    if (!link || !submenu) return;

    link.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      accordion.querySelectorAll(".questions-box").forEach(function (other) {
        if (other === item || !other.classList.contains("open")) return;

        const content = other.querySelector(".submenu-faq");
        if (!content) return;

        other.classList.remove("open");
        closeAccordion(content);
      });

      if (isOpen) {
        item.classList.remove("open");
        closeAccordion(submenu);
      } else {
        item.classList.add("open");
        openAccordion(submenu);
      }
    });
  });

  function openAccordion(element) {
    element.style.display = "block";
    element.style.height = "0px";
    element.style.overflow = "hidden";
    element.style.transition = "height 0.35s ease";

    requestAnimationFrame(function () {
      element.style.height = element.scrollHeight + "px";
    });

    element.addEventListener("transitionend", function handler(event) {
      if (event.propertyName !== "height") return;

      element.style.height = "auto";
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
      element.removeEventListener("transitionend", handler);
    });
  }

  function closeAccordion(element) {
    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";
    element.style.transition = "height 0.35s ease";

    element.offsetHeight;

    requestAnimationFrame(function () {
      element.style.height = "0px";
    });

    element.addEventListener("transitionend", function handler(event) {
      if (event.propertyName !== "height") return;

      element.style.display = "none";
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
      element.removeEventListener("transitionend", handler);
    });
  }
});


const copyButton = document.querySelector('.copy-button');
const requisites = document.querySelector('.requisites');

if (copyButton && requisites) {
  copyButton.addEventListener('click', () => {
    const rows = Array.from(requisites.rows);
    const text = rows
      .map((row) => `${row.cells[0].textContent.trim()}: ${row.cells[1].textContent.trim()}`)
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      copyButton.textContent = 'Скопировано';
      setTimeout(() => {
        copyButton.textContent = 'Скопировать реквизиты';
      }, 2000);
    });
  });
}

const year = document.querySelector('.year');
if (year) year.textContent = new Date().getFullYear();
