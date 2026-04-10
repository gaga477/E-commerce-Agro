const API = "http://localhost:5000/api";

// ── AUTH ──────────────────────────────────────────────────────────────────────

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");
  if (errorMsg) errorMsg.innerText = "";

  if (!email || !password) {
    if (errorMsg) errorMsg.innerText = "Please fill in all fields.";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      if (errorMsg) errorMsg.innerText = data.message || "Invalid credentials";
    }
  } catch {
    if (errorMsg) errorMsg.innerText = "Server error. Make sure the backend is running.";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}