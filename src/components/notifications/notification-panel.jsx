"use client";

import { useEffect, useState } from "react";
import { CardPremium, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { User, Calendar, Bell, Check, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function NotificationPanel({ notifications, onClose }) {
  const router = useRouter();
  const [animatedItems, setAnimatedItems] = useState({});

  // Configurar animações de entrada
  useEffect(() => {
    const itemsToAnimate = {};
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        itemsToAnimate[notification.id] = true;
        setAnimatedItems({ ...itemsToAnimate });
      }, index * 50);
    });
  }, [notifications]);

  // Agrupar notificações por data
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = new Date(notification.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  // Ação quando uma notificação é clicada
  const handleNotificationClick = (notification) => {
    if (notification.action === "viewClient") {
      router.push(`/clients/${notification.clientId}`);
    } else if (notification.action === "viewDiet") {
      router.push(`/calculator/result?dietId=${notification.dietId}`);
    } else if (notification.action === "calendar") {
      router.push(`/calendar?date=${notification.date}`);
    }
    onClose();
  };

  // Renderizar o ícone adequado para cada tipo de notificação
  const renderIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-primary-500" />;
      case "client":
        return <User className="h-5 w-5 text-secondary-500" />;
      case "assessment":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <CardPremium variant="default" className="shadow-lg animate-fadeIn">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Notificações</CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        {Object.keys(groupedNotifications).length > 0 ? (
          Object.entries(groupedNotifications).map(([date, items]) => (
            <div key={date} className="mb-2">
              <div className="px-4 py-2 bg-gray-50 border-y border-gray-100">
                <span className="text-xs font-medium text-gray-500">{date}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 cursor-pointer hover:bg-gray-50 transition-all",
                      !notification.read && "bg-primary-50",
                      animatedItems[notification.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}
                    style={{ transitionProperty: "opacity, transform", transitionDuration: "300ms" }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {renderIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={cn("text-sm", !notification.read && "font-medium")}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Bell className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p>Nenhuma notificação disponível</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t border-gray-100 flex justify-between">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardFooter>
    </CardPremium>
  );
}