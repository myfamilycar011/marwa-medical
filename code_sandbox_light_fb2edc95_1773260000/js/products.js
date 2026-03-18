// ========================================
// Marwa Medical - Products Database
// Sample products for all categories
// ========================================

// Initialize products from localStorage or use default data
let allProducts = JSON.parse(localStorage.getItem('marwaProducts')) || {
    'medical-supplies': [
        {
            id: 'ms-001',
            name: 'دەستکێشی پزیشکی - Latex Gloves',
            price: '15000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'دەستکێشی پزیشکی کوالێتی بەرز، ١٠٠ دانە لە یەک پاکێت'
        },
        {
            id: 'ms-002',
            name: 'ماسکی پزیشکی - Medical Mask',
            price: '25000',
            image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&h=500&fit=crop',
            description: 'ماسکی پزیشکی ٣ چینە، ٥٠ دانە'
        },
        {
            id: 'ms-003',
            name: 'تێرمۆمیتەر دیجیتاڵ - Digital Thermometer',
            price: '35000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'تێرمۆمیتەری دیجیتاڵی خێرا'
        },
        {
            id: 'ms-004',
            name: 'ئەلکۆحۆڵ - Medical Alcohol',
            price: '8000',
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
            description: 'ئەلکۆحۆڵی پزیشکی ٧٠٪، ٥٠٠ میلی'
        },
        {
            id: 'ms-005',
            name: 'بانداج - Medical Bandage',
            price: '5000',
            image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&h=500&fit=crop',
            description: 'بانداجی پزیشکی ستێریل'
        },
        {
            id: 'ms-006',
            name: 'سیرەنج - Medical Syringe',
            price: '12000',
            image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop',
            description: 'سیرەنجی یەکجار بەکارهێنان، ١٠٠ دانە'
        }
    ],
    
    'pharmacy': [
        {
            id: 'ph-001',
            name: 'پاراسیتامۆڵ - Paracetamol',
            price: '3000',
            image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop',
            description: 'پاراسیتامۆڵ ٥٠٠ میلیگرام، ٢٠ دانە'
        },
        {
            id: 'ph-002',
            name: 'ئیبوپرۆفین - Ibuprofen',
            price: '5000',
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
            description: 'ئیبوپرۆفین ٤٠٠ میلیگرام دژ بە ئازار'
        },
        {
            id: 'ph-003',
            name: 'ڤیتامین سی - Vitamin C',
            price: '8000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'ڤیتامین سی ١٠٠٠ میلیگرام، ٣٠ دانە'
        },
        {
            id: 'ph-004',
            name: 'ئەنتیبایۆتیک - Antibiotic',
            price: '15000',
            image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=500&h=500&fit=crop',
            description: 'ئەنتیبایۆتیکی بەهێز بۆ هەژانە'
        },
        {
            id: 'ph-005',
            name: 'شەربەتی کۆلیک - Colic Syrup',
            price: '12000',
            image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
            description: 'شەربەت بۆ ئازاری سک، ١٢٠ میلی'
        },
        {
            id: 'ph-006',
            name: 'دڵۆپی چاو - Eye Drops',
            price: '7000',
            image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop',
            description: 'دڵۆپی چاو بۆ خاوێنی و سوێتی'
        }
    ],
    
    'beauty': [
        {
            id: 'bt-001',
            name: 'کرێمی دەست - Hand Cream',
            price: '10000',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
            description: 'کرێمی دەست نەرمکەر و مێشکی'
        },
        {
            id: 'bt-002',
            name: 'سیرۆمی ڕووخسار - Face Serum',
            price: '25000',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop',
            description: 'سیرۆمی جوانکاری بۆ ڕووخسار'
        },
        {
            id: 'bt-003',
            name: 'ماسکی ڕووخسار - Face Mask',
            price: '15000',
            image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop',
            description: 'ماسکی کۆلاجێن بۆ پێستی گەش'
        },
        {
            id: 'bt-004',
            name: 'کرێمی تاو - Sunscreen',
            price: '18000',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
            description: 'کرێمی پارێزگاری لە تیشکی خۆر SPF 50'
        },
        {
            id: 'bt-005',
            name: 'رۆنی لێو - Lip Balm',
            price: '6000',
            image: 'https://images.unsplash.com/photo-1583241800698-1d31c315bfc0?w=500&h=500&fit=crop',
            description: 'رۆنی لێو نەرمکەر و مێشکی'
        },
        {
            id: 'bt-006',
            name: 'تۆنەری ڕووخسار - Facial Toner',
            price: '14000',
            image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&h=500&fit=crop',
            description: 'تۆنەری پاککەرەوە و ڕێکخستنەوە'
        }
    ],
    
    'dental': [
        {
            id: 'dt-001',
            name: 'برسی ددان - Toothbrush',
            price: '4000',
            image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop',
            description: 'برسی ددان نەرم و کوالێتی بەرز'
        },
        {
            id: 'dt-002',
            name: 'هەونی ددان - Toothpaste',
            price: '7000',
            image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=500&h=500&fit=crop',
            description: 'هەونی ددان فلۆرایدی ١٠٠ میلی'
        },
        {
            id: 'dt-003',
            name: 'دەمشۆر - Mouthwash',
            price: '12000',
            image: 'https://images.unsplash.com/photo-1598624443780-2e87e4c3b2e1?w=500&h=500&fit=crop',
            description: 'دەمشۆری پاککەرەوە ٥٠٠ میلی'
        },
        {
            id: 'dt-004',
            name: 'دەزوی ددان - Dental Floss',
            price: '5000',
            image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=500&h=500&fit=crop',
            description: 'دەزوی پاککردنەوەی نێوان ددانەکان'
        },
        {
            id: 'dt-005',
            name: 'برسی کارەبایی - Electric Toothbrush',
            price: '45000',
            image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop',
            description: 'برسی کارەبایی سپییکەرەوەی ددان'
        },
        {
            id: 'dt-006',
            name: 'سپییکەری ددان - Teeth Whitening',
            price: '35000',
            image: 'https://images.unsplash.com/photo-1598624443780-2e87e4c3b2e1?w=500&h=500&fit=crop',
            description: 'کیتی سپییکردنەوەی ددان لە ماڵەوە'
        }
    ],
    
    'maternity': [
        {
            id: 'mt-001',
            name: 'تێستی دووگیانی - Pregnancy Test',
            price: '5000',
            image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&h=500&fit=crop',
            description: 'تێستی دووگیانی دیجیتاڵ'
        },
        {
            id: 'mt-002',
            name: 'ڤیتامینی دووگیان - Prenatal Vitamins',
            price: '25000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'ڤیتامینی تەواو بۆ دووگیان'
        },
        {
            id: 'mt-003',
            name: 'پادی شیر - Breast Pads',
            price: '8000',
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop',
            description: 'پادی شیردان، ٦٠ دانە'
        },
        {
            id: 'mt-004',
            name: 'کرێمی سک - Belly Cream',
            price: '20000',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
            description: 'کرێمی ڕێگری لە هێڵی دووگیانی'
        },
        {
            id: 'mt-005',
            name: 'پەمپەری شیر - Breast Pump',
            price: '85000',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop',
            description: 'پەمپەری کارەبایی شیردان'
        },
        {
            id: 'mt-006',
            name: 'باڵیفی دایک - Maternity Pillow',
            price: '65000',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop',
            description: 'باڵیفی ئاسوودەیی بۆ دووگیان'
        }
    ],
    
    'xray': [
        {
            id: 'xr-001',
            name: 'فیلمی ئێکسڕەی - X-Ray Film',
            price: '150000',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop',
            description: 'فیلمی ئێکسڕەی کوالێتی بەرز'
        },
        {
            id: 'xr-002',
            name: 'جێگای فیلم - Film Holder',
            price: '25000',
            image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&h=500&fit=crop',
            description: 'جێگای فیلمی ئێکسڕەی'
        },
        {
            id: 'xr-003',
            name: 'گێلی ئەلترەساوند - Ultrasound Gel',
            price: '18000',
            image: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=500&h=500&fit=crop',
            description: 'گێلی سۆنەر ٥٠٠ میلی'
        },
        {
            id: 'xr-004',
            name: 'پێڵاوی سیساوی - Lead Apron',
            price: '250000',
            image: 'https://images.unsplash.com/photo-1583912086296-be5c8b8eb7c9?w=500&h=500&fit=crop',
            description: 'پێڵاوی پارێزگاری لە تیشک'
        },
        {
            id: 'xr-005',
            name: 'کاغەزی سۆنەر - Ultrasound Paper',
            price: '35000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'کاغەزی چاپی سۆنەر تەرمال'
        },
        {
            id: 'xr-006',
            name: 'پرۆبی سۆنەر - Ultrasound Probe',
            price: '450000',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&h=500&fit=crop',
            description: 'پرۆبی سۆنەری کوالێتی بەرز'
        }
    ],
    
    'children': [
        {
            id: 'ch-001',
            name: 'شیری کۆمێڵ - Baby Formula',
            price: '35000',
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop',
            description: 'شیری کۆمێڵی مناڵ ٤٠٠ گرام'
        },
        {
            id: 'ch-002',
            name: 'پامپەرز - Diapers',
            price: '28000',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop',
            description: 'پامپەرزی قەبارەی ٤، ٤٤ دانە'
        },
        {
            id: 'ch-003',
            name: 'شوشەی شیر - Baby Bottle',
            price: '12000',
            image: 'https://images.unsplash.com/photo-1614962116653-4a2e45e66e79?w=500&h=500&fit=crop',
            description: 'شوشەی شیری پلاستیکی بێ زیان'
        },
        {
            id: 'ch-004',
            name: 'دەستماڵی تەڕ - Baby Wipes',
            price: '8000',
            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop',
            description: 'دەستماڵی تەڕی مناڵ، ٨٠ دانە'
        },
        {
            id: 'ch-005',
            name: 'شامپۆی مناڵ - Baby Shampoo',
            price: '15000',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop',
            description: 'شامپۆ و شۆردنەوەی مناڵ ٢٠٠ میلی'
        },
        {
            id: 'ch-006',
            name: 'کرێمی پامپەرز - Diaper Cream',
            price: '10000',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
            description: 'کرێمی ڕێگری لە سوێتی پێست'
        }
    ],
    
    'equipment': [
        {
            id: 'eq-001',
            name: 'جیهازی پێوانەی پەستانی خوێن',
            price: '125000',
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop',
            description: 'جیهازی دیجیتاڵی پێوانەی پەستانی خوێن'
        },
        {
            id: 'eq-002',
            name: 'ستێتسکۆپ - Stethoscope',
            price: '85000',
            image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&h=500&fit=crop',
            description: 'ستێتسکۆپی پزیشکی کوالێتی بەرز'
        },
        {
            id: 'eq-003',
            name: 'ئۆکسیمیتەر - Pulse Oximeter',
            price: '45000',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
            description: 'جیهازی پێوانەی ئۆکسیجین'
        },
        {
            id: 'eq-004',
            name: 'جیهازی تێرمۆمیتەری نێوچەوانی',
            price: '95000',
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop',
            description: 'تێرمۆمیتەری نێوچەوانی بێ دەست لێدان'
        },
        {
            id: 'eq-005',
            name: 'نێبیولایزەر - Nebulizer',
            price: '150000',
            image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&h=500&fit=crop',
            description: 'جیهازی تێنەفس بۆ نەخۆش'
        },
        {
            id: 'eq-006',
            name: 'جیهازی شەکرەی خوێن - Glucometer',
            price: '65000',
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&h=500&fit=crop',
            description: 'جیهازی پێوانەی شەکر لەگەڵ ٥٠ ستریپ'
        }
    ]
};

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('marwaProducts', JSON.stringify(allProducts));
}

// Get products by category
function getProductsByCategory(category) {
    return allProducts[category] || [];
}

// Add new product to category
function addProductToCategory(category, product) {
    if (!allProducts[category]) {
        allProducts[category] = [];
    }
    
    // Generate unique ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    product.id = `${category}-${timestamp}-${random}`;
    
    allProducts[category].push(product);
    saveProducts();
    return product;
}

// Delete product from category
function deleteProduct(category, productId) {
    if (allProducts[category]) {
        allProducts[category] = allProducts[category].filter(p => p.id !== productId);
        saveProducts();
    }
}

// Search products across all categories
function searchProducts(query) {
    const results = [];
    const searchLower = query.toLowerCase();
    
    for (const category in allProducts) {
        const categoryProducts = allProducts[category].filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
        
        results.push(...categoryProducts.map(p => ({...p, category})));
    }
    
    return results;
}

// Get category name in Kurdish
function getCategoryNameKurdish(category) {
    const names = {
        'medical-supplies': 'پێداویستی پزیشکی',
        'pharmacy': 'دەرمان',
        'beauty': 'جوانکاری',
        'dental': 'ددان',
        'maternity': 'ژنان و منداڵبوون',
        'xray': 'تیشك و سۆنەر',
        'children': 'منداڵان',
        'equipment': 'جیهازی پزیشکی'
    };
    return names[category] || category;
}

// Load products into the page
function loadAllProducts() {
    const categories = [
        'medical-supplies',
        'pharmacy',
        'beauty',
        'dental',
        'maternity',
        'xray',
        'children',
        'equipment'
    ];
    
    categories.forEach(category => {
        loadCategoryProducts(category);
    });
}

// Load products for a specific category
function loadCategoryProducts(category) {
    const products = getProductsByCategory(category);
    const container = document.getElementById(`products-${category}`);
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--light-text);">
                <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                <p style="font-size: 18px;">هیچ کاڵایەک تۆمار نەکراوە لەم بەشەدا</p>
                <p style="font-size: 14px; margin-top: 10px;">بەدوگمەی "زیادکردنی کاڵای نوێ" کاڵا زیاد بکە</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop'">
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-price">${product.price && product.price !== '0' ? Number(product.price).toLocaleString() + ' د.ع' : 'بۆ زانینی نرخەکەی نامە بنێرە'}</p>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-actions">
                    <a href="https://wa.me/9647731532524?text=${encodeURIComponent('سڵاو، دەمەوێت پرسیار بکەم دەربارەی: ' + product.name)}" class="btn-inquiry" target="_blank">
                        <i class="fab fa-whatsapp"></i> پرسیار بکە
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize products when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllProducts);
} else {
    loadAllProducts();
}