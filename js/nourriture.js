const nourritureBody = document.getElementById('nourriture-body');
const chercherNourriture = document.getElementById('chercher-nourriture');
const actualiserNourritureBtn = document.getElementById('actualiser-nourriture');
let tousLesProduitsAlimentaire = [];

function afficherNourriture(nourriture) {
  if (!nourriture.length) {
    nourritureBody.innerHTML = '<tr><td colspan="7">Aucun produit trouvé.</td></tr>';
    return;
  }

  nourritureBody.innerHTML = nourriture.map(n => `
    <tr>
      <td>${escapeHtml(n.nourriture_id)}</td>
      <td>${escapeHtml(n.nourriture_nom)}</td>
      <td>${formatArgent(n.nourriture_prix)}</td>
      <td>${formatDate(n.nourriture_date_arr)}</td>
      <td>${formatDate(n.nourriture_date_exp)}</td>
      <td>${escapeHtml(n.nourriture_quantite)}</td>
      <td>${escapeHtml(n.nourriture_origine)}</td>
    </tr>
  `).join('');
}

async function chargerNourriture() {
  nourritureBody.innerHTML = '<tr><td colspan="7">Chargement...</td></tr>';
  try {
    tousLesProduitsAlimentaire = await getAll('nourriture');
    afficherNourriture(tousLesProduitsAlimentaire);
  } catch (error) {
    nourritureBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  }
}

chercherNourriture.addEventListener('input', () => {
  const terme = chercherNourriture.value.trim().toLowerCase();
  const filtres = tousLesProduitsAlimentaire.filter(n =>
    String(n.nourriture_nom || '').toLowerCase().includes(terme)
  );
  afficherNourriture(filtres);
});

actualiserNourritureBtn.addEventListener('click', chargerNourriture);
chargerNourriture();
