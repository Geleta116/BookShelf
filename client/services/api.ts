const api = "http://localhost:8000/books";

export const addBookApi = async (bookTitle: string) => {
  const response = await fetch(`${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: bookTitle }),
  });

  if (!response.ok) {
    throw new Error("Failed to create the book");
  }

  const newBook = await response.json();
  return newBook;
};

export const updateBookStatusApi = async (
  bookId: string,
  newStatus: string
) => {
  const response = await fetch(`${api}/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the book status");
  }

  const updatedBook = await response.json();
  return updatedBook;
};

export const getAllBooksApi = async () => {
  const response = await fetch(`${api}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to Fetch Books");
  }

  const books = await response.json();
  return books;
};


export const deleteBookApi = async(bookId: string) => {
   const response =  await fetch(`${api}/${bookId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok){
    throw new Error("Failed to Delete Book")
  }
 return;
}