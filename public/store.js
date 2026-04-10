const API = "http://localhost:5000/api";

const FALLBACK_PRODUCTS = [
  { _id: "1", name: "Stock Fish", price: 8000, category: "seafood", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400" },
  { _id: "2", name: "Garri (Ijebu)", price: 3000, category: "grains", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400" },
  { _id: "3", name: "Dried Ugu Leaf", price: 3000, category: "vegetables", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400" },
  { _id: "4", name: "Dried Bitter Leaf", price: 2800, category: "vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
  { _id: "5", name: "Dried Uziza Leaf", price: 3200, category: "vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  { _id: "6", name: "Rice", price: 45000, category: "grains", image: "images/Rice.jpg" },
  { _id: "7", name: "Brown Beans", price: 12000, category: "grains", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400" },
  { _id: "8", name: "Yam Flour (Elubo)", price: 5000, category: "tubers", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400" },
  { _id: "9", name: "Plantain Flour", price: 4500, category: "tubers", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400" },
  { _id: "10", name: "Dried Yam Chips", price: 3500, category: "tubers", image: "images/Dried Yam Chips.jpg" },
  { _id: "11", name: "Egusi Seeds", price: 4000, category: "spices", image: "https://images.unsplash.com/photo-1612257999756-c0f9e91f7e5e?w=400" },
  { _id: "12", name: "Ogbono Seeds", price: 4200, category: "spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" },
  { _id: "13", name: "Palm Oil (5L)", price: 7000, category: "spices", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400" },
  { _id: "14", name: "Dried Pepper (Tatashe)", price: 2500, category: "spices", image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400" },
  { _id: "15", name: "Crayfish (Ground)", price: 4500, category: "seafood", image: "images/crayfish.jpg" },
  { _id: "16", name: "Dried Cat Fish", price: 6000, category: "seafood", image: "images/dried catfish.jpg" },
  { _id: "17", name: "Garri", price: 8000, category: "grains", image: "images/Garri.jpg" },
  { _id: "18", name: "Dried Banga Pulp", price: 3500, category: "spices", image: "images/Dried Banga Pulp2.jpg" },
];

let products = [];
let cart = [];
let currentCategory = "all";

// ── PRODUCTS ──────────────────────────────────────────────────────────────────

async function loadProducts() {
  try {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    products = Array.isArray(data) && data.length > 0 ? data : FALLBACK_PRODUCTS;
  } catch {
    products = FALLBACK_PRODUCTS;
  }
  displayProducts();
}

function displayProducts() {
  const container = document.querySelector(".product-grid");
  container.innerHTML = "";

  const searchVal = document.getElementById("search").value.toLowerCase();

  const filtered = products.filter(p =>
    (currentCategory === "all" || p.category === currentCategory) &&
    p.name.toLowerCase().includes(searchVal)
  );

  if (filtered.length === 0) {
    container.innerHTML = "<p class='empty'>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <div class="card-img-wrap">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x180?text=No+Image'">
          <span class="badge">${p.category || ""}</span>
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="price">₦${Number(p.price).toLocaleString()}</p>
          <button onclick="addToCart('${p._id}')">🛒 Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function filterCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".categories button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  displayProducts();
}

document.getElementById("search").addEventListener("input", displayProducts);

// ── CART ──────────────────────────────────────────────────────────────────────

function addToCart(id) {
  const product = products.find(p => p._id === id);
  if (!product) return;

  const existing = cart.find(c => c._id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  showAddedFeedback(id);
}

function showAddedFeedback(id) {
  document.querySelectorAll(".card button").forEach(btn => {
    if (btn.getAttribute("onclick") === `addToCart('${id}')`) {
      btn.innerText = "✅ Added!";
      setTimeout(() => btn.innerText = "🛒 Add to Cart", 1000);
    }
  });
}

function changeQty(id, delta) {
  const item = cart.find(c => c._id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c._id !== id);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let totalQty = 0;

  cart.forEach(item => {
    const subtotal = Number(item.price) * item.qty;
    total += subtotal;
    totalQty += item.qty;

    cartItems.innerHTML += `
      <li class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/56?text=🌿'">
        </div>
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">₦${Number(item.price).toLocaleString()} each</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty('${item._id}', -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item._id}', 1)">+</button>
        </div>
        <div class="cart-item-subtotal">₦${subtotal.toLocaleString()}</div>
      </li>
    `;
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<li class='cart-empty'>Your cart is empty</li>";
  }

  totalEl.innerText = total.toLocaleString();
  countEl.innerText = totalQty;
}

function openCart() {
  document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// ── CHECKOUT / PAYSTACK ───────────────────────────────────────────────────────

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  closeCart();
  payWithPaystack(total);
}

function payWithPaystack(total) {
  let handler = PaystackPop.setup({
    key: "pk_test_fb3ef574cfd0e58d9deeeacc8c2660e06609addf",
    email: "customer@email.com",
    amount: total * 100,
    currency: "NGN",
    callback: async function(response) {
      try {
        await fetch(`${API}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart, total, paymentRef: response.reference })
        });
      } catch {}
      alert("✅ Payment successful! Ref: " + response.reference);
      cart = [];
      updateCart();
    },
    onClose: function() {
      alert("Payment cancelled.");
    }
  });
  handler.openIframe();
}

// ── INIT ──────────────────────────────────────────────────────────────────────

loadProducts();