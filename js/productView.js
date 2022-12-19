"use strict";
import View from "./View.js";

class ProductView extends View {
  parEl = document.getElementById("shop");
  categoriesList = document.querySelector(".categories-list");
  categoriesBtn = document.querySelector(".categories");
  categoriesList = document.querySelector(".categories-list");
  cartIconEl = document.querySelector(".cartAmount");

  constructor() {
    super();
    this.#addHandlerCatgoriesBtn();
  }

  generateShop(data) {
    this.parEl.innerHTML = "";
    let markup = "";
    data.forEach((item) => {
      markup += `
        <div id=product-id-${item.id} class="item product" data-id="${item.id}">
      <img width="220" src="${item.image}" alt="${item.title}">
      <div class="details">
          <h3>${item.title}</h3>
          <p>${`${item.description.slice(0, 75)}...`}</p>
          <div class="price-quantity">
          <h2>${item.price.toFixed(2)} €</h2>
          <div class="buttons">
              <i  class="bi bi-dash-lg add-remove-icon"></i>
              
              <div id=${item.id} class="quantity">${item.numItems}</div>
              <i 
               class="bi bi-plus-lg add-remove-icon"></i>
          </div>
          </div>
      </div>
  </div>
        `;
    });
    this.parEl.insertAdjacentHTML("afterbegin", markup);
  }

  generateCategories(data) {
    const categories = this.getUniqueCategories(data);
    this.categoriesList.innerHTML = "";
    let markup = "";

    categories.forEach((cat) => {
      markup += `
        <li data-category="${cat}">${this.capitalize(cat)}</li>
    `;
    });

    this.categoriesList.insertAdjacentHTML("afterbegin", markup);
  }

  updateItemAmount(id, amount) {
    const itemEl = document.getElementById(id);
    itemEl.textContent = amount;
  }

  // Handlers
  #addHandlerCatgoriesBtn() {
    this.categoriesBtn.addEventListener("mouseover", () =>
      this.categoriesList.classList.remove("hidden")
    );
    this.categoriesBtn.addEventListener("mouseout", () =>
      this.categoriesList.classList.add("hidden")
    );
  }

  addHandlerCategoriesItem(handler) {
    this.categoriesList.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      if (!category) return;
      handler(category);
    });
  }
}

export default new ProductView();
