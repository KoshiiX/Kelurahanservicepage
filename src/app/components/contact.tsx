import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
    setFormData({ nama: "", email: "", subjek: "", pesan: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Kontak Kami</h2>
        <p className="text-gray-600 text-sm">Hubungi kami untuk bantuan dan informasi</p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Telepon</h4>
                <p className="text-gray-600 text-sm mb-2">Senin - Jumat, 08:00 - 16:00</p>
                <a href="tel:02112345678" className="text-blue-600 hover:underline">
                  (021) 1234-5678
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <MessageCircle className="size-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-gray-600 text-sm mb-2">Chat langsung dengan kami</p>
                <a href="https://wa.me/628123456789" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  +62 812-3456-7890
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="size-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Email</h4>
                <p className="text-gray-600 text-sm mb-2">Kirim email ke kami</p>
                <a href="mailto:info@kelurahan.go.id" className="text-purple-600 hover:underline">
                  info@kelurahan.go.id
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="size-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Jam Operasional</h4>
                <p className="text-gray-600 text-sm">Senin - Jumat</p>
                <p className="text-gray-900">08:00 - 16:00 WIB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-5" />
            Alamat Kantor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-gray-900">Kantor Kelurahan Sukamaju</p>
            <p className="text-gray-600 text-sm mt-1">
              Jl. Merdeka Raya No. 100<br />
              Kelurahan Sukamaju, Kecamatan Sentral<br />
              Jakarta Pusat, DKI Jakarta 10110
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="size-8 mx-auto mb-2" />
              <p className="text-sm">Peta Lokasi</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <MapPin className="size-4 mr-2" />
            Buka di Google Maps
          </Button>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Kirim Pesan</CardTitle>
          <CardDescription>Atau isi formulir di bawah untuk mengirim pesan kepada kami</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  placeholder="Masukkan nama Anda"
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
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjek">Subjek</Label>
              <Input
                id="subjek"
                value={formData.subjek}
                onChange={(e) => handleInputChange("subjek", e.target.value)}
                placeholder="Topik pesan Anda"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesan">Pesan</Label>
              <Textarea
                id="pesan"
                value={formData.pesan}
                onChange={(e) => handleInputChange("pesan", e.target.value)}
                placeholder="Tulis pesan Anda di sini..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="size-4 mr-2" />
              Kirim Pesan
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Pertanyaan Umum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="text-gray-900 mb-1">Berapa lama proses pengajuan?</h4>
            <p className="text-gray-600 text-sm">
              Proses pengajuan biasanya memakan waktu 3-5 hari kerja tergantung jenis layanan.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-1">Dokumen apa yang perlu disiapkan?</h4>
            <p className="text-gray-600 text-sm">
              Setiap layanan memiliki persyaratan dokumen yang berbeda. Silakan upload dalam format PDF saat mengajukan.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 mb-1">Bagaimana cara mengecek status pengajuan?</h4>
            <p className="text-gray-600 text-sm">
              Gunakan menu "Status Pengajuan" dan masukkan nomor registrasi yang Anda terima.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
