const base_url = "http://localhost:8080";

const productService = {
    async getAll(page = null, size = null){
        const params = new URLSearchParams();
        if(page !== null || size !== null){
            params.append("page", page);
            params.append("size", size);
        }
        try {
            const response = await fetch(`${url}/products/?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error("error");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw new Error("error");
        }
    }
    async getById(id){
        try {
            const response = await fetch(`${url}/id/${id}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error("error");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw new Error("error");
        }
    }
    async getByCategory(category){
        try {
            const response = await fetch(`${url}/category/${category}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error("error");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw new Error("error");
        }
    }
    async getByParams(minPrice, maxPrice, rating = null, page = null, size = null){
        const params = new URLSearchParams();
        if(page === null || size === null){
            params.append("page", page);
            params.append("size", size);
        }
        if(page !== null){
            params.append("rating", rating);
        }
        params.append("minPrice", minPrice);
        params.append("maxPrice", maxPrice);
        try {
            const response = await fetch(`${url}/products/?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error("error");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw new Error("error");
        }
    }
}