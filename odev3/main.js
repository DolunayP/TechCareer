const sortBtn = document.querySelector('.sort-btn')
const dropdown = document.querySelector('.dropdown')
const dropdownOptions = document.querySelectorAll('.dropdown li')
const tableBody = document.querySelector(".t-body");
let productsData = []


const axiosInstance = axios.create({
    baseURL: 'https://northwind.vercel.app/api/'
});


getProducts = async () => {
    const res = await axiosInstance.get('products')
    productsData = await res.data;
    console.log(productsData)
    createTable(productsData);
}

function createTable(products) {
    const tableBody = document.querySelector(".t-body");

    products.sort((a, b) => (a.id - b.id))

    tableBody.innerHTML = '';

    products.forEach((product) => {
        const line = document.createElement("tr");
        line.classList.add('table-line')
        line.innerHTML = `
            <td class="id">${product.id}</td>
            <td>${product.name}</td>
            <td>${product.unitPrice}</td>
            <td>${product.unitsInStock}</td>
            <td><button class="delete-button">X</button></td>
        `;
        tableBody.appendChild(line);
    });
}

async function deleteProduct(productId) {
    try {
        await axiosInstance.delete(`products/${productId}`);
        console.log(`Ürün ID ${productId} başarıyla silindi.`);
    } catch (error) {
        console.error(`Ürün ID ${productId} silinirken hata oluştu:`, error);
    }
}

tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const targetProduct = e.target.parentElement.parentElement;
        const productId = targetProduct.querySelector(".id").textContent.trim();
        deleteProduct(productId);
        targetProduct.remove();
    }
});

sortBtn.addEventListener('click', function () {
    dropdown.classList.toggle('active')
})

dropdownOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
        const sayi = opt.textContent;
        const maxPrice = parseInt(sayi)
        const filteredProducts = productsData.filter((product) => {
            return product.unitPrice <= maxPrice;
        });
        createTable(filteredProducts);
        dropdown.classList.remove('active');
        console.log(productsData)
    })
});

getProducts();
