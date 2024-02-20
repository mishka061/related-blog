document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".textAreaSubmit");
  const commentTextArea = document.querySelector(".textAreaCommit");
  const commentsContainer = document.querySelector(".new-blog-comments");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("comment", commentTextArea.value);
    let blogId = submitButton.getAttribute("data-id");
    fetch(`/blog/${blogId}/comments`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        commentsContainer.innerHTML += text;
        commentTextArea.value = "";
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});
