import { create } from "zustand";
import {
  addBookApi,
  deleteBookApi,
  getAllBooksApi,
  updateBookStatusApi,
} from "@/services/api";

interface BookStore {
  books: Book[];
  error: string;
  addBook: (bookTitle: string) => Promise<void>;
  updateBookStatus: (bookId: string, newStatus: string) => Promise<void>;
  getBooks: () => Promise<void>;
  deleteBooks: (bookId: string) => Promise<void>;
}

const useBookStore = create<BookStore>((set) => ({
  books: [],
  addBook: async (bookTitle) => {
    try {
      const newBook = await addBookApi(bookTitle);
      set((state) => ({ books: [...state.books, newBook] }));
    } catch (error: any) {
      set((state) => ({ error: error.message }));
    }
  },

  updateBookStatus: async (bookId, newStatus) => {
    try {
      await updateBookStatusApi(bookId, newStatus);
      set((state) => ({
        error: "",
        books: state.books.map((book) =>
          book.id === bookId ? { ...book, status: newStatus } : book
        ),
      }));
    } catch (error: any) {
      
      set((state) => ({ error: error.message }));
    }
  },

  getBooks: async () => {
    try {
      const booklist = await getAllBooksApi();

      set({
        error: "",
        books: [...booklist],
      });
    } catch (error: any) {
      set((state) => ({ error: error.message }));
    }
  },

  deleteBooks: async (bookId: string) => {
    try {
      await deleteBookApi(bookId);
      set((state) => ({
        error: "",
        books: state.books.filter((book) => book.id !== bookId),
      }));
    } catch (error: any) {
      set((state) => ({ error: error.message }));
    }
  },
  error: "",
}));

export default useBookStore;
