const Book = require('./book');

class BookManager {
    constructor() {
        this._books = [];
    }

    addBook(book) {
        if (!(book instanceof Book)) {
            throw new Error("Only Book objects can be added");
        }
        this._books.push(book);
    }

    getAllBooks() {
        return [...this._books];
    }

    removeBook(title) {
        if (!title || !title.trim()) {
            throw new Error("Title cannot be null or empty");
        }
        const initialCount = this._books.length;
        this._books = this._books.filter(b => b.title.toLowerCase() !== title.trim().toLowerCase());
        return this._books.length < initialCount;
    }

    findBooksByAuthor(author) {
        if (!author || !author.trim()) {
            throw new Error("Author cannot be null or empty");
        }
        return this._books.filter(b => b.author.toLowerCase() === author.trim().toLowerCase());
    }
}

module.exports = BookManager;