"use client";

import { useEffect, useState } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, TrendingUp } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";
import { cn } from "@/lib/utils";

export function RecentPurchasesCard() {
  const router = useRouter();
  const { purchases, markAsRead } = useNotifications();
  const [animatedItems, setAnimatedItems] = useState({});
  
  // Ordenar por data, mais recente primeiro
  const sortedPurchases = [...purchases]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // Limitar a 5 itens
  
  // Calcular receita total
  const totalRevenue = purchases.reduce((sum, purchase) => sum + (purchase.amount || 0), 0);
  
  // Configurar animações de entrada
  useEffect(() => {
    const itemsToAnimate = {};
    sortedPurchases.forEach((purchase, index) => {
      setTimeout(() => {
        itemsToAnimate[purchase.id] = true;
        setAnimatedItems({ ...itemsToAnimate });
      }, index * 100);
    });
  }, [sortedPurchases]);

  // Formatar data relativa
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'agora mesmo';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} h atrás`;
    return `${Math.floor(diffInSeconds / 86400)} d atrás`;
  };

  return (
    <CardPremium className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Compras Recentes</CardTitle>
          <CardDescription>
            Acompanhe as últimas vendas da plataforma
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>R$ {totalRevenue.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent>
        {sortedPurchases.length > 0 ? (
          <div className="space-y-4">
            {sortedPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className={cn(
                  "flex items-start p-3 rounded-lg transition-all border border-gray-100",
                  !purchase.read && "bg-green-50 border-green-100",
                  animatedItems[purchase.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
                style={{ transitionProperty: "opacity, transform", transitionDuration: "300ms" }}
              >
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={cn("text-sm truncate", !purchase.read && "font-medium")}>
                      {purchase.message}
                    </p>
                    <span className="text-sm font-medium text-green-600 ml-2 whitespace-nowrap">
                      R$ {purchase.amount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      {purchase.plan}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getRelativeTime(purchase.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              className="w-full mt-2" 
              onClick={() => router.push('/admin/purchases')}
            >
              Ver todas as vendas
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhuma compra recente</p>
          </div>
        )}
      </CardContent>
    </CardPremium>
  );
}