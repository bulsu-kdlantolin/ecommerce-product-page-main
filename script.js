const sidebarBtn = document.getElementById("sidebar-button");
const sidebar = document.getElementById("sidebar");
const overlayBlur = document.getElementById("overlay");
const closeBtn = document.getElementById("close-button");
const cartBtn = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");
const minusButton = document.getElementById("minus-button");
const addButton = document.getElementById("plus-button");
const amountSpan = document.getElementById("amount");
const addToCartBtn = document.getElementById("add-to-cart-button");
const numberItemsCart = document.getElementById("number-items-cart");
const cartEmptyDiv = document.getElementById("cart-empty");
const cartFilledDiv = document.getElementById("cart-filled");
const deleteBtn = document.getElementById("delete-button");
const itemAmountSpan = document.getElementById("item-amount");
const priceSpan = document.getElementById("price");
const totalPriceSpan = document.getElementById("total-price");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const productImage = document.getElementById("product-image");

let itemAmount = Number(amountSpan.textContent);
let currentItemAmount = 0;
let price = Number(priceSpan.textContent.replace("$", ""));
let totalPrice = Number(totalPriceSpan.textContent);

const images = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
];
let currentImage = 0;

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlayBlur.classList.toggle("overlay");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlayBlur.classList.toggle("overlay");
});

cartBtn.addEventListener("click", () => {
    cartPopup.classList.toggle("hidden");
});

prevBtn.addEventListener("click", () => {
    if(currentImage <= 0) {
        currentImage = 3;
    } else {
        currentImage -= 1;
    }
    productImage.src = images[currentImage];
});

nextBtn.addEventListener("click", () => {
    if(currentImage >= 3) {
        currentImage = 0;
    } else {
        currentImage += 1;
    }
    productImage.src = images[currentImage];
});

minusButton.addEventListener("click", () => {
    if(itemAmount >= 1) {
        itemAmount -= 1;
        amountSpan.textContent = itemAmount;
    }
});

addButton.addEventListener("click", () => {
    itemAmount += 1;
    amountSpan.textContent = itemAmount;
});

addToCartBtn.addEventListener("click", () => {
    currentItemAmount += itemAmount;
    
    if(itemAmount >= 1) {
        numberItemsCart.textContent = currentItemAmount;
        itemAmountSpan.textContent = currentItemAmount;

        totalPrice = price * currentItemAmount;
        totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        numberItemsCart.classList.remove("hidden");
        cartEmptyDiv.classList.add("hidden");
        cartFilledDiv.classList.remove("hidden");
    }

    amountSpan.textContent = "0";
    itemAmount = 0;
});

deleteBtn.addEventListener("click", () => {
    if(currentItemAmount >= 1) {
        currentItemAmount -= 1;

        numberItemsCart.textContent = currentItemAmount;
        itemAmountSpan.textContent = currentItemAmount;

        totalPrice = price * currentItemAmount;
        totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        if(currentItemAmount === 0) {
            numberItemsCart.classList.add("hidden");
            cartEmptyDiv.classList.remove("hidden");
            cartFilledDiv.classList.add("hidden");
        }
    } 
});