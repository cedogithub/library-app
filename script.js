// Define the Book class to create book objects
class Book {
  constructor(author, title, pages, read, id) {
    this.author = author; // Author of the book
    this.title = title; // Title of the book
    this.pages = pages; // Number of pages in the book
    this.read = read; // Whether the book has been read or not
    this.id = id; // Unique identifier for the book
  }
}

// Select DOM elements
const booksContainer = document.querySelector(".books-container"); // Container element to display books
const form = document.querySelector("form"); // Form element for adding new books
const newButton = document.querySelector(".new-book"); // Button to toggle visibility of the form

// Create initial book objects
const book1 = new Book("James", "Game of Thrones", 1, true, 291); // Sample book object
const book2 = new Book("George", "Breaking Bad", 1, true, 129); // Sample book object
let myLibrary = [book1, book2]; // Array to store the books in the library

// Toggle form visibility when the "New Book" button is clicked
newButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form input values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const id = Date.now(); // Generate a unique ID using the current timestamp

  // Add the new book to the library
  addBookToLibrary(author, title, pages, read, id);

  // Clear the books container and display the updated library
  booksContainer.textContent = "";
  displayBooks(myLibrary);
});

// Display the books in the library
const displayBooks = (library) => {
  booksContainer.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const card = document.createElement("div");
    card.classList.add("bookcard");

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    const readElement = document.createElement("p");
    readElement.classList.add("read");
    readElement.textContent = `Read: ${book.read ? "Yes" : "No"}`;
    card.appendChild(readElement);

    // Create a checkbox for marking the book as read or unread
    let read = document.createElement("input");
    read.type = "checkbox";
    read.checked = book.read;

    read.addEventListener("change", (e) => {
      book.read = e.target.checked;
      // Find the parent book card element with the "closest()" method
      const bookCard = e.target.closest(".bookcard");

      // Find the read status element within the current book card
      const readStatus = bookCard.querySelector(".read");
      readStatus.textContent = `Read: ${book.read ? "Yes" : "No"}`;
    });

    card.appendChild(read);

    // Create a remove button for deleting the book
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-id", i);
    removeButton.addEventListener("click", (e) => {
      const dataID = parseInt(e.target.getAttribute("data-id"));
      const result = myLibrary.filter((book, index) => index !== dataID);
      myLibrary = result;
      displayBooks(myLibrary);
    });

    card.appendChild(removeButton);

    // Append the book card to the books container
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
