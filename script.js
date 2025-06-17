// Data structure for stores and products
const stores = [
    {
        id: 'shopee',
        name: 'Shopee',
        logo: 'S', // Fallback text
        logoImage: '', // URL da imagem
        route: '/shopee'
    },
    {
        id: 'mercadolivre',
        name: 'Mercado Livre',
        logo: 'ML', // Fallback text
        logoImage: '', // URL da imagem
        route: '/mercadolivre'
    },
    {
        id: 'amazon',
        name: 'Amazon',
        logo: 'A', // Fallback text
        logoImage: '', // URL da imagem
        route: '/amazon'
    }
];

const products = [
    {
        id: 1,
        title: 'Smartphone Samsung Galaxy A54',
        store: 'Shopee',
        currentPrice: 'R$ 1.299,90',
        originalPrice: 'R$ 1.699,90',
        discount: '24% OFF',
        icon: '📱',
        image: '', // Você pode adicionar URL de imagem do produto também
        description: 'Smartphone com tela de 6.4", câmera tripla de 50MP, 128GB de armazenamento e bateria de 5000mAh.',
        affiliateUrl: 'https://s.shopee.com.br/9KW8S0gF6y'
    },
    {
        id: 2,
        title: 'Fone de Ouvido Bluetooth JBL',
        store: 'Shopee',
        currentPrice: 'R$ 149,90',
        originalPrice: 'R$ 249,90',
        discount: '40% OFF',
        icon: '🎧',
        image: '',
        description: 'Fone de ouvido sem fio com cancelamento de ruído e 20 horas de bateria.',
        affiliateUrl: 'https://shopee.com.br/produto-exemplo-2'
    },
    {
        id: 3,
        title: 'Smart TV 50" 4K LG',
        store: 'Amazon',
        currentPrice: 'R$ 1.899,90',
        originalPrice: 'R$ 2.499,90',
        discount: '24% OFF',
        icon: '📺',
        image: '',
        description: 'Smart TV 4K com HDR, sistema WebOS e controle por voz integrado.',
        affiliateUrl: 'https://amazon.com.br/produto-exemplo'
    },
    {
        id: 4,
        title: 'Notebook Lenovo IdeaPad 3',
        store: 'Mercado Livre',
        currentPrice: 'R$ 2.299,90',
        originalPrice: 'R$ 2.899,90',
        discount: '21% OFF',
        icon: '💻',
        image: '',
        description: 'Notebook com processador Intel i5, 8GB RAM, SSD 256GB e tela 15.6".',
        affiliateUrl: 'https://mercadolivre.com.br/produto-exemplo'
    }
];

let currentAffiliateUrl = '';

// Initialize the page
function init() {
    renderStores();
    renderProducts(products);
}

// Create logo element (image or text fallback)
function createLogoElement(store) {
    if (store.logoImage) {
        return `
            <img 
                src="${store.logoImage}" 
                alt="${store.name} Logo" 
                class="store-logo-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div class="store-logo-text" style="display: none;">${store.logo}</div>
        `;
    } else {
        return `<div class="store-logo-text">${store.logo}</div>`;
    }
}

// Create product image element
function createProductImageElement(product) {
    if (product.image) {
        return `
            <img 
                src="${product.image}" 
                alt="${product.title}" 
                class="product-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div class="product-icon-fallback" style="display: none;">${product.icon}</div>
        `;
    } else {
        return `<div class="product-icon-fallback">${product.icon}</div>`;
    }
}

// Render store widgets
function renderStores() {
    const storeGrid = document.getElementById('storeGrid');
    storeGrid.innerHTML = stores.map(store => `
        <div class="store-card" onclick="filterByStore('${store.id}')">
            <div class="store-logo">
                ${createLogoElement(store)}
            </div>
            <div class="store-name">${store.name}</div>
        </div>
    `).join('');
}

// Render product widgets
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                ${createProductImageElement(product)}
                ${product.discount ? `<div class="discount-badge">${product.discount}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-store">📍 ${product.store}</p>
                <div class="product-price">
                    <span class="current-price">${product.currentPrice}</span>
                    <span class="original-price">${product.originalPrice}</span>
                </div>
                <button class="product-btn">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Filter products by store
function filterByStore(storeId) {
    const storeName = stores.find(store => store.id === storeId)?.name;
    if (storeName) {
        const filteredProducts = products.filter(product => product.store === storeName);
        renderProducts(filteredProducts);
        
        // Visual feedback for selected store
        updateStoreSelection(storeId);
    }
}

// Update store selection visual feedback
function updateStoreSelection(selectedStoreId) {
    // Remove previous selection
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current store
    const storeCards = document.querySelectorAll('.store-card');
    const selectedIndex = stores.findIndex(store => store.id === selectedStoreId);
    if (selectedIndex !== -1 && storeCards[selectedIndex]) {
        storeCards[selectedIndex].classList.add('selected');
    }
}

// Show all products
function showAllProducts() {
    renderProducts(products);
    // Remove all selections
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim() === '') {
        renderProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.store.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
    
    // Remove store selections when searching
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Set modal image
    const modalImageContainer = document.getElementById('modalImage');
    modalImageContainer.innerHTML = createProductImageElement(product);
    
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalCurrentPrice').textContent = product.currentPrice;
    document.getElementById('modalOriginalPrice').textContent = product.originalPrice;
    
    currentAffiliateUrl = product.affiliateUrl;
    
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Redirect to affiliate link
function redirectToAffiliate() {
    if (currentAffiliateUrl) {
        window.open(currentAffiliateUrl, '_blank');
        
        // Optional: Close modal after redirect
        setTimeout(() => {
            closeModal();
        }, 500);
    }
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    showAllProducts();
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    const searchInput = document.getElementById('searchInput');
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Real-time search (optional)
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length === 0) {
            showAllProducts();
        } else if (searchTerm.length >= 2) {
            searchProducts();
        }
    });

    // Close modal when clicking outside
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Widget functions for easy customization
function addStore(store) {
    stores.push({
        ...store,
        logo: store.logo || store.name.charAt(0).toUpperCase() // Fallback to first letter
    });
    renderStores();
}

function addProduct(product) {
    products.push({
        ...product,
        id: products.length + 1,
        icon: product.icon || '📦' // Default icon
    });
    renderProducts(products);
}

// Update store logo
function updateStoreLogo(storeId, newLogoImage, newLogoText) {
    const store = stores.find(s => s.id === storeId);
    if (store) {
        if (newLogoImage) store.logoImage = newLogoImage;
        if (newLogoText) store.logo = newLogoText;
        renderStores();
    }
}

// Update product image
function updateProductImage(productId, newImage, newIcon) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (newImage) product.image = newImage;
        if (newIcon) product.icon = newIcon;
        renderProducts(products);
    }
}

// Utility function to preload images for better performance
function preloadImages() {
    const imageUrls = [
        ...stores.filter(store => store.logoImage).map(store => store.logoImage),
        ...products.filter(product => product.image).map(product => product.image)
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload on page load
document.addEventListener('DOMContentLoaded', preloadImages);