import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddBookButton from "../Button/AddButton";
import { useState } from "react";

export function AddBookForm() {
  const [bookTitle, setBookTitle] = useState("");

  const handleBookTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(event.target.value);
  };
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
      <Input
        placeholder="Book Title"
        value={bookTitle}
        onChange={handleBookTitleInput}
      />
      <AddBookButton bookTitle={bookTitle} />
    </div>
  );
}
