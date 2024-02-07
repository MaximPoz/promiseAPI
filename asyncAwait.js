//! Запрос к базе МФЦ
const API_MFC =
  "https://dev.workapi.rcitsakha.ru/api/statistics/mfc/employments";
async function fetchProducts() {
  try {
    const res = await fetch(API_MFC);
      const data = await res.json();
      console.log(`Данные получены: ${data.length} объектов`);
      return data;
  } catch (error) {
    console.log(`КОРОЧЕ ВОТ ТАКАЯ ОШИБОЧКА: ${error}`);
  }
}

const renderUsers = async () => {
  const usersList = document.querySelector(".products__list");

  const title = document.createElement("h2");
  title.textContent = "Пользователи МФЦ";
  usersList.append(title);

  const users = await fetchProducts();
  users.map((user) => {
    const list = document.createElement("li");
    list.classList.add("products__item");
    list.textContent = user.name;

    usersList.append(list);
  });
};

window.addEventListener("load", () => renderUsers());

//! Запрос к веб-камере и вывод на страницу

// const video = document.querySelector(".video");

// const getUserVideo = async () => {
//   try {
//     const res = await navigator.mediaDevices.getUserMedia({ video: true });
//     video.srcObject = res;
//   } catch (error) {
//     console.log(`Ошибка : ${error}`);
//   }
// };

// getUserVideo();
