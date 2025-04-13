import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", function () {
    // Firebase config
    const appSettings = {
        databaseURL: "https://coco-crush-data-order-default-rtdb.firebaseio.com"
    };

    // Initialize Firebase
    const app = initializeApp(appSettings);
    const database = getDatabase(app);
    const ordersRef = ref(database, "orders");

    const checkoutBtn = document.getElementById("checkout-btn");
    const submitDetailsBtn = document.getElementById("submit-details-btn");
    const modal = document.getElementById("user-details-modal");
    const closeModalBtn = document.getElementById("close-user-modal");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("chocolateCart")) || [];

    // Checkout button logic
    checkoutBtn.addEventListener("click", function () {
        const minimumAmount = 400;
        const totalElement = document.getElementById("cart-total");
        const totalAmount = parseFloat(totalElement.textContent.replace("Rs.", "").trim());

        if (totalAmount < minimumAmount) {
            alert(`Minimum order amount is Rs. ${minimumAmount}. Please add more items to your cart.`);
            return;
        }

        // Show user details modal
        modal.style.display = "flex";
    });

    // Submit button logic
    submitDetailsBtn.addEventListener("click", function () {
        const name = document.getElementById("user-name").value.trim();
        const phone = document.getElementById("user-phone").value.trim();
        const address = document.getElementById("user-address").value.trim();
        const totalAmount = parseFloat(document.getElementById("cart-total").textContent.replace("Rs.", "").trim());

        const minimumAmount = 400;
        if (totalAmount < minimumAmount) {
            alert(`Minimum order amount is Rs. ${minimumAmount}. Please add more items to your cart.`);
            return;
        }

        if (!name || !phone || !address) {
            alert("Please fill out all fields.");
            return;
        }

        const orderDetails = {
            name: name,
            phone: phone,
            address: address,
            cart: cart,
            total: totalAmount,
            time: new Date().toISOString()
        };

        push(ordersRef, orderDetails)
            .then(() => {
                alert('Thank you for your order! Your delicious chocolates will be on their way soon.');
                modal.style.display = "none";
                clearCart();
                renderCartItems();
            })
            .catch((error) => {
                console.error("Error saving order to Firebase:", error);
                alert("There was a problem placing your order. Please try again.");
            });
    });

    // Close modal on icon click
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    function clearCart() {
        cart = [];
        localStorage.setItem("chocolateCart", JSON.stringify(cart));
    }

    function renderCartItems() {
        location.reload();
    }
});
