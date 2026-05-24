// Shopping Cart Management
let cart = [];
let cartTotal = 0;

// Add to Cart Function
function addToCart(productName, price) {
    cart.push({
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1
    });

    updateCartCount();
    showNotification(`${productName} ditambahkan ke keranjang!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search Functionality
function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    searchProducts(query);
                }
            }
        });
    }
}

// Search Products Function
function searchProducts(query) {
    showNotification(`Mencari produk: "${query}"...`);
    // Dalam implementasi nyata, ini akan mengirim request ke server
}

// Category Navigation
function setupCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.style.backgroundColor = '');
            item.style.backgroundColor = '#374a59';
            item.style.borderRadius = '4px';
            showNotification(`Menampilkan kategori: ${item.textContent}`);
        });
    });
}

// Cart Management Panel
function openCart() {
    if (cart.length === 0) {
        showNotification('Keranjang Anda kosong', 'info');
        return;
    }

    let cartHTML = `
        <div style="padding: 30px;">
            <h2 style="font-size: 28px; margin-bottom: 25px; color: #131921;">Keranjang Belanja</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div style="grid-column: 1;">
    `;

    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div style="border-bottom: 1px solid #e0e0e0; padding: 20px 0; margin: 15px 0;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <p style="font-size: 16px; font-weight: 500; color: #131921; margin-bottom: 8px;">${item.name}</p>
                        <p style="color: #666; font-size: 14px;">Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #0066cc; cursor: pointer; font-size: 14px; padding: 5px; text-decoration: underline;">Hapus</button>
                </div>
                <div style="display: flex; align-items: center; gap: 15px; margin-top: 12px;">
                    <label style="font-size: 14px; color: #666;">Jumlah:</label>
                    <div style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px;">
                        <button onclick="updateQuantity(${index}, -1)" style="padding: 5px 10px; border: none; background: none; cursor: pointer; font-size: 16px;">−</button>
                        <span style="padding: 5px 10px; min-width: 30px; text-align: center; border-left: 1px solid #ddd; border-right: 1px solid #ddd;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" style="padding: 5px 10px; border: none; background: none; cursor: pointer; font-size: 16px;">+</button>
                    </div>
                    <span style="font-weight: 500; color: #131921;">Rp ${itemTotal.toLocaleString('id-ID')}</span>
                </div>
            </div>
        `;
    });

    const tax = Math.round(subtotal * 0.1);
    const shipping = 50000;
    const total = subtotal + tax + shipping;

    cartHTML += `
                </div>
                <div style="grid-column: 2;">
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; position: sticky; top: 20px;">
                        <h3 style="font-size: 18px; margin-bottom: 20px; color: #131921;">Ringkasan Pesanan</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e0e0e0;">
                            <span style="color: #666;">Subtotal:</span>
                            <span style="color: #131921;">Rp ${subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e0e0e0;">
                            <span style="color: #666;">Pajak (10%):</span>
                            <span style="color: #131921;">Rp ${tax.toLocaleString('id-ID')}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e0e0e0;">
                            <span style="color: #666;">Pengiriman:</span>
                            <span style="color: #131921;">Rp ${shipping.toLocaleString('id-ID')}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding: 15px 0; border-top: 2px solid #ddd;">
                            <span style="font-size: 18px; font-weight: 600; color: #131921;">Total:</span>
                            <span style="font-size: 18px; font-weight: 700; color: #B12704;">Rp ${total.toLocaleString('id-ID')}</span>
                        </div>
                        <button onclick="checkout()" style="background: linear-gradient(to bottom, #FFD814, #FFA500); color: #000; border: 1px solid #FFA500; padding: 12px; border-radius: 25px; cursor: pointer; font-weight: 600; width: 100%; margin-bottom: 10px; font-size: 14px;">Lanjut ke Checkout</button>
                        <button onclick="closeModal()" style="background: none; color: #0066cc; border: 1px solid #0066cc; padding: 12px; border-radius: 25px; cursor: pointer; font-weight: 600; width: 100%; font-size: 14px;">Lanjut Belanja</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    showModal('Keranjang Belanja', cartHTML);
}

// Update Quantity
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        updateCartCount();
        openCart();
    }
}

// Remove from Cart
function removeFromCart(index) {
    const removedItem = cart[index].name;
    cart.splice(index, 1);
    updateCartCount();
    
    if (cart.length > 0) {
        openCart();
    } else {
        closeModal();
    }
    
    showNotification(`${removedItem} dihapus dari keranjang`, 'info');
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang kosong');
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let checkoutHTML = `
        <div style="padding: 20px;">
            <h2>Ringkasan Pesanan</h2>
            <div style="margin: 20px 0;">
    `;

    cart.forEach(item => {
        checkoutHTML += `
            <p style="margin: 10px 0;">${item.name}: Rp ${item.price.toLocaleString('id-ID')}</p>
        `;
    });

    checkoutHTML += `
            </div>
            <div style="border-top: 2px solid #333; padding-top: 20px; margin-top: 20px;">
                <h3>Total Pembayaran: Rp ${total.toLocaleString('id-ID')}</h3>
                <p style="color: #666; margin-top: 10px;">Metode Pembayaran:</p>
                <select style="width: 100%; padding: 8px; margin: 10px 0; border: 1px solid #ddd;">
                    <option>Transfer Bank</option>
                    <option>Kartu Kredit</option>
                    <option>E-Wallet</option>
                    <option>COD (Bayar di Tempat)</option>
                </select>
                <button onclick="completeCheckout()" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px;">Lanjutkan Pembayaran</button>
            </div>
        </div>
    `;

    showModal('Checkout', checkoutHTML);
}

// Complete Checkout
function completeCheckout() {
    showNotification('Pesanan berhasil diproses! Terima kasih telah berbelanja.');
    cart = [];
    updateCartCount();
    closeModal();
}

// Modal Functions
function showModal(title, content) {
    closeModal();

    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
    `;
    closeBtn.onclick = closeModal;

    modalContent.appendChild(closeBtn);
    modalContent.innerHTML += content;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.remove();
    }
}

// Cart Click Handler
function setupCartClick() {
    const cartSection = document.querySelector('.cart-section');
    if (cartSection) {
        cartSection.addEventListener('click', openCart);
    }
}

// Account Section Handler
function setupAccountClick() {
    const accountSection = document.querySelector('.account-section');
    if (accountSection) {
        accountSection.addEventListener('click', () => {
            showModal('Akun & Login', `
                <div style="padding: 30px; text-align: center;">
                    <h2>Login ke Akun Anda</h2>
                    <input type="email" placeholder="Email atau nomor ponsel" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
                    <input type="password" placeholder="Password" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
                    <button style="background-color: #FF9900; color: black; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px;">Login</button>
                    <p style="margin-top: 15px; color: #666;">Belum punya akun? <span style="color: #0066cc; cursor: pointer; text-decoration: underline;">Daftar di sini</span></p>
                </div>
            `);
        });
    }
}

// CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    setupSearch();
    setupCategoryNav();
    setupCartClick();
    setupAccountClick();
    updateCartCount();
});

// Utility Functions
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
}

// Filter Products (untuk implementasi lebih lanjut)
function filterProducts(category) {
    showNotification(`Filter berdasarkan kategori: ${category}`);
}

// Sort Products (untuk implementasi lebih lanjut)
function sortProducts(sortBy) {
    showNotification(`Mengurutkan berdasarkan: ${sortBy}`);
}
