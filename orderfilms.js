window.addEventListener("DOMContentLoaded", (event) => {
  //--GLOBAL VARIABLES AND OBJECTS----------------------
  displayFavoritesOnOrderForm();
  document.querySelector("#films").setAttribute("readonly", "");

  function displayFavoritesOnOrderForm() {
    let ul = document.getElementById("list-film-bookmarks");
    let inputFieldForFilmsWrapper = document.getElementById("films-displayed");
    inputFieldForFilmsWrapper.replaceChildren();
    ul.replaceChildren();

    let bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));
    // reset film list in textarea
    document.querySelector("#films").value = "";
    for (const [i, [key, value]] of Object.entries(
      Object.entries(bookmarkedItems)
    )) {
      // add film to the textarea

      document.querySelector("#films").value += `\r\n${bookmarkedItems[key]}`;

      //for (const key in bookmarkedItems) {
      let span = document.createElement("span");
      let img = document.createElement("img");
      let div = document.createElement("div");
      div.style.display = "flex";
      let input = document.createElement("input");
      input.style.display = "none";
      img.style.cursor = "pointer";
      img.src =
        "https://uploads-ssl.webflow.com/640a61f2c84be72a10f6380e/64ccf72bd29f94a9a498b3a6_x-image-close.svg";
      img.id = key;
      img.height = 25;
      img.width = 25;
      span.innerText = bookmarkedItems[key];
      div.appendChild(img);
      div.appendChild(span);
      ul.appendChild(div);

      img.addEventListener("click", removerBookMark);
      input.type = "checkbox";
      input.name = `films[${i}]`;
      input.checked = true;
      input.value = bookmarkedItems[key];

      let label = document.createElement("label");
      label.htmlFor = input.value;
      label.appendChild(document.createTextNode(input.value));

      let br = document.createElement("br");

      inputFieldForFilmsWrapper.appendChild(input);
      inputFieldForFilmsWrapper.appendChild(label);
      inputFieldForFilmsWrapper.appendChild(br);
    }
  }

  function removerBookMark(event) {
    let target = event.target;
    let bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));

    delete bookmarkedItems[target.id];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
    displayFavoritesOnOrderForm();
  }
});
