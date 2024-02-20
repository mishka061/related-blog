let pagination = document.querySelector(".pagination");
let blogConteiner = document.querySelectorAll(".home-conteiner");
let allBlogs = 12;
let currentPage = 1;

function createButton(pageNumber) {
  let button = document.createElement("button");
  button.textContent = pageNumber;
  button.classList.add("paginationBtn");
  if (pageNumber === 1) {
    button.classList.add("paginationAddClass");
  }
  button.addEventListener("click", () => {
    currentPage = pageNumber;
    updateVisibly();
  });
  pagination.appendChild(button);
}

function updateVisibly() {
  for (let i = 0; i < blogConteiner.length; i++) {
    if (i < (currentPage - 1) * allBlogs || i >= currentPage * allBlogs) {
      blogConteiner[i].style.display = "none";
    } else {
      blogConteiner[i].style.display = "block";
    }
  }

  document.querySelectorAll(".paginationBtn").forEach((btn) => {
    btn.classList.remove("paginationAddClass");
  });

  document
    .querySelector(".paginationBtn:nth-child(" + currentPage + ")")
    .classList.add("paginationAddClass");
}

for (let i = 0; i < blogConteiner.length; i += allBlogs) {
  createButton(i / allBlogs + 1);
}

updateVisibly();
