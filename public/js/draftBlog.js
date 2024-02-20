document.addEventListener("DOMContentLoaded", function () {
  let rejectBlog = document.querySelectorAll(".rejectBlog");
  let noArrBlogs = document.querySelector(".noArrBlogs");
  let titleModerator = document.querySelector(".titleModerator");
  for (let i = 0; i < rejectBlog.length; i++) {
    rejectBlog[i].addEventListener("click", function (event) {
      if( i > 0){
        noArrBlogs.style.display = 'block'
        titleModerator.style.display = 'none'
      }else{
        noArrBlogs.style.display = 'none'
        titleModerator.style.display = 'block'
      }
      event.preventDefault();
      let commentValue = rejectBlog[i].previousElementSibling;
      let blogStatus = rejectBlog[i].previousElementSibling.dataset.status;
      let blogId = rejectBlog[i].previousElementSibling.dataset.id;
      let formData = new FormData();
      formData.append("blogId", blogId);
      formData.append("rejectComment", commentValue.value);
      formData.append("status", blogStatus);
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
          let idBlock = rejectBlog[i].closest("#profileAllconteiner");
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
            textBlock.textContent = "Черновик";
            textBlock.style.color = "grey";
          } else {
            console.error("Comment blog not found in DOM");
          }
        });
    });
  }
});
