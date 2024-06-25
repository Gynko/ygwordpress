class Like {
  constructor() {
    this.events();
  }

  events() {
    document.querySelectorAll(".like-box").forEach((likeBox) => {
      likeBox.addEventListener("click", this.ourClickDispatcher.bind(this));
    });
  }

  ourClickDispatcher(event) {
    const currentLikeBox = event.target.closest(".like-box");

    if (currentLikeBox.getAttribute("data-exists") === "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  async createLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "POST",
          headers: {
            "X-WP-Nonce": universityData.nonce,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            professorId: currentLikeBox.dataset.professor,
          }),
        },
      );

      const data = await response.json();
      currentLikeBox.setAttribute("data-exists", "yes");
      let likeCount = parseInt(
        currentLikeBox.querySelector(".like-count").innerHTML,
        10,
      );
      likeCount++;
      currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
      currentLikeBox.setAttribute("data-like", data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteLike(currentLikeBox) {
    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/university/v1/manageLike`,
        {
          method: "DELETE",
          headers: {
            "X-WP-Nonce": universityData.nonce,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            like: currentLikeBox.getAttribute("data-like"),
          }),
        },
      );

      await response.json();
      currentLikeBox.setAttribute("data-exists", "no");
      let likeCount = parseInt(
        currentLikeBox.querySelector(".like-count").innerHTML,
        10,
      );
      likeCount--;
      currentLikeBox.querySelector(".like-count").innerHTML = likeCount;
      currentLikeBox.setAttribute("data-like", "");
    } catch (error) {
      console.error(error);
    }
  }
}

export default Like;
