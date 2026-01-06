import React from "react";
import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col item-center justify-center py-16 space-y-16 max-w-md mx-autotext-center mx-auto">
      <div className="bg-primary/10 p-8 rounded-full flex flex-row items-center gap-4 ">
        <NotebookIcon className="size-10 text-primary" />{" "}
        <h3 className="text-2xl font-bold">No notes yet</h3>
      </div>
      <Link to="/create" className="btn btn-primary">
        Create your first note
      </Link>
    </div>
  );
};

export default NotesNotFound;
