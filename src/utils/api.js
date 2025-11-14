// Detect if we are running on GitHub Pages (static demo mode)
const IS_PAGES = typeof window !== 'undefined' && /\.github\.io$/.test(window.location.hostname);

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

// Local helpers to simulate writes in demo mode
function readUserItems() {
  try {
    return JSON.parse(localStorage.getItem('userItems') || '[]');
  } catch {
    return [];
  }
}

function writeUserItems(items) {
  try {
    localStorage.setItem('userItems', JSON.stringify(items));
  } catch (e) {
    // Swallow quota/security errors in demo mode; persistence is best-effort only
    console.warn('Failed to persist userItems to localStorage:', e);
  }
}

export async function getClothingItems() {
  if (IS_PAGES) {
    // In GitHub Pages, load static seed data and merge any locally added items
    const res = await fetch(`${import.meta.env.BASE_URL}items.json`, { cache: 'no-store' });
    const seed = await res.json();
    const user = readUserItems();
    return [...user, ...seed];
  }
  return request('/items');
}

export const addClothingItem = async (item) => {
  if (IS_PAGES) {
    // Simulate a successful POST by storing in localStorage
    const id = Date.now().toString();
    const newItem = { id, ...item };
    const items = readUserItems();
    writeUserItems([newItem, ...items]);
    return newItem;
  }
  return request('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = async (id) => {
  if (IS_PAGES) {
    const items = readUserItems();
    const next = items.filter((it) => String(it.id || it._id) !== String(id));
    writeUserItems(next);
    return null;
  }
  return request(`/items/${id}`, { method: 'DELETE' });
};
