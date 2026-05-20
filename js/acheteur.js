const acheteursBody = document.getElementById('acheteurs-body');
const chercherAcheteur = document.getElementById('chercher-acheteur'); 
const actualiserAcheteursBtn = document.getElementById('actualiser-acheteurs');
let tousLesAcheteurs = [];


function afficherAcheteurs(acheteur) {
  if (!acheteur || !acheteur.length) {
    acheteursBody.innerHTML = '<tr><td colspan="5">Aucun acheteur trouvé.</td></tr>';
    return;
  }

  acheteursBody.innerHTML = acheteur.map(a => `
    <tr>
      <td>${escapeHtml(a.acheteur_id)}</td>
      <td>${escapeHtml(a.acheteur_nom)}</td>
      <td>${escapeHtml(a.acheteur_email)}</td>
      <td><span class="badge_membre">${escapeHtml(a.acheteur_typedemembre)}</span></td>
      <td><button class="danger" onclick="supprimerAcheteur(${a.acheteur_id})">Supprimer</button></td>
    </tr>
  `).join('');
}

async function chargerAcheteurs() {
  acheteursBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    tousLesAcheteurs = await getAll('acheteur');
    afficherAcheteurs(tousLesAcheteurs);
  } catch (error) {
    console.error("Erreur ORDS :", error);
    acheteursBody.innerHTML = `<tr><td colspan="5" style="color: red; font-weight: bold;">Erreur : ${escapeHtml(error.message)}</td></tr>`;
  }
}

async function supprimerAcheteur(id) {
  if (!confirm(`Supprimer l'acheteur ${id} ?`)) return;
  try {
    await remove('acheteur', id);
    setMessage('acheteur-message', `Acheteur ${id} supprimé avec succès.`, 'success');
    chargerAcheteurs(); 
  } catch (error) {
    setMessage('acheteur-message', error.message, 'error');
  }
}

const acheteurForm = document.getElementById('acheteur-form');
if (acheteurForm) {
  acheteurForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouvelAcheteur = {
      acheteur_nom: document.getElementById('acheteur_nom').value.trim(),
      acheteur_email: document.getElementById('acheteur_email').value.trim(),
      acheteur_typedemembre: document.getElementById('acheteur_TypeDeMembre').value
    };

    try {
      await create('acheteur', nouvelAcheteur);
      acheteurForm.reset();
      setMessage('acheteur-message', 'Acheteur ajouté avec succès.', 'success');
      chargerAcheteurs(); 
    } catch (error) {
      setMessage('acheteur-message', error.message, 'error');
    }
  });
}

if (chercherAcheteur) {
  chercherAcheteur.addEventListener('input', () => {
    const terme = chercherAcheteur.value.trim().toLowerCase();
    const filtres = tousLesAcheteurs.filter(a =>
      String(a.acheteur_nom || '').toLowerCase().includes(terme)
    );
    afficherAcheteurs(filtres);
  });
}

if (actualiserAcheteursBtn) {
  actualiserAcheteursBtn.addEventListener('click', chargerAcheteurs);
}

chargerAcheteurs();
