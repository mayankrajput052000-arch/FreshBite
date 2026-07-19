const products = [

    {
        id: 1,
        name: "Classic Black T-Shirt",
        category: "Men",
        price: 799,
        oldPrice: 1199,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 2,
        name: "Premium Denim Jacket",
        category: "Men",
        price: 1899,
        oldPrice: 2499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 3,
        name: "Elegant Summer Dress",
        category: "Women",
        price: 1499,
        oldPrice: 1999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 4,
        name: "Women's Casual Outfit",
        category: "Women",
        price: 1299,
        oldPrice: 1799,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 5,
        name: "Leather Backpack",
        category: "Accessories",
        price: 999,
        oldPrice: 1499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 6,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 599,
        oldPrice: 899,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 7,
        name: "Oversized Hoodie",
        category: "Men",
        price: 1199,
        oldPrice: 1799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },


    {
        id: 8,
        name: "Stylish Handbag",
        category: "Accessories",
        price: 1599,
        oldPrice: 2299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }

];


// Get cart from localStorage

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Display Products

function displayProducts(productList) {

    const productGrid =
        document.getElementById("productGrid");

    productGrid.innerHTML = "";


    productList.forEach(product => {

        const discount = Math.round(

            ((product.oldPrice - product.price)
                / product.oldPrice) * 100

        );


        const card =
            document.createElement("div");


        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span class="discount">
                    -${discount}%
                </span>

                <img src="${product.image}"
                    alt="${product.name}">

            </div>


            <div class="product-info">

                <span class="category-name">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <div class="rating">
                    ★★★★★ ${product.rating}
                </div>


                <div class="price">

                    ₹${product.price}

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                </div>


                <button class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


// Filter Products

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        const filteredProducts =
            products.filter(

                product =>
                    product.category === category

            );


        displayProducts(filteredProducts);

    }

}


// Add To Cart

function addToCart(productId) {

    const product =
        products.find(

            product =>
                product.id === productId

        );


    cart.push(product);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCart();


    alert(
        `${product.name} added to cart!`
    );

}


// Update Cart

function updateCart() {

    document.getElementById("cartCount")
        .innerText = cart.length;


    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <img src="${product.image}">


            <div>

                <h4>
                    ${product.name}
                </h4>


                <p>
                    ₹${product.price}
                </p>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    document.getElementById("cartTotal")
        .innerText = total;

}


// Remove Product From Cart

function removeFromCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCart();

}


// Open Cart

function openCart() {

    document.getElementById("cartModal")
        .style.display = "block";

}


// Close Cart

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


// Go To Checkout

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    window.location.href =
        "checkout.html";

}


// Search Products

document.getElementById("searchInput")
    .addEventListener(

        "input",

        function () {

            const searchValue =
                this.value.toLowerCase();


            const filteredProducts =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(searchValue)

                );


            displayProducts(filteredProducts);

        }

    );


// Newsletter

function subscribe(event) {

    event.preventDefault();


    alert(
        "Thank you for subscribing to StyleHub!"
    );

}


// Initial Load

displayProducts(products);

updateCart();