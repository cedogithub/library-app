class Book {
  constructor(author, title, pages, read,id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}
// Global variables and buttons
let booksContainer = document.querySelector(".books-container");
let book1 = new Book("James", "game of thrones", 1, true,291);
let book2 = new Book("Goerge", "breaking bad", 1, true,129);
let myLibrary = [book1, book2];
let form = document.querySelector("form");
let newButton = document.querySelector(".new-book");

// Adding a new book to the list 
newButton.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
});
// Adding the form values into the library 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector('#title').value
  let author = document.querySelector('#author').value
  let pages = document.querySelector('#pages').value
  let read = document.querySelector('#read').checked
  let id = Date.now();

  console.log(id)

  addBookToLibrary(title, author, pages, read,id);
  booksContainer.textContent =''
  displayBooks(myLibrary);
});

// Displays the current list of books into the page
let displayBooks = (library) => {
  let bookDiv = document.createElement("div");
  let bookIndex = 0;
  
  for (let book of library) {
    let card = document.createElement("div");
    card.classList.add('bookcard');

    let title = document.createTextNode('title: ' + book.title + ', ');
    card.appendChild(title);

    let author = document.createTextNode('author: ' + book.author + ', ');
    card.appendChild(author);

    let pages = document.createTextNode('pages: ' + book.pages + ', ');
    card.appendChild(pages);

    let read = document.createTextNode(' read: ' + book.read);
    card.appendChild(read);

    let removeButton = document.createElement('button')
    removeButton.textContent= 'remove'
    removeButton.setAttribute('data-id', bookIndex++)
    removeButton.addEventListener('click',(e)=>{
      let dataID = e.target.getAttribute("data-id");
      console.log(dataID);
      let result = myLibrary.filter((book,index)=> index != dataID );
      console.log(result)
      booksContainer.textContent =''

   displayBooks(result);
    })
    card.appendChild(removeButton)

    booksContainer.appendChild(card);
  }
};
displayBooks(myLibrary);
// Takes a user's input and adds his new book to the library 
function addBookToLibrary(author, title, pages, read) {
  let newBook = new Book(author, title, pages,read);
  myLibrary.push(newBook);
}