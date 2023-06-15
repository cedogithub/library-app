// Define the Book class to create book objects
class Book {
  constructor(author, title, pages, read, id, image) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.image = image;
  }
}

// Select DOM elements
const booksContainer = document.querySelector(".books-container"); // Container element to display books
const newButton = document.querySelector(".new-book"); // Button to open the modal form
const modal = document.querySelector(".modal"); // Modal element
const closeButton = document.querySelector(".close"); // Close button inside the modal
const modalForm = document.querySelector(".modal form"); // Form element inside the modal

let myLibrary = []; // Array to store the books in the library

// Open the modal form when the "New Book" button is clicked
newButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal form when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal form when the user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form input values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value === "true"; // Convert the value to a boolean
  const id = Date.now(); // Generate a unique ID using the current timestamp

  // Get the selected image file if provided
  const imageInput = document.querySelector("#image");
  let image = "./book.png"; // Default empty image URL
  imageInput.classList.add("default-image");
  if (imageInput.files.length > 0) {
    const imageFile = imageInput.files[0];
    image = URL.createObjectURL(imageFile);
  }

  // Add the new book to the library
  addBookToLibrary(author, title, pages, read, id, image);

  // Clear the books container and display the updated library
  booksContainer.textContent = "";
  displayBooks(myLibrary);

  // Reset the form
  modalForm.reset();

  // Close the modal form
  modal.style.display = "none";
});

// Display the books in the library
const displayBooks = (library) => {
  booksContainer.innerHTML = "";

  library.forEach((book, index) => {
    // Create a card element for the book
    const card = document.createElement("div");
    card.classList.add("bookcard");

    // Create an image element for the book cover
    const coverElement = document.createElement("img");
    coverElement.classList.add("cover");
    if (book.image == "./book.png") coverElement.classList.add("default-image");
    coverElement.src = book.image; // Set the image source dynamically
    card.appendChild(coverElement);

    // Create a title element and set its text content
    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    // Create an author element and set its text content
    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);

    // Create a pages element and set its text content
    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);

    // Create a button for marking the book as read or not read
    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "Read" : "Not Read";
    readButton.classList.add("read-button");
    readButton.classList.add(book.read ? "read" : "not-read");

    readButton.addEventListener("click", () => {
      book.read = !book.read;
      readButton.textContent = book.read ? "Read" : "Not Read";
      readButton.classList.toggle("read");
      readButton.classList.toggle("not-read");
    });

    card.appendChild(readButton);

    // Create a remove button for deleting the book
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-id", index); // Use index as data-id
    removeButton.addEventListener("click", (e) => {
      const dataID = parseInt(e.target.getAttribute("data-id"));
      const result = myLibrary.filter((book, index) => index !== dataID);
      myLibrary = result;
      displayBooks(myLibrary);
    });

    card.appendChild(removeButton);

    // Append the book card to the books container
    booksContainer.appendChild(card);
  });
};

// Add a book to the library
function addBookToLibrary(author, title, pages, read, id, image) {
  const newBook = new Book(author, title, pages, read, id, image);
  myLibrary.push(newBook);
}

// Load the JSON data and process it
fetch("./books.json")
  .then((response) => response.json())
  .then((data) => {
    myLibrary = data.map((bookData) => {
      const { author, title, pages, read, id, image } = bookData; // Destructuring
      return new Book(author, title, pages, read, id, image);
    });

    // Display the books in the library
    displayBooks(myLibrary);
  });

// Function to add the "animate" class to random book cards after a delay
function animateRandomBookCard() {
  const bookCards = document.querySelectorAll(".bookcard");
  const randomBookCard =
    bookCards[Math.floor(Math.random() * bookCards.length)];

  randomBookCard.classList.add("animate");

  // Remove the "animate" class after a certain duration (e.g., 2 seconds)
  setTimeout(() => {
    randomBookCard.classList.remove("animate");
  }, 2000); // Adjust the duration
}

// Start the loop to animate random book cards
setInterval(animateRandomBookCard, 4000); // Adjust the delay between animations as needed
