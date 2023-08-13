window.addEventListener("load", (event) => {
  let bookmarks = document.querySelectorAll(".film-bookmark");
  let bookmarkedItems = {};

  //localStorage.clear();

  //--Functions--
  //Toggles the bookmark on the element when called.
  function toggleBookmarking(event) {
    let bookmarkWrapper = event.target.parentElement;
    bookmarkWrapper.classList.toggle("bookmarked");

    if (bookmarkWrapper.classList.contains("bookmarked")) {
      bookmarkedItems = {
        ...bookmarkedItems,
        [bookmarkWrapper.dataset.filmid]: bookmarkWrapper.dataset.filmname
      };

      localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
      console.log(localStorage);
      displayFavorites();
    } else {
      delete bookmarkedItems[bookmarkWrapper.dataset.filmid];

      localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
      console.log(localStorage);
      displayFavorites();
    }
  }

  function displayFavorites() {
    let bookmarkFloater = document.querySelector(".floating-bookmarks");
    let ul = bookmarkFloater.querySelector(".floating-bookmarks-list");
    ul.replaceChildren();

    bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));

    for (const key in bookmarkedItems) {
      let li = document.createElement("li");
      li.innerText = bookmarkedItems[key];
      ul.appendChild(li);
    }

    hideFloaterWhenNoBookmarks();
  }

  function displayStateUponLoad(item) {
    let bookmarkWrapper = item;
    bookmarkWrapper.classList.remove("bookmarked");
    bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));

    for (const key in bookmarkedItems) {
      if (key === item.dataset.filmid) {
        bookmarkWrapper.classList.add("bookmarked");
        displayFavorites();
        hideFloaterWhenNoBookmarks();
        return;
      }
    }
  }

  function hideFloaterWhenNoBookmarks() {
    let bookmarkFloater = document.querySelector(".floating-bookmarks");
    let bookmarkedItemsLength = Object.keys(bookmarkedItems || {}).length;

    if (bookmarkedItemsLength >= 1) {
      bookmarkFloater.style.display = "block";
    } else {
      bookmarkFloater.style.display = "none";
    }
  }

  //Loops through each bookmark and adds a click event to the on and off stage of each bookmark.
  [...bookmarks].forEach(function (item) {
    displayStateUponLoad(item);
    item.addEventListener("click", toggleBookmarking);
  });
});
