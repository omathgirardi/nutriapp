"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { CheckCircle, AlertCircle, ArrowLeft, Home } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { CREDIT_PACKAGES, processPaymentConfirmation } from "@/lib/stripe-service";
import { addCreditsToUser } from "@/lib/firebase-services";

export default function CheckoutConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [packageDetails, setPackageDetails] = useState(null);
  
  useEffect(() => {
    const packageId = searchParams.get("package");
    const userId = searchParams.get("userId");
    
    if (!packageId || !userId) {
      toast.error("Informações de pagamento inválidas");
      setIsProcessing(false);
      setIsSuccess(false);
      return;
    }
    
    // Verificar se o ID do usuário corresponde ao usuário logado
    if (userId !== user?.uid) {
      toast.error("Usuário inválido");
      setIsProcessing(false);
      setIsSuccess(false);
      return;
    }
    
    // Obter detalhes do pacote
    const selectedPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
    setPackageDetails(selectedPackage);
    
    if (!selectedPackage) {
      toast.error("Pacote não encontrado");
      setIsProcessing(false);
      setIsSuccess(false);
      return;
    }
    
    // Processar pagamento (em uma aplicação real, isso seria feito no webhook do Stripe)
    const processPayment = async () => {
      try {
        // Simulação de atraso no processamento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Processar confirmação
        const success = await processPaymentConfirmation(packageId, userId);
        
        if (success) {
          // Adicionar créditos ao usuário
          await addCreditsToUser(
            userId, 
            selectedPackage.credits, 
            packageId, 
            selectedPackage.price
          );
          
          setIsSuccess(true);
          toast.success("Pagamento processado com sucesso!");
        } else {
          setIsSuccess(false);
          toast.error("Erro ao processar pagamento");
        }
      } catch (error) {
        console.error("Erro no processamento:", error);
        setIsSuccess(false);
        toast.error("Erro ao processar pagamento");
      } finally {
        setIsProcessing(false);
      }
    };
    
    processPayment();
  }, [searchParams, user?.uid]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <CardPremium variant="default" animation="fadeIn">
          <CardHeader>
            <CardTitle className="text-center">
              {isProcessing ? (
                "Processando Pagamento"
              ) : isSuccess ? (
                "Pagamento Confirmado"
              ) : (
                "Erro no Pagamento"
              )}
            </CardTitle>
            <CardDescription className="text-center">
              {isProcessing ? (
                "Aguarde enquanto processamos seu pagamento..."
              ) : isSuccess ? (
                "Seus créditos foram adicionados à sua conta!"
              ) : (
                "Ocorreu um erro ao processar seu pagamento."
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-6 flex flex-col items-center">
            {isProcessing ? (
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin my-6"></div>
            ) : isSuccess ? (
              <CheckCircle className="w-16 h-16 text-secondary-500 my-6" />
            ) : (
              <AlertCircle className="w-16 h-16 text-red-500 my-6" />
            )}
            
            {packageDetails && !isProcessing && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 w-full mt-4">
                <h3 className="font-medium text-center mb-3">{packageDetails.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Valor:</span>
                    <span className="font-medium">R$ {packageDetails.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-500">Créditos:</span>
                    <span className="font-medium">{packageDetails.credits}</span>
                  </div>
                  
                  {isSuccess && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className="text-secondary-600 font-medium">Aprovado</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            {!isProcessing && (
              isSuccess ? (
                <>
                  <Button 
                    onClick={() => router.push("/dashboard")}
                    fullWidth={true}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Ir para o Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => router.push("/profile/buy-credits")}
                    fullWidth={true}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para Compra de Créditos
                  </Button>
                </>
              )
            )}
          </CardFooter>
        </CardPremium>
      </div>
    </div>
  );
}