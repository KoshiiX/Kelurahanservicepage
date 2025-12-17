import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { PdfUpload } from "./pdf-upload";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ServiceFormProps {
  serviceType: string;
  onBack: () => void;
}

const serviceNames: Record<string, string> = {
  ktp: "Pembuatan KTP",
  kk: "Kartu Keluarga",
  akta: "Akta Kelahiran",
  domisili: "Surat Domisili",
  skck: "Pengantar SKCK",
  usaha: "Surat Izin Usaha"
};

export function ServiceForm({ serviceType, onBack }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    alamat: "",
    noTelp: "",
    email: "",
    keterangan: ""
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number; file: File }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.nik || !formData.alamat || !formData.noTelp) {
      toast.error("Mohon lengkapi semua data yang diperlukan");
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Mohon upload minimal satu dokumen pendukung");
      return;
    }

    // Simulate submission
    toast.success("Permohonan berhasil diajukan!");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      nama: "",
      nik: "",
      alamat: "",
      noTelp: "",
      email: "",
      keterangan: ""
    });
    setUploadedFiles([]);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-3">Permohonan Berhasil Diajukan!</h2>
            <p className="text-gray-600 mb-6">
              Permohonan {serviceNames[serviceType]} Anda telah berhasil diajukan. 
              Nomor registrasi Anda: <span className="font-semibold">REG-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700 text-sm">
                Silakan datang ke kantor kelurahan dalam 3-5 hari kerja untuk mengambil dokumen Anda. 
                Jangan lupa membawa dokumen asli dan nomor registrasi.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleReset} variant="outline">
                Ajukan Lagi
              </Button>
              <Button onClick={onBack}>
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <CardTitle>{serviceNames[serviceType]}</CardTitle>
            <CardDescription>Lengkapi formulir dan upload dokumen pendukung</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Pemohon */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Data Pemohon</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap *</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nik">NIK *</Label>
                <Input
                  id="nik"
                  value={formData.nik}
                  onChange={(e) => handleInputChange("nik", e.target.value)}
                  placeholder="16 digit NIK"
                  maxLength={16}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat Lengkap *</Label>
              <Textarea
                id="alamat"
                value={formData.alamat}
                onChange={(e) => handleInputChange("alamat", e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="noTelp">No. Telepon *</Label>
                <Input
                  id="noTelp"
                  type="tel"
                  value={formData.noTelp}
                  onChange={(e) => handleInputChange("noTelp", e.target.value)}
                  placeholder="08xx xxxx xxxx"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@contoh.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keterangan">Keterangan Tambahan</Label>
              <Textarea
                id="keterangan"
                value={formData.keterangan}
                onChange={(e) => handleInputChange("keterangan", e.target.value)}
                placeholder="Informasi tambahan (opsional)"
                rows={3}
              />
            </div>
          </div>

          {/* Upload Dokumen */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Dokumen Pendukung</h3>
            <PdfUpload 
              uploadedFiles={uploadedFiles}
              onFilesChange={setUploadedFiles}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="size-4 mr-2" />
              Kirim Permohonan
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
