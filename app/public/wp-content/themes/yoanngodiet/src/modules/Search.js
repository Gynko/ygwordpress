class Search {
    constructor() {
      this.addSearchHtml();
      this.openButton = document.querySelector(".js-search-trigger");
      this.closeButton = document.querySelector(".search-overlay__close");
      this.searchOverlay = document.querySelector(".search-overlay");
      this.searchField = document.querySelector("#search-term");
      this.resultsDiv = document.querySelector("#search-overlay__results");
      this.events();
      this.isOverlayOpened = false;
      this.isSpinnerVisible = false;
      this.typingTimer;
      this.previousValue = "";
    }
  
    events() {
      this.openButton.addEventListener("click", this.openOverlay.bind(this));
      this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
      document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
      this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
      this.searchOverlay.addEventListener("transitionend", this.focusSearchField.bind(this));
    }
  
    openOverlay() {
      this.searchOverlay.classList.add("search-overlay--active");
      this.searchField.value = "";

      this.isOverlayOpened = true;
    }
  
    closeOverlay() {
      this.searchOverlay.classList.remove("search-overlay--active");

      this.isOverlayOpened = false;
    }
  
    focusSearchField() {
      if (this.isOverlayOpened) {
        this.searchField.focus();
      }
    }
  
    keyPressDispatcher(event) {
      if (event.key === "Escape" && this.isOverlayOpened) {
        this.closeOverlay();
      } else if (
        (event.key === "s" || event.key === "S") &&
        !this.isOverlayOpened
      ) {
        const activeElement = document.activeElement;
        if (
          activeElement.tagName !== "INPUT" &&
          activeElement.tagName !== "TEXTAREA"
        ) {
          this.openOverlay();
        }
      }
    }
  
    typingLogic() {
      if (this.searchField.value !== this.previousValue) {
        clearTimeout(this.typingTimer);
  
        if (this.searchField.value !== "") {
          if (!this.isSpinnerVisible) {
            this.resultsDiv.innerHTML = `<div class="spinner-loader"></div>`;
            this.isSpinnerVisible = true;
          }
          this.typingTimer = setTimeout(this.getResults.bind(this), 1000);
        } else {
          this.resultsDiv.innerHTML = "";
          this.isSpinnerVisible = false;
        }
        this.previousValue = this.searchField.value;
      }
    }

    async getResults() {
        const postTypes = ["posts", "pages", "professor"];
        const searchQuery = this.searchField.value;
        const results = [];
      
        for (const type of postTypes) {
          try {
            const response = await fetch(
              `${universityData.root_url}/wp-json/wp/v2/${type}?search=${searchQuery}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            const posts = await response.json();
            if (posts.length > 0) {
              results.push({ type, posts });
            }
          } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
          }
        }
      
        if (results.length > 0) {
          this.resultsDiv.innerHTML = results
            .map(
              (result) => `
                <h1 style="background-color:yellow">${result.type.charAt(0).toUpperCase() + result.type.slice(1)}</h1>
                ${result.posts
                  .map(
                    (post) => `
                      <div class="post" style="background-color:pink">
                        <h2>${post.title.rendered}</h2>
                        <p>${post.content.rendered}</p>
                        <p style="background-color: green">${post.authorName}</p>
                        <a href="${post.link}">${post.title.rendered}</a>
                      </div>
                    `
                  )
                  .join('')}
              `
            )
            .join('');
        } else {
          this.resultsDiv.innerHTML = "no matches found.";
        }
      
        this.isSpinnerVisible = false;
      }
      
      
  
    addSearchHtml() {
      document.querySelector("body").insertAdjacentHTML('beforeend', `
              <div class="search-overlay">
                  <div class="search-overlay__top">
                      <div class="container">
                          <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                          <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="off" />
                          <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div class="container">
                      <div id="search-overlay__results"></div>
                  </div>
              </div>
          `);
    }
  }
  
  export default Search;
  