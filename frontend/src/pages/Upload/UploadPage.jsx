
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileDropzone from "../../components/ui/FileDropzone";
import { Upload } from "lucide-react";
import { uploadZip, selectUpload, resetUpload } from "../../redux/slices/uploadSlice.js";
import { startAnalysis } from "../../redux/slices/analysisSlice.js";

export default function UploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: uploadLoading, result: uploadResult, error } = useSelector(selectUpload);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    dispatch(resetUpload());
  };

//   const handleUpload = async () => {
//   if (!selectedFile) return alert("Please select a file first!");

//   try {
//     const upload = await dispatch(uploadZip({ file: selectedFile })).unwrap();
//     const projectId = upload.data._id || upload.data.projectId;

//     if (projectId) {
//       await dispatch(startAnalysis({ projectId })).unwrap();
//       navigate(`/analysis/${projectId}/dashboard`);
//     }

//     setSelectedFile(null);
//   } catch (err) {
//     alert(err.message || "Upload failed");
//   }
// };
const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select a ZIP file");
    return;
  }

  try {
    // 1️⃣ Upload ZIP
    const uploadResponse = await dispatch(
      uploadZip({ file: selectedFile })
    ).unwrap();

    const projectId =
      uploadResponse?.data?._id ||
      uploadResponse?.data?.projectId;

    if (!projectId) {
      throw new Error("Project ID not returned from upload");
    }

    // 2️⃣ Start analysis automatically
    await dispatch(startAnalysis({ projectId })).unwrap();

    // 3️⃣ Redirect to dashboard
    navigate(`/analysis/${projectId}/dashboard`);

    // 4️⃣ Reset local state
    setSelectedFile(null);
  } catch (err) {
    console.error(err);
    alert(err?.message || "Upload or analysis failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Upload Your Codebase
        </h1>
        <p className="text-gray-300 mb-8">
          Upload your project zip file. Our AI will scan, analyze, and detect issues.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
          <FileDropzone onFile={handleFileChange} />

          {/* <button
            onClick={handleUpload}
            disabled={uploadLoading}
            className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center gap-2 font-medium transition"
          >
            <Upload size={20} />
            {uploadLoading ? "Uploading..." : "Start Analysis"}
          </button> */}
          <button
  onClick={handleUpload}
  disabled={uploadLoading}
  className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center gap-2 font-medium transition"
>
  <Upload size={20} />
  {uploadLoading ? "Uploading..." : "Upload & Analyze"}
</button>


          {uploadResult && (
            <p className="mt-4 text-green-400">
              {uploadResult.message} <br />
              File Name: {uploadResult.data.name} <br />
              Status: {uploadResult.data.status}
            </p>
          )}

          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
