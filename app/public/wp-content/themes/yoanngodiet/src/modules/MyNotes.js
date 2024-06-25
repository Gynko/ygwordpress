class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    document.getElementById("my-notes").addEventListener("click", (event) => {
      if (event.target.closest(".delete-note")) this.deleteNote(event);
      if (event.target.closest(".edit-note")) this.editNote.bind(this)(event);
      if (event.target.closest(".update-note"))
        this.updateNote.bind(this)(event);
    });

    document
      .querySelector(".submit-note")
      .addEventListener("click", this.createNote.bind(this));
  }

  async createNote(event) {
    const newPost = {
      title: document.querySelector(".new-note-title").value,
      content: document.querySelector(".new-note-body").value,
      status: "private",
    };

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": universityData.nonce,
          },
          body: JSON.stringify(newPost),
        },
      );
      const data = await response.json();

      if (response.ok) {
        document.querySelector(".new-note-title").value = "";
        document.querySelector(".new-note-body").value = "";

        const noteItem = document.createElement("li");
        noteItem.dataset.id = data.id;
        noteItem.innerHTML = `
            <input readonly class="note-title-field" value="${data.title.raw}">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
            <textarea readonly class="note-body-field">${data.content.raw}</textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
          `;
        document.getElementById("my-notes").prepend(noteItem);
        noteItem.style.display = "none";
        noteItem.offsetHeight; // Trigger reflow
        noteItem.style.display = "block";
      } else if (data.responseText === "You have reached your note limit.") {
        console.log("nope");
        document.querySelector(".note-limit-message").classList.add("active");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async updateNote(event) {
    const thisNote = event.target.closest("li");
    const updatedPost = {
      title: thisNote.querySelector(".note-title-field").value,
      content: thisNote.querySelector(".note-body-field").value,
    };

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": universityData.nonce,
          },
          body: JSON.stringify(updatedPost),
        },
      );
      const data = await response.json();

      if (response.ok) {
        this.makeNoteReadonly(thisNote);
        console.log(data);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  editNote(event) {
    const thisNote = event.target.closest("li");
    if (thisNote.dataset.state === "editable") {
      this.makeNoteReadonly(thisNote);
    } else {
      this.makeNoteEditable(thisNote);
    }
  }

  async deleteNote(event) {
    const thisNote = event.target.closest("li");

    try {
      const response = await fetch(
        `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
        {
          method: "DELETE",
          headers: {
            "X-WP-Nonce": universityData.nonce,
          },
        },
      );
      const data = await response.json();

      if (response.ok) {
        thisNote.style.display = "none";
        if (data.userNoteCount < 5) {
          document
            .querySelector(".note-limit-message")
            .classList.remove("active");
        }
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  makeNoteEditable(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.removeAttribute("readonly");
        field.classList.add("note-active-field");
      });
    thisNote.querySelector(".edit-note").innerHTML =
      '<i class="fa fa-times" aria-hidden="true"></i>Cancel';
    thisNote
      .querySelector(".update-note")
      .classList.add("update-note--visible");
    thisNote.dataset.state = "editable";
  }

  makeNoteReadonly(thisNote) {
    thisNote
      .querySelectorAll(".note-title-field, .note-body-field")
      .forEach((field) => {
        field.setAttribute("readonly", "readonly");
        field.classList.remove("note-active-field");
      });
    thisNote.querySelector(".edit-note").innerHTML =
      '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';
    thisNote
      .querySelector(".update-note")
      .classList.remove("update-note--visible");
    thisNote.dataset.state = "cancel";
  }
}

export default MyNotes;
