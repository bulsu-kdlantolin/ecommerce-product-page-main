const sidebarBtn = document.getElementById("sidebar-button");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
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
const mainImageBtn = document.getElementById("main-image-btn");
const productImage = document.getElementById("product-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxThumbs = document.querySelectorAll(".lightbox-thumb");

let itemAmount = 0;
let currentItemAmount = 0;
const price = 125.00;
let totalPrice = 125.00;

const images = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
];
let currentImage = 0;

// Nav links active state
const navLinks = document.querySelectorAll(".sidebar a");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((l) => {
            l.classList.remove("active");
            l.removeAttribute("aria-current");
        });
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    });
});

// Sidebar Navigation
function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    sidebarBtn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
}

function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    sidebarBtn.setAttribute("aria-expanded", "false");
    sidebarBtn.focus();
}

sidebarBtn?.addEventListener("click", openSidebar);
closeBtn?.addEventListener("click", closeSidebar);
overlay?.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) closeSidebar();
});

// Cart Popup Toggle
cartBtn.addEventListener("click", () => {
    const isHidden = cartPopup.classList.toggle("hidden");
    cartBtn.setAttribute("aria-expanded", String(!isHidden));
});

// Close open dropdowns/modals on Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (!lightboxModal.classList.contains("hidden")) {
            closeLightbox();
        } else if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else if (!cartPopup.classList.contains("hidden")) {
            cartPopup.classList.add("hidden");
            cartBtn.setAttribute("aria-expanded", "false");
        }
    }
});

// Mobile Slider Controls
function updateMainImage(index) {
    currentImage = index;
    productImage.src = images[currentImage];
    thumbnails.forEach((t, i) => {
        const isActive = i === currentImage;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-current", String(isActive));
    });
}

prevBtn.addEventListener("click", () => {
    const newIndex = (currentImage <= 0) ? images.length - 1 : currentImage - 1;
    updateMainImage(newIndex);
});

nextBtn.addEventListener("click", () => {
    const newIndex = (currentImage >= images.length - 1) ? 0 : currentImage + 1;
    updateMainImage(newIndex);
});

// Desktop Main Thumbnails Selector
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        updateMainImage(index);
    });
});

// Quantity Counter
minusButton.addEventListener("click", () => {
    if (itemAmount > 0) {
        itemAmount -= 1;
        amountSpan.textContent = itemAmount;
    }
});

addButton.addEventListener("click", () => {
    itemAmount += 1;
    amountSpan.textContent = itemAmount;
});

// Add to Cart Logic
addToCartBtn.addEventListener("click", () => {
    if (itemAmount >= 1) {
        currentItemAmount += itemAmount;
        numberItemsCart.textContent = currentItemAmount;
        itemAmountSpan.textContent = currentItemAmount;

        totalPrice = price * currentItemAmount;
        totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        numberItemsCart.classList.remove("hidden");
        cartEmptyDiv.classList.add("hidden");
        cartFilledDiv.classList.remove("hidden");

        itemAmount = 0;
        amountSpan.textContent = "0";
    }
});

// Delete Item from Cart
deleteBtn.addEventListener("click", () => {
    currentItemAmount = 0;
    numberItemsCart.textContent = "0";
    numberItemsCart.classList.add("hidden");
    cartFilledDiv.classList.add("hidden");
    cartEmptyDiv.classList.remove("hidden");
});

// Lightbox Modal Controls
function openLightbox() {
    if (window.innerWidth >= 768) {
        lightboxImage.src = images[currentImage];
        updateLightboxThumbs(currentImage);
        lightboxModal.classList.remove("hidden");
        lightboxClose.focus();
    }
}

function closeLightbox() {
    lightboxModal.classList.add("hidden");
    mainImageBtn.focus();
}

mainImageBtn.addEventListener("click", openLightbox);
lightboxClose.addEventListener("click", closeLightbox);

lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener("click", () => {
    currentImage = (currentImage <= 0) ? images.length - 1 : currentImage - 1;
    updateLightboxGallery();
});

lightboxNext.addEventListener("click", () => {
    currentImage = (currentImage >= images.length - 1) ? 0 : currentImage + 1;
    updateLightboxGallery();
});

lightboxThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        currentImage = index;
        updateLightboxGallery();
    });
});

function updateLightboxGallery() {
    lightboxImage.src = images[currentImage];
    productImage.src = images[currentImage];
    updateLightboxThumbs(currentImage);
    
    thumbnails.forEach((t, i) => {
        const isActive = i === currentImage;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-current", String(isActive));
    });
}

function updateLightboxThumbs(index) {
    lightboxThumbs.forEach((t, i) => {
        const isActive = i === index;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-current", String(isActive));
    });
}