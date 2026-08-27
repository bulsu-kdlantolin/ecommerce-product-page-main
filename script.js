const sidebarBtn = document.getElementById("sidebar-button");
const sidebar = document.getElementById("sidebar");
const overlayBlur = document.getElementById("overlay");
const closeBtn = document.getElementById("close-button");
const cartBtn = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    overlayBlur.classList.add("overlay");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    overlayBlur.classList.remove("overlay");
});

cartBtn.addEventListener("click", () => {
    cartPopup.classList.toggle("hidden");
});