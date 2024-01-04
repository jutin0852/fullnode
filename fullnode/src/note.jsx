import React from "react";

export default function Note({note,toggleImportance}) {
    const label = note.important ? "make not important" : "make important";
  return (
    <div>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </div>
  );
}
