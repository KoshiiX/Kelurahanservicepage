import { FileText, Users, Home, FileCheck, CreditCard, Baby } from "lucide-react";

const services = [
  {
    id: "ktp",
    title: "KTP",
    description: "Pembuatan KTP",
    icon: CreditCard,
    color: "bg-blue-500"
  },
  {
    id: "kk",
    title: "Kartu Keluarga",
    description: "Pembuatan KK",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: "akta",
    title: "Akta Kelahiran",
    description: "Akta Kelahiran",
    icon: Baby,
    color: "bg-purple-500"
  },
  {
    id: "domisili",
    title: "Surat Domisili",
    description: "Keterangan Domisili",
    icon: Home,
    color: "bg-orange-500"
  },
  {
    id: "skck",
    title: "Pengantar SKCK",
    description: "Surat SKCK",
    icon: FileCheck,
    color: "bg-red-500"
  },
  {
    id: "usaha",
    title: "Izin Usaha",
    description: "Perizinan Usaha",
    icon: FileText,
    color: "bg-indigo-500"
  }
];

interface ServiceGridProps {
  onSelectService: (serviceId: string) => void;
}

export function ServiceGrid({ onSelectService }: ServiceGridProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-gray-900 mb-1">Layanan Tersedia</h2>
        <p className="text-gray-600 text-sm">Pilih layanan yang Anda butuhkan</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          
          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all active:scale-95"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`${service.color} p-3 rounded-xl`}>
                  <Icon className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm font-medium leading-tight">{service.title}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-tight">{service.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
