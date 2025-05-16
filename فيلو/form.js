document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const formTitle = document.getElementById("formTitle");

  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    const users = JSON.parse(localStorage.getItem("localUsers")) || [];
    const user = users[editIndex];
    if (user) {
      usernameInput.value = user.username;
      emailInput.value = user.email;
      formTitle.textContent = "Edit User";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    if (!username || !email) return;

    const users = JSON.parse(localStorage.getItem("localUsers")) || [];

    if (editIndex !== null) {
      users[editIndex] = { username, email };
      localStorage.removeItem("editIndex");
    } else {
      users.push({ username, email });
    }

    localStorage.setItem("localUsers", JSON.stringify(users));
    window.location.href = "index.html";
  });
});