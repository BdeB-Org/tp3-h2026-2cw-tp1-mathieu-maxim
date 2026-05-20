const BASE_URL = 'http://localhost:8080/ords/supermarcherr';


async function handleResponse(response) {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erreur HTTP ${response.status} - ${text}`);
    }
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }
  
  async function getAll(table) {
    const data = await fetch(`${BASE_URL}/${table}/`).then(handleResponse);
    return data.items ?? [];
  }
  
  async function getById(table, id) {
    return fetch(`${BASE_URL}/${table}/${id}`).then(handleResponse);
  }
  
  async function create(table, data) {
    return fetch(`${BASE_URL}/${table}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  }
  
  async function update(table, id, data) {
    return fetch(`${BASE_URL}/${table}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  }
  
  async function remove(table, id) {
    return fetch(`${BASE_URL}/${table}/${id}`, {
      method: 'DELETE'
    }).then(handleResponse);
  }
 
  

  async function getProduitsByGroupe(idGroupe) {
    const produits = await getAll('produit');
    return produits.filter(prod => Number(prod.groupe_alimentaire_groupealimentaire_id) === Number(idGroupe));
  }
    
  
