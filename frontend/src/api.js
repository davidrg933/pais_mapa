const API_URL = 'http://localhost:4000/api';

export async function getAllCountries() {
  const res = await fetch(`${API_URL}/countries`);
  return res.json();
}

export async function saveCountryNote(code, name, note) {
  const res = await fetch(`${API_URL}/countries/${code}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, note }),
  });
  return res.json();
}

export async function deleteCountryNote(code) {
  const res = await fetch(`${API_URL}/countries/${code}`, { method: 'DELETE' });
  return res.json();
}
