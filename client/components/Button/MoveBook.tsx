import React from "react";
import useBookStore from "@/store/book.store";
import { Button } from "../ui/button";
import { LuListTodo } from "react-icons/lu";
import { TbProgressCheck } from "react-icons/tb";
import { GiFinishLine } from "react-icons/gi";

interface MoveBookButtonProps {
  bookId: string;
  alignment: string;
}

const MoveBookButton: React.FC<MoveBookButtonProps> = ({
  bookId,
  alignment,
}) => {
  const updateBookStatus = useBookStore((state) => state.updateBookStatus);

  const handleClick = (status: string) => {
    updateBookStatus(bookId, status);
  };

  if (alignment == "left") {
    return (
      <div className="flex justify-around items-center flex-row ">
        <Button
          onClick={() => {
            handleClick("in-progress");
          }}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded mx-2 "
        >
          <TbProgressCheck />
        </Button>

        <Button
          onClick={() => {
            handleClick("completed");
          }}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded "
        >
          <GiFinishLine />
        </Button>
      </div>
    );
  } else if (alignment == "center") {
    return (
      <div className="flex justify-around items-center flex-row  ">
        <Button
          onClick={() => {
            handleClick("to-read");
          }}
          className="bg-blue-500  text-white font-bold py-2 px-4 rounded mx-2"
        >
          <LuListTodo />
        </Button>
        <Button
          onClick={() => {
            handleClick("completed");
          }}
          className="bg-green-500  text-white font-bold py-2 px-4 rounded  "
        >
          <GiFinishLine />
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-around items-center flex-row  ">
        <Button
          onClick={() => {
            handleClick("to-read");
          }}
          className="bg-blue-500  text-white font-bold py-2 px-4 rounded mx-2"
        >
          <LuListTodo />
        </Button>
        <Button
          onClick={() => {
            handleClick("in-progress");
          }}
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded  "
        >
          <TbProgressCheck />
        </Button>
      </div>
    );
  }
};

export default MoveBookButton;
