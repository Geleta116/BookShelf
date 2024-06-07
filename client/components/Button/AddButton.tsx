"use client";
import React from "react";
import useBookStore from "@/store/book.store";
import { Button } from "../ui/button";
import { BookSchema } from "@/services/schema/bookSchema";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface AddBookButtonProps {
  bookTitle: string;
}

const AddBookButton: React.FC<AddBookButtonProps> = ({ bookTitle }) => {
  const addBook = useBookStore((state) => state.addBook);
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      const output = BookSchema.parse({ title: bookTitle });
      await addBook(bookTitle);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "please make sure you entered a valid book name",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="submit"
    >
      Add Book
    </Button>
  );
};

export default AddBookButton;
