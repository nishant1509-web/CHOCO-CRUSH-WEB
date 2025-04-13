import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase settings
const appSettings = {
    databaseURL: "https://coco-crush-data-order-default-rtdb.firebaseio.com"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const ordersRef = ref(database, "orders");

// Checkout button
const checkoutBtn = document.getElementById("checkout-btn");

// Load your actual cart
let cart = JSON.parse(localStorage.getItem("chocolateCart")) || [];

checkoutBtn.addEventListener("click", function () {
    const minimumAmount = 400;
    const totalElement = document.getElementById("cart-total");
    const totalAmount = parseFloat(totalElement.textContent.replace("Rs.", "").trim());

    if (totalAmount < minimumAmount) {
        alert(`Minimum order amount is Rs. ${minimumAmount}. Please add more items to your cart.`);
        return;
    }

    const orderDetails = {
        cart: cart,
        total: totalAmount,
        time: new Date().toISOString()
    };

    push(ordersRef, orderDetails)
        .then(() => {
            alert('Thank you for your order! Your delicious chocolates will be on their way soon.');
            clearCart();
            renderCartItems();
        })
        .catch((error) => {
            console.error("Error saving order to Firebase:", error);
            alert("There was a problem placing your order. Please try again.");
        });
});

// Clear the cart after order
function clearCart() {
    cart = [];
    localStorage.setItem("chocolateCart", JSON.stringify(cart));
}

// Just to refresh cart UI (basic placeholder)
function renderCartItems() {
    location.reload(); // simple fix to re-render after checkout
}
