import { useRef, useState } from 'react';
import API from '../api';
import { UploadCloud, XCircle } from 'lucide-react';

export default function ImportCSV({ onImport }) {
  const fileRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFiles = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      fileRef.current.files = files;
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const clearFile = () => {
    setSelectedFile(null);
    fileRef.current.value = '';
  };

  const handleImport = async () => {
    if (!selectedFile) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await API.post('/employees/import', formData);
      clearFile();
      onImport();
    } catch {
      alert('Failed to import file');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4 text-center select-none">
        Import Employees
      </h2>

      <div
        className={`relative flex items-center justify-center rounded-md border-2 border-dashed p-6 cursor-pointer transition-colors duration-200
          ${dragActive ? 'border-white bg-purple-700' : 'border-purple-300 bg-purple-600'}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
        aria-label="File upload area"
      >
        <input
          type="file"
          ref={fileRef}
          accept=".csv, .xlsx"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleInputChange}
        />

        <UploadCloud
          size={36}
          className={`mr-4 transition-transform duration-300 ${
            dragActive ? 'animate-bounce text-white' : 'text-purple-200'
          }`}
        />

        {!selectedFile ? (
          <p className="text-white text-sm font-medium select-none">
            Drag & drop CSV/Excel or click to browse
          </p>
        ) : (
          <div className="flex items-center justify-between w-full bg-white rounded px-3 py-2 shadow-sm">
            <span className="text-purple-700 font-medium truncate">{selectedFile.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="text-purple-700 hover:text-purple-900 focus:outline-none"
              aria-label="Clear selected file"
              title="Clear selected file"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleImport}
        disabled={!selectedFile}
        className={`mt-4 w-full rounded-md py-2 font-semibold text-base transition
          ${selectedFile
            ? 'bg-white text-purple-700 hover:bg-purple-100 shadow-md'
            : 'bg-purple-400 text-purple-200 cursor-not-allowed'}
        `}
        aria-disabled={!selectedFile}
      >
        Import Now
      </button>
    </div>
  );
}