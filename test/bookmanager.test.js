// Path require sudah benar, yaitu menunjuk ke folder induk (naik satu level)
const Book = require('../book');
const BookManager = require('../bookmanager');

describe('BookManager', () => {
    let bookManager;
    let book1;
    let book2;
    let book3;

    // Fungsi ini dijalankan sebelum setiap test case
    beforeEach(() => {
        bookManager = new BookManager();
        book1 = new Book('Clean Code', 'Robert C. Martin', 2008);
        book2 = new Book('The Pragmatic Programmer', 'Andrew Hunt', 2001);
        book3 = new Book('Code Complete', 'Steve McConnell', 2004);
    });

    // --- Grup tes untuk method addBook() ---
    describe('addBook', () => {
        test('should add a book successfully to the collection', () => {
            bookManager.addBook(book1);
            expect(bookManager.getAllBooks()).toHaveLength(1);
            expect(bookManager.getAllBooks()).toContain(book1);
        });

        test('should throw an error if the object is not a Book instance', () => {
            expect(() => {
                bookManager.addBook({ title: 'Fake Book', author: 'Faker', year: 2022 });
            }).toThrow('Only Book objects can be added');
        });
    });

    // --- Grup tes untuk method removeBook() ---
    describe('removeBook', () => {
        beforeEach(() => {
            bookManager.addBook(book1);
            bookManager.addBook(book2);
        });

        test('should remove an existing book and return true', () => {
            const result = bookManager.removeBook('Clean Code');
            expect(result).toBe(true);
            expect(bookManager.getAllBooks()).toHaveLength(1);
            expect(bookManager.getAllBooks()).not.toContain(book1);
        });

        test('should return false if the book to remove is not found', () => {
            const result = bookManager.removeBook('Non Existent Book');
            expect(result).toBe(false);
            expect(bookManager.getAllBooks()).toHaveLength(2);
        });

        test('should throw an error if title is null or empty', () => {
            expect(() => bookManager.removeBook(null)).toThrow('Title cannot be null or empty');
        });
    });

    // --- Grup tes untuk method findBooksByAuthor() ---
    describe('findBooksByAuthor', () => {
        beforeEach(() => {
            bookManager.addBook(book1); // Author: Robert C. Martin
            bookManager.addBook(book2);
        });

        test('should return all books by a specific author', () => {
            const foundBooks = bookManager.findBooksByAuthor('Robert C. Martin');
            expect(foundBooks).toHaveLength(1);
            expect(foundBooks[0]).toEqual(book1);
        });

        test('should return an empty array if no books are found for an author', () => {
            const foundBooks = bookManager.findBooksByAuthor('Unknown Author');
            expect(foundBooks).toHaveLength(0);
        });
    });

    // --- Grup tes untuk method getAllBooks() ---
    describe('getAllBooks', () => {
        test('should return all books in the collection', () => {
            bookManager.addBook(book1);
            bookManager.addBook(book2);
            expect(bookManager.getAllBooks()).toHaveLength(2);
        });

        test('should return an empty array when no books have been added', () => {
            expect(bookManager.getAllBooks()).toHaveLength(0);
        });
    });
});