// URL del tuo file JSON su GitHub
const TOURS_URL = "https://raw.githubusercontent.com/maurizionelli-noah/cittaperte/refs/heads/main/tours.json";

// URL Formspree (lo aggiungerai tra poco)
const FORMSPREE_URL = "https://formspree.io/f/xwpwjgvo"; // <-- sostituirai con il tuo ID Formspree

// Mostra i tour
async function loadTours() {
  try {
    const response = await fetch(TOURS_URL);
    const tours = await response.json();

    const container = document.getElementById("tour-list");
    container.innerHTML = "";

    tours.forEach(tour => {
      const div = document.createElement("div");
      div.className = "tour-card";
      div.innerHTML = `
        <h3>${tour.title}</h3>
        <p>${tour.date}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Errore nel caricamento dei tour:", error);
  }
}

// Invio messaggio
document.addEventListener("DOMContentLoaded", () => {
  loadTours();

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const object = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        });

        if (response.ok) {
          alert("Messaggio inviato con successo! Ti risponderemo presto.");
          form.reset();
        } else {
          alert("Errore durante l'invio. Riprova più tardi.");
        }
      } catch (error) {
        console.error("Errore:", error);
        alert("Errore di connessione.");
      }
    });
  }
});
