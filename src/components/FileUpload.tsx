import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export default function FileUpload({
  onFileSelect,
  accept = ".pdf,.doc,.docx",
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);
    
    // Extract file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !['pdf', 'doc', 'docx'].includes(extension)) {
      setError('Please upload a PDF or Word document');
      return false;
    }
    
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-accent-primary bg-accent-primary/10'
            : 'border-ui-border hover:border-accent-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-accent-primary" />
              <span className="text-text-primary">{selectedFile.name}</span>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 hover:text-accent-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-accent-primary mx-auto mb-4" />
            <p className="text-text-primary mb-2">
              Drag and drop your resume here, or click to select
            </p>
            <p className="text-text-secondary text-sm">
              PDF or Word documents up to {maxSize / 1024 / 1024}MB
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-alt-coral text-sm">{error}</p>
      )}
    </div>
  );
}