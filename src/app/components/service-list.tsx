import { FileText, Users, Home, FileCheck, CreditCard, Baby } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const services = [
  {
    id: "ktp",
    title: "Pembuatan KTP",
    description: "Permohonan pembuatan KTP baru",
    icon: CreditCard,
    color: "bg-blue-500"
  },
  {
    id: "kk",
    title: "Kartu Keluarga",
    description: "Pembuatan atau perubahan KK",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: "akta",
    title: "Akta Kelahiran",
    description: "Pengurusan akta kelahiran",
    icon: Baby,
    color: "bg-purple-500"
  },
  {
    id: "domisili",
    title: "Surat Domisili",
    description: "Surat keterangan domisili",
    icon: Home,
    color: "bg-orange-500"
  },
  {
    id: "skck",
    title: "Pengantar SKCK",
    description: "Surat pengantar SKCK",
    icon: FileCheck,
    color: "bg-red-500"
  },
  {
    id: "usaha",
    title: "Surat Izin Usaha",
    description: "Perizinan usaha mikro",
    icon: FileText,
    color: "bg-indigo-500"
  }
];

interface ServiceListProps {
  selectedService: string | null;
  onSelectService: (serviceId: string) => void;
}

export function ServiceList({ selectedService, onSelectService }: ServiceListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jenis Layanan</CardTitle>
        <CardDescription>Pilih layanan yang Anda butuhkan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`${service.color} p-2 rounded-lg flex-shrink-0`}>
                  <Icon className="size-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
