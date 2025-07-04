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
  ChevronRight,
  Info,
  CheckCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { calculateNutritionPlan, distributeMeals } from "@/lib/nutrition-calculator";
import { saveDietToHistory, updateUserCredits } from "@/lib/firebase-services";
import { getDietTemplate, adjustDietTemplate } from "@/lib/diet-templates";

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
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Estados para formulário
  const [formData, setFormData] = useState({
    // Dados do cliente
    clientName: "",
    clientId: "",
    // Dados físicos
    gender: "male",
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate",
    // Objetivo
    goal: "maintain",
    restrictions: "none",
    meals: "5",
    // Tipo de dieta
    dietType: "ai"
  });
  
  // Atualizar dados do formulário
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Selecionar cliente existente
  const handleSelectClient = (client) => {
    setSelectedClient(client.id);
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientId: client.id
    }));
  };
  
  // Selecionar tipo de dieta
  const handleSelectDietType = (type) => {
    setFormData(prev => ({
      ...prev,
      dietType: type
    }));
  };
  
  // Função para avançar o passo
  const nextStep = () => {
    // Validar o passo atual
    if (!validateCurrentStep()) {
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Verificar se o usuário tem créditos suficientes para gerar dieta IA
      if (formData.dietType === "ai" && (user?.credits || 0) < 1) {
        toast.error("Você não tem créditos suficientes para gerar uma dieta personalizada IA. Compre mais créditos ou escolha um template.");
        return;
      }
      
      // Iniciar geração da dieta
      generateDiet();
    }
  };
  
  // Validação do passo atual
  const validateCurrentStep = () => {
    if (currentStep === 0) {
      // Validar seleção de cliente
      if (!formData.clientName) {
        toast.error("Selecione ou cadastre um cliente");
        return false;
      }
    } else if (currentStep === 1) {
      // Validar dados físicos
      if (!formData.age || !formData.weight || !formData.height) {
        toast.error("Preencha todos os campos obrigatórios");
        return false;
      }
      
      // Validar valores numéricos
      if (formData.age < 10 || formData.age > 100) {
        toast.error("Idade deve estar entre 10 e 100 anos");
        return false;
      }
      
      if (formData.weight < 30 || formData.weight > 250) {
        toast.error("Peso deve estar entre 30 e 250 kg");
        return false;
      }
      
      if (formData.height < 100 || formData.height > 250) {
        toast.error("Altura deve estar entre 100 e 250 cm");
        return false;
      }
    } else if (currentStep === 3) {
      // Validar tipo de dieta
      if (!formData.dietType) {
        toast.error("Selecione um tipo de dieta");
        return false;
      }
    }
    
    return true;
  };
  
  // Gerar dieta
  const generateDiet = async () => {
    setIsGenerating(true);
    
    try {
      // Simular progresso
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setGenerationProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          finalizeDietGeneration();
        }
      }, 150);
    } catch (error) {
      console.error("Erro ao gerar dieta:", error);
      toast.error("Ocorreu um erro ao gerar a dieta. Tente novamente.");
      setIsGenerating(false);
    }
  };
  
  // Finalizar geração da dieta
  const finalizeDietGeneration = async () => {
    try {
      // Calcular plano nutricional
      const nutritionPlan = calculateNutritionPlan({
        gender: formData.gender,
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height),
        activityLevel: formData.activityLevel,
        goal: formData.goal
      });
      
      let dietData;
      
      if (formData.dietType === "template") {
        // Usar um template de dieta predefinido
        const template = getDietTemplate(formData.goal, formData.restrictions);
        
        // Ajustar o template para as necessidades calóricas do cliente
        const adjustedTemplate = adjustDietTemplate(template, nutritionPlan);
        
        // Criar objeto da dieta
        dietData = {
          title: template.title,
          description: template.description,
          clientName: formData.clientName,
          clientId: formData.clientId,
          gender: formData.gender,
          age: parseInt(formData.age),
          weight: parseInt(formData.weight),
          height: parseInt(formData.height),
          activityLevel: formData.activityLevel,
          goal: formData.goal,
          restrictions: formData.restrictions,
          meals: parseInt(formData.meals),
          dietType: formData.dietType,
          calories: nutritionPlan.dailyCalories,
          protein: nutritionPlan.macros.protein,
          carbs: nutritionPlan.macros.carbs,
          fat: nutritionPlan.macros.fat,
          bmr: nutritionPlan.bmr,
          tdee: nutritionPlan.tdee,
          mealPlan: adjustedTemplate.meals,
          createdAt: new Date().toISOString()
        };
      } else {
        // Distribuir refeições para dieta personalizada IA
        const mealDistribution = distributeMeals(nutritionPlan, parseInt(formData.meals));
        
        // Em um ambiente real, aqui você usaria a IA para gerar uma dieta personalizada
        // baseada nas necessidades calóricas e preferências do cliente
        
        // Para este exemplo, vamos usar o template mais adequado como base e depois permitir edição manual
        const template = getDietTemplate(formData.goal, formData.restrictions);
        const adjustedTemplate = adjustDietTemplate(template, nutritionPlan);
        
        // Criar objeto da dieta
        dietData = {
          title: `Dieta Personalizada para ${formData.goal === 'gain' ? 'Ganho Muscular' : formData.goal === 'lose' ? 'Perda de Peso' : 'Manutenção'}`,
          description: "Dieta personalizada gerada com IA",
          clientName: formData.clientName,
          clientId: formData.clientId,
          gender: formData.gender,
          age: parseInt(formData.age),
          weight: parseInt(formData.weight),
          height: parseInt(formData.height),
          activityLevel: formData.activityLevel,
          goal: formData.goal,
          restrictions: formData.restrictions,
          meals: parseInt(formData.meals),
          dietType: formData.dietType,
          calories: nutritionPlan.dailyCalories,
          protein: nutritionPlan.macros.protein,
          carbs: nutritionPlan.macros.carbs,
          fat: nutritionPlan.macros.fat,
          bmr: nutritionPlan.bmr,
          tdee: nutritionPlan.tdee,
          mealPlan: adjustedTemplate.meals,
          createdAt: new Date().toISOString()
        };
      }
      
      // Salvar dieta no histórico
      if (user?.uid) {
        await saveDietToHistory(user.uid, dietData);
        
        // Debitar crédito se for dieta IA
        if (formData.dietType === "ai") {
          await updateUserCredits(user.uid, 1);
        }
      }
      
      // Simular atraso para finalização
      setTimeout(() => {
        setIsGenerating(false);
        toast.success("Dieta gerada com sucesso!");
        
        // Redirecionar para a página de resultado
        router.push("/calculator/result");
      }, 500);
    } catch (error) {
      console.error("Erro ao finalizar dieta:", error);
      toast.error("Ocorreu um erro ao finalizar a dieta. Tente novamente.");
      setIsGenerating(false);
    }
  };
  
  // Função para voltar um passo
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Mock de clientes para exemplo
  const mockClients = [
    { id: "A-01", name: "João Silva", info: "32 anos, 78kg" },
    { id: "A-02", name: "Maria Santos", info: "28 anos, 64kg" },
    { id: "A-03", name: "Pedro Oliveira", info: "35 anos, 85kg" },
    { id: "A-04", name: "Ana Souza", info: "42 anos, 70kg" },
    { id: "A-05", name: "Carlos Ferreira", info: "25 anos, 92kg" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calculadora de Dietas</h1>
          <p className="text-gray-500">Crie dietas personalizadas para seus clientes</p>
        </div>
        
        {user && (
          <div className="bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
            <span className="text-primary-700 text-sm font-medium">
              {user.credits || 0} créditos disponíveis
            </span>
          </div>
        )}
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
                        {mockClients.map((client) => (
                          <div 
                            key={client.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary-300 hover:bg-primary-50 ${
                              selectedClient === client.id ? "border-primary-500 bg-primary-50" : "border-gray-200"
                            }`}
                            onClick={() => handleSelectClient(client)}
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">{client.name}</h4>
                                <p className="text-sm text-gray-500">ID: {client.id}</p>
                              </div>
                              {selectedClient === client.id && (
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
                          <Input 
                            id="name" 
                            placeholder="Nome do cliente" 
                            value={formData.clientName}
                            onChange={(e) => handleChange("clientName", e.target.value)}
                          />
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
                      <Select 
                        value={formData.gender}
                        onValueChange={(value) => handleChange("gender", value)}
                      >
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
                      <Input 
                        id="age" 
                        type="number" 
                        placeholder="Anos" 
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                      />
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
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="Quilogramas" 
                        value={formData.weight}
                        onChange={(e) => handleChange("weight", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">
                        <div className="flex items-center">
                          <Ruler className="h-4 w-4 mr-2" />
                          <span>Altura (cm)</span>
                        </div>
                      </Label>
                      <Input 
                        id="height" 
                        type="number" 
                        placeholder="Centímetros" 
                        value={formData.height}
                        onChange={(e) => handleChange("height", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity">Nível de Atividade Física</Label>
                  <Select 
                    value={formData.activityLevel}
                    onValueChange={(value) => handleChange("activityLevel", value)}
                  >
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
                
                {formData.weight && formData.height && (
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 mt-4">
                    <div className="flex items-center mb-2">
                      <Info className="h-4 w-4 text-primary-500 mr-2" />
                      <h4 className="font-medium text-primary-700">Informações Calculadas</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      IMC: <span className="font-medium">{(parseInt(formData.weight) / Math.pow(parseInt(formData.height) / 100, 2)).toFixed(1)}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Objetivo da Dieta</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Objetivo Principal</Label>
                    <Select 
                      value={formData.goal}
                      onValueChange={(value) => handleChange("goal", value)}
                    >
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
                    <Select 
                      value={formData.restrictions}
                      onValueChange={(value) => handleChange("restrictions", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as restrições" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="vegetarian">Vegetariano</SelectItem>
                        <SelectItem value="vegan">Vegano</SelectItem>
                        <SelectItem value="gluten">Intolerância ao Glúten</SelectItem>
                        <SelectItem value="lactose">Intolerância à Lactose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meals">Número de Refeições</Label>
                    <Select 
                      value={formData.meals}
                      onValueChange={(value) => handleChange("meals", value)}
                    >
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
                
                {formData.weight && formData.height && formData.age && formData.goal && (
                  <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 mt-4">
                    <div className="flex items-center mb-3">
                      <Info className="h-4 w-4 text-primary-500 mr-2" />
                      <h4 className="font-medium text-primary-700">Prévia de Calorias e Macros</h4>
                    </div>
                    
                    {(() => {
                      // Calcular prévia
                      const previewPlan = calculateNutritionPlan({
                        gender: formData.gender,
                        age: parseInt(formData.age),
                        weight: parseInt(formData.weight),
                        height: parseInt(formData.height),
                        activityLevel: formData.activityLevel,
                        goal: formData.goal
                      });
                      
                      return (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Calorias Diárias:</p>
                            <p className="font-medium">{previewPlan.dailyCalories} kcal</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Proteínas:</p>
                            <p className="font-medium">{previewPlan.macros.protein}g</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Carboidratos:</p>
                            <p className="font-medium">{previewPlan.macros.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gorduras:</p>
                            <p className="font-medium">{previewPlan.macros.fat}g</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Tipo de Dieta</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.dietType === "ai" 
                        ? "border-2 border-primary-300 shadow-md" 
                        : "border border-gray-200"
                    } rounded-xl overflow-hidden`}
                    onClick={() => handleSelectDietType("ai")}
                  >
                    <div className="p-6">
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
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                      {formData.dietType === "ai" ? (
                        <div className="flex items-center text-primary-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Selecionado</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Clique para selecionar</div>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.dietType === "template" 
                        ? "border-2 border-secondary-300 shadow-md" 
                        : "border border-gray-200"
                    } rounded-xl overflow-hidden`}
                    onClick={() => handleSelectDietType("template")}
                  >
                    <div className="p-6">
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
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                      {formData.dietType === "template" ? (
                        <div className="flex items-center text-secondary-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Selecionado</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Clique para selecionar</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Informações sobre os tipos de dieta</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Dieta Personalizada IA:</strong> Criada especificamente para o seu cliente com base em todos os dados fornecidos. 
                        Utiliza IA para selecionar os melhores alimentos e porções para atingir os objetivos.
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Template Predefinido:</strong> Utiliza um plano alimentar padrão, apenas ajustando as calorias e macronutrientes 
                        para o seu cliente. Ideal para casos mais simples.
                      </p>
                    </div>
                  </div>
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