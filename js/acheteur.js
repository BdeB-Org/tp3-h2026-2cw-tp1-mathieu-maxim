const acheteursBody = document.getElementById('acheteurs-body');
const acheteurForm = document.getElementById('acheteur-form');
const reloadAcheteursBtn = document.getElementById('reload-acheteurs');

async function chargerAcheteurs() {
  acheteursBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    const acheteurs = await getAll('client'); // 'client' est l'endpoint ORDS de ton choix
    
    if (!acheteurs || !acheteurs.length) {
      acheteursBody.innerHTML = '<tr><td colspan="5">Aucun acheteur trouvé.</td></tr>';
      return;
    }

    acheteursBody.innerHTML = acheteurs.map(acheteur => `
      <tr>
        <td>${escapeHtml(acheteur.client_id)}</td>
        <td>${escapeHtml(acheteur.client_nom)}</td>
        <td>${escapeHtml(acheteur.client_email)}</td>
        <td><span class="badge_membre">${escapeHtml(acheteur.client_typedemembre)}</span></td>
        <td><button class="danger" onclick="supprimerAcheteur(${acheteur.client_id})">Supprimer</button></td>
      </tr>
    `).join('');
  } catch (error) {
    acheteursBody.innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
    setMessage('acheteur-message', 'Impossible de charger les acheteurs.', 'error');
  }
}

async function supprimerAcheteur(id) {
  if (!confirm(`Supprimer l'acheteur ${id} ?`)) return;
  try {
    await remove('client', id);
    setMessage('acheteur-message', `Acheteur ${id} supprimé avec succès.`, 'success');
    chargerAcheteurs();
  } catch (error) {
    setMessage('acheteur-message', error.message, 'error');
  }
}

acheteurForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nouvelAcheteur = {
    client_nom: document.getElementById('client_nom').value.trim(),
    client_email: document.getElementById('client_email').value.trim(),
    client_typedemembre: document.getElementById('client_TypeDeMembre').value
  };

  try {
    await create('client', nouvelAcheteur);
    acheteurForm.reset();
    setMessage('acheteur-message', 'Acheteur ajouté avec succès.', 'success');
    chargerAcheteurs();
  } catch (error) {
    setMessage('acheteur-message', error.message, 'error');
  }
});

reloadAcheteursBtn.addEventListener('click', chargerAcheteurs);
chargerAcheteurs();