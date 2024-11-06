const heading = document.querySelector("h1");
const productContainer = document.querySelector(".product-container");
let products = [];

// Fetch e-commerce API data
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

// Display products on the page
function displayProducts(productsList) {
    productContainer.innerHTML = ""; // Clear existing products
    productsList.forEach(product => {
        const productCard = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        const price = document.createElement("p");

        img.src = product.image;
        title.innerText = product.title;
        price.innerText = `Price: $${product.price}`;

        productCard.append(img, title, price);
        productContainer.append(productCard);
    });
}

// Sort products by price (Low to High)
document.getElementById("sort-low-to-high").addEventListener("click", () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
});

// Sort products by price (High to Low)
document.getElementById("sort-high-to-low").addEventListener("click", () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    displayProducts(sortedProducts);
});

// Filter products based on search query
function filterProducts() {
    const query = document.querySelector("#search-input").value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

// Fetch products when the page loads
fetchProducts();
