"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardPremium, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Weight, 
  Ruler, 
  Calendar, 
  ActivitySquare, 
  Target, 
  Plus, 
  ChevronRight 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Componente de passos da calculadora
const CalculatorSteps = ({ currentStep }) => {
  const steps = [
    { label: "Cliente", icon: <User className="h-4 w-4" /> },
    { label: "Dados", icon: <Weight className="h-4 w-4" /> },
    { label: "Objetivo", icon: <Target className="h-4 w-4" /> },
    { label: "Dieta", icon: <ActivitySquare className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center relative"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                ${index < currentStep 
                  ? "bg-primary-500 text-white" 
                  : index === currentStep 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-400"}`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.icon
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${index <= currentStep ? "text-primary-500" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-1 bg-gray-100" />
    </div>
  );
};

// Componente de loading da geração
const GeneratingDiet = ({ progress }) => {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
      <h3 className="text-xl font-medium mb-2">Gerando sua dieta...</h3>
      <p className="text-gray-500 mb-6">Estamos calculando o plano nutricional ideal</p>
      
      <div className="max-w-md mx-auto">
        <Progress value={progress} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Calculando calorias</span>
          <span>Selecionando alimentos</span>
          <span>Finalizando</span>
        </div>
      </div>
    </div>
  );
};

export default function Calculator() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Função para avançar o passo
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Iniciar geração da dieta
      setIsGenerating(true);
      
      // Simular progresso
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setGenerationProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Finalizar geração após 100%
          setTimeout(() => {
            setIsGenerating(false);
            toast.success("Dieta gerada com sucesso!");
            // Redirecionar para a página de resultado
            router.push("/calculator/result");
          }, 500);
        }
      }, 200);
    }
  };
  
  // Função para voltar um passo
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calculadora de Dietas</h1>
          <p className="text-gray-500">Crie dietas personalizadas para seus clientes</p>
        </div>
      </div>

      {isGenerating ? (
        <CardPremium variant="default" animation="fadeIn">
          <CardContent className="p-8">
            <GeneratingDiet progress={generationProgress} />
          </CardContent>
        </CardPremium>
      ) : (
        <CardPremium variant="default" animation="fadeIn">
          <CardHeader>
            <CardTitle>Nova Dieta</CardTitle>
            <CardDescription>
              Preencha os dados para gerar uma dieta personalizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalculatorSteps currentStep={currentStep} />
            
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Selecione ou cadastre um cliente</h3>
                
                <Tabs defaultValue="select" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="select">Selecionar Cliente</TabsTrigger>
                    <TabsTrigger value="new">Novo Cliente</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="select">
                    <div className="space-y-4">
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="Buscar cliente..." 
                          className="mb-4"
                        />
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary-300 hover:bg-primary-50 ${
                              selectedClient === `client-${i}` ? "border-primary-500 bg-primary-50" : "border-gray-200"
                            }`}
                            onClick={() => setSelectedClient(`client-${i}`)}
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">Cliente Exemplo {i + 1}</h4>
                                <p className="text-sm text-gray-500">ID: A-0{i+1}</p>
                              </div>
                              {selectedClient === `client-${i}` && (
                                <ChevronRight className="ml-auto h-5 w-5 text-primary-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="new">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input id="name" placeholder="Nome do cliente" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@exemplo.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone/WhatsApp</Label>
                            <Input id="phone" placeholder="(00) 00000-0000" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Dados Físicos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Sexo</Label>
                      <Select defaultValue="male">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Idade</span>
                        </div>
                      </Label>
                      <Input id="age" type="number" placeholder="Anos" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">
                        <div className="flex items-center">
                          <Weight className="h-4 w-4 mr-2" />
                          <span>Peso (kg)</span>
                        </div>
                      </Label>
                      <Input id="weight" type="number" placeholder="Quilogramas" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">
                        <div className="flex items-center">
                          <Ruler className="h-4 w-4 mr-2" />
                          <span>Altura (cm)</span>
                        </div>
                      </Label>
                      <Input id="height" type="number" placeholder="Centímetros" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity">Nível de Atividade Física</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                      <SelectItem value="light">Levemente ativo (exercício leve 1-3 dias/semana)</SelectItem>
                      <SelectItem value="moderate">Moderadamente ativo (exercício moderado 3-5 dias/semana)</SelectItem>
                      <SelectItem value="active">Muito ativo (exercício intenso 6-7 dias/semana)</SelectItem>
                      <SelectItem value="extreme">Extremamente ativo (exercício muito intenso, trabalho físico)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Objetivo da Dieta</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Objetivo Principal</Label>
                    <Select defaultValue="maintain">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">Perda de Peso</SelectItem>
                        <SelectItem value="maintain">Manutenção de Peso</SelectItem>
                        <SelectItem value="gain">Ganho de Massa Muscular</SelectItem>
                        <SelectItem value="performance">Melhora de Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="restrictions">Restrições Alimentares</Label>
                    <Select defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as restrições" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="vegetarian">Vegetariano</SelectItem>
                        <SelectItem value="vegan">Vegano</SelectItem>
                        <SelectItem value="lactose">Intolerância à Lactose</SelectItem>
                        <SelectItem value="gluten">Intolerância ao Glúten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meals">Número de Refeições</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 refeições</SelectItem>
                        <SelectItem value="4">4 refeições</SelectItem>
                        <SelectItem value="5">5 refeições</SelectItem>
                        <SelectItem value="6">6 refeições</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Tipo de Dieta</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CardPremium 
                    variant="outline" 
                    className="cursor-pointer hover:border-primary-300 hover:shadow-medium transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                          <ActivitySquare className="h-6 w-6 text-primary-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Dieta Personalizada IA</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Gerada com base nos dados fornecidos, utilizando inteligência artificial.
                        </p>
                        <div className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                          1 crédito
                        </div>
                      </div>
                    </CardContent>
                  </CardPremium>
                  
                  <CardPremium 
                    variant="outline" 
                    className="cursor-pointer hover:border-primary-300 hover:shadow-medium transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                          <Plus className="h-6 w-6 text-secondary-600" />
                        </div>
                        <h3 className="font-medium text-lg mb-2">Template Predefinido</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Utilize um dos nossos templates já prontos, ajustados para o cliente.
                        </p>
                        <div className="text-xs px-2 py-1 bg-secondary-50 text-secondary-700 rounded-full">
                          0 créditos
                        </div>
                      </div>
                    </CardContent>
                  </CardPremium>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Voltar
            </Button>
            <Button onClick={nextStep}>
              {currentStep < 3 ? "Continuar" : "Gerar Dieta"}
            </Button>
          </CardFooter>
        </CardPremium>
      )}
    </div>
  );
}