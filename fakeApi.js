const API_URL = "https://fakestoreapi.com";

class API {
  addProductToCart(productId) {
    const body = JSON.stringify({
      userId: 3,
      date: "2024-02-05",
      products: [{ productId, quantity: 1 }],
    });
    return fetch(`${API_URL}/carts/7`, {
      method: "POST",
      body,
    });
  }

  fetchAllProducts(params = {}) {
    const queryParams = new URLSearchParams(params);
    return fetch(`${API_URL}/products?${queryParams.toString()}`);
  }
}


const api = new API();

function handelError(err) {
  console.log(err);
  alert("Возникла ошибка при отправке запроса");
}

window.addEventListener("load", () => {
  const productsList = document.querySelector(".products__list");

  api
    .fetchAllProducts({ limit: 10 })
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        const productListItem = document.createElement("li");
        const productAddBtn = document.createElement("button");

        productListItem.classList.add("products__item");
        productListItem.textContent = product.title;

        productAddBtn.classList.add("product__addBtn");
        productAddBtn.textContent = "Добавить в корзину";
        productAddBtn.setAttribute("data-product-id", product.id);

        productListItem.append(productAddBtn);
        productsList.append(productListItem);
      });
    })
    .catch(handelError);

  productsList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.target.disabled = true;
      api
        .addProductToCart(e.target.getAttribute("data-product-id"))
        .then(() => {
          e.target.textContent = "Добавлено";
        })
        .catch(() => {
          e.target.disabled = false;
        });
    }
  });
});
