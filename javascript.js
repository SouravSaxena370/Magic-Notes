console.log("connected");
showNotes();


// adding note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let enteredText = document.getElementById("enteredText");
  let enteredTitle = document.getElementById("enteredTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  }
  else {
    notesArray = JSON.parse(notes);
  }
  let notesObj = {
    title: enteredTitle.value,
    text: enteredText.value
  };
  notesArray.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  showNotes();
  enteredText.value = "";
  enteredTitle.value = "";
});


//showing notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let html = "";
  notesArray.forEach(function (element, index) {
    html += `<div class="noteItem">
        <h4>${element.title}</h4>
        <p>${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
        </div>`;
  });
  let noteContainer = document.getElementById("noteItems");
  if (notesArray.length != 0) {
    noteContainer.innerHTML = html;
  } else {
    noteContainer.innerHTML = `Nothing to show! Add note from above`;
  }
}

//deleting note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  showNotes();
}

//searching note
let searchText = document.getElementById("search");
searchText.addEventListener("input", function () {
  let text = searchText.value.toLowerCase();
  let notes = document.getElementsByClassName("noteItem");
  Array.from(notes).forEach(function (element) {
    let para = element.getElementsByTagName("p")[0];
    let title = element.getElementsByTagName("h4")[0];
    if (para.innerText.toLowerCase().includes(text) || title.innerText.toLowerCase().includes(text)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})

