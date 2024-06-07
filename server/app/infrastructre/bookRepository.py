from dotenv import load_dotenv
import os
from typing import List
from app.domain.book.entities.bookEntity import Book
from app.domain.book.schemas.bookSchema import BookCreate, BookUpdate
import psycopg2


load_dotenv()

class BookRepository:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST", "localhost"),  
            port="5432"
        )
        self.conn.autocommit = True
        self.cur = self.conn.cursor()

    def create_book(self, book: BookCreate) -> Book:
        self.cur.execute(
            "INSERT INTO books (title, status) VALUES (%s, %s) RETURNING id, title, status",
            (book.title, "to-read")
        )
        id, title, status = self.cur.fetchone()
        return Book(id=id, title=title, status=status)

    def get_books(self) -> List[Book]:
        self.cur.execute("SELECT id, title, status FROM books")
        rows = self.cur.fetchall()
        return [Book(id=row[0], title=row[1], status=row[2]) for row in rows]
    
    def get_book_by_id(self, book_id: int) -> Book:
        self.cur.execute(
        "SELECT id, title, status FROM books WHERE id = %s",
        (book_id,)
        )
        book_data = self.cur.fetchone()
        if book_data:
            id, title, status = book_data
            return Book(id=id, title=title, status=status)
        else:
            return None

    def update_book(self, book_id: int, book: BookUpdate) -> Book:
        book_to_update = self.get_book_by_id(book_id)
        if not book_to_update:
            return None
        self.cur.execute(
            "UPDATE books SET status = %s WHERE id = %s RETURNING id, title, status",
            (book.status, book_id)
        )
        id, title, status = self.cur.fetchone()
        return Book(id=id, title=title, status=status)

    def delete_book(self, book_id: int):
        book_to_delete = self.get_book_by_id(book_id)
        if not book_to_delete:
            return None
        
        self.cur.execute("DELETE FROM books WHERE id = %s", (book_id,))
        return book_to_delete
