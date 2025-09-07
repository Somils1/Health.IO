document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = form.querySelector("button");

  form.addEventListener("submit", () => {
    submitBtn.disabled = true;
    submitBtn.innerText = "Analyzing...";
  });
});
