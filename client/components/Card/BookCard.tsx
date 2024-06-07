import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoveBookButton from "../Button/MoveBook";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { deleteBookApi } from "@/services/api";
import useBookStore from "@/store/book.store";

interface BookCardProps {
  book: Book;
  alignment: string;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  alignment,
}: BookCardProps) => {
  const { id, title, status } = book;
  const deleteBook = useBookStore((state) => state.deleteBooks);

  const handleDelete = async (bookId: string) => {
    await deleteBook(bookId);
  };
  return (
    <div
      className="block w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2 text-center break-words"
      key={id}
    >
      <div className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row ">
        <p className="mx-2">Move Book to:</p>
        <div className="flex flex-row">
          <MoveBookButton bookId={id} alignment={alignment} />
          <Button onClick={() => handleDelete(id)} className="bg-red-500 mx-2">
            <MdDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
