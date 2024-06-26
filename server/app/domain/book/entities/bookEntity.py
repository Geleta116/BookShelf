from dataclasses import dataclass
from uuid import UUID, uuid4
from app.domain.book.valueObjects.bookStatus import BookStatus


@dataclass
class Book:
    id: int
    title: str
    status: BookStatus
