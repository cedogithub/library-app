class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}
//Global variables and buttons
let booksContainer = document.querySelector(".books-container");
let book1 = new Book("author", "title", 1, true);
let book2 = new Book("spider", "man", 1, true);
let myLibrary = [book1, book2];
let form = document.querySelector("form");
let newButton = document.querySelector(".new-book");

newButton.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pages = document.querySelector('#pages').value
  const read = document.querySelector('#read').checked
  addBookToLibrary(title, author, pages, read);
});

//Displays the current list of books into the page
let displayBooks = () => {
  let bookDiv = document.createElement("div");
  booksContainer.appendChild(bookDiv);
  console.log(booksContainer);
  for (let book of myLibrary) {
    let html = `<ul>
    <li>Author: ${book.author}</li>
    <li>title: ${book.title}</li>
    <li>pages: ${book.pages}</li>
    <li>read: ${book.read}</li>
    </ul>
    <button>remove</button>
    <button>read</button>`;
    bookDiv.insertAdjacentHTML("beforeend", html);
  }
};

displayBooks();
//Takes a user's input and adds his new book to the library 
function addBookToLibrary(author, title, pages, read) {
  let newBook = new Book(author, title, pages,read);
  myLibrary.push(newBook);
  console.log(myLibrary)

}
