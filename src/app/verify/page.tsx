"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare, ArrowLeft } from "lucide-react";

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aqui implementaríamos a verificação real com a Evolution API
      // Por enquanto, apenas simulamos o sucesso após 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (verificationCode === "123456") {
        toast.success("Conta verificada com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Código inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na verificação:", error);
      toast.error("Ocorreu um erro na verificação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <CardPremium variant="default" animation="fadeIn">
          <CardHeader>
            <CardTitle className="text-center">Verificação de WhatsApp</CardTitle>
            <CardDescription className="text-center">
              Enviamos um código para seu WhatsApp. Por favor, digite-o abaixo para verificar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Código de Verificação</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input 
                    id="verification-code" 
                    type="text" 
                    placeholder="Digite o código de 6 dígitos"
                    className="pl-10 text-center tracking-widest text-lg"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Não recebeu o código? <button type="button" className="text-primary-600 hover:underline">Reenviar</button>
                </p>
              </div>
              
              <Button 
                type="submit" 
                variant="default" 
                fullWidth={true}
                loading={loading}
              >
                Verificar
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                fullWidth={true}
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Login
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center text-gray-500 w-full">
              Se você não receber o código em até 1 minuto, verifique se o número informado está correto.
            </p>
          </CardFooter>
        </CardPremium>
      </div>
    </main>
  );
}