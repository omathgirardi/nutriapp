"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button-premium";
import {
  Home,
  Calculator,
  Users,
  History,
  CreditCard,
  Settings,
  HelpCircle,
  BarChart2,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export function DashboardNav() {
  const pathname = usePathname();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  
  const isActive = (path) => {
    return pathname === path;
  };
  
  const isActiveParent = (paths) => {
    return paths.some(path => pathname.startsWith(path));
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={isActive("/dashboard") ? "default" : "ghost"}
        className={`w-full justify-start ${isActive("/dashboard") ? "" : "hover:bg-gray-100"}`}
        asChild
      >
        <Link href="/dashboard">
          <Home className="mr-2 h-5 w-5" />
          Dashboard
        </Link>
      </Button>
      
      <Button
        variant={isActive("/calculator") ? "default" : "ghost"}
        className={`w-full justify-start ${isActive("/calculator") ? "" : "hover:bg-gray-100"}`}
        asChild
      >
        <Link href="/calculator">
          <Calculator className="mr-2 h-5 w-5" />
          Calculadora
        </Link>
      </Button>
      
      <Button
        variant={isActive("/clients") ? "default" : "ghost"}
        className={`w-full justify-start ${isActive("/clients") ? "" : "hover:bg-gray-100"}`}
        asChild
      >
        <Link href="/clients">
          <Users className="mr-2 h-5 w-5" />
          Clientes
        </Link>
      </Button>
      
      <Button
        variant={isActive("/history") ? "default" : "ghost"}
        className={`w-full justify-start ${isActive("/history") ? "" : "hover:bg-gray-100"}`}
        asChild
      >
        <Link href="/history">
          <History className="mr-2 h-5 w-5" />
          Histórico
        </Link>
      </Button>

      <div className="relative">
        <Button
          variant={isActiveParent(["/profile", "/settings"]) ? "default" : "ghost"}
          className={`w-full justify-between ${isActiveParent(["/profile", "/settings"]) ? "" : "hover:bg-gray-100"}`}
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
        >
          <div className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Conta
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`} />
        </Button>
        
        {isSubmenuOpen && (
          <div className="pl-8 mt-1 space-y-1">
            <Button
              variant={isActive("/profile") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/profile") ? "" : "hover:bg-gray-100"}`}
              size="sm"
              asChild
            >
              <Link href="/profile">
                Perfil
              </Link>
            </Button>
            
            <Button
              variant={isActive("/profile/buy-credits") ? "default" : "ghost"}
              className={`w-full justify-start ${isActive("/profile/buy-credits") ? "" : "hover:bg-gray-100"}`}
              size="sm"
              asChild
            >
              <Link href="/profile/buy-credits">
                Comprar Créditos
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-100"
          asChild
        >
          <Link href="/help">
            <HelpCircle className="mr-2 h-5 w-5" />
            Ajuda
          </Link>
        </Button>
      </div>
    </div>
  );
}