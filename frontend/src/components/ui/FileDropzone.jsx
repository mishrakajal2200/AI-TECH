// import React from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";

// export default function FileDropzone({ onFile }) {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "application/zip": [".zip"] },
//     multiple: false,
//     onDrop: (files) => onFile(files[0]),
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition 
//       ${isDragActive ? "border-blue-400 bg-white/10 scale-105" : "border-white/10"}`}
//     >
//       <input {...getInputProps()} />
//       <FiUploadCloud className="text-5xl text-indigo-400 mx-auto mb-3" />
//       <p className="font-semibold text-lg">Drop ZIP file here</p>
//       <p className="text-gray-400 text-sm">or click to browse</p>
//     </div>
//   );
// }


import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function FileDropzone({ onFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/zip": [".zip"] },
    multiple: false,
    onDrop: (files) => onFile(files[0]),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition 
      ${isDragActive ? "border-blue-400 bg-white/10 scale-105" : "border-white/10"}`}
    >
      <input {...getInputProps()} />
      <FiUploadCloud className="text-5xl text-indigo-400 mx-auto mb-3" />
      <p className="font-semibold text-lg">Drop ZIP file here</p>
      <p className="text-gray-400 text-sm">or click to browse</p>
    </div>
  );
}
