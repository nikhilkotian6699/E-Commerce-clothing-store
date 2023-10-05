const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}
 
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

const products = [
    { name: "Product 1", price: 50, category: "Men" },
    { name: "Product 2", price: 30, category: "Women" },
    { name: "Product 3", price: 25, category: "Kids" },
    // Add more product entries
  ];
  
  function searchProducts() {
    const productName = document.getElementById("productName").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("minPrice").value);
    const maxPrice = parseFloat(document.getElementById("maxPrice").value);
    const category = document.getElementById("category").value.toLowerCase();
  
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(productName);
      const priceMatch = (isNaN(minPrice) || product.price >= minPrice) &&
                        (isNaN(maxPrice) || product.price <= maxPrice);
      const categoryMatch = category === "" || product.category.toLowerCase() === category;
  
      return nameMatch && priceMatch && categoryMatch;
    });

  }
  // Function to fetch products from the API
function fetchProducts() {
    fetch('http://localhost:3000/products') // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Once data is fetched, call a function to display it
        displayProducts(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // Function to display products on your website
  function displayProducts(products) {
    const productsContainer = document.getElementById('products-container'); // Replace with your HTML container ID
  
    // Loop through the products and create HTML elements to display them
    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card'); // Apply CSS styles
  
      const productName = document.createElement('h2');
      productName.textContent = product.name;
  
      const productDescription = document.createElement('p');
      productDescription.textContent = product.description;
  
      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price.toFixed(2)}`;
  
      productCard.appendChild(productName);
      productCard.appendChild(productDescription);
      productCard.appendChild(productPrice);
  
      productsContainer.appendChild(productCard);
    });
  }
  
  // Call the fetchProducts function when your web page loads
  window.addEventListener('load', fetchProducts);
  