// ========================================
// Marwa Medical - Main JavaScript
// All interactive functionality
// ========================================

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: false,
    offset: 100,
    easing: 'ease-in-out'
});

// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1500);
});

// ========================================
// Header Scroll Effect
// ========================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Back to Top Button
// ========================================
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Search Functionality
// ========================================
const searchBtn = document.getElementById('searchBtn');
const closeSearch = document.getElementById('closeSearch');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}

// Close search overlay on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search input handler
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchProducts(query);
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--light-text);">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                    <p style="font-size: 18px;">هیچ ئەنجامێک نەدۆزرایەوە</p>
                </div>
            `;
            return;
        }
        
        searchResults.innerHTML = `
            <h3 style="margin-bottom: 20px; color: var(--primary-color);">${results.length} کاڵا دۆزرایەوە</h3>
            <div style="display: grid; gap: 15px;">
                ${results.map(product => `
                    <div style="display: flex; gap: 15px; padding: 15px; background: var(--light-bg); border-radius: 10px; align-items: center;">
                        <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--dark-text); margin-bottom: 5px;">${product.name}</h4>
                            <p style="color: var(--light-text); font-size: 14px; margin-bottom: 5px;">${getCategoryNameKurdish(product.category)}</p>
                            <p style="color: var(--accent-color); font-weight: 700; font-size: 18px;">${Number(product.price).toLocaleString()} د.ع</p>
                        </div>
                        <a href="https://wa.me/9647731532524?text=${encodeURIComponent('سڵاو، دەمەوێت پرسیار بکەم دەربارەی: ' + product.name)}" 
                           target="_blank"
                           style="padding: 10px 20px; background: var(--teal-accent); color: white; border-radius: 8px; text-decoration: none; white-space: nowrap;">
                            <i class="fab fa-whatsapp"></i> پرسیار
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    });
}

// ========================================
// Add Product Modal
// ========================================
const addProductModal = document.getElementById('addProductModal');
const addProductForm = document.getElementById('addProductForm');
let currentCategory = '';

// Open modal
function openAddProductModal(category) {
    currentCategory = category;
    document.getElementById('productCategory').value = category;
    addProductModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeAddProductModal() {
    addProductModal.classList.remove('active');
    document.body.style.overflow = '';
    addProductForm.reset();
    currentCategory = '';
}

// Close modal when clicking outside
addProductModal?.addEventListener('click', (e) => {
    if (e.target === addProductModal) {
        closeAddProductModal();
    }
});

// Handle form submission
function addProduct(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const product = {
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        description: formData.get('description') || ''
    };
    
    // Validate (price is now optional)
    if (!product.name || !product.image) {
        alert('تکایە ناوی کاڵا و وێنە پڕ بکەرەوە');
        return;
    }
    
    // If price is empty, set to 0 or empty string
    if (!product.price || product.price.trim() === '') {
        product.price = '0';
    }
    
    // Add product
    const newProduct = addProductToCategory(currentCategory, product);
    
    // Reload category products
    loadCategoryProducts(currentCategory);
    
    // Show success message
    showNotification('کاڵاکە بەسەرکەوتووی زیادکرا', 'success');
    
    // Close modal
    closeAddProductModal();
}

// ========================================
// Delete Products Modal
// ========================================
const deleteProductsModal = document.getElementById('deleteProductsModal');

// Open delete modal
function openDeleteProductsModal(category) {
    currentCategory = category;
    const products = getProductsByCategory(category);
    const categoryName = getCategoryNameKurdish(category);
    
    if (products.length === 0) {
        showNotification('هیچ کاڵایەک نییە بۆ سڕینەوە', 'warning');
        return;
    }
    
    const modalContent = `
        <div class="modal-header">
            <h3>سڕینەوەی کاڵاکان - ${categoryName}</h3>
            <button class="close-modal" onclick="closeDeleteProductsModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="delete-products-list">
            ${products.map(product => `
                <div class="delete-product-item" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop'">
                    <div class="delete-product-info">
                        <h4>${product.name}</h4>
                        <p class="delete-product-price">${product.price && product.price !== '0' ? Number(product.price).toLocaleString() + ' د.ع' : 'بۆ زانینی نرخەکەی نامە بنێرە'}</p>
                    </div>
                    <button class="btn-delete-single" onclick="confirmDeleteProduct('${category}', '${product.id}')">
                        <i class="fas fa-trash"></i>
                        سڕینەوە
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeDeleteProductsModal()">
                داخستن
            </button>
        </div>
    `;
    
    deleteProductsModal.querySelector('.modal-content').innerHTML = modalContent;
    deleteProductsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close delete modal
function closeDeleteProductsModal() {
    deleteProductsModal.classList.remove('active');
    document.body.style.overflow = '';
    currentCategory = '';
}

// Confirm and delete single product
function confirmDeleteProduct(category, productId) {
    if (confirm('دڵنیایت لە سڕینەوەی ئەم کاڵایە؟')) {
        deleteProduct(category, productId);
        loadCategoryProducts(category);
        
        // Update modal
        openDeleteProductsModal(category);
        
        showNotification('کاڵاکە سڕایەوە', 'success');
    }
}

// Close modal when clicking outside
deleteProductsModal?.addEventListener('click', (e) => {
    if (e.target === deleteProductsModal) {
        closeDeleteProductsModal();
    }
});

// ========================================
// PDF Generation - Now in pdf-generator.js
// ========================================
// PDF generation function is now loaded from js/pdf-generator.js

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Set icon and color based on type
    let icon = 'fa-info-circle';
    let color = '#2c5aa0';
    
    if (type === 'success') {
        icon = 'fa-check-circle';
        color = '#20c997';
    } else if (type === 'error') {
        icon = 'fa-exclamation-circle';
        color = '#dc3545';
    } else if (type === 'warning') {
        icon = 'fa-exclamation-triangle';
        color = '#ffc107';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}" style="font-size: 24px; color: ${color};"></i>
        <p style="flex: 1; margin: 0; color: var(--dark-text); font-weight: 500;">${message}</p>
        <button onclick="this.parentElement.remove()" style="background: transparent; border: none; color: var(--light-text); cursor: pointer; font-size: 20px;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Initialize on Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Marwa Medical Website Loaded Successfully');
    
    // Refresh AOS after products load
    setTimeout(() => {
        AOS.refresh();
    }, 1000);
});

// ========================================
// Make functions globally available
// ========================================
window.openAddProductModal = openAddProductModal;
window.closeAddProductModal = closeAddProductModal;
window.addProduct = addProduct;
window.generatePDF = generatePDF;
window.openDeleteProductsModal = openDeleteProductsModal;
window.closeDeleteProductsModal = closeDeleteProductsModal;
window.confirmDeleteProduct = confirmDeleteProduct;