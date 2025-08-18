// Simple Link Open JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const linkItems = document.querySelectorAll('.link-item');
    
    // Handle copy button clicks
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering link item click
            
            // Get the link domain text from the same link item
            const linkItem = this.closest('.link-item');
            const linkDomain = linkItem.querySelector('.link-domain').textContent;
            
            // Open link in new tab
            window.open(`https://${linkDomain}`, '_blank');
            
            // Show notification
            showNotification('कॉपी किया!');
        });
    });
    
    // Handle link item clicks
    linkItems.forEach(item => {
        item.addEventListener('click', function() {
            const linkDomain = this.querySelector('.link-domain').textContent;
            
            // Open link in new tab
            window.open(`https://${linkDomain}`, '_blank');
            
            // Show notification
            showNotification('कॉपी किया!');
        });
    });
});

// Simple notification function
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.copy-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            font-weight: 600;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2000);
}


// Lightbox Popup JavaScript - Thêm vào cuối file script.js hiện tại

// Initialize lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
});

function initLightbox() {
    const popupButtons = document.querySelectorAll('.popupanh');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Handle popup button clicks
    popupButtons.forEach(button => {
        button.addEventListener('click', function() {
            showLightbox();
        });
    });
    
    // Handle close button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            hideLightbox();
        });
    }
    
    // Handle overlay click (click outside image to close)
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === lightboxOverlay) {
                hideLightbox();
            }
        });
    }
    
    // Handle ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
            hideLightbox();
        }
    });
    
    // Handle image load
    if (lightboxImage) {
        lightboxImage.addEventListener('load', function() {
            this.classList.add('loaded');
            this.classList.remove('loading');
        });
        
        lightboxImage.addEventListener('error', function() {
            console.error('Error loading lightbox image');
            showNotification('Không thể tải ảnh');
        });
    }
}

// Show lightbox
function showLightbox() {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightboxOverlay) {
        // Store current scroll position
        const scrollY = window.scrollY;
        
        // Add loading state
        if (lightboxImage) {
            lightboxImage.classList.add('loading');
            lightboxImage.classList.remove('loaded');
        }
        
        // Prevent body scroll and maintain position
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        
        // Store scroll position for restoration
        document.body.setAttribute('data-scroll-y', scrollY);
        
        // Show overlay
        lightboxOverlay.classList.add('active');
        
        // Focus on overlay for accessibility
        lightboxOverlay.focus();
        
        // Reload image to ensure it displays properly
        if (lightboxImage) {
            const src = lightboxImage.src;
            lightboxImage.src = '';
            lightboxImage.src = src;
        }
    }
}

// Hide lightbox
function hideLightbox() {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    
    if (lightboxOverlay) {
        // Get stored scroll position
        const scrollY = document.body.getAttribute('data-scroll-y') || '0';
        
        // Hide overlay
        lightboxOverlay.classList.remove('active');
        
        // Restore body scroll and position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY));
        
        // Clean up
        document.body.removeAttribute('data-scroll-y');
    }
}

// Utility function to create lightbox for any image
function createLightbox(imageSrc, altText = 'Image') {
    // Check if lightbox already exists
    let lightboxOverlay = document.getElementById('lightboxOverlay');
    
    if (!lightboxOverlay) {
        // Create lightbox HTML
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.id = 'lightboxOverlay';
        lightboxOverlay.innerHTML = `
            <div class="lightbox-container">
                <button class="lightbox-close" id="lightboxClose">
                    <i class="fas fa-times"></i>
                </button>
                <div class="lightbox-content">
                    <img src="${imageSrc}" alt="${altText}" class="lightbox-image" id="lightboxImage">
                </div>
            </div>
        `;
        
        document.body.appendChild(lightboxOverlay);
        
        // Initialize functionality for new lightbox
        initLightbox();
    } else {
        // Update existing lightbox image
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.src = imageSrc;
            lightboxImage.alt = altText;
        }
    }
    
    // Show lightbox
    showLightbox();
}

// Example usage function
function showVPNImage() {
    createLightbox('assets/vpnza.png', 'VPN Guide Image');
}