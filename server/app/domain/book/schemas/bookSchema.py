from pydantic import BaseModel, constr

class BookCreate(BaseModel):
    title: constr(min_length=4)


class BookUpdate(BaseModel):
    status: str
