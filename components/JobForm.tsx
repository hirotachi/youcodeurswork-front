import React from "react";
import Trumbowyg from "react-trumbowyg";

const JobForm = () => {
  const handleEditorChange = (e) => {
    console.log(e.target.innerHTML);
  };
  return (
    <div>
      <h1>Job Form</h1>
      <Trumbowyg
        id="editor"
        data={`<p>Hello World!</p>`}
        onChange={handleEditorChange}
        data-placeholder="Enter your text here..."
      />
    </div>
  );
};

export default JobForm;
