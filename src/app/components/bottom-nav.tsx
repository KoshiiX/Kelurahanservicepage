import { Home, FileText, User, Phone } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Layanan", icon: Home },
  { id: "status", label: "Status", icon: FileText },
  { id: "profile", label: "Profil", icon: User },
  { id: "contact", label: "Kontak", icon: Phone }
];

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-500 active:text-blue-600"
              }`}
            >
              <Icon className={`size-6 ${isActive ? "fill-blue-100" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
