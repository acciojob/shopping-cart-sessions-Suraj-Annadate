// script.js
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Initialize the cart from session storage if it exists
let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

// Event listener for adding products to the cart
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
    renderCart();
  }
});

// Event listener for removing products from the cart
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
    renderCart();
  }
});

// Event listener for clearing the cart
clearCartButton.addEventListener("click", () => {
  clearCart();
  renderCart();
});

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });
  // Save the updated cart to session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  cart.push({ id: productId });
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
}

// Clear cart
function clearCart() {
  cart = [];
}

// Initial render
renderProducts();
renderCart();
