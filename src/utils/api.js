export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} at ${path}`);
  // 204 No Content or DELETE requests with empty body
  if (res.status === 204 || (options.method === 'DELETE' && res.status === 200)) {
    return null;
  }
  // Handle empty response body
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function getClothingItems() {
  return request('/items');
}

export const addClothingItem = async (item) => {
  return request('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = async (id) => {
  return request(`/items/${id}`, { method: 'DELETE' });
};
