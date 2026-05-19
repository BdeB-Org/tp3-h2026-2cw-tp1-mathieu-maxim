const acheteursBody = document.getElementById('acheteurs-body');
const chercherAcheteur = document.getElementById('chercher-acheteur'); // Assure-toi d'ajouter cet ID dans ton HTML si tu veux une barre de recherche
const reloadAcheteursBtn = document.getElementById('reload-acheteurs');
let tousLesAcheteurs = [];

// 1. Fonction responsable UNIQUEMENT de générer le HTML
function afficherAcheteurs(acheteurs) {
  if (!acheteurs || !acheteurs.length) {
    acheteursBody.innerHTML = '<tr><td colspan="5">Aucun acheteur trouvé.</td></tr>';
    return;
  }

  // CORRECTION : Utilisation des propriétés en minuscules retournées par ORDS
  acheteursBody.innerHTML = acheteurs.map(n => `
    <tr>
      <td>${escapeHtml(n.client_id)}</td>
      <td>${escapeHtml(n.client_nom)}</td>
      <td>${escapeHtml(n.client_email)}</td>
      <td><span class="badge_membre">${escapeHtml(n.client_typedemembre)}</span></td>
      <td><button class="danger" onclick="supprimerAcheteur(${n.client_id})">Supprimer</button></td>
    </tr>
  `).join('');
}

// 2. Fonction responsable d'aller chercher les données sur ORDS
async function chargerAcheteurs() {
  acheteursBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    tousLesAcheteurs = await getAll('client');
    afficherAcheteurs(tousLesAcheteurs);
  } catch (error) {
    console.error("Erreur ORDS :", error);
    acheteursBody.innerHTML = `<tr><td colspan="5" style="color: red; font-weight: bold;">Erreur : ${escapeHtml(error.message)}</td></tr>`;
  }
}

// 3. Gestion de la suppression
async function supprimerAcheteur(id) {
  if (!confirm(`Supprimer l'acheteur ${id} ?`)) return;
  try {
    await remove('client', id);
    setMessage('acheteur-message', `Acheteur ${id} supprimé avec succès.`, 'success');
    chargerAcheteurs(); // Recharge la liste après suppression
  } catch (error) {
    setMessage('acheteur-message', error.message, 'error');
  }
}

// 4. Gestion du formulaire d'ajout
const acheteurForm = document.getElementById('acheteur-form');
if (acheteurForm) {
  acheteurForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelAcheteur = {
      client_id: Math.floor(Math.random() * 100000), // Clé primaire random générer
      client_nom: document.getElementById('client_nom').value.trim(),
      client_email: document.getElementById('client_email').value.trim(),
      client_typedemembre: document.getElementById('client_TypeDeMembre').value
    };

    try {
      await create('client', nouvelAcheteur);
      acheteurForm.reset();
      setMessage('acheteur-message', 'Acheteur ajouté avec succès.', 'success');
      chargerAcheteurs(); // Recharge la liste pour inclure le nouveau
    } catch (error) {
      setMessage('acheteur-message', error.message, 'error');
    }
  });
}

// 5. Barre de recherche dynamique (Recherche par nom)a
if (chercherAcheteur) {
  chercherAcheteur.addEventListener('input', () => {
    const terme = chercherAcheteur.value.trim().toLowerCase();
    const filtres = tousLesAcheteurs.filter(p =>
      String(p.client_nom || '').toLowerCase().includes(terme)
    );
    afficherAcheteurs(filtres);
  });
}

// 6. Bouton Actualiser et chargement initial
if (reloadAcheteursBtn) {
  reloadAcheteursBtn.addEventListener('click', chargerAcheteurs);
}

chargerAcheteurs();