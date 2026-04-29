// script.js - Gestion du panier GlamNails

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".produit-card");
  const recapBody = document.getElementById("recap-body");
  const totalGeneralSpan = document.getElementById("total-general");
  const btnValider = document.getElementById("btn-valider");
  const btnReset = document.getElementById("btn-reset");
  const messageConfirmation = document.getElementById("message-confirmation");

  // panier = { nomProduit: { prix: number, quantite: number } }
  const panier = {};

  // Ajouter un produit au panier
  cards.forEach(card => {
    const btnAjouter = card.querySelector(".btn-ajouter");
    const inputQuantite = card.querySelector(".quantite");
    const nom = card.querySelector("h3").textContent.trim();
    const prix = parseFloat(card.dataset.prix); // data-prix

    btnAjouter.addEventListener("click", function () {
      let qte = parseInt(inputQuantite.value, 10);

      if (isNaN(qte) || qte < 1) qte = 1;
      if (qte > 99) qte = 99;
      inputQuantite.value = qte; // correction visuelle

      if (!panier[nom]) {
        panier[nom] = { prix: prix, quantite: qte };
      } else {
        panier[nom].quantite += qte;
        if (panier[nom].quantite > 99) panier[nom].quantite = 99;
      }

      mettreAJourRecap();
    });
  });

  // Mise à jour du récapitulatif
  function mettreAJourRecap() {
    recapBody.innerHTML = "";

    const noms = Object.keys(panier);
    if (noms.length === 0) {
      const tr = document.createElement("tr");
      tr.className = "ligne-vide";
      const td = document.createElement("td");
      td.colSpan = 5;
      td.textContent = "Aucun produit sélectionné pour le moment.";
      tr.appendChild(td);
      recapBody.appendChild(tr);
      totalGeneralSpan.textContent = "0.00";
      return;
    }

    let totalGeneral = 0;

    noms.forEach(nom => {
      const item = panier[nom];
      const sousTotal = item.prix * item.quantite;
      totalGeneral += sousTotal;

      const tr = document.createElement("tr");

      // Nom produit
      const tdNom = document.createElement("td");
      tdNom.textContent = nom;
      tr.appendChild(tdNom);

      // Quantité (modifiable)
      const tdQte = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "99";
      input.value = item.quantite;
      input.className = "recap-quantite";
      input.addEventListener("change", function () {
        let nouvelleQte = parseInt(input.value, 10);
        if (isNaN(nouvelleQte) || nouvelleQte < 1) nouvelleQte = 1;
        if (nouvelleQte > 99) nouvelleQte = 99;
        input.value = nouvelleQte;
        panier[nom].quantite = nouvelleQte;
        mettreAJourRecap();
      });
      tdQte.appendChild(input);
      tr.appendChild(tdQte);

      // Prix unitaire
      const tdPrix = document.createElement("td");
      tdPrix.textContent = item.prix.toFixed(2);
      tr.appendChild(tdPrix);

      // Sous-total
      const tdSousTotal = document.createElement("td");
      tdSousTotal.textContent = sousTotal.toFixed(2);
      tr.appendChild(tdSousTotal);

      // Action supprimer
      const tdAction = document.createElement("td");
      const btnSupprimer = document.createElement("button");
      btnSupprimer.textContent = "Supprimer";
      btnSupprimer.className = "btn-supprimer";
      btnSupprimer.addEventListener("click", function () {
        delete panier[nom];
        mettreAJourRecap();
      });
      tdAction.appendChild(btnSupprimer);
      tr.appendChild(tdAction);

      recapBody.appendChild(tr);
    });

    totalGeneralSpan.textContent = totalGeneral.toFixed(2);
  }

  // Bouton Réinitialiser
  btnReset.addEventListener("click", function () {
    for (const nom in panier) {
      delete panier[nom];
    }

    // remettre les quantités du catalogue à 1
    document.querySelectorAll(".quantite").forEach(input => {
      input.value = 1;
    });

    mettreAJourRecap();
    messageConfirmation.textContent = "";
  });

  // Bouton Valider
  btnValider.addEventListener("click", function () {
    if (Object.keys(panier).length === 0) {
      messageConfirmation.style.color = "#e53935";
      messageConfirmation.textContent = "Aucune commande à valider.";
    } else {
      messageConfirmation.style.color = "#2e7d32";
      messageConfirmation.textContent = "Merci ! Votre commande a été validée avec succès.";
    }
  });
});