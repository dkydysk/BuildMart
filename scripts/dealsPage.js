import * as Data from "./data.js";
import * as Utils from "./utils.js";
import * as Api from "./../scripts_test/apiService.js";

function renderDealsPage(deals) {
    const container = document.getElementById("deals-grid");
    if (!container) return;

    container.innerHTML = "";

    deals.forEach(product => {
        container.innerHTML += `
            <div class="relative">
                <div class="absolute z-50 -top-2 -right-2 rounded-full px-3 py-1 bg-red-700 text-white text-xs font-semibold shadow-lg">
                    Save ${product.discount}%
                </div>

                <div class="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden hover:shadow-lg transition">
                    <a href="../product?id=${product.id}">
                        <div class="aspect-square overflow-hidden bg-gray-100">
                            <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-105 transition">
                        </div>
                    </a>

                    <div class="p-4 flex flex-col gap-2">
                        <a href="../product?id=${product.id}">
                            <h3 class="text-[#101828] font-semibold text-lg group-hover:text-[#F54900] transition">${product.name}</h3>
                        </a>

                        <div class="flex items-center gap-0.5">
                            ${Utils.renderRatingStars(product.rating, 16)}
                            <span class="ml-2 text-sm text-[#4A5565]">(${product.rating.toFixed(1)})</span>
                        </div>

                        <p class="text-2xl font-bold text-[#101828]">$${product.price.toFixed(2)}</p>
                        <p class="text-sm text-[#6A7282]">${product.category}</p>

                        <button data-id="${product.id}" data-name="${product.name}" class="add-to-cart-button flex items-center justify-center gap-2 mt-2 w-full py-2 text-sm font-medium text-white bg-[#F54900] hover:bg-[#b53600] rounded-lg transition">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>`;
    });
    const buttons = container.querySelectorAll(".add-to-cart-button");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            const productName = btn.getAttribute("data-name");
            addToCart(productId);
            showNotification("Added " + productName + " to cart");
            updateCartBadge();
        });
    });
}

function addToCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
        cart[productId] = cart[productId] + 1;
    }
    else {
        cart[productId] = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById("cart-quantity-text");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalQuantity = 0;
    Object.values(cart).forEach(quantity => {
        totalQuantity += quantity;
    });
    badge.textContent = totalQuantity;
    if (totalQuantity === 0) {
        badge.style.display = "none";
    } else {
        badge.style.display = "flex";
    }
}

async function initDealsPage() {
    const products = await getByDiscount();
    renderDealsPage(products);
    updateCartBadge();
}

async function getByDiscount(){
    const DATA = await Api.getByDiscount();
    return DATA;
}

initDealsPage();

function showNotification(message) {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.className = "my-notification";
    notification.innerHTML = `
        <svg class="notification-success-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        <div class="notification-message">${message}</div>
    `;
    container.appendChild(notification);
    setTimeout(() => {
        notification.classList.add("notification-fade-out");
        notification.addEventListener("animationend", () => notification.remove());
    }, 3000);
}