import uvicorn
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI(title="Book Catalog API")


class Book(BaseModel):
    id: int
    title: str
    author: str


class BookCreate(BaseModel):
    title: str
    author: str


books = [
    Book(id=1, title="The Hobbit", author="J. R. R. Tolkien"),
    Book(id=2, title="Frankenstein", author="Mary Shelley"),
    Book(id=3, title="The Left Hand of Darkness", author="Ursula K. Le Guin"),
]


@app.get("/health")
def get_health():
    # TODO: Return a JSON object with the status "ok".
    return {"status": "not implemented"}


@app.get("/books")
def get_books():
    # TODO: Return the current list of books.
    return []


@app.get("/books/{book_id}")
def get_book(book_id: int):
    # TODO: Find and return the book with this ID.
    # Raise HTTPException with status code 404 when it does not exist.
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


@app.post("/books", status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate):
    # TODO: Assign a unique ID, create a Book, add it to the list, and return it.
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Not implemented")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)