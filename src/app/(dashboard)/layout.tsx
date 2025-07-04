"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calculator, 
  Users, 
  History, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button-premium";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-primary-50 text-primary-700 font-medium" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-6 h-6 flex items-center justify-center transition-transform duration-200",
        isActive ? "text-primary-600" : "text-gray-500 group-hover:text-gray-700",
      )}>
        {icon}
      </div>
      <span>{label}</span>
      {isActive && (
        <ChevronRight className="w-4 h-4 text-primary-500 ml-auto" />
      )}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Close sidebar when route changes on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <span className="ml-3 font-medium text-lg text-primary-600">NutriPlan</span>
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transition-all duration-300 transform",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
          isMobile ? "top-[57px] pt-0" : "pt-6"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo for desktop */}
          {!isMobile && (
            <div className="px-6 mb-8">
              <h1 className="text-2xl font-bold text-primary-600">NutriPlan</h1>
              <p className="text-sm text-gray-500">Plataforma Premium</p>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-3 space-y-1">
            <SidebarItem 
              icon={<Home className="h-5 w-5" />} 
              label="Dashboard" 
              href="/dashboard" 
              isActive={pathname === "/dashboard"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<Calculator className="h-5 w-5" />} 
              label="Calculadora" 
              href="/calculator" 
              isActive={pathname === "/calculator"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<Users className="h-5 w-5" />} 
              label="Clientes" 
              href="/clients" 
              isActive={pathname === "/clients"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<History className="h-5 w-5" />} 
              label="Histórico" 
              href="/history" 
              isActive={pathname === "/history"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<User className="h-5 w-5" />} 
              label="Perfil" 
              href="/profile" 
              isActive={pathname === "/profile"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth={true}
              className="justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300",
        isMobile ? "pt-14 pb-6" : "pt-6 pb-6",
        sidebarOpen || !isMobile ? "lg:ml-64" : "ml-0"
      )}>
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}