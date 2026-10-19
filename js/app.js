/* Validation du formulaire et préparation du message WhatsApp.
   Le formulaire ne traite pas le paiement : il transmet seulement la demande. */
const form = document.getElementById("registrationForm");
const feedback = document.getElementById("formFeedback");
const numeroClub = "221785348282";
document.getElementById("year").textContent = new Date().getFullYear();

const copyWaveButton = document.getElementById("copyWaveNumber");
copyWaveButton.addEventListener("click", async function () {
  const waveFeedback = document.getElementById("waveFeedback");
  try {
    await navigator.clipboard.writeText(`+${numeroClub}`);
    waveFeedback.textContent = "Numéro copié. Ouvrez Wave et vérifiez le bénéficiaire avant d'envoyer.";
  } catch {
    waveFeedback.textContent = "Numéro Wave : +221 78 534 82 82. Sélectionnez-le pour le copier.";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const prenom = String(data.get("prenom")).trim();
  const nom = String(data.get("nom")).trim();
  const telephone = String(data.get("telephone")).trim();
  const email = String(data.get("email")).trim();

  const message = [
    "Bonjour KEB'S SPORT, je souhaite m'inscrire à une séance d'aquagym.",
    "",
    `Prénom : ${prenom}`,
    `Nom : ${nom}`,
    `Téléphone : ${telephone}`,
    `E-mail : ${email}`,
    "",
    "Séance : aquagym",
    "Participation : 2 000 FCFA",
    "Statut du paiement : à vérifier par le club.",
    "Merci de me confirmer la réception de mon inscription à la séance."
  ].join("\n");

  feedback.className = "form-feedback show";
  feedback.textContent = "Votre demande va s'ouvrir dans WhatsApp. Vérifiez les informations puis envoyez le message au club.";

  const whatsappUrl = `https://wa.me/${numeroClub}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
