import BookCard from "../Card/BookCard";
interface BookColumnProps {
  books: Book[];
  alignment: string;
}

export const BookColumn: React.FC<BookColumnProps> = ({ books, alignment }) => (
  <div className="flex flex-col w-1/3  max-h-screen items-center overflow-y-auto w-full ">
    {books.map((book) => (
      <BookCard key={book.id} book={book} alignment={alignment} />
    ))}
  </div>
);
