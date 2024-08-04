fetch("dataa.json")
.then(response => response.json())
.then(json => {
    let productCardArray = json;
    const cardDiv = document.getElementsByClassName("card-div")[0];

    // Loop through the fetched product data and create product cards
    for (let i = 0; i < productCardArray.length; i++) {
        const productCard = document.createElement("div");
        let heading = json[i].name;
        let price = json[i].price;
        let url = json[i].image.desktop;

        productCard.classList.add("product-card");
        productCard.innerHTML = `
          <div class="product-card-image">
            <img src="${url}" alt="${heading}"/>
          </div>
          <div class="product-card-info">
            <h1>${heading}</h1>
            <p>$${price.toFixed(2)}</p>
            <button class="AddToCartBtn">Add to Cart</button>
          </div>
        `;

        cardDiv.appendChild(productCard);
    }

    // Move the event listener setup inside the fetch block
    const addToCartBtns = document.querySelectorAll(".AddToCartBtn");

    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const productName = document.querySelectorAll(".product-card-info h1")[index].textContent;
            const productPrice = parseFloat(document.querySelectorAll(".product-card-info p")[index].textContent.replace('$', ''));
            
            if (cartItems[productName]) {
                cartItems[productName].quantity += 1;
                cartItems[productName].total = cartItems[productName].quantity * cartItems[productName].price;
            } else {
                cartItems[productName] = {
                    quantity: 1,
                    price: productPrice,
                    total: productPrice
                };
            }

            updateCart();
        });
    });
})
.catch(error => console.error('Error fetching data:', error)); // Handle any fetch errors

const cartItemsContainer = document.getElementById("cart-items");
const totalQuantitySpan = document.querySelector(".total-quantity");
const totalAmountSpan = document.querySelector(".total-span2");

let cartItems = {};

function updateCart() {
cartItemsContainer.innerHTML = '';
let totalQuantity = 0;
let totalAmount = 0;

for (const [productName, item] of Object.entries(cartItems)) {
    totalQuantity += item.quantity;
    totalAmount += item.total;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <h4>${productName} <span class="remove">&times;</span></h4>
      <p>
        <span class="single-item-quantity">${item.quantity}x</span>
        <span>@$${item.price.toFixed(2)}</span>
        <span class="cart-item-total">Total: $${item.total.toFixed(2)}</span>
      </p>
    `;

    const removeBtn = cartItem.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
        delete cartItems[productName];
        updateCart();
    });

    cartItemsContainer.appendChild(cartItem);
}

totalQuantitySpan.textContent = totalQuantity;
totalAmountSpan.textContent = `$${totalAmount.toFixed(2)}`;
}
