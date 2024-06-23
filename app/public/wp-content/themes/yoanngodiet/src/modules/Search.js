class Search {
    // 1. describe and create/initiate our object
    constructor() {
      this.addSearchHTML();
      this.resultsDiv = document.getElementById("search-overlay__results");
      this.openButtons = document.querySelectorAll(".js-search-trigger");
      this.closeButton = document.querySelector(".search-overlay__close");
      this.searchOverlay = document.querySelector(".search-overlay");
      this.searchField = document.getElementById("search-term");
      this.events();
      this.isOverlayOpen = false;
      this.isSpinnerVisible = false;
      this.previousValue = "";
      this.typingTimer = null;
    }
  
    // 2. events
    events() {
      this.openButtons.forEach(button => button.addEventListener("click", this.openOverlay.bind(this)));
      this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
      document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
      this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
    }
  
    // 3. methods (function, action...)
    typingLogic() {
      if (this.searchField.value !== this.previousValue) {
        clearTimeout(this.typingTimer);
  
        if (this.searchField.value) {
          if (!this.isSpinnerVisible) {
            this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
            this.isSpinnerVisible = true;
          }
          this.typingTimer = setTimeout(this.getResults.bind(this), 750);
        } else {
          this.resultsDiv.innerHTML = "";
          this.isSpinnerVisible = false;
        }
      }
  
      this.previousValue = this.searchField.value;
    }
  
    getResults() {
      fetch(`${universityData.root_url}/wp-json/university/v1/search?term=${this.searchField.value}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(results => {
          results.generalInfo = results.generalInfo || [];
          results.professors = results.professors || [];
          results.programs = results.programs || [];
          results.campuses = results.campuses || [];
          results.events = results.events || [];
  
          this.resultsDiv.innerHTML = `
            <div class="row">
              <div class="one-third">
                <h2 class="search-overlay__section-title">General Information</h2>
                ${results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>"}
                  ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType === "post" ? `by ${item.authorName}` : ""}</li>`).join("")}
                ${results.generalInfo.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Programs</h2>
                ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                  ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                ${results.programs.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Professors</h2>
                ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
                  ${results.professors.map(item => `
                    <li class="professor-card__list-item">
                      <a class="professor-card" href="${item.permalink}">
                        <img class="professor-card__image" src="${item.image}">
                        <span class="professor-card__name">${item.title}</span>
                      </a>
                    </li>
                  `).join("")}
                ${results.professors.length ? "</ul>" : ""}
              </div>
              <div class="one-third">
                <h2 class="search-overlay__section-title">Campuses</h2>
                ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                  ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                ${results.campuses.length ? "</ul>" : ""}
  
                <h2 class="search-overlay__section-title">Events</h2>
                ${results.events.length ? "" : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
                  ${results.events.map(item => `
                    <div class="event-summary">
                      <a class="event-summary__date t-center" href="${item.permalink}">
                        <span class="event-summary__month">${item.month}</span>
                        <span class="event-summary__day">${item.day}</span>  
                      </a>
                      <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                        <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                      </div>
                    </div>
                  `).join("")}
              </div>
            </div>
          `;
          this.isSpinnerVisible = false;
        })
        .catch(error => console.error('Error fetching results:', error));
    }
  
    keyPressDispatcher(e) {
      if (e.keyCode === 83 && !this.isOverlayOpen && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        this.openOverlay();
      }
  
      if (e.keyCode === 27 && this.isOverlayOpen) {
        this.closeOverlay();
      }
    }
  
    openOverlay() {
      this.searchOverlay.classList.add("search-overlay--active");
      document.body.classList.add("body-no-scroll");
      this.searchField.value = "";
      setTimeout(() => this.searchField.focus(), 301);
      console.log("Our open method just ran!");
      this.isOverlayOpen = true;
    }
  
    closeOverlay() {
      this.searchOverlay.classList.remove("search-overlay--active");
      document.body.classList.remove("body-no-scroll");
      console.log("Our close method just ran!");
      this.isOverlayOpen = false;
    }
  
    addSearchHTML() {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="search-overlay">
          <div class="search-overlay__top">
            <div class="container">
              <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
              <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
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
  