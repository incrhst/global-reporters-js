window.addEventListener("DOMContentLoaded", (event) => {
  //--GLOBAL VARIABLES AND OBJECTS------------------------------------------------------------------------
  let bookmarks = document.querySelectorAll(".film-bookmark");
  let bookmark_handle = document.getElementById("bookmark-handle");
  let bookmarkedItems = {};

  //--INITALLY CALLED FUNCTIONS---------------------------------------------------------------------------
  closeBookmarkFloat();
  removeDVDfilter();

  //--LOOPS-----------------------------------------------------------------------------------------------
  bookmark_handle.addEventListener("click", toggleBookmarkFloat);

  //Loops through each bookmark and adds a click event to the on and off stage of each bookmark.
  [...bookmarks].forEach(function (item) {
    displayStateUponLoad(item);
    item.addEventListener("click", toggleBookmarking);
  });

  //--FUNCTIONS-------------------------------------------------------------------------------------------
  function removeDVDfilter() {
    // ensures that when
    // dvd info is marked as invisible (because there is no dvd)
    // then it is removed from the DOM

    document
      .querySelectorAll(".dvd-available-ans.w-condition-invisible")
      .forEach((dvdAvailableAns) => {
        dvdAvailableAns.remove();
      });
  }

  function openBookmarkFloat() {
    localStorage.setItem("bookmark-float-active", true);
    document
      .querySelector(".floating-bookmarks")
      .classList.remove("off-screen");
  }

  function closeBookmarkFloat() {
    localStorage.removeItem("bookmark-float-active");
    document.querySelector(".floating-bookmarks").classList.add("off-screen");
  }

  function toggleBookmarkFloat() {
    if (localStorage.getItem("bookmark-float-active")) {
      closeBookmarkFloat();
    } else {
      openBookmarkFloat();
    }
  }

  //Toggles the bookmark on the element when called.
  function toggleBookmarking(event) {
    let bookmarkWrapper = event.target.parentElement;
    let dataInputFieldName = bookmarkWrapper.querySelector(".film-data-name")
      .value;
    let dataInputFieldId = bookmarkWrapper.querySelector(".film-data-id").value;
    console.log(bookmarkWrapper.querySelector(".film-data-id"));
    //console.log(dataInputFieldName);
    bookmarkWrapper.classList.toggle("bookmarked");

    if (bookmarkWrapper.classList.contains("bookmarked")) {
      bookmarkedItems = {
        ...bookmarkedItems,
        [dataInputFieldId]: dataInputFieldName
      };

      localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
      console.log(localStorage);
      console.log(bookmarkedItems);
      displayFavorites();
      openBookmarkFloat();
    } else {
      delete bookmarkedItems[dataInputFieldId];

      localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
      console.log(localStorage);
      console.log(bookmarkedItems);
      displayFavorites();
    }
  }

  function displayFavorites() {
    let bookmarkFloater = document.querySelector(".floating-bookmarks");
    let ul = bookmarkFloater.querySelector(".floating-bookmarks-list");
    ul.replaceChildren();

    bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));

    hideFloaterWhenNoBookmarks();

    for (const key in bookmarkedItems) {
      let li = document.createElement("li");
      li.innerText = bookmarkedItems[key];
      ul.appendChild(li);
    }
  }

  function displayStateUponLoad(item) {
    let bookmarkWrapper = item;
    bookmarkWrapper.classList.remove("bookmarked");
    bookmarkedItems = JSON.parse(localStorage.getItem("bookmarks"));
    let dataInputFieldId = bookmarkWrapper.querySelector(".film-data-id").value;

    for (const key in bookmarkedItems) {
      if (key === dataInputFieldId) {
        bookmarkWrapper.classList.add("bookmarked");
        displayFavorites();
        hideFloaterWhenNoBookmarks();
        return;
      }
    }
  }

  function hideFloaterWhenNoBookmarks() {
    let bookmarkedItemsLength = Object.keys(bookmarkedItems || {}).length;

    if (bookmarkedItemsLength === 0) {
      closeBookmarkFloat();
    }
  }
});
