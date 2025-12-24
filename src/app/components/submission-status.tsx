import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, FileText, Clock, CheckCircle2, XCircle, AlertCircle, Calendar, Eye } from "lucide-react";

// Mock data - replace with actual data from backend
const mockSubmissions = [
  {
    id: "1",
    registrationNumber: "REG-ABC123XYZ",
    serviceType: "KTP",
    status: "diproses",
    date: "2025-01-15",
    estimatedCompletion: "2025-01-20"
  },
  {
    id: "2",
    registrationNumber: "REG-DEF456UVW",
    serviceType: "Kartu Keluarga",
    status: "selesai",
    date: "2025-01-10",
    completedDate: "2025-01-18"
  },
  {
    id: "3",
    registrationNumber: "REG-GHI789RST",
    serviceType: "Surat Domisili",
    status: "pending",
    date: "2025-01-20"
  }
];

const statusConfig = {
  pending: {
    label: "Menunggu",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock
  },
  diproses: {
    label: "Diproses",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: AlertCircle
  },
  selesai: {
    label: "Selesai",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2
  },
  ditolak: {
    label: "Ditolak",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle
  }
};

export function SubmissionStatus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const filteredSubmissions = mockSubmissions.filter(sub =>
    sub.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Status Pengajuan</h2>
        <p className="text-gray-600 text-sm">Lacak status permohonan Anda</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Cari nomor registrasi atau jenis layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="bg-yellow-100 p-2 rounded-lg w-fit mx-auto mb-2">
              <Clock className="size-5 text-yellow-600" />
            </div>
            <p className="text-gray-900 text-xl">1</p>
            <p className="text-gray-600 text-xs">Menunggu</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="bg-blue-100 p-2 rounded-lg w-fit mx-auto mb-2">
              <AlertCircle className="size-5 text-blue-600" />
            </div>
            <p className="text-gray-900 text-xl">1</p>
            <p className="text-gray-600 text-xs">Diproses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="bg-green-100 p-2 rounded-lg w-fit mx-auto mb-2">
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
            <p className="text-gray-900 text-xl">1</p>
            <p className="text-gray-600 text-xs">Selesai</p>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="size-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">
                {searchQuery ? "Tidak ada hasil ditemukan" : "Belum ada pengajuan"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission) => {
            const status = statusConfig[submission.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FileText className="size-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900">{submission.serviceType}</h3>
                          <p className="text-gray-600 text-sm">
                            {submission.registrationNumber}
                          </p>
                        </div>
                      </div>
                      <Badge className={status.color}>
                        <StatusIcon className="size-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="pl-11 space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="size-3" />
                        <span>Diajukan: {new Date(submission.date).toLocaleDateString("id-ID")}</span>
                      </div>
                      {submission.status === "diproses" && submission.estimatedCompletion && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <Clock className="size-3" />
                          <span>Estimasi selesai: {new Date(submission.estimatedCompletion).toLocaleDateString("id-ID")}</span>
                        </div>
                      )}
                      {submission.status === "selesai" && submission.completedDate && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="size-3" />
                          <span>Selesai: {new Date(submission.completedDate).toLocaleDateString("id-ID")}</span>
                        </div>
                      )}
                    </div>

                    <div className="pl-11">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setSelectedSubmission(submission.id)}
                      >
                        <Eye className="size-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>

                    {submission.status === "selesai" && (
                      <div className="pl-11">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-green-800 text-sm">
                            ✓ Dokumen sudah dapat diambil di kantor kelurahan. Bawa KTP asli dan nomor registrasi.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Butuh Bantuan?</CardTitle>
          <CardDescription className="text-blue-700">
            Jika ada pertanyaan tentang status pengajuan Anda, silakan hubungi kami melalui menu Kontak.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
