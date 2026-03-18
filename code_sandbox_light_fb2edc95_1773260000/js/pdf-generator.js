// ========================================
// Marwa Medical - Enhanced PDF Generator
// Full Kurdish/Arabic/English Support
// ========================================

async function generatePDF(category) {
    try {
        // Show loading message
        showNotification('تکایە چاوەڕێ بکە... PDF دروست دەکرێت', 'info');
        
        const products = getProductsByCategory(category);
        const categoryName = getCategoryNameKurdish(category);
        
        if (products.length === 0) {
            showNotification('هیچ کاڵایەک نییە بۆ دەرهێنان', 'warning');
            return;
        }
        
        // Get jsPDF
        const { jsPDF } = window.jspdf;
        
        // Create PDF with better settings for RTL
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);
        
        let yPosition = margin;
        let currentPage = 1;
        
        // Function to add page header
        function addPageHeader() {
            // Header background with gradient effect
            doc.setFillColor(26, 58, 107);
            doc.rect(0, 0, pageWidth, 55, 'F');
            
            // Add decorative line
            doc.setFillColor(212, 175, 55);
            doc.rect(0, 50, pageWidth, 5, 'F');
            
            // Company name in English
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(32);
            doc.setFont('helvetica', 'bold');
            doc.text('Marwa Medical', pageWidth / 2, 25, { align: 'center' });
            
            // Category name (we'll render as image for Kurdish support)
            doc.setFontSize(18);
            doc.setFont('helvetica', 'normal');
            doc.text('Medical Supply Catalog', pageWidth / 2, 40, { align: 'center' });
        }
        
        // Function to add text as image for Kurdish support
        async function addKurdishText(text, x, y, fontSize, color, align = 'right', maxWidth = null) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas size
                const scale = 3; // Higher quality
                canvas.width = (maxWidth || 120) * scale;
                canvas.height = fontSize * scale * 1.5;
                
                // Set font
                ctx.font = `${fontSize * scale}px 'Noto Sans Arabic', 'Tajawal', Arial`;
                ctx.fillStyle = color || 'rgb(44, 62, 80)';
                ctx.textAlign = align;
                ctx.textBaseline = 'top';
                
                // Draw text
                const textX = align === 'right' ? canvas.width - 10 : 10;
                
                if (maxWidth) {
                    // Word wrap for long text
                    const words = text.split(' ');
                    let line = '';
                    let lineY = 0;
                    
                    for (let word of words) {
                        const testLine = line + word + ' ';
                        const metrics = ctx.measureText(testLine);
                        
                        if (metrics.width > canvas.width - 20 && line !== '') {
                            ctx.fillText(line, textX, lineY);
                            line = word + ' ';
                            lineY += fontSize * scale * 1.2;
                        } else {
                            line = testLine;
                        }
                    }
                    ctx.fillText(line, textX, lineY);
                } else {
                    ctx.fillText(text, textX, 0);
                }
                
                // Convert to image and add to PDF
                try {
                    const imgData = canvas.toDataURL('image/png');
                    const imgHeight = (canvas.height / scale) * 0.264583; // Convert px to mm
                    doc.addImage(imgData, 'PNG', x - (maxWidth || 40), y, (maxWidth || 40), imgHeight);
                    resolve();
                } catch (e) {
                    console.error('Error adding Kurdish text:', e);
                    // Fallback to standard text
                    doc.text(text, x, y);
                    resolve();
                }
            });
        }
        
        // Add first page header
        addPageHeader();
        
        // Add category name in Kurdish as image
        await addKurdishText(categoryName, pageWidth - margin, 62, 16, 'rgb(26, 58, 107)', 'right', contentWidth);
        
        yPosition = 75;
        
        // Add date and info
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const currentDate = new Date().toLocaleDateString('ar-IQ');
        doc.text(`Date: ${currentDate}`, margin, yPosition);
        doc.text(`Total Products: ${products.length}`, pageWidth - margin, yPosition, { align: 'right' });
        
        yPosition += 10;
        
        // Add separator line
        doc.setDrawColor(224, 224, 224);
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        
        yPosition += 10;
        
        // Process each product
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const isLastProduct = i === products.length - 1;
            
            // Check if we need new page
            const spaceNeeded = isLastProduct ? 110 : 70; // More space for last product (footer)
            
            if (yPosition > pageHeight - spaceNeeded) {
                doc.addPage();
                currentPage++;
                addPageHeader();
                yPosition = 70;
            }
            
            // Product container
            const boxHeight = 60;
            const boxY = yPosition;
            
            // Draw product box with shadow effect
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(margin + 2, boxY + 2, contentWidth, boxHeight, 3, 3, 'F'); // Shadow
            
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(224, 224, 224);
            doc.setLineWidth(0.5);
            doc.roundedRect(margin, boxY, contentWidth, boxHeight, 3, 3, 'FD');
            
            // Product image
            const imgSize = 45;
            const imgX = pageWidth - margin - imgSize - 5;
            const imgY = boxY + 7.5;
            
            try {
                const imgData = await loadImageAsBase64(product.image);
                doc.addImage(imgData, 'JPEG', imgX, imgY, imgSize, imgSize);
                
                // Image border
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.3);
                doc.rect(imgX, imgY, imgSize, imgSize);
            } catch (error) {
                // Placeholder for failed images
                doc.setFillColor(240, 240, 240);
                doc.roundedRect(imgX, imgY, imgSize, imgSize, 2, 2, 'F');
                
                doc.setTextColor(150, 150, 150);
                doc.setFontSize(8);
                doc.text('No Image', imgX + imgSize/2, imgY + imgSize/2, { align: 'center' });
            }
            
            // Product details area
            const detailsX = pageWidth - margin - imgSize - 15;
            const detailsY = boxY + 15;
            
            // Product name in Kurdish/Arabic
            await addKurdishText(
                product.name, 
                detailsX, 
                detailsY, 
                14, 
                'rgb(26, 58, 107)', 
                'right', 
                contentWidth - imgSize - 25
            );
            
            // Price
            doc.setTextColor(212, 175, 55);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            
            let priceText = '';
            if (product.price && product.price !== '0' && product.price !== '') {
                priceText = `${Number(product.price).toLocaleString()} IQD`;
            } else {
                priceText = 'Price on Request';
            }
            
            doc.text(priceText, detailsX, detailsY + 15, { align: 'right' });
            
            // Description in Kurdish/Arabic (if exists)
            if (product.description && product.description.trim() !== '') {
                await addKurdishText(
                    product.description, 
                    detailsX, 
                    detailsY + 25, 
                    9, 
                    'rgb(100, 100, 100)', 
                    'right', 
                    contentWidth - imgSize - 25
                );
            }
            
            // Product number badge
            doc.setFillColor(26, 58, 107);
            doc.circle(margin + 8, boxY + 8, 6, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text((i + 1).toString(), margin + 8, boxY + 10, { align: 'center' });
            
            yPosition += boxHeight + 8;
        }
        
        // Add footer ONLY on last page
        const footerY = pageHeight - 35;
        
        // Footer background
        doc.setFillColor(26, 58, 107);
        doc.rect(0, footerY, pageWidth, 35, 'F');
        
        // Decorative line
        doc.setFillColor(212, 175, 55);
        doc.rect(0, footerY, pageWidth, 3, 'F');
        
        // Footer content
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Contact Us | پەیوەندیمان پێوە بکە', pageWidth / 2, footerY + 10, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('WhatsApp: 07731532524 • 07511092930', pageWidth / 2, footerY + 17, { align: 'center' });
        
        doc.setFontSize(9);
        doc.text('Facebook: Marwa Medical | Instagram: @muhamad.ata01', pageWidth / 2, footerY + 23, { align: 'center' });
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text('Marwa Medical Supply Store - Medical Supplies for Individual & Wholesale', pageWidth / 2, footerY + 29, { align: 'center' });
        
        // Save PDF
        const fileName = `Marwa-Medical-${category}-${Date.now()}.pdf`;
        doc.save(fileName);
        
        showNotification('PDF بەسەرکەوتوویی دروستکرا و دابەزێندرا! 🎉', 'success');
        
    } catch (error) {
        console.error('PDF Generation Error:', error);
        showNotification('هەڵەیەک ڕوویدا لە دروستکردنی PDF. تکایە دووبارە هەوڵ بدەرەوە.', 'error');
    }
}

// Helper function to load image as base64 (same as before)
function loadImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            
            try {
                const dataURL = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataURL);
            } catch (e) {
                reject(e);
            }
        };
        
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = url;
    });
}