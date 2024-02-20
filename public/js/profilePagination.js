document.addEventListener("DOMContentLoaded", function () {
  let profilePagination = document.querySelector(".profilePagination");
  let profileConteiner = document.querySelectorAll(".profile-all-conteiner");
  let allBlogs = 10;
  let currentPage = 1;

  function createButton(pageNumber) {
    let button = document.createElement("button");
    button.textContent = pageNumber;
    button.classList.add("paginationContentBtn");

    if (pageNumber === 1) {
      button.classList.add("profilePaginationAddClass");
    }

    button.addEventListener("click", () => {
      currentPage = pageNumber;
      updateVisibly();
    });
    profilePagination.appendChild(button);
  }

  function updateVisibly() {
    for (let i = 0; i < profileConteiner.length; i++) {
      if (i < (currentPage - 1) * allBlogs || i >= currentPage * allBlogs) {
        profileConteiner[i].style.display = "none";
      } else {
        profileConteiner[i].style.display = "block";
      }
    }

    document.querySelectorAll(".paginationContentBtn").forEach((btn) => {
      btn.classList.remove("profilePaginationAddClass");
    });
    document
      .querySelector(".paginationContentBtn:nth-child(" + currentPage + ")")
      .classList.add("profilePaginationAddClass");
  }

  for (let i = 0; i < Math.ceil(profileConteiner.length / allBlogs); i++) {
    createButton(i + 1);
  }

  updateVisibly();
});
