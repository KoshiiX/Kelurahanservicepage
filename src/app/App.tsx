import { useState } from "react";
import { ServiceForm } from "./components/service-form";
import { ServiceGrid } from "./components/service-grid";
import { Profile } from "./components/profile";
import { SubmissionStatus } from "./components/submission-status";
import { Contact } from "./components/contact";
import { BottomNav } from "./components/bottom-nav";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage("home");
  };

  const handleBackToHome = () => {
    setSelectedService(null);
    setCurrentPage("home");
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedService(null);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (selectedService) {
      return (
        <ServiceForm 
          serviceType={selectedService}
          onBack={handleBackToHome}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return <ServiceGrid onSelectService={handleSelectService} />;
      case "status":
        return <SubmissionStatus />;
      case "profile":
        return <Profile />;
      case "contact":
        return <Contact />;
      default:
        return <ServiceGrid onSelectService={handleSelectService} />;
    }
  };

  const getPageTitle = () => {
    if (selectedService) return "Formulir Pengajuan";
    switch (currentPage) {
      case "home":
        return "Layanan Kelurahan Online";
      case "status":
        return "Status Pengajuan";
      case "profile":
        return "Profil Saya";
      case "contact":
        return "Kontak Kami";
      default:
        return "Layanan Kelurahan Online";
    }
  };

  const getPageDescription = () => {
    if (selectedService) return "Lengkapi formulir pengajuan layanan";
    switch (currentPage) {
      case "home":
        return "Ajukan permohonan layanan administrasi kelurahan Anda";
      case "status":
        return "Lacak status permohonan Anda";
      case "profile":
        return "Kelola informasi pribadi Anda";
      case "contact":
        return "Hubungi kami untuk bantuan dan informasi";
      default:
        return "Ajukan permohonan layanan administrasi kelurahan Anda";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 sm:p-3 rounded-lg">
                <Building2 className="size-6 sm:size-8 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-base sm:text-2xl">{getPageTitle()}</h1>
                <p className="text-gray-600 text-xs sm:text-base hidden sm:block">{getPageDescription()}</p>
              </div>
            </div>
            {/* Desktop Menu - hidden on mobile */}
            <nav className="hidden md:flex gap-2">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange("home")}
              >
                Layanan
              </Button>
              <Button
                variant={currentPage === "status" ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange("status")}
              >
                Status
              </Button>
              <Button
                variant={currentPage === "profile" ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange("profile")}
              >
                Profil
              </Button>
              <Button
                variant={currentPage === "contact" ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange("contact")}
              >
                Kontak
              </Button>
            </nav>
            {/* Mobile menu toggle - shown only on mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
          {/* Mobile dropdown menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 border-t border-gray-200 pt-4">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePageChange("home")}
              >
                Layanan
              </Button>
              <Button
                variant={currentPage === "status" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePageChange("status")}
              >
                Status Pengajuan
              </Button>
              <Button
                variant={currentPage === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePageChange("profile")}
              >
                Profil Saya
              </Button>
              <Button
                variant={currentPage === "contact" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePageChange("contact")}
              >
                Kontak Kami
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Footer - Hidden on mobile when bottom nav is visible */}
      <footer className="mt-16 bg-white border-t border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 Layanan Kelurahan Online. Melayani dengan sepenuh hati.
          </p>
        </div>
      </footer>
    </div>
  );
}