import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

interface PdfUploadProps {
  uploadedFiles: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

export function PdfUpload({ uploadedFiles, onFilesChange }: PdfUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        toast.error(`File ${file.name} bukan PDF. Hanya file PDF yang diperbolehkan.`);
        continue;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} terlalu besar. Maksimal 10MB.`);
        continue;
      }

      validFiles.push({
        name: file.name,
        size: file.size,
        file: file
      });
    }

    if (validFiles.length > 0) {
      onFilesChange([...uploadedFiles, ...validFiles]);
      toast.success(`${validFiles.length} file berhasil ditambahkan`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    toast.success("File dihapus");
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
            <Upload className="size-8 text-blue-600" />
          </div>
          
          <div>
            <p className="text-gray-900 mb-1">
              Drag & drop file PDF di sini
            </p>
            <p className="text-gray-600 text-sm">
              atau klik tombol di bawah untuk memilih file
            </p>
          </div>

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            <Upload className="size-4 mr-2" />
            Pilih File PDF
          </Button>

          <p className="text-gray-600 text-sm">
            Format: PDF | Maksimal: 10MB per file
          </p>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-gray-700">File yang diupload ({uploadedFiles.length}):</p>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="bg-red-100 p-2 rounded flex-shrink-0">
                  <FileText className="size-5 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{file.name}</p>
                  <p className="text-gray-600 text-sm">{formatFileSize(file.size)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-gray-900 mb-2">Dokumen yang perlu disiapkan:</h4>
        <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
          <li>Fotokopi KTP pemohon</li>
          <li>Fotokopi Kartu Keluarga</li>
          <li>Dokumen pendukung lainnya (sesuai jenis layanan)</li>
        </ul>
        <p className="text-gray-600 text-sm mt-3">
          * Pastikan semua dokumen sudah dalam format PDF dan terbaca dengan jelas
        </p>
      </div>
    </div>
  );
}
