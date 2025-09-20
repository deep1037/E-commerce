const app = { products: [], cart: [], wishlist: [] };

const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

const wishlistIcon = document.querySelector('.wishlist-icon');
const wishlistCount = document.getElementById('wishlistCount');
const wishlistModal = document.getElementById('wishlistModal');
const wishlistItems = document.getElementById('wishlistItems');
const closeWishlist = document.getElementById('closeWishlist');

const userIcon = document.getElementById('userIcon');
const userModal = document.getElementById('userModal');
const closeUser = document.getElementById('closeUser');

const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const offlineIndicator = document.getElementById('offlineIndicator');

async function init() {
  try {
    let res = await fetch('https://fakestoreapi.com/products');
    app.products = await res.json();
    renderCategories();
    renderProducts(app.products);
  } catch {
    productsGrid.innerHTML = '<p>Failed to load products</p>';
  }

  cartIcon.onclick = () => cartModal.style.display = 'flex';
  closeCart.onclick = () => cartModal.style.display = 'none';

  wishlistIcon.onclick = () => wishlistModal.style.display = 'flex';
  closeWishlist.onclick = () => wishlistModal.style.display = 'none';

  userIcon.onclick = () => userModal.style.display = 'flex';
  closeUser.onclick = () => userModal.style.display = 'none';

  themeToggle.onclick = () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  };

  searchInput.oninput = () => filterProducts();
  categoryFilter.onchange = () => filterProducts();

  window.addEventListener('offline', () => offlineIndicator.style.display = 'block');
  window.addEventListener('online', () => offlineIndicator.style.display = 'none');
}

function renderCategories() {
  let cats = [...new Set(app.products.map(p => p.category))];
  cats.forEach(c => {
    let opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
}

function renderProducts(list) {
  productsGrid.innerHTML = '';
  list.forEach(p => {
    let card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${p.title.substring(0,40)}...</h3>
        <p class="product-price">$${p.price}</p>
        <p class="product-rating">${'⭐'.repeat(Math.round(p.rating.rate))}</p>
        <div class="actions">
          <button class="btn add-cart" data-id="${p.id}">Add to Cart</button>
          <button class="btn wishlist-btn" data-id="${p.id}">❤</button>
        </div>
      </div>`;
    productsGrid.appendChild(card);
  });

  document.querySelectorAll('.add-cart').forEach(b => b.onclick = () => addToCart(+b.dataset.id));
  document.querySelectorAll('.wishlist-btn').forEach(b => b.onclick = () => addToWishlist(+b.dataset.id));
}

function addToCart(id) {
  let p = app.products.find(x => x.id === id);
  let item = app.cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    app.cart.push({ ...p, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartCount.textContent = app.cart.reduce((t, i) => t + i.qty, 0);
  cartItems.innerHTML = '';
  let total = 0;
  app.cart.forEach(i => {
    total += i.price * i.qty;
    cartItems.innerHTML += `<div><img src="${i.image}" style="width:40px;height:40px;"> ${i.title.substring(0,20)}... x${i.qty} - $${(i.price*i.qty).toFixed(2)}</div>`;
  });
  cartTotal.textContent = 'Total: $' + total.toFixed(2);
}

function addToWishlist(id) {
  if (app.wishlist.includes(id)) return;
  app.wishlist.push(id);
  updateWishlist();
}

function updateWishlist() {
  wishlistCount.textContent = app.wishlist.length;
  wishlistItems.innerHTML = '';
  app.wishlist.forEach(id => {
    let p = app.products.find(x => x.id === id);
    wishlistItems.innerHTML += `<div><img src="${p.image}" style="width:40px;height:40px;"> ${p.title.substring(0,20)}... - $${p.price}</div>`;
  });
}

function filterProducts() {
  let term = searchInput.value.toLowerCase();
  let cat = categoryFilter.value;
  let filtered = app.products.filter(p =>
    p.title.toLowerCase().includes(term) &&
    (cat === 'all' || p.category === cat)
  );
  renderProducts(filtered);
}

document.addEventListener('DOMContentLoaded', init);
