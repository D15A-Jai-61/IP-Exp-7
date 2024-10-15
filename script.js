const apiUrl = 'http://localhost:3000/api';

document.getElementById('getAllProducts').addEventListener('click', getAllProducts);
document.getElementById('getProductById').addEventListener('click', getProductById);
document.getElementById('searchProducts').addEventListener('click', searchProducts);

async function getAllProducts() {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();
    displayResults(products);
}

async function getProductById() {
    const productId = document.getElementById('productId').value;
    const response = await fetch(`${apiUrl}/products/${productId}`);
    const product = await response.json();
    displayResults(product);
}

async function searchProducts() {
    const name = document.getElementById('searchName').value;
    const category = document.getElementById('searchCategory').value;
    const minPrice = document.getElementById('searchMinPrice').value;
    const maxPrice = document.getElementById('searchMaxPrice').value;

    const queryParams = new URLSearchParams({
        name,
        category,
        minPrice,
        maxPrice
    });

    const response = await fetch(`${apiUrl}/search?${queryParams}`);
    const products = await response.json();
    displayResults(products);
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Results:</h2>';

    if (Array.isArray(data)) {
        data.forEach(product => {
            resultsDiv.innerHTML += `
                <div>
                    <h3>${product.name}</h3>
                    <p>ID: ${product.id}</p>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                </div>
                <hr>
            `;
        });
    } else {
        resultsDiv.innerHTML += `
            <div>
                <h3>${data.name}</h3>
                <p>ID: ${data.id}</p>
                <p>Category: ${data.category}</p>
                <p>Price: $${data.price.toFixed(2)}</p>
            </div>
        `;
    }
}
