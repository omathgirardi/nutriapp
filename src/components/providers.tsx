"use client";

import { AuthProvider } from "@/contexts/auth--context";
import { Toaster } from "@/components/ui/sonner";
import { NotificationProvider } from "@/contexts/notification-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
        <Toaster richColors position="top-right" />
      </NotificationProvider>
    </AuthProvider>
  );
}