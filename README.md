# Choco Crush Website

A modern, responsive e-commerce website for a chocolate shop named "Choco Crush". This repository contains all the necessary files to run the website.

## Website Structure

- `index.html` - The landing page of the website
- `menu.html` - The main chocolate categories page
- Product Category Pages:
  - `milk-chocolate.html`
  - `white-chocolate.html`
  - `dark-chocolate.html`
  - `sugarfree-chocolate.html`
  - `other-flavours.html`
  - `hampers.html`
- `cart.html` - Shopping cart page
- `about.html` - About Us page
- `contact.html` - Contact page

## Styling Files

- `style.css` - Main styling for the website
- `menu.css` - Styling for the menu and product pages
- `cart.css` - Styling for the shopping cart page

## JavaScript Files

- `script.js` - Contains all the functionality for navigation, cart management, etc.

## Features Implemented

- **Responsive Design**: The website is fully responsive and works on devices of all sizes
- **Navigation**: Easy navigation with a slider menu accessible from any page
- **Shopping Cart**: Functional shopping cart system with localStorage to persist data
- **Product Categories**: Six different chocolate categories with their own dedicated pages
- **Add to Cart**: Add to cart functionality with quantity selection
- **Cart Management**: View, update quantities, and remove items from cart
- **Modern UI**: Clean, appealing design with animations and transitions

## Setting Up the Project

1. Clone or download the repository
2. Make sure you have the following directory structure:
   ```
   choco-crush/
   ├── index.html
   ├── menu.html
   ├── milk-chocolate.html
   ├── white-chocolate.html
   ├── dark-chocolate.html
   ├── sugarfree-chocolate.html
   ├── other-flavours.html
   ├── hampers.html
   ├── cart.html
   ├── about.html
   ├── contact.html
   ├── style.css
   ├── menu.css
   ├── cart.css
   ├── script.js
   └── images/
       ├── choco_crush_logo.png
       ├── milk-chocolate-horizontal.jpg
       ├── white-chocolate-horizontal.jpg
       ├── dark-chocolate-horizontal.jpg
       ├── sugarfree-chocolate-horizontal.jpg
       ├── other-flavors-horizontal.jpg
       ├── hampers-horizontal.jpg
       └── ... (other product images)
   ```

3. Open `index.html` in your web browser to view the website

## Adding New Products

To add new products to a category page:

1. Open the relevant category HTML file (e.g., `milk-chocolate.html`)
2. Copy an existing product card structure:
   ```html
   <div class="product-card">
       <div class="product-image">
           <img src="images/new-product.jpg" alt="Product Name">
       </div>
       <div class="product-details">
           <h3 class="product-name">Product Name</h3>
           <p class="product-description">Product description here.</p>
           <div class="product-price">$X.XX</div>
           <div class="product-actions">
               <div class="quantity-selector">
                   <button class="quantity-btn" onclick="decreaseQuantity('qty-id')">-</button>
                   <input type="number" id="qty-id" class="quantity-input" value="1" min="1">
                   <button class="quantity-btn" onclick="increaseQuantity('qty-id')">+</button>
               </div>
               <button class="add-to-cart-btn" onclick="addToCart('Product Name', X.XX, parseInt(document.getElementById('qty-id').value))">Add to Cart</button>
           </div>
       </div>
   </div>
   ```
3. Modify the details (image source, product name, description, price, etc.)
4. Use a unique ID for the quantity input

## Adding New Pages

To add new pages:

1. Copy the structure of an existing page (e.g., `milk-chocolate.html`)
2. Change the content while keeping the navigation, header, and footer consistent
3. Update the slider menu links if necessary

## Browser Compatibility

This website is optimized for modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Future Improvements

- User accounts and authentication
- Checkout process with payment integration
- Product reviews and ratings
- Search functionality
- Wishlist feature
- More detailed product pages with nutritional information

## Credits

- Font Awesome for icons
- Images should be sourced and credited appropriately