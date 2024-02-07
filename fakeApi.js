const API_URL = "https://fakestoreapi.com";

class API {
  async addProductToCart(productId) {
    const body = JSON.stringify({
      userId: 3,
      date: "2024-02-05",
      products: [{ productId, quantity: 1 }],
    });
    await fetch(`${API_URL}/carts/7`, {
      method: "POST",
      body,
    });
  }

  async fetchAllProducts(params = {}) {
    const queryParams = new URLSearchParams(params);
    const res = await fetch(`${API_URL}/products?${queryParams.toString()}`);
    const products = await res.json();

    return products;
  }
}

const api = new API();

function handelError(err) {
  console.log(err);
  alert("Возникла ошибка при отправке запроса");
}

async function renderProducts() {
  try {
    const productsList = document.querySelector(".products__list");
    const products = await api.fetchAllProducts({ limit: 10 });

    products.forEach((product) => {
      const productListItem = document.createElement("li");
      const productAddBtn = document.createElement("button");
      const productListImg = document.createElement("img")

      productListItem.classList.add("products__item");
      productListItem.textContent = product.title;

      productListImg.classList.add("products__img");
      productListImg.src = product.image;

      productAddBtn.classList.add("product__addBtn");
      productAddBtn.textContent = "Добавить в корзину";
      productAddBtn.setAttribute("data-product-id", product.id);

      productListItem.append(productAddBtn);
      productListItem.append(productListImg);
      productsList.append(productListItem);
    });
  } catch (err) {
    handelError(err);
  }
}

window.addEventListener("load", () => renderProducts());

const productsList = document.querySelector(".products__list");

productsList.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    try {
      e.target.disabled = true;
      await api.addProductToCart(e.target.getAttribute("data-product-id"));
      e.target.textContent = "Добавлено";
    } catch (err) {
      console.log(`ошибка ${err}`);
      e.target.disabled = false;
    }
  }
});