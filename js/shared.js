function setMessage(elementId, message, type = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.className = 'message';
    if (type) el.classList.add(type);
    el.textContent = message;
  }

  function formatArgent(value) {
    if (value === null || value === undefined || value === '') return '—';
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(Number(value));
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return '—';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(value) {
    if (value === null || value === undefined || value === '') return '—';
    return String(value).split('T')[0];//pour enlever l'informatin inutile dans la date
  }
  