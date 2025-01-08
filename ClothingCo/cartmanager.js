let currentUser = null;

// Initialize User Cart
function initializeUserCart() {
    currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('No user detected! Please enter your name on the homepage.');
        window.location.href = 'index.html';
    }
    updateCartButton();
}

// Add Product to Cart
function addToCart(productName, productPrice) {
    if (!currentUser) {
        alert('No user detected! Please enter your name on the homepage.');
        return;
    }

    let userCart = JSON.parse(localStorage.getItem(currentUser)) || [];
    userCart.push({ name: productName, price: productPrice });
    localStorage.setItem(currentUser, JSON.stringify(userCart));

    alert(`${productName} has been added to your cart!`);
    updateCartButton();
}

// Update View Cart Button
function updateCartButton() {
    if (!currentUser) return;

    const cart = JSON.parse(localStorage.getItem(currentUser)) || [];
    const viewCartButton = document.getElementById('view-cart-btn');
    viewCartButton.innerText = cart.length > 0 ? `View Cart (${cart.length} items)` : 'View Cart';
}

// Toggle Cart Modal
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    renderCartItems();
}

// Render Cart Items in Modal
function renderCartItems() {
    if (!currentUser) return;

    const cart = JSON.parse(localStorage.getItem(currentUser)) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty!</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p>${item.name} - <strong>${item.price}</strong></p>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}

// Remove Item from Cart
function removeFromCart(index) {
    if (!currentUser) return;

    let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
    cart.splice(index, 1); 
    localStorage.setItem(currentUser, JSON.stringify(cart));
    renderCartItems();
    updateCartButton();
}

// Clear Entire Cart
function clearCart() {
    if (!currentUser) return;

    localStorage.removeItem(currentUser);
    renderCartItems();
    updateCartButton();
    toggleCartModal();
}

// Checkout (Placeholder)
function checkout() {
    if (!currentUser) return;

    const cart = JSON.parse(localStorage.getItem(currentUser)) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before checking out!');
        return;
    }

    alert(`Thank you, ${currentUser}, for your purchase!`);
    localStorage.removeItem(currentUser);
    toggleCartModal();
    updateCartButton();
}

// On Page Load, Initialize User Cart
document.addEventListener('DOMContentLoaded', initializeUserCart);
