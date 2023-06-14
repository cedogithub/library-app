// Define the Book class to create book objects
class Book {
  constructor(author, title, pages, read, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

// Select DOM elements
const booksContainer = document.querySelector(".books-container");
const form = document.querySelector("form");
const newButton = document.querySelector(".new-book");

// Create initial book objects
const book1 = new Book("James", "Game of Thrones", 1, true, 291);
const book2 = new Book("George", "Breaking Bad", 1, true, 129);
let myLibrary = [book1, book2];

// Toggle form visibility when the "New Book" button is clicked
newButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const id = Date.now();

  addBookToLibrary(author, title, pages, read, id);
  booksContainer.textContent = '';
  displayBooks(myLibrary);
});

// Display the books in the library
const displayBooks = (library) => {
  booksContainer.innerHTML = '';

  for (const [index, book] of library.entries()) {
    const card = document.createElement("div");
    card.classList.add('bookcard');

    card.appendChild(document.createTextNode(`Title: ${book.title}, `));
    card.appendChild(document.createTextNode(`Author: ${book.author}, `));
    card.appendChild(document.createTextNode(`Pages: ${book.pages}, `));
    card.appendChild(document.createTextNode(`Read: ${book.read}`));

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.setAttribute('data-id', index);
    removeButton.addEventListener('click', (e) => {
      const dataID = parseInt(e.target.getAttribute('data-id'));
      const result = myLibrary.filter((_, i) => i !== dataID);
      myLibrary = result;
      displayBooks(myLibrary);
    });

    card.appendChild(removeButton);
    booksContainer.appendChild(card);
  }
};

// Add a book to the library
function addBookToLibrary(author, title, pages, read, id) {
  const newBook = new Book(author, title, pages, read, id);
  myLibrary.push(newBook);
}

// Display the initial set of books
displayBooks(myLibrary);
