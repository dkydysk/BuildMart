import * as Data from "./data.js";
import * as Utils from "./utils.js";

function renderDealsPage(products) {
    const container = document.getElementById("deals-grid");
    if (!container) return;

    const deals = products.filter(p => p.discount > 0);

    container.innerHTML = "";

    deals.forEach(product => {
        container.innerHTML += `
            <div class="relative">
                <div class="absolute z-50 -top-2 -right-2 rounded-full px-3 py-1 bg-red-700 text-white text-xs font-semibold shadow-lg">
                    Save ${product.discount}%
                </div>

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

                        <button class="flex items-center justify-center gap-2 mt-2 w-full py-2 text-sm font-medium text-white bg-[#F54900] hover:bg-[#b53600] rounded-lg transition">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

async function initDealsPage() {
    const products = await Data.loadProducts();
    renderDealsPage(products);
}

initDealsPage();
