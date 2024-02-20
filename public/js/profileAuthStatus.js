document.addEventListener("DOMContentLoaded", function () {
  let submitFindStatus = document.querySelector(".submitFindStatus");
  let statusSelect = document.querySelector(".status-select");
  let statusSearch = document.querySelector(".statusSearch");
  let profileContent = document.querySelector("#profileContent");

  submitFindStatus.addEventListener("click", function (event) {
    event.preventDefault();
    let status = statusSelect.value;
    let formData = new FormData();
    formData.append("status", status);
    fetch(`/profile/author/status?status=${status}`, {
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
        profileContent.innerHTML = "";
        profileContent.style.display = 'none';
        statusSearch.innerHTML = text;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});

