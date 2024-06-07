from pydantic import BaseModel, constr

from app.domain.book.valueObjects.bookStatus import BookStatus


class BookCreate(BaseModel):
    title: constr(min_length=4)


class BookUpdate(BaseModel):
    status: BookStatus
