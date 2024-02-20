document.addEventListener("DOMContentLoaded", function () {
  let adminChangeRole = document.querySelectorAll(".adminChangeRole");

  for (let i = 0; i < adminChangeRole.length; i++) {
    adminChangeRole[i].addEventListener("click", function () {
      let userId = adminChangeRole[i].dataset.id;
      let adminSelect = document.querySelector(`#select_${userId}`); 
      let roleUser = document.querySelector(`#role_${userId}`);
      let select = adminSelect.value;
      let formData = new FormData();
      formData.append("role", select);
      formData.append("id", userId);

      fetch(`/profile/administrator`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then(() => {
          roleUser.innerHTML = select;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    });
  }
});

