import * as Data from "./data.js";

function renderCategoriesPage(products) {
    const container = document.getElementById("categories-grid");
    if (!container) return;

    const categories = {};

    products.forEach(p => {
        if (!categories[p.category]) {
            categories[p.category] = { count: 0, image: p.image };
        }
        categories[p.category].count++;
    });

    container.innerHTML = "";

    Object.entries(categories).forEach(([name, info]) => {
        container.innerHTML += `
            <a href="../pages/index.html"
               class="group relative rounded-lg aspect-video overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <img src="${info.image}" class="w-full h-full object-cover group-hover:scale-105 transition">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div class="text-white">
                        <h3 class="font-semibold text-xl">${name}</h3>
                        <p class="text-sm">${info.count} product${info.count > 1 ? "s" : ""}</p>
                    </div>
                </div>
            </a>`;
    });
}

async function initCategoriesPage() {
    const products = await Data.loadProducts();
    renderCategoriesPage(products);
}

initCategoriesPage();
