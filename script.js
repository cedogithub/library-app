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
const sortDropdown = document.querySelector("#sort-dropdown"); // Dropdown element for sorting
console.log(sortDropdown);

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
// Sorting the books by author,title,pages and read status
sortDropdown.addEventListener("change", () => {
  const selectedOption = sortDropdown.value;

  switch (selectedOption) {
    case "author":
      myLibrary.sort((a, b) => a.author.localeCompare(b.author)); // Sort by author name
      break;
    case "title":
      myLibrary.sort((a, b) => a.title.localeCompare(b.title)); // Sort by book title
      break;
    case "pages":
      myLibrary.sort((a, b) => a.pages - b.pages); // Sort by number of pages
      break;
    case "read":
      myLibrary.sort((a, b) => b.read - a.read); // Sort by read status
      break;
    case "not-read":
      myLibrary.sort((a, b) => a.read - b.read); // Sort by not-read status
      break;
    default:
      // Handle unknown or default option
      break;
  }
  // Clear the books container and display the sorted library
  booksContainer.textContent = "";
  displayBooks(myLibrary);
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
    // Create a div container for the book card
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    // Create a div container for CRUD actions
    const crudContainer = document.createElement("div");
    crudContainer.classList.add("crud-container", "hidden");

    // Create an icon element for the trash can
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash-can", "fa-light", "fa-lg"); // Added "fa-lg" class for larger size
    trashIcon.style.color = "#000000";
    crudContainer.appendChild(trashIcon);

    // Add event listener to the trash icon for remove functionality
    trashIcon.addEventListener("click", () => {
      const result = myLibrary.filter((book, idx) => idx !== index);
      myLibrary = result;
      displayBooks(myLibrary);
    });

    // Create an icon element for the edit button
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-pen-to-square", "fa-lg");
    editIcon.style.color = "#000000";
    crudContainer.appendChild(editIcon);

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
    readButton.textContent = book.read ? "Read ✓" : "Not Read";
    readButton.classList.add("read-button");
    readButton.classList.add(book.read ? "read" : "not-read");

    readButton.addEventListener("click", () => {
      book.read = !book.read;
      readButton.textContent = book.read ? "Read ✓" : "Not Read";
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

    // Append the CRUD container to the card container
    cardContainer.appendChild(crudContainer);

    // Append the book card to the card container
    cardContainer.appendChild(card);

    // Append the card container to the books container
    booksContainer.appendChild(cardContainer);
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
setInterval(animateRandomBookCard, 4000); // Adjust the delay between animations
