// fetch("https://fakestoreapi.com/productss",{
//     method: "GET",
//     headers: { 'Content-Type': 'application/json' },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(`Возникла ошибка: ${error}`);
//   });

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/produts");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(`КОРОЧЕ ВОТ ТАКАЯ ОШИБОЧКА: ${error}`);
  }
}

fetchProducts();