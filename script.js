// Navigation Functions
function openMenu() {
    window.location.href = 'menu.html';
}

function openNav() {
    document.getElementById("slider-menu").classList.add("open");
}

function closeNav() {
    document.getElementById("slider-menu").classList.remove("open");
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('chocolateCart')) || [];
updateCartCount();

function addToCart(productName, price, quantity = 1) {
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Show notification
    showNotification(`Added ${quantity} ${productName} to cart!`);
    
    // Update cart count
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('chocolateCart', JSON.stringify(cart));
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        return removedItem;
    }
    return null;
}

function updateCartItemQuantity(index, quantity) {
    if (index >= 0 && index < cart.length) {
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            cart[index].quantity = quantity;
            saveCart();
            updateCartCount();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Product page quantity selector
function decreaseQuantity(inputId) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}

function increaseQuantity(inputId) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value);
    input.value = value + 1;
}

// Notification system
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#f8b8b8';
        notification.style.color = '#4a4a4a';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(notification);
    }
    
   // Set notification message and show
   notification.textContent = message;
   notification.style.opacity = '1';
   
   // Hide notification after 3 seconds
   setTimeout(() => {
       notification.style.opacity = '0';
   }, 3000);
}

// Initialize cart related elements on page load
document.addEventListener('DOMContentLoaded', function() {
   updateCartCount();
   
   // Initialize cart page if we're on it
   const cartItemsContainer = document.getElementById('cart-items');
   if (cartItemsContainer) {
       renderCartItems();
   }
   
   // Initialize quantity inputs
   const quantityInputs = document.querySelectorAll('.quantity-input');
   quantityInputs.forEach(input => {
       input.addEventListener('change', function() {
           if (this.value < 1) {
               this.value = 1;
           }
       });
   });
});

// Render cart items on cart page
function renderCartItems() {
   const cartItemsContainer = document.getElementById('cart-items');
   const cartTotalElement = document.getElementById('cart-total');
   
   if (!cartItemsContainer) return;
   
   // Clear existing items
   cartItemsContainer.innerHTML = '';
   
   if (cart.length === 0) {
       cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="menu.html" class="continue-shopping">Continue Shopping</a></div>';
       cartTotalElement.textContent = 'Rs.00.00';
       return;
   }
   
   // Add each item to the cart
   cart.forEach((item, index) => {
       const cartItemElement = document.createElement('div');
       cartItemElement.className = 'cart-item';
       
       cartItemElement.innerHTML = `
           <div class="cart-item-details">
               <h3>${item.name}</h3>
               <p>${item.price.toFixed(2)} each</p>
           </div>
           <div class="cart-item-quantity">
               <button class="quantity-btn" onclick="updateCartItemFromPage(${index}, ${item.quantity - 1})">-</button>
               <span>${item.quantity}</span>
               <button class="quantity-btn" onclick="updateCartItemFromPage(${index}, ${item.quantity + 1})">+</button>
           </div>
           <div class="cart-item-price">Rs.${(item.price * item.quantity).toFixed(2)}</div>
           <button class="remove-btn" onclick="removeItemFromPage(${index})">×</button>
       `;
       
       cartItemsContainer.appendChild(cartItemElement);
   });
   
   // Update total
   cartTotalElement.textContent = 'Rs.' + calculateCartTotal();
}

function updateCartItemFromPage(index, quantity) {
   updateCartItemQuantity(index, quantity);
   renderCartItems();
}

function removeItemFromPage(index) {
   removeFromCart(index);
   renderCartItems();
}

function checkout() {
    const minimumAmount = 400;
    const totalText = document.getElementById("cart-total").textContent;
    const totalAmount = parseFloat(totalText.replace("Rs.", " "));

    if (totalAmount >= minimumAmount) {
        const orderDetails = {
            cart: cart,
            total: totalAmount,
            time: new Date().toISOString()
        };

        if (typeof storeOrder === "function") {
            storeOrder(orderDetails);
        } else {
            console.warn("storeOrder function is not defined.");
        }

        alert('Thank you for your order! Your delicious chocolates will be on their way soon.');
        clearCart();
        renderCartItems();
    } else {
        alert(`Minimum order amount is Rs. ${minimumAmount}. Please add more items to your cart.`);
    }
}

