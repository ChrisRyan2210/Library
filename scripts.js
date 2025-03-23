//Library class
class Library {

    constructor(library = []) {
        if (!Array.isArray(library)) {
            throw new Error("Expected an array");
        }
        this.library = library;
    };
    
    getBooks() {
        return this.library;
    };

    addBookToLibrary(book) {

        this.library.push(book);
    };
};


//book class
class Book {

    constructor(bookID, author, title, pages, read) {
        if (!new.target) {
            throw Error("You must use the keword 'new'");
        }
        this.bookID = bookID;
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    };

    getBookID() {
        return this.bookID;
    };

    setBookID(bookID) {
        this.bookID = bookID;
    };

    getAuthor() {
        return this.author;
    };

    setAuthor(author) {
        this.author = author;
    };

    getTitle() {
        return this.title;
    };

    setTitle(title) {
        this.title = title;
    };

    getPages() {
        return this.pages;
    };

    setPages(pages) {
        this.pages = pages;
    }

    getRead() {
        return this.read;
    };

    setRead(value) {
        if (value === "Yes") {
            this.read = false;
        } else {
            this.read = true;
        }
    };
};

//testing - working :)
const book = new Book(crypto.randomUUID(), "Rowling", "Harry Potter", 255, true); 
console.log(book.getAuthor());

//testing - working (returning book object)
const myLibrary = new Library();
myLibrary.addBookToLibrary(book);
console.log(myLibrary.getBooks());





//function to loop through array and display books on webpage
const table = document.querySelector(".book-list");
myLibrary.forEach((book) => {
    const newRow = document.createElement("tr");//create a new row
    newRow.setAttribute("data-id", book.bookID); // setting the html dataset id attribute = to bookID
    //create a new td for each book property
    const bookID = book.bookID;
    const bookIDtd = document.createElement("td");
    bookIDtd.textContent = bookID;

    const author = book.author;
    const authortd = document.createElement("td");
    authortd.textContent = author;

    const title = book.title;
    const titletd = document.createElement("td");
    titletd.textContent = title;

    const pages = book.pages;
    const pagestd = document.createElement("td");
    pagestd.textContent = pages;

    const read = book.read ? "Yes" : "No";
    const readtd = document.createElement("td");
    readtd.setAttribute("data-id", book.bookID);
    readtd.textContent = read;

    const removetd = document.createElement("td");
    const btnRemove = document.createElement("input");
    btnRemove.type = "button";
    btnRemove.value = "Remove";
    btnRemove.addEventListener("click", () => {
        const bookID = newRow.dataset.id;//grabbing the html dataset id attribute 
        removeBook(bookID);
    });
    removetd.appendChild(btnRemove);

    const btnReadtd = document.createElement("td");
    const btnRead = document.createElement("input");
    btnRead.type = "button";
    btnRead.value = "Read Status";
    btnRead.addEventListener("click", () => {
        const bookID = readtd.dataset.id;//grabbing the html dataset id attribute 
        changeReadStatus(bookID);
    });
    btnReadtd.appendChild(btnRead);

    //append the td's to the tr
    newRow.appendChild(bookIDtd);
    newRow.appendChild(authortd);
    newRow.appendChild(titletd);
    newRow.appendChild(pagestd);
    newRow.appendChild(readtd);
    newRow.appendChild(removetd);
    newRow.appendChild(btnReadtd);
    // append row to table
    table.appendChild(newRow);
});







// bring up modal with button
const dialog = document.querySelector("#addBookDialog");
const btnCancel = document.querySelector("#cancel");
const btnAddBook = document.querySelector("#showModal");

btnAddBook.addEventListener("click", () => {
    dialog.showModal(); //shows the modal linked to the form method = "dialog";
});

//when the submit button in the form is clicked
const btnSubmit = document.querySelector("dialog"); //note we grab the form here, no the button itself
btnSubmit.addEventListener("submit", (e) => {

    e.preventDefault(); // stop the form from trying to send the data to the sever

    // dynamically grabbing info passed from form 
    const formData = new FormData(e.target); //FormData is built in function that grabs passed info from event object 
    const bookData = {};

    formData.forEach((value, key) => { // here, value = value entered by user, key = name of from propery (e.g. title, author, etc.)
        bookData[key] = value; //adding them to hash map
    });

    //create new book object using the hash map
    const newBook = new Book(crypto.randomUUID(), bookData.author, bookData.title, bookData.pages, bookData.read === "true");
    addBook(newBook);

    dialog.close();
});

btnCancel.addEventListener("click", () => {
    dialog.close();
});

// seprate function to just add the new book to the list
function addBook(book) {

    const table = document.querySelector(".book-list");

    const newRow = document.createElement("tr");//create a new row
    newRow.setAttribute("data-id", book.bookID); // setting the html dataset id attribute = to bookID
    //create a new td for each book property
    const bookID = book.bookID;
    const bookIDtd = document.createElement("td");
    bookIDtd.textContent = bookID;

    const author = book.author;
    const authortd = document.createElement("td");
    authortd.textContent = author;

    const title = book.title;
    const titletd = document.createElement("td");
    titletd.textContent = title;

    const pages = book.pages;
    const pagestd = document.createElement("td");
    pagestd.textContent = pages;

    const read = book.read ? "Yes" : "No";
    const readtd = document.createElement("td");
    readtd.setAttribute("data-id", book.booID);
    readtd.textContent = read;

    const removetd = document.createElement("td");
    const btnRemove = document.createElement("input");
    btnRemove.type = "button";
    btnRemove.value = "Remove";

    btnRemove.addEventListener("click", () => {
        const bookID = newRow.dataset.id;//grabbing the html dataset id attribute 
        removeBook(bookID);
    });
    removetd.appendChild(btnRemove);

    const btnReadtd = document.createElement("td");
    const btnRead = document.createElement("input");
    btnRead.type = "button";
    btnRead.value = "Read Status";
    btnRead.addEventListener("click", () => {
        const bookID = readtd.dataset.id;//grabbing the html dataset id attribute 
        changeReadStatus(bookID);
    });
    btnReadtd.appendChild(btnRead);

    //append the td's to the tr
    newRow.appendChild(bookIDtd);
    newRow.appendChild(authortd);
    newRow.appendChild(titletd);
    newRow.appendChild(pagestd);
    newRow.appendChild(readtd);
    newRow.appendChild(removetd);
    newRow.appendChild(btnReadtd);
    // append row to table
    table.appendChild(newRow);
};

function removeBook(bookID) {
    // Remove book from table
    const row = document.querySelector(`tr[data-id="${bookID}"]`); // Select the row based on the data-id
    if (row) { //check if exists always
        row.remove(); // Remove the row from the DOM
    }

    // Remove book from the array
    const index = myLibrary.findIndex(book => book.bookID === bookID);
    if (index !== -1) {
        myLibrary.splice(index, 1); // Remove the book from the array
    }
};

function changeReadStatus(bookID) {
    // Find the book object in the array
    const book = myLibrary.find(book => book.bookID === bookID);

    if (book) {
        // Toggle the book's read status
        book.read = !book.read; // If true, set to false; if false, set to true

        // Find the corresponding table row and 'read' column
        const row = document.querySelector(`tr[data-id="${bookID}"]`);
        const readTD = row.querySelector('td:nth-child(5)'); // Find the 5th column (read column)

        // Update the 'read' column text
        readTD.textContent = book.read ? "Yes" : "No";
    }
}


