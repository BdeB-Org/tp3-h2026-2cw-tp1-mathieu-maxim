const BASE_URL = 'http://localhost:8080/ords/supermarche'


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
 
  /*
  il faut changer pour que sa correspond a un tableau qu' on a

  async function getItemsByPanier(idPanier) {
    const items = await getAll('item');
    return items.filter(item => Number(item.id_panier) === Number(idPanier));
  }
    */
  