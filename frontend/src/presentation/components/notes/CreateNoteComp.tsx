import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Using Ant Design plus icon
import useNote from "../../../application/hooks/use-note";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

type CreateNoteProps = {
  className?: string;
};

const CreateNoteComp: React.FC<CreateNoteProps> = ({ className }) => {
  const { createNote, createdNote } = useNote();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (createdNote) {
      navigateTo(`${AppRoute.NOTES}/${createdNote.id}`);
    }
  }, [createdNote]);

  return (
    <div
      onClick={() => {
        createNote({ title: "Untitled", content: "" });
      }}
      className={`w-32 h-32 bg-white border border-gray-300 rounded-lg flex flex-col justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="grow flex justify-center items-center">
        <AiOutlinePlus className="text-4xl text-gray-600" />
      </div>
      <div className="pb-3 text-gray-700 font-medium text-center text-sm select-none">
        Create new Note
      </div>
    </div>
  );
};

export default CreateNoteComp;
