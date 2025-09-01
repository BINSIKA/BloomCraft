// Product data
const products = [
    {
        id: '1',
        name: 'Romantic Rose Bouquet',
        price: 89.99,
        originalPrice: 109.99,
        image: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'roses',
        occasion: 'anniversary',
        description: 'A stunning arrangement of premium red roses, perfect for expressing deep love and passion. Each rose is carefully selected for its beauty and longevity.',
        features: ['24 Premium Red Roses', 'Elegant Wrapping', 'Free Delivery', '7-day Freshness Guarantee'],
        inStock: true,
    },
    {
        id: '2',
        name: 'Spring Garden Mix',
        price: 64.99,
        image: 'https://images.pexels.com/photos/1381679/pexels-photo-1381679.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'mixed',
        occasion: 'birthday',
        description: 'A vibrant collection of seasonal flowers that brings the joy of spring into any space. Perfect for birthdays and celebrations.',
        features: ['Seasonal Flowers', 'Colorful Arrangement', 'Long-lasting Blooms', 'Artisan Design'],
        inStock: true,
    },
    {
        id: '3',
        name: 'Elegant White Lilies',
        price: 74.99,
        image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'lilies',
        occasion: 'sympathy',
        description: 'Pure and graceful white lilies that convey peace and remembrance. A timeless choice for both celebration and solace.',
        features: ['Fresh White Lilies', 'Sophisticated Presentation', 'Same-day Delivery', 'Sympathy Card Included'],
        inStock: true,
    },
    {
        id: '4',
        name: 'Sunflower Sunshine',
        price: 52.99,
        image: 'https://images.pexels.com/photos/3662770/pexels-photo-3662770.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'sunflowers',
        occasion: 'friendship',
        description: 'Bright and cheerful sunflowers that instantly lift spirits and bring warmth to any room. Perfect for spreading joy and positivity.',
        features: ['Large Sunflower Heads', 'Rustic Charm', 'Eco-friendly Packaging', 'Sunshine Guarantee'],
        inStock: true,
    },
    {
        id: '5',
        name: 'Pastel Dreams',
        price: 69.99,
        image: 'https://images.pexels.com/photos/1207978/pexels-photo-1207978.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'mixed',
        occasion: 'wedding',
        description: 'Soft pastels create a dreamy arrangement perfect for weddings and special occasions. Delicate and romantic with lasting beauty.',
        features: ['Soft Pastel Colors', 'Wedding-perfect', 'Premium Quality', 'Custom Ribbon'],
        inStock: true,
    },
    {
        id: '6',
        name: 'Tropical Paradise',
        price: 94.99,
        image: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'tropical',
        occasion: 'congratulations',
        description: 'Exotic tropical flowers that transport you to paradise. Bold, vibrant colors make this perfect for congratulations and celebrations.',
        features: ['Exotic Tropical Flowers', 'Bold Colors', 'Unique Design', 'Temperature Controlled Delivery'],
        inStock: false,
    },
    {
        id: '7',
        name: 'Classic Tulips',
        price: 45.99,
        image: 'https://images.pexels.com/photos/1210010/pexels-photo-1210010.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'tulips',
        occasion: 'mothers-day',
        description: 'Fresh tulips in beautiful colors, perfect for Mother\'s Day or any spring celebration. Simple elegance that speaks volumes.',
        features: ['Fresh Spring Tulips', 'Variety of Colors', 'Mothers Day Special', 'Affordable Luxury'],
        inStock: true,
    },
    {
        id: '8',
        name: 'Red Romance',
        price: 79.99,
        originalPrice: 95.99,
        image: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'roses',
        occasion: 'valentines',
        description: 'Passionate red flowers arranged to perfection. The ultimate expression of love and romance for that special someone.',
        features: ['Deep Red Blooms', 'Romantic Packaging', 'Love Note Included', 'Premium Selection'],
        inStock: true,
    },
];

// Cart functionality
let cart = [];
let currentFilters = { category: 'all', occasion: 'all' };

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.category ? 'category' : 'occasion';
            const filterValue = this.dataset.category || this.dataset.occasion;
            
            // Update active state
            const siblingButtons = this.parentElement.querySelectorAll('.filter-btn');
            siblingButtons.forEach(sibling => sibling.classList.remove('active'));
            this.classList.add('active');
            
            // Update filters and re-render
            currentFilters[filterType] = filterValue;
            renderProducts();
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderProducts(this.value);
        });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.querySelector('input').value = '';
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Render products
function renderProducts(searchTerm = '') {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    let filteredProducts = products.filter(product => {
        const matchesCategory = currentFilters.category === 'all' || product.category === currentFilters.category;
        const matchesOccasion = currentFilters.occasion === 'all' || product.occasion === currentFilters.occasion;
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesOccasion && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🌸</div>
                <h3 style="color: #666; margin-bottom: 0.5rem;">No flowers found</h3>
                <p style="color: #999;">Try adjusting your filters or search terms</p>
                <button onclick="clearFilters()" style="margin-top: 1rem; background: #e91e63; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Clear Filters</button>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}" onclick="openProductModal('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice ? '<div class="product-badge">Sale</div>' : ''}
                ${!product.inStock ? '<div class="out-of-stock-overlay">Out of Stock</div>' : ''}
                <button class="product-favorite" onclick="event.stopPropagation(); toggleFavorite('${product.id}')">❤️</button>
            </div>
            <div class="product-info">
                <div class="product-rating">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <span class="rating-text">(4.8)</span>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                        🛒
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    showCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    renderCartItems();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        renderCartItems();
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCartNotification(productName) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = `${productName} added to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Modal functions
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('active');
    renderCartItems();
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <small>Add some beautiful flowers to get started</small>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
        </div>
    `).join('');
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('productModalContent');
    
    modalContent.innerHTML = `
        <div class="product-modal-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.originalPrice ? '<div class="product-badge">Sale</div>' : ''}
            ${!product.inStock ? '<div class="out-of-stock-overlay">Out of Stock</div>' : ''}
        </div>
        <div class="product-modal-info">
            <div>
                <div class="product-modal-rating">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <span>(4.8) • 127 reviews</span>
                </div>
                <h1 class="product-modal-title">${product.name}</h1>
                <div class="product-modal-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <p class="product-modal-description">${product.description}</p>
                <div class="product-features">
                    <h4>What's Included:</h4>
                    <ul class="features-list">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart('${product.id}'); closeProductModal();" ${!product.inStock ? 'disabled' : ''}>
                    🛒 ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button class="btn btn-secondary">
                    ❤️ Add to Wishlist
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
}

function checkout() {
    if (cart.length === 0) return;
    
    alert(`Order placed successfully! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}\n\nThank you for choosing BloomCraft!`);
    cart = [];
    updateCartDisplay();
    closeCart();
}

function clearFilters() {
    currentFilters = { category: 'all', occasion: 'all' };
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all' || btn.dataset.occasion === 'all') {
            btn.classList.add('active');
        }
    });
    
    renderProducts();
}

function toggleFavorite(productId) {
    // Simple favorite toggle (could be enhanced with local storage)
    const favoriteBtn = event.target;
    favoriteBtn.style.color = favoriteBtn.style.color === 'red' ? '' : 'red';
}

// Cart button click handler
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);