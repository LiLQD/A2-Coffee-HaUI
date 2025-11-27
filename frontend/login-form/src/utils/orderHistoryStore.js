const KEY = "orderHistory";

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function addOrder(order) {
  const list = getHistory();
  list.push(order);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
