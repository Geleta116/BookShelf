"use client";
import AddBookButton from "@/components/Button/AddButton";
import BookCard from "@/components/Card/BookCard";
import { BookColumn } from "@/components/Columns/BookColumn";
import { AddBookForm } from "@/components/Input/AddBook";
import { Separator } from "@/components/ui/separator";
import useBookStore from "@/store/book.store";
import React, { useEffect, useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { TbProgressCheck } from "react-icons/tb";
import { GiFinishLine } from "react-icons/gi";
import { ToastDestructive } from "@/components/Toast/ErrorToast";
import { ThemeToggleButton } from "@/components/Button/ThemeToggleButton";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function Home() {
  const books = useBookStore((state) => state.books);
  const getBooks = useBookStore((state) => state.getBooks);
  const error = useBookStore((store) => store.error);
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      await getBooks();
    };
    fetchBooks();
  }, [getBooks]);

  const toReadBooks = books.filter((book) => book.status === "to-read");
  const inProgressBooks = books.filter((book) => book.status === "in-progress");
  const completedBooks = books.filter((book) => book.status === "completed");

  const columns = [
    { title: "To Read", icon: <LuListTodo />, books: toReadBooks },
    { title: "In Progress", icon: <TbProgressCheck />, books: inProgressBooks },
    { title: "Completed", icon: <GiFinishLine />, books: completedBooks },
  ];

  const handleNext = () => {
    setCurrentColumn((prev) => (prev + 1) % columns.length);
  };

  const handlePrev = () => {
    setCurrentColumn((prev) => (prev - 1 + columns.length) % columns.length);
  };

  return (
    <main className="p-4 flex flex-col justify-center">
      <div className="flex justify-between items-center   sm:flex-row">
        <AddBookForm />
        <ThemeToggleButton />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-around text-center">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`flex justify-between items-center flex-row ${
              index === currentColumn ? "block" : "hidden"
            } sm:flex`}
          >
            <button
              key={index}
              onClick={handlePrev}
              className=" block rounded sm:hidden"
            >
              <FaAngleDoubleLeft />
            </button>
            <p className="text-center text-lg font-bold m-4 break-words">
              {column.title}
            </p>
            {column.icon}
            <button onClick={handleNext} className="p-2 rounded  block sm:hidden">
            <FaAngleDoubleRight />
            </button>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex items-start justify-around space-x-4 text-sm">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`${
              index === currentColumn ? "block" : "hidden"
            } sm:block flex justify-around space-x-4 text-sm w-full`}
          >
            <BookColumn
              books={column.books}
              alignment={
                index === 0 ? "left" : index === 1 ? "center" : "right"
              }
            />
          </div>
        ))}
      </div>

      {error && <ToastDestructive errorMessage={error} />}
    </main>
  );
}
