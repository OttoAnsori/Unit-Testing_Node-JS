class Book {
    constructor(title, author, year) {
        if (!title || !title.trim()) {
            throw new Error("Title cannot be null or empty");
        }
        if (!author || !author.trim()) {
            throw new Error("Author cannot be null or empty");
        }
        if (typeof year !== 'number' || !(year >= 2000 && year <= 2100)) {
            throw new Error("Year must be a number between 2000 and 2100");
        }
        this.title = title.trim();
        this.author = author.trim();
        this.year = year;
    }
}

module.exports = Book;