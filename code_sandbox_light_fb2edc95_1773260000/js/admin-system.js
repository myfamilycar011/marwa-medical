// ========================================
// Marwa Medical - Admin Authentication System
// Password Protection for Edit Features
// ========================================

// Admin password 
const ADMIN_PASSWORD = 'marwaaa'; 

// Check if user is admin
let isAdminMode = false;

// Initialize admin mode from localStorage
function initAdminMode() {
    const savedAdminMode = localStorage.getItem('marwaAdminMode');
    const savedTimestamp = localStorage.getItem('marwaAdminTimestamp');
    
    // Check if admin session is still valid (24 hours)
    if (savedAdminMode === 'true' && savedTimestamp) {
        const now = Date.now();
        const saved = parseInt(savedTimestamp);
        const hoursPassed = (now - saved) / (1000 * 60 * 60);
        
        if (hoursPassed < 24) {
            isAdminMode = true;
            updateUIForAdminMode();
        } else {
            // Session expired
            logout();
        }
    }
    
    updateUIForAdminMode();
}

// Login function
function adminLogin() {
    const password = prompt('تکایە پاسۆردی بەڕێوەبەر بنووسە:\nPlease enter admin password:');
    
    if (password === null) {
        return; // User cancelled
    }
    
    if (password === ADMIN_PASSWORD) {
        isAdminMode = true;
        localStorage.setItem('marwaAdminMode', 'true');
        localStorage.setItem('marwaAdminTimestamp', Date.now().toString());
        updateUIForAdminMode();
        showNotification('بەخێربێیت بەڕێوەبەر! ئێستا دەتوانیت دەستکاری بکەیت.', 'success');
    } else {
        showNotification('پاسۆرد هەڵەیە! تکایە دووبارە هەوڵ بدەرەوە.', 'error');
    }
}

// Logout function
function logout() {
    isAdminMode = false;
    localStorage.removeItem('marwaAdminMode');
    localStorage.removeItem('marwaAdminTimestamp');
    updateUIForAdminMode();
    showNotification('دەرچوویت لە دۆخی بەڕێوەبەر', 'info');
}

// Update UI based on admin mode
function updateUIForAdminMode() {
    // Get all admin buttons
    const addButtons = document.querySelectorAll('.btn-add-product');
    const deleteButtons = document.querySelectorAll('.btn-delete-product');
    const pdfButtons = document.querySelectorAll('.btn-download-pdf');
    const adminToggle = document.getElementById('adminToggle');
    
    if (isAdminMode) {
        // Show admin buttons
        addButtons.forEach(btn => btn.style.display = 'flex');
        deleteButtons.forEach(btn => btn.style.display = 'flex');
        pdfButtons.forEach(btn => btn.style.display = 'flex');
        
        // Update admin toggle button
        if (adminToggle) {
            adminToggle.innerHTML = '<i class="fas fa-user-shield"></i> دۆخی بەڕێوەبەر';
            adminToggle.classList.add('admin-active');
            adminToggle.onclick = logout;
        }
    } else {
        // Hide admin buttons
        addButtons.forEach(btn => btn.style.display = 'none');
        deleteButtons.forEach(btn => btn.style.display = 'none');
        pdfButtons.forEach(btn => btn.style.display = 'none');
        
        // Update admin toggle button
        if (adminToggle) {
            adminToggle.innerHTML = '<i class="fas fa-lock"></i> چوونە ژوورەوە';
            adminToggle.classList.remove('admin-active');
            adminToggle.onclick = adminLogin;
        }
    }
}

// Check admin before allowing actions
function checkAdminAccess(actionName) {
    if (!isAdminMode) {
        showNotification(
            `تکایە یەکەم بچۆ ژوورەوە بۆ ${actionName}!\nPlease login first to ${actionName}!`, 
            'warning'
        );
        return false;
    }
    return true;
}

// Wrap existing functions with admin check
const originalOpenAddProductModal = window.openAddProductModal;
window.openAddProductModal = function(category) {
    if (checkAdminAccess('زیادکردنی کاڵا / add products')) {
        originalOpenAddProductModal(category);
    }
};

const originalOpenDeleteProductsModal = window.openDeleteProductsModal;
window.openDeleteProductsModal = function(category) {
    if (checkAdminAccess('سڕینەوەی کاڵا / delete products')) {
        originalOpenDeleteProductsModal(category);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initAdminMode();
    
    console.log('Admin System Loaded');
    console.log('Current Admin Mode:', isAdminMode);
    
    // Show admin status in console
    if (isAdminMode) {
        console.log('%c👑 Admin Mode Active', 'color: gold; font-size: 16px; font-weight: bold;');
    } else {
        console.log('%c🔒 Visitor Mode - Login to edit', 'color: gray; font-size: 14px;');
    }
});