import * as Data from "./data.js";
import * as Utils from "./utils.js";
import * as Api from "./../scripts_test/apiService.js";

let CATEGORY = null;
let DATA = null;
let PRODUCTS = null;
let CURRENT_SIZE = 4;
let CURRENT_PAGE = 0;

function renderProductCards(products) {
    const container = document.getElementById("products-grid");
    if (!container) return;

    container.innerHTML = "";
    shownProducts.textContent = products.length;
    if (products.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <p class="text-[#6A7282] text-lg">No products match your filters.</p>
                <button class="mt-4 text-[#F54900] hover:text-[#b53600] hover:border-[#b53600] font-medium transition" id="clear_filters_button_no_data">Clear filters</button>
            </div>
        `;
        const clear_filters_button_no_data = document.getElementById("clear_filters_button_no_data");
        clear_filters_button_no_data.addEventListener("click", function() {
            clearFilters();
        });
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
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
                    <button data-id="${product.id}" data-name="${product.name}" class="add-to-cart-button flex items-center justify-center gap-2 mt-2 w-full py-2 text-sm font-medium text-white bg-[#F54900] hover:bg-[#b53600]  rounded-lg transition">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 "><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                             <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                       </svg>
                           Add To Cart
                    </button>
                </div>
            </div>`;
    });
    const buttons = container.querySelectorAll(".add-to-cart-button");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            const productName = btn.getAttribute("data-name");
            addToCart(productId);
            showNotification("Added: "+productName);
            updateCartBadge();
        });
    });
}

async function initCatalogPage() {
    const urlParams = new URLSearchParams(window.location.search);
    CATEGORY = urlParams.get("category");
    if(CATEGORY){
        console.log(CATEGORY);
        await getByParams(null, null, null, CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
    } else {
        await getAll(CURRENT_PAGE, CURRENT_SIZE);
    }
    sortProducts(sortSelector.value);
    updatePagination();
    updateCartBadge();
}

initCatalogPage();

const buttons = document.querySelectorAll("#rating-container [data-rating]");

buttons.forEach((btn) => {
    btn.addEventListener("click", async function() {
        const isChecked = btn.getAttribute("data-state") === "checked";
        buttons.forEach((b) => {
            b.setAttribute("data-state", "unchecked");
            b.setAttribute("aria-checked", "false");
            const span = b.querySelector("span[data-state]");
            if (span) span.setAttribute("data-state", "unchecked");
        });
        if (isChecked){
            await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), null, CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
            sortProducts(sortSelector.value);
            updatePagination();
            return;
        }
        btn.setAttribute("data-state", "checked");
        btn.setAttribute("aria-checked", "true");
        const span = btn.querySelector("span[data-state]");
        if (span) span.setAttribute("data-state", "checked");
        await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), btn.getAttribute("data-rating"), CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
        sortProducts(sortSelector.value);
        updatePagination();
    });
});

/* ---- filters ---- */
const sortSelector = document.getElementById("sort-selector");
const shownProducts = document.getElementById("shown-products");

const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

const minSlider = document.getElementById("min-price");
const maxSlider = document.getElementById("max-price");
const sliderRange = document.getElementById("slider-range");
const minValueText = document.getElementById("min-value");
const maxValueText = document.getElementById("max-value");
const minValue = 0;
const maxValue = 400;

document.getElementById("filters_button").addEventListener("click", function() {
    const filters_div = document.getElementById("filters_div");
    const filters_button_text = document.getElementById("filters_button_text");
    if (filters_div.style.display === "none") {
        filters_button_text.textContent = "Hide Filters";
        filters_div.style.display = "block";
    } else {
        filters_button_text.textContent = "Show Filters";
        filters_div.style.display = "none";
    }
});

document.getElementById("clear_filters_button").addEventListener("click", function() {
    clearFilters();
});

minSlider.addEventListener("input", async function(e) {
    updateSlider(e);
    await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), (document.querySelector('[id^="rating-"][data-state="checked"]') ? document.querySelector('[id^="rating-"][data-state="checked"]').getAttribute("data-rating") : null), CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
    sortProducts(sortSelector.value);
    updatePagination();
});

maxSlider.addEventListener("input", async function(e) {
    updateSlider(e);
    await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), (document.querySelector('[id^="rating-"][data-state="checked"]') ? document.querySelector('[id^="rating-"][data-state="checked"]').getAttribute("data-rating") : null), CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
    sortProducts(sortSelector.value);
    updatePagination();
});

function updateSlider(e) {
    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    if (e.target.id === "min-price") {
        if (minVal > maxVal) {
            minVal = maxVal;
            minSlider.value = minVal;
        }
    } else if (e.target.id === "max-price") {
        if (minVal > maxVal) {
            maxVal = minVal;
            maxSlider.value = maxVal;
        }
    }

    minValueText.textContent = "$" + minVal;
    maxValueText.textContent = "$" + maxVal;
    sliderRange.style.left = (minVal / maxValue) * 100 + "%";
    sliderRange.style.right = (100 - (maxVal / maxValue) * 100) + "%";
}

function clearFilters(){
    const activeSelected = document.querySelector('[id^="rating-"][data-state="checked"]');
    if(activeSelected){
        activeSelected.setAttribute("data-state", "unchecked");
        activeSelected.setAttribute("aria-checked", "false");
        const activeSelectedSpan = activeSelected.querySelector("span");
        activeSelectedSpan.setAttribute("data-state", "unchecked");
    }

    minSlider.value = minValue;
    maxSlider.value = maxValue;
    minValueText.textContent = "$" + minValue;
    maxValueText.textContent = "$" + maxValue;
    sliderRange.style.left = 0 + "%";
    sliderRange.style.right = 0 + "%";

    initCatalogPage();
}

sortSelector.addEventListener("change", function() {
    sortProducts(sortSelector.value);
});

async function getByParams(minPrice, maxPrice, rating, category, page, size){
    DATA = await Api.getByParams(minPrice, maxPrice, rating, category, page, size);
    console.log(DATA);
    PRODUCTS = DATA.content;
}

async function getAll(page, size){
    DATA = await Api.getAll(page, size);
    PRODUCTS = DATA.content;
}

function sortProducts(sortValue){
    switch(sortValue){
        case "name_asc":
            PRODUCTS.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case "name_desc":
            PRODUCTS.sort((a,b) => b.name.localeCompare(a.name));
            break;
        case "price_asc":
            PRODUCTS.sort((a,b) => a.price - b.price);
            break;
        case "price_desc":
            PRODUCTS.sort((a,b) => b.price - a.price);
            break;
        default:
            break;
    }
    renderProductCards(PRODUCTS);
}

function updatePagination(){
    const pageInfo = document.getElementById("page-info");
    pageInfo.textContent = "Page " + (CURRENT_PAGE + 1);
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    if(DATA.first === true){
        prevBtn.disabled = true;
    }
    if(DATA.last === true){
        nextBtn.disabled = true;
    }
}

prevBtn.addEventListener("click", async function(){
    CURRENT_PAGE = CURRENT_PAGE - 1;
    await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), (document.querySelector('[id^="rating-"][data-state="checked"]') ? document.querySelector('[id^="rating-"][data-state="checked"]').getAttribute("data-rating") : null), CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
    sortProducts(sortSelector.value);
    updatePagination();
});

nextBtn.addEventListener("click", async function(){
    CURRENT_PAGE = CURRENT_PAGE + 1;
    await getByParams(parseInt(minSlider.value), parseInt(maxSlider.value), (document.querySelector('[id^="rating-"][data-state="checked"]') ? document.querySelector('[id^="rating-"][data-state="checked"]').getAttribute("data-rating") : null), CATEGORY, CURRENT_PAGE, CURRENT_SIZE);
    sortProducts(sortSelector.value);
    updatePagination();
});

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