import * as Data from "./data.js";
import * as Utils from "./utils.js";

function renderProductCards(products) {
    const container = document.getElementById("products-grid");
    if (!container) return;

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <p class="text-[#6A7282] text-lg">No products match your filters.</p>
                <button class="mt-4 text-[#F54900] hover:text-[#b53600] font-medium">Clear filters</button>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <div class="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden hover:shadow-lg transition">
                <a href="../pages/product.html?id=${product.id}">
                    <div class="aspect-square overflow-hidden bg-gray-100">
                        <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-105 transition">
                    </div>
                </a>
                <div class="p-4 flex flex-col gap-2">
                    <a href="../pages/product.html?id=${product.id}">
                        <h3 class="text-[#101828] font-semibold text-lg group-hover:text-[#F54900] transition">${product.name}</h3>
                    </a>
                    <div class="flex items-center gap-0.5">
                        ${Utils.renderRatingStars(product.rating, 16)}
                        <span class="ml-2 text-sm text-[#4A5565]">(${product.rating.toFixed(1)})</span>
                    </div>
                    <p class="text-2xl font-bold text-[#101828]">$${product.price.toFixed(2)}</p>
                    <p class="text-sm text-[#6A7282]">${product.category}</p>
                    <button class="flex items-center justify-center gap-2 mt-2 w-full py-2 text-sm font-medium text-white bg-[#F54900] hover:bg-[#b53600]  rounded-lg transition">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 "><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                             <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                       </svg>
                           Add To Cart
                    </button>
                </div>
            </div>`;
    });
}

async function initCatalogPage() {
    const products = await Data.loadProducts();
    renderProductCards(products);
}

initCatalogPage();

const buttons = document.querySelectorAll("#rating-container [data-rating]");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const isChecked = btn.getAttribute("data-state") === "checked";
        buttons.forEach((b) => {
            b.setAttribute("data-state", "unchecked");
            b.setAttribute("aria-checked", "false");
            const span = b.querySelector("span[data-state]");
            if (span) span.setAttribute("data-state", "unchecked");
        });
        if (isChecked) return;
        btn.setAttribute("data-state", "checked");
        btn.setAttribute("aria-checked", "true");
        const span = btn.querySelector("span[data-state]");
        if (span) span.setAttribute("data-state", "checked");
    });
});

