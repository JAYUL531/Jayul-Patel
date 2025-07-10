class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartCount();
        this.updateCartModal();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartModal();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.updateCartModal();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalItems;
    }

    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }
}

const cart = new Cart();

// Event Listeners
document.getElementById('cartBtn').addEventListener('click', () => {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    cart.updateCartModal();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!isLoggedIn()) {
        alert('Please login to checkout');
        document.getElementById('cartModal').classList.remove('active');
        document.getElementById('loginModal').classList.add('active');
        return;
    }
    
    // Implement checkout logic here
    alert('Thank you for your purchase!');
    cart.items = [];
    cart.saveCart();
    cart.updateCartCount();
    document.getElementById('cartModal').classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
}); 