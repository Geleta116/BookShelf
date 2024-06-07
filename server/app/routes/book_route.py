from typing import List
from fastapi import APIRouter, HTTPException, status
from app.domain.book.entities.bookEntity import Book
from app.infrastructre.bookRepository import BookRepository
from app.domain.book.schemas.bookSchema import BookCreate, BookUpdate


book_router = APIRouter()
repo = BookRepository()


@book_router.post("/books", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate):
    return repo.create_book(book)


@book_router.get("/books", response_model=List[Book], status_code=status.HTTP_200_OK)
def get_books():
    return repo.get_books()


@book_router.get(
    "/books/{book_id}", response_model=Book, status_code=status.HTTP_200_OK
)
def get_book(book_id: int):
    found_book = repo.get_book_by_id(book_id)
    if not found_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return found_book


@book_router.put(
    "/books/{book_id}", response_model=Book, status_code=status.HTTP_200_OK
)
def update_book(book_id: int, book: BookUpdate):
    updatedBook = repo.update_book(book_id, book)
    if not update_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return updatedBook


@book_router.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int):
    deletedBook = repo.delete_book(book_id)
    if deletedBook is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"}
