if (document.querySelector("#js-copyToClipboard")) {
  const input = document.querySelector("#js-copyToClipboard-input");
  const button = document.querySelector("#js-copyToClipboard-button");

  button.addEventListener("click", () => {
    input.setSelectionRange(0, 99999);
    input.select();
    document.execCommand("copy");
    button.innerHTML = "Copié !";
    setTimeout(() => {
      button.innerHTML = "Copier";
    }, 1500);
  });
}
