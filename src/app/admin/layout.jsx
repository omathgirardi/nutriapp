"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart, 
  HelpCircle,
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button-premium";
import { toast } from "sonner";
import { NotificationBell } from "@/components/notifications/notification-bell";

const SidebarItem = ({ icon, label, href, isActive, onClick }) => {
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

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Verificar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Verificar inicialmente
    checkIfMobile();
    
    // Adicionar listener para resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    // Close sidebar when route changes on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const handleSignOut = async () => {
    try {
      toast.success("Logout realizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

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
            <span className="ml-3 font-medium text-lg text-primary-600">NutriPlan Admin</span>
          </div>
          <div className="flex items-center">
            <NotificationBell />
          </div>
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
              <p className="text-sm text-gray-500">Painel Administrativo</p>
            </div>
          )}
          
          {/* User info for desktop */}
          {!isMobile && (
            <div className="px-6 mb-6 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-600 font-medium">A</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">Administrador</h3>
                <p className="text-xs text-gray-500">admin@nutriplan.com</p>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-3 space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="h-5 w-5" />} 
              label="Dashboard" 
              href="/admin/dashboard" 
              isActive={pathname === "/admin/dashboard"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<Users className="h-5 w-5" />} 
              label="Usuários" 
              href="/admin/users" 
              isActive={pathname === "/admin/users" || pathname.startsWith("/admin/users/")}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<CreditCard className="h-5 w-5" />} 
              label="Assinaturas" 
              href="/admin/subscriptions" 
              isActive={pathname === "/admin/subscriptions"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<BarChart className="h-5 w-5" />} 
              label="Relatórios" 
              href="/admin/reports" 
              isActive={pathname === "/admin/reports"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label="Configurações" 
              href="/admin/settings" 
              isActive={pathname === "/admin/settings"}
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <SidebarItem 
              icon={<HelpCircle className="h-5 w-5" />} 
              label="Suporte" 
              href="/admin/support" 
              isActive={pathname === "/admin/support"}
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
              onClick={handleSignOut}
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
        {/* Desktop header with notifications */}
        {!isMobile && (
          <div className="fixed top-6 right-6 z-20">
            <NotificationBell />
          </div>
        )}
        
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}