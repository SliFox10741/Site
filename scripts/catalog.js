function loadProducts(limit, offset, category = '') {
    let url = `http://localhost:3000/products?limit=${limit}&offset=${offset}`;
    if (category) {
        url += `&category=${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach(product => {
                const productItem = `
                    <div class="product">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} руб.</p>
                        <img src="../images/${product.photo}" alt="${product.name}" width="200" />
                    </div>
                `;
                productList.innerHTML += productItem;
            });
        })
        .catch(error => console.error('Error loading products:', error));
}