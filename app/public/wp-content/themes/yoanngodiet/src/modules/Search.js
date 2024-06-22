class Search {
    constructor(){
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

    events(){
        this.openButton.addEventListener("click", this.openOverlay.bind(this));
        this.closeButton.addEventListener("click", this.closeOverlay.bind(this));
        document.addEventListener("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.addEventListener("keyup", this.typingLogic.bind(this));
    }

    openOverlay(){
        this.searchOverlay.classList.add("search-overlay--active");
        document.body.classList.add("body-no-scroll");
        this.isOverlayOpened = true;
    }

    closeOverlay(){
        this.searchOverlay.classList.remove("search-overlay--active");
        document.body.classList.remove("body-no-scroll");
        this.isOverlayOpened = false;
    }

    keyPressDispatcher(event){
        if(event.key === "Escape" && this.isOverlayOpened){
            this.closeOverlay();
        } else if((event.key === "s" || event.key === "S") && !this.isOverlayOpened){
            const activeElement = document.activeElement;
            if (activeElement.tagName !== "INPUT" && activeElement.tagName !== "TEXTAREA") {
                this.openOverlay();
            }
        }
    }

    typingLogic(){
        if (this.searchField.value !== this.previousValue){
            clearTimeout(this.typingTimer);

            if(this.searchField.value !== ""){
                if(!this.isSpinnerVisible){
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

    getResults(){
        fetch("http://yoanngodiet.local/wp-json/wp/v2/posts?search=" + this.searchField.value)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(posts => {
                if (posts.length > 0) {
                    this.resultsDiv.innerHTML = `
                    <h1>${posts[0].title.rendered}</h1>
                    <p>${posts[0].content.rendered}</p>
                    `
                } else {
                    alert('No posts found.');
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
    
}

export default Search;
