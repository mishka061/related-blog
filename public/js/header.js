document.addEventListener("DOMContentLoaded", function () {
  let submitHeader = document.querySelector(".submitHeader");
  let searhSelectHeader = document.querySelector(".searhSelectHeader");
  let div = document.querySelector(".main-content");

  submitHeader.addEventListener("click", function (event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("action", "search");
    formData.append("category", searhSelectHeader.value);
    fetch(`/category/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => {
        div.innerHTML = "";
        div.innerHTML = text;
        document.title = "Категория- " + searhSelectHeader.value ; 
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});

