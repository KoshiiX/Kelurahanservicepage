import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, CreditCard } from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nama: "Budi Santoso",
    nik: "3201234567890123",
    email: "budi.santoso@email.com",
    noTelp: "081234567890",
    alamat: "Jl. Merdeka No. 123, RT 01/RW 05, Kelurahan Sukamaju",
    tanggalLahir: "1990-05-15"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Profil berhasil diperbarui");
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Profil Saya</h2>
          <p className="text-gray-600 text-sm">Kelola informasi pribadi Anda</p>
        </div>
        <Button
          size="sm"
          variant={isEditing ? "default" : "outline"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="size-4 mr-2" />
              Simpan
            </>
          ) : (
            <>
              <Edit2 className="size-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Profile Picture */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-full">
              <User className="size-12 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-gray-900">{profileData.nama}</h3>
              <p className="text-gray-600 text-sm">Warga Kelurahan Sukamaju</p>
              {isEditing && (
                <Button variant="link" size="sm" className="mt-1">
                  Ubah Foto Profil
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>Data diri yang terdaftar di sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <User className="size-4" />
                Nama Lengkap
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.nama}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <CreditCard className="size-4" />
                NIK
              </Label>
              {isEditing ? (
                <Input
                  value={profileData.nik}
                  onChange={(e) => handleInputChange("nik", e.target.value)}
                  maxLength={16}
                />
              ) : (
                <p className="text-gray-900">{profileData.nik}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <Mail className="size-4" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-600">
                <Phone className="size-4" />
                No. Telepon
              </Label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={profileData.noTelp}
                  onChange={(e) => handleInputChange("noTelp", e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.noTelp}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-600">
              <Calendar className="size-4" />
              Tanggal Lahir
            </Label>
            {isEditing ? (
              <Input
                type="date"
                value={profileData.tanggalLahir}
                onChange={(e) => handleInputChange("tanggalLahir", e.target.value)}
              />
            ) : (
              <p className="text-gray-900">
                {new Date(profileData.tanggalLahir).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-600">
              <MapPin className="size-4" />
              Alamat Lengkap
            </Label>
            {isEditing ? (
              <Input
                value={profileData.alamat}
                onChange={(e) => handleInputChange("alamat", e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{profileData.alamat}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Ubah Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Notifikasi
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            Hapus Akun
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
