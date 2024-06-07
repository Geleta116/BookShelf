from dotenv import load_dotenv
import os
from typing import List
import psycopg2

from app.domain.book.entities.bookEntity import Book
from app.domain.book.dtos.bookDTO import BookCreate, BookUpdate
from app.domain.book.valueObjects.bookStatus import BookStatus

in_docker = os.getenv("IN_DOCKER", "false").lower() == "true"

db_name = os.getenv("DB_NAME", "postgres")
db_user = os.getenv("DB_USER", "postgres")
db_password = os.getenv("DB_PASSWORD", "postgres")
db_host = os.getenv("DB_HOST", "localhost") if not in_docker else "DATABASE"
db_port = os.getenv("DB_PORT", "5432")

class BookRepository:
    def __init__(self):
        self.conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        self.conn.autocommit = True
        self.cur = self.conn.cursor()

    def create_book(self, book: BookCreate) -> Book:
       
        self.cur.execute(
            "INSERT INTO books (title, status) VALUES ( %s, %s) RETURNING id, title, status",
            (book.title, BookStatus.TO_READ.value)
        )
        id, title, status = self.cur.fetchone()
        return Book(id=id, title=title, status=BookStatus(status))

    def get_books(self) -> List[Book]:
        self.cur.execute("SELECT id, title, status FROM books")
        rows = self.cur.fetchall()
        return [Book(id=row[0], title=row[1], status=BookStatus(row[2])) for row in rows]
    
    def get_book_by_id(self, book_id: int) -> Book:
        self.cur.execute(
        "SELECT id, title, status FROM books WHERE id = %s",
        (book_id,)
        )
        book_data = self.cur.fetchone()
        if book_data:
            id, title, status = book_data
            return Book(id=id, title=title, status=BookStatus(status))
        else:
            return None

    def update_book(self, book_id: int, bookStatus: BookUpdate) -> Book:
        book_to_update = self.get_book_by_id(book_id)
        if not book_to_update:
            return None
        self.cur.execute(
            "UPDATE books SET status = %s WHERE id = %s RETURNING id, title, status",
            (bookStatus.status.value, book_id)
        )
        id, title, status = self.cur.fetchone()
        return Book(id=id, title=title, status=status)

    def delete_book(self, book_id: int):
        book_to_delete = self.get_book_by_id(book_id)
        if not book_to_delete:
            return None
        
        self.cur.execute("DELETE FROM books WHERE id = %s", (book_id,))
        return book_to_delete
