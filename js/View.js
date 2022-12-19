export default class View {
  capitalize(str) {
    return str
      .split(" ")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getUniqueCategories(data) {
    const allCategories = data.map((item) => item.category);
    return [...new Set(allCategories)];
  }

  updateCartAmount(amount) {
    this.cartIconEl.textContent = amount;
  }

  updateItemAmount(id, amount) {
    const itemEl = document.getElementById(id);
    itemEl.textContent = amount;
  }

  addHandlerAddRemoveItem(handler) {
    this.parEl.addEventListener("click", (e) => {
      const itemID = e.target.closest(".product")?.dataset.id;
      if (!itemID || !e.target.classList.contains("add-remove-icon")) return;

      const action = e.target.classList.contains("bi-plus-lg")
        ? "add"
        : "remove";
      handler(itemID, action);
    });
  }
}
