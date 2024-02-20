document.addEventListener("DOMContentLoaded", function () {
  let submitCategoryHome = document.querySelectorAll(".submitCategoryHome");
  let div = document.querySelector('.main-content');

  for (let i = 0; i < submitCategoryHome.length; i++) {
    submitCategoryHome[i].addEventListener("click", function (event) {
      event.preventDefault();
      let previousElem = submitCategoryHome[i].previousElementSibling.value;
      let formData = new FormData();
      formData.append('action', 'search');
      formData.append('category', previousElem);
        fetch(`/category/`, {
        method: 'POST',
        body: formData
    }).then(
        response => response.text()
    ).then(
        text => {
            div.innerHTML = '';
            div.innerHTML = text;
            document.title = "Категория- " + previousElem; 
        }
    ).catch(
        error => {
            console.error('Fetch error:', error);
        }
    );
    });
  }
})




