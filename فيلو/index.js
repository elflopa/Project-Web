function goToForm() {
	window.location.href = "form.html";
}

async function fetchDataAndStore() {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users ");
		const users = await response.json();

		const simplifiedUsers = users.map((user) => ({
			username: user.username,
			email: user.email,
		}));

		localStorage.setItem("localUsers", JSON.stringify(simplifiedUsers));
		loadUsers();
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function loadUsers() {
	const users = JSON.parse(localStorage.getItem("localUsers")) || [];

	const tableBody = document.querySelector("#userTable tbody");
	tableBody.innerHTML = "";

	users.forEach((user, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${user.username}</td>
		<td>${user.email}</td>
		<td class="actions">
		  <button onclick="editUser(${index})">Edit</button>
		  <button onclick="deleteUser(${index})">Delete</button>
		</td>
	  `;
		tableBody.appendChild(row);
	});
}

function editUser(index) {
	localStorage.setItem("editIndex", index);
	window.location.href = "form.html";
}

function deleteUser(index) {
	const users = JSON.parse(localStorage.getItem("localUsers")) || [];
	if (confirm("Are you sure you want to delete this user?")) {
		users.splice(index, 1);
		localStorage.setItem("localUsers", JSON.stringify(users));
		loadUsers();
	}
}

document.addEventListener("DOMContentLoaded", function () {
	if (!localStorage.getItem("localUsers")) {
		fetchDataAndStore();
	} else {
		loadUsers();
	}
});
