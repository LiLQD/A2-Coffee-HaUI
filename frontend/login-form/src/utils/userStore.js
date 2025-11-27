const KEY = "users";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addUser(user) {
  const users = getUsers();

  // kiểm tra trùng username
  if (users.some(u => u.username === user.username)) {
    return false; // đăng ký thất bại
  }

  users.push(user);
  localStorage.setItem(KEY, JSON.stringify(users));
  return true; // đăng ký thành công
}
