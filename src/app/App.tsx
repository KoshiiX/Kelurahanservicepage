import { useState } from "react";
import { ServiceForm } from "./components/service-form";
import { ServiceList } from "./components/service-list";
import { Building2 } from "lucide-react";

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Building2 className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Layanan Kelurahan Online</h1>
              <p className="text-gray-600">Ajukan permohonan layanan administrasi kelurahan Anda</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service List */}
          <div className="lg:col-span-1">
            <ServiceList 
              selectedService={selectedService}
              onSelectService={setSelectedService}
            />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {selectedService ? (
              <ServiceForm 
                serviceType={selectedService}
                onBack={() => setSelectedService(null)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="size-10 text-blue-600" />
                  </div>
                  <h2 className="text-gray-900 mb-2">Selamat Datang</h2>
                  <p className="text-gray-600">
                    Pilih jenis layanan yang Anda butuhkan dari daftar di sebelah kiri untuk memulai pengajuan permohonan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 Layanan Kelurahan Online. Melayani dengan sepenuh hati.
          </p>
        </div>
      </footer>
    </div>
  );
}
