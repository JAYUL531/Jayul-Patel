// Current filter state
let currentCategory = 'all';
let searchQuery = '';

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function filterProducts(products) {
    return products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = filterProducts(products);

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h2>No products found</h2>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                ${product.sale ? `<span class="sale-badge">SALE</span>` : ''}
                ${product.stock < 10 ? `<span class="stock-warning">Only ${product.stock} left!</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="rating-value">${product.rating.toFixed(1)}</span>
                    <span class="review-count">(${product.reviews.length} reviews)</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-price-container">
                    ${product.sale 
                        ? `<p class="product-price">
                            <span class="original-price">$${product.price.toFixed(2)}</span>
                            <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
                           </p>`
                        : `<p class="product-price">$${product.price.toFixed(2)}</p>`
                    }
                </div>
                <button class="add-to-cart" onclick="cart.addItem(${JSON.stringify(product)})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="view-details" onclick="showProductDetails(${product.id})">
                    <i class="fas fa-info-circle"></i>
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.name}</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="product-details">
                <div class="product-image-large">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info-detailed">
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStarRating(product.rating)}
                        </div>
                        <span class="rating-value">${product.rating.toFixed(1)}</span>
                        <span class="review-count">(${product.reviews.length} reviews)</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock} units</p>
                    </div>
                    <div class="product-price-container">
                        ${product.sale 
                            ? `<p class="product-price">
                                <span class="original-price">$${product.price.toFixed(2)}</span>
                                <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
                               </p>`
                            : `<p class="product-price">$${product.price.toFixed(2)}</p>`
                        }
                    </div>
                    <button class="add-to-cart" onclick="cart.addItem(${JSON.stringify(product)})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-reviews">
                <h3>Customer Reviews</h3>
                <div class="reviews-container">
                    ${product.reviews.map(review => `
                        <div class="review">
                            <div class="review-header">
                                <span class="reviewer-name">${review.user}</span>
                                <div class="review-rating">
                                    ${generateStarRating(review.rating)}
                                </div>
                                <span class="review-date">${review.date}</span>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
                ${isLoggedIn() ? `
                    <div class="add-review">
                        <h4>Add Your Review</h4>
                        <form id="reviewForm" onsubmit="submitReview(event, ${product.id})">
                            <div class="rating-input">
                                <label>Your Rating:</label>
                                <div class="star-rating">
                                    ${[5,4,3,2,1].map(num => `
                                        <input type="radio" id="star${num}" name="rating" value="${num}">
                                        <label for="star${num}"><i class="far fa-star"></i></label>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Your Review:</label>
                                <textarea name="comment" required></textarea>
                            </div>
                            <button type="submit" class="submit-btn">
                                <i class="fas fa-paper-plane"></i>
                                Submit Review
                            </button>
                        </form>
                    </div>
                ` : `
                    <p class="login-prompt">Please <a href="#" onclick="document.getElementById('loginModal').classList.add('active')">login</a> to leave a review.</p>
                `}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('active');

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function submitReview(event, productId) {
    event.preventDefault();
    const form = event.target;
    const rating = parseInt(form.rating.value);
    const comment = form.comment.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!rating) {
        alert('Please select a rating');
        return;
    }

    const newReview = {
        user: currentUser.name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
    };

    const product = products.find(p => p.id === productId);
    if (product) {
        product.reviews.unshift(newReview);
        product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
        displayProducts(products);
        const modal = event.target.closest('.modal');
        modal.remove();
    }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    displayProducts(products);
});

// Event listeners for category filters
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        currentCategory = button.dataset.category;
        displayProducts(products);
    });
});

// Profile dropdown toggle
const authBtn = document.getElementById('authBtn');
const profileDropdown = document.getElementById('profileDropdown');

authBtn.addEventListener('click', (e) => {
    if (isLoggedIn()) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    } else {
        document.getElementById('loginModal').classList.add('active');
    }
});

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileDropdown.contains(e.target) && !authBtn.contains(e.target)) {
        profileDropdown.classList.remove('active');
    }
});

// Update profile name
function updateProfileName() {
    const profileName = document.getElementById('profileName');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        profileName.textContent = currentUser.name;
    }
}

// Close modals when clicking the close button
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

// Initialize
displayProducts(products);
updateProfileName(); 
