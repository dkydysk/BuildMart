const JSON_URL = "../data.json";

async function loadData() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error("Failed to load local JSON");
        return await response.json();
    } catch (error) {
        console.error('Data Load Failed:', error);
        return { products: [], promocodes: [] };
    }
}

function toSpringPage(array, page, size) {
    if (page === null || size === null || page === undefined || size === undefined) {
        return {
            content: array,
            totalElements: array.length,
            totalPages: 1,
            size: array.length,
            number: 0
        };
    }
    const startIndex = page * size;
    const content = array.slice(startIndex, startIndex + size);
    return {
        content: content,
        totalElements: array.length,
        totalPages: Math.ceil(array.length / size),
        size: size,
        number: page
    };
}

export async function getAll(page, size) {
    try {
        const data = await loadData();
        return toSpringPage(data.products || [], page, size);
    } catch (error) {
        throw new Error("error");
    }
}

export async function getById(id) {
    try {
        const data = await loadData();
        const product = (data.products || []).find(p => String(p.id) === String(id));
        return product || null;
    } catch (error) {
        throw new Error("error");
    }
}

export async function getAllCategories() {
    try {
        const data = await loadData();
        const products = data.products || [];

        const categoryMap = new Map();

        products.forEach(p => {
            if (!p.category) return;

            if (!categoryMap.has(p.category)) {
                categoryMap.set(p.category, {
                    name: p.category,
                    quantity: 0,
                    image: p.image
                });
            }
            categoryMap.get(p.category).quantity += 1;
        });

        return Array.from(categoryMap.values());
    } catch (error) {
        throw new Error("error");
    }
}

export async function getByDiscount() {
    try {
        const data = await loadData();
        return (data.products || []).filter(p => p.discount !== null && p.discount > 0);
    } catch (error) {
        throw new Error("error");
    }
}

export async function getByParams(minPrice, maxPrice, rating, category, page, size) {
    try {
        const data = await loadData();
        let filtered = data.products || [];

        if (category !== null && category !== "") {
            filtered = filtered.filter(p => p.category === category);
        }
        if (rating !== null) {
            filtered = filtered.filter(p => p.rating >= parseFloat(rating));
        }
        if (minPrice !== null) {
            filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice !== null) {
            filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
        }

        return toSpringPage(filtered, page, size);
    } catch (error) {
        throw new Error("error");
    }
}

export async function getByCode(code) {
    try {
        const data = await loadData();
        const promo = (data.promocodes || []).find(p => p.code === code);
        if (!promo) throw new Error("Promo code not found");
        return promo;
    } catch (error) {
        throw new Error("error");
    }
}

export async function getCart(cartData) {
    try {
        const data = await loadData();
        const allProducts = data.products || [];

        const result = {
            productQuantity: cartData || {},
            products: []
        };

        if (typeof cartData === 'object' && cartData !== null) {
            Object.keys(cartData).forEach(id => {
                const product = allProducts.find(p => String(p.id) === String(id));
                if (product) {
                    result.products.push(product);
                }
            });
        }

        return result;
    } catch (error) {
        throw new Error("error");
    }
}