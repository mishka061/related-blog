document.addEventListener("DOMContentLoaded", function () {
  let approvedBlogBtn = document.querySelectorAll(".approvedBlogBtn");
  let noArrBlogs = document.querySelector(".noArrBlogs");
  let titleModerator = document.querySelector(".titleModerator");

  for (let i = 0; i < approvedBlogBtn.length; i++) {
    if (i > 0) {
      noArrBlogs.style.display = "block";
      titleModerator.style.display = "none";
    } else {
      noArrBlogs.style.display = "none";
      titleModerator.style.display = "block";
    }
    approvedBlogBtn[i].addEventListener("click", function (event) {
      event.preventDefault();
      let previousElem = approvedBlogBtn[i].previousElementSibling;
      let blogId = previousElem.previousElementSibling.dataset.id;
      let formData = new FormData();
      formData.append("blogId", blogId);
      formData.append("status", previousElem.value);
      fetch(`/profile/moderator`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then(() => {
          let idBlock = approvedBlogBtn[i].closest("#profileAllconteiner");
          if (idBlock) {
            idBlock.remove();
          } else {
            console.error("id block not found in DOM");
          }
          let blog = document.querySelector(
            `.profile-all-conteiner[data-id="${blogId}"]`
          );
          if (blog) {
            let textBlock = blog.querySelector(".waiting-status");
            textBlock.textContent = "Одобрено";
            textBlock.style.color = "rgb(3, 216, 3)";
          } else {
            console.error("Comment blog not found in DOM");
          }
        });
    });
  }
});
