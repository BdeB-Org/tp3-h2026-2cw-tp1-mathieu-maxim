const nourritureBody = document.getElementById('nourriture-body');
const chercherNourriture = document.getElementById('chercher-nourriture');
const actualiserNourritureBtn = document.getElementById('actualiser-nourriture');
let tousLesProduitsAlimentaire = [];

function afficherProduits(produits) {
  if (!produits.length) {
    nourritureBody.innerHTML = '<tr><td colspan="7">Aucun produit trouvé.</td></tr>';
    return;
  }

  nourritureBody.innerHTML = produits.map(n => `
    <tr>
      <td>${escapeHtml(n.produit_id)}</td>
      <td>${escapeHtml(n.produit_nom)}</td>
      <td>${formatArgent(n.produit_prix)}</td>
      <td>${formatDate(n.produit_date_arr)}</td>
      <td>${formatDate(n.produit_date_exp)}</td>
      <td>${escapeHtml(n.produit_quantite)}</td>
      <td>${escapeHtml(n.produit_origine)}</td>
    </tr>
  `).join('');
}

async function chargerProduits() {
  nourritureBody.innerHTML = '<tr><td colspan="7">Chargement...</td></tr>';
  try {
    tousLesProduitsAlimentaire = await getAll('produit');
    afficherProduits(tousLesProduitsAlimentaire);
  } catch (error) {
    nourritureBody.innerHTML = `<tr><td colspan="7">${escapeHtml(error.message)}</td></tr>`;
  }
}

chercherNourriture.addEventListener('input', () => {
  const terme = chercherNourriture.value.trim().toLowerCase();
  const filtres = tousLesProduitsAlimentaire.filter(p =>
    String(p.produit_nom || '').toLowerCase().includes(terme)
  );
  afficherProduits(filtres);
});

actualiserNourritureBtn.addEventListener('click', chargerProduits);
chargerProduits();
