import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa6";
import axios from "axios";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home({ isDarkMode }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInMB = 5;

    if (file) {
      const validTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please select a .doc or .docx file.");
        setSelectedFile(null);
        return;
      }

      if (file.size / (1024 * 1024) > maxSizeInMB) {
        toast.error(`File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setDownloadError("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDownloadError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please upload a file before converting.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    setConverting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      toast.success("File converted successfully!");
      setConvert("File Converted Successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Error occurred: " + error.response.data.message);
      } else if (error.code === "ECONNABORTED") {
        toast.error("Network error. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      setConvert("");
    } finally {
      setConverting(false);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-blue-100 via-green-100 to-blue-200"
      }`}
    >
      <ToastContainer />
      <div
        className={`flex flex-col items-center justify-center ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg`}
      >
        <h1
          className={`text-4xl font-extrabold text-center mb-4 ${
            isDarkMode ? "text-green-400" : "text-blue-600"
          }`}
        >
          Convert Word to PDF Online
        </h1>
        <p className="text-center mb-6">
          Easily convert Word documents to PDF format online, without installing
          any software.
        </p>
        <div className="w-full flex flex-col items-center space-y-6">
          <input
            type="file"
            accept=".doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="FileInput"
          />
          <label
            htmlFor="FileInput"
            className={`w-full flex items-center justify-center px-6 py-4 ${
              isDarkMode
                ? "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
                : "bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-blue-300 hover:bg-opacity-80"
            } border-2 rounded-lg shadow hover:shadow-lg cursor-pointer duration-300`}
          >
            <FaFileWord className="text-3xl mr-3" />
            <span className="text-lg font-medium">
              {selectedFile ? "Change File" : "Choose File"}
            </span>
          </label>
          {selectedFile && (
            <div
              className={`w-full p-4 rounded-lg shadow ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">File Details:</h2>
              <ul className="space-y-1">
                <li>
                  <strong>Name:</strong> {selectedFile.name}
                </li>
                <li>
                  <strong>Size:</strong>{" "}
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </li>
                <li>
                  <strong>Type:</strong> {selectedFile.type || "Unknown"}
                </li>
                <li>
                  <strong>Last Modified:</strong>{" "}
                  {new Date(selectedFile.lastModified).toLocaleString()}
                </li>
              </ul>
              <button
                onClick={handleRemoveFile}
                className={`mt-4 px-4 py-2 rounded-lg font-semibold ${
                  isDarkMode
                    ? "bg-red-600 text-gray-100 hover:bg-red-700"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Remove File
              </button>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={converting}
            className={`w-full font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
              isDarkMode
                ? "text-gray-100 bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                : "text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:bg-gray-400"
            } ${
              converting ? "cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {converting ? "Converting..." : "Convert File"}
          </button>
          {convert && (
            <div
              className={`font-medium text-center ${
                isDarkMode ? "text-green-400" : "text-green-500"
              }`}
            >
              {convert}
            </div>
          )}
          {downloadError && (
            <div
              className={`font-medium text-center ${
                isDarkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              {downloadError}
            </div>
          )}
        </div>
      </div>
      {converting && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <RingLoader
            color={isDarkMode ? "#90EE90" : "#4A90E2"}
            loading={converting}
            css={override}
            size={150}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
