"use strict";
import View from "./View.js";

class CartView extends View {
  parEl = document.querySelector(".shopping-cart");
  cartIconEl = document.querySelector(".cartAmount");
  cartTotal = document.querySelector(".cart-total-price");
  trashIcon = document.querySelector(".bi-trash3");

  generateCartItems(items) {
    this.parEl.innerHTML = "";
    let markup = "";

    items.forEach((item) => {
      if (item.numItems === 0) return;
      markup += `
       <div class="cart-item product" data-id="${item.id}">
          <img width="100" src=${item.image} alt="${item.title}" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${item.title}</p>
                <p class="cart-item-price"> ${item.price.toFixed(2)}€</p>
              </h4>
              <i class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
              <div class="buttons">
                <i class="bi bi-dash-lg add-remove-icon"></i>
                <div id=${item.id} class="quantity">${item.numItems}</div>
                <i class="bi bi-plus-lg add-remove-icon"></i>
              </div>
            </div>
            <h3 id="${item.id}-total"> ${(item.price * item.numItems).toFixed(
        2
      )} €</h3>
          </div>
        </div>
      `;
    });
    this.parEl.insertAdjacentHTML("afterbegin", markup);
  }

  updateItemTotalPrice(id, price) {
    const priceEl = document.getElementById(`${id}-total`);
    priceEl.textContent = `${price} €`;
  }

  updateCartTotal(price) {
    this.cartTotal.textContent = `${price.toFixed(2)} €`;
  }

  // Handlers

  addHandlerDeleteFromCart(handler) {
    this.parEl.addEventListener("click", (e) => {
      const itemID = e.target.closest(".product")?.dataset.id;
      if (!itemID || !e.target.classList.contains("bi-x-lg")) return;
      if (!confirm("Are you sure you want to remove this item from your cart?"))
        return;
      handler(itemID);
    });
  }

  addHandlerEmptyCart(handler) {
    this.trashIcon.addEventListener("click", () => {
      if (!confirm("Are you sure you want to empty your cart?")) return;
      handler();
    });
  }
}

export default new CartView();
