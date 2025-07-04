"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { ArrowLeft, CreditCard, Check, Star, Shield, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { CREDIT_PACKAGES, createCheckoutSession } from "@/lib/stripe-service";

// Componente de cartão de pacote
const PackageCard = ({ 
  pack, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? `border-2 border-${pack.color.split(' ')[0]} shadow-md transform -translate-y-1` 
          : 'border border-gray-200'
      } rounded-xl overflow-hidden`}
      onClick={() => onSelect(pack.id)}
    >
      <div className={`p-6 ${isSelected ? pack.color : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{pack.name}</h3>
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold">R$ {pack.price.toFixed(2).replace('.', ',')}</span>
              {pack.originalPrice && (
                <span className="text-sm line-through text-gray-500 ml-2">
                  R$ {pack.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            {pack.savePercent > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 bg-secondary-100 text-secondary-700 rounded-full mt-2 inline-block">
                Economize {pack.savePercent}%
              </span>
            )}
          </div>
          {pack.popular && (
            <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>
        
        <p className="text-sm mt-4 text-gray-600">{pack.description}</p>
        
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Créditos</span>
            <span className="font-medium">{pack.credits}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">Valor por crédito</span>
            <span className="font-medium">R$ {(pack.price / pack.credits).toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
      
      <div className={`p-4 border-t border-gray-100 flex justify-center ${isSelected ? 'bg-gray-50' : 'bg-white'}`}>
        <Button
          variant={isSelected ? 'default' : 'outline'}
          className="w-full"
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Selecionado
            </>
          ) : (
            'Selecionar Pacote'
          )}
        </Button>
      </div>
    </div>
  );
};

export default function BuyCredits() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
  };
  
  const handleCheckout = async () => {
    if (!selectedPackage) {
      toast.error("Selecione um pacote para continuar");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Iniciar checkout
      const { url } = await createCheckoutSession(selectedPackage, user?.uid);
      
      // Redirecionar para a página de checkout
      router.push(url);
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Comprar Créditos</h1>
        <p className="text-gray-500">
          Escolha o pacote que melhor se adapta às suas necessidades
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CREDIT_PACKAGES.map((pack) => (
          <PackageCard 
            key={pack.id}
            pack={pack}
            isSelected={selectedPackage === pack.id}
            onSelect={handleSelectPackage}
          />
        ))}
      </div>
      
      <CardPremium variant="default" animation="fadeIn" className="mt-8">
        <CardContent className="p-6">
          <div className="space-y-5">
            <h3 className="text-lg font-medium">Por que comprar créditos?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Agilidade</h4>
                  <p className="text-sm text-gray-600">Crie dietas personalizadas em menos de 2 minutos.</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Qualidade</h4>
                  <p className="text-sm text-gray-600">Dietas baseadas em nutrição esportiva avançada.</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Confiabilidade</h4>
                  <p className="text-sm text-gray-600">Dados nutricionais precisos e sempre atualizados.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 border-t border-gray-100 p-6">
          <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h4 className="font-medium">Créditos atuais: <span className="text-primary-600">{user?.credits || 0}</span></h4>
              <p className="text-sm text-gray-500">1 crédito = 1 dieta personalizada</p>
            </div>
            
            <Button 
              size="lg" 
              onClick={handleCheckout}
              disabled={!selectedPackage}
              loading={isLoading}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Continuar para Pagamento
            </Button>
          </div>
        </CardFooter>
      </CardPremium>
    </div>
  );
}