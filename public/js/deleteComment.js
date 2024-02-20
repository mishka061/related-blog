document.addEventListener("DOMContentLoaded", function () {
  let deleteComment = document.querySelectorAll(".deleteComment");
  for (let i = 0; i < deleteComment.length; i++) {
    deleteComment[i].addEventListener("click", function (event) {
      event.preventDefault();
      let previousElem = deleteComment[i].previousElementSibling;
      let blogId = previousElem.previousElementSibling.dataset.id;
      let formData = new FormData();
      formData.append("blogId", blogId);
      formData.append("comments", previousElem.value);
      fetch(`/profile/moderator`, {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }).then(() => {
        let commentBlock = deleteComment[i].closest(".blog-read-comments");
        if (commentBlock) {
          commentBlock.remove();
        } else {
          console.error('Comment block not found in DOM');
        }
      });
    });
  }
});
