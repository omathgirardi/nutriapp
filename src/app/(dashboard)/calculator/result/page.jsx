"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { 
  FileText, 
  Send, 
  Download, 
  ArrowLeft, 
  BookOpen, 
  Utensils, 
  Calendar, 
  Clock, 
  Printer,
  Edit
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { sendPdfFile } from "@/lib/evolution-api";
import { updateUserCredits } from "@/lib/firebase-services";
import { downloadDietPDF, generateDietPDFUrl } from "@/lib/pdf-generator";

// Mock data para as refeições
const mealPlanMock = {
  breakfast: [
    { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
    { food: "Pão integral", quantity: "2 fatias", calories: 160, protein: 8, carbs: 28, fat: 2 },
    { food: "Abacate", quantity: "1/2 unidade", calories: 120, protein: 1, carbs: 6, fat: 10 }
  ],
  morningSnack: [
    { food: "Iogurte natural", quantity: "200g", calories: 120, protein: 10, carbs: 12, fat: 4 },
    { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
    { food: "Granola", quantity: "20g", calories: 90, protein: 3, carbs: 15, fat: 3 }
  ],
  lunch: [
    { food: "Peito de frango grelhado", quantity: "150g", calories: 250, protein: 47, carbs: 0, fat: 5 },
    { food: "Arroz integral", quantity: "100g", calories: 130, protein: 3, carbs: 27, fat: 1 },
    { food: "Feijão preto", quantity: "100g", calories: 120, protein: 7, carbs: 22, fat: 0 },
    { food: "Brócolis refogado", quantity: "100g", calories: 55, protein: 3, carbs: 11, fat: 0 },
    { food: "Azeite de oliva", quantity: "1 colher", calories: 40, protein: 0, carbs: 0, fat: 4.5 }
  ],
  afternoonSnack: [
    { food: "Maçã", quantity: "1 unidade", calories: 95, protein: 0, carbs: 25, fat: 0 },
    { food: "Pasta de amendoim", quantity: "1 colher", calories: 95, protein: 4, carbs: 3, fat: 8 }
  ],
  dinner: [
    { food: "Salmão grelhado", quantity: "150g", calories: 280, protein: 39, carbs: 0, fat: 13 },
    { food: "Batata doce assada", quantity: "150g", calories: 135, protein: 2, carbs: 32, fat: 0 },
    { food: "Aspargos", quantity: "100g", calories: 20, protein: 2, carbs: 4, fat: 0 },
    { food: "Azeite de oliva", quantity: "1 colher", calories: 40, protein: 0, carbs: 0, fat: 4.5 }
  ],
  supper: [
    { food: "Chá de camomila", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
    { food: "Queijo cottage", quantity: "100g", calories: 98, protein: 11, carbs: 3, fat: 4 }
  ]
};

// Componente de tabela de refeição
const MealTable = ({ title, icon, mealItems }) => {
  const totalCalories = mealItems.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = mealItems.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = mealItems.reduce((acc, item) => acc + item.carbs, 0);
  const totalFat = mealItems.reduce((acc, item) => acc + item.fat, 0);

  return (
    <div className="mb-8">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-lg font-medium ml-2">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600">Alimento</th>
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600">Quantidade</th>
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600 text-right">Calorias</th>
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600 text-right">Proteína</th>
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600 text-right">Carboidratos</th>
              <th className="py-2 px-3 border-b border-gray-200 text-sm font-medium text-gray-600 text-right">Gorduras</th>
            </tr>
          </thead>
          <tbody>
            {mealItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-3 text-sm">{item.food}</td>
                <td className="py-3 px-3 text-sm text-gray-600">{item.quantity}</td>
                <td className="py-3 px-3 text-sm text-right">{item.calories} kcal</td>
                <td className="py-3 px-3 text-sm text-right">{item.protein}g</td>
                <td className="py-3 px-3 text-sm text-right">{item.carbs}g</td>
                <td className="py-3 px-3 text-sm text-right">{item.fat}g</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={2} className="py-2 px-3 text-sm">Total</td>
              <td className="py-2 px-3 text-sm text-right">{totalCalories} kcal</td>
              <td className="py-2 px-3 text-sm text-right">{totalProtein}g</td>
              <td className="py-2 px-3 text-sm text-right">{totalCarbs}g</td>
              <td className="py-2 px-3 text-sm text-right">{totalFat}g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente de macronutrientes
const MacroSummary = ({ calories, protein, carbs, fat }) => {
  // Calcular percentuais
  const proteinCalories = protein * 4;
  const carbsCalories = carbs * 4;
  const fatCalories = fat * 9;
  
  const proteinPercentage = Math.round((proteinCalories / calories) * 100);
  const carbsPercentage = Math.round((carbsCalories / calories) * 100);
  const fatPercentage = Math.round((fatCalories / calories) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="text-gray-500 text-sm mb-1">Calorias Diárias</div>
        <div className="text-2xl font-bold">{calories} kcal</div>
      </div>
      
      <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
        <div className="text-primary-700 text-sm mb-1">Proteínas ({proteinPercentage}%)</div>
        <div className="text-2xl font-bold text-primary-700">{protein}g</div>
      </div>
      
      <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-100">
        <div className="text-secondary-700 text-sm mb-1">Carboidratos ({carbsPercentage}%)</div>
        <div className="text-2xl font-bold text-secondary-700">{carbs}g</div>
      </div>
      
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <div className="text-amber-700 text-sm mb-1">Gorduras ({fatPercentage}%)</div>
        <div className="text-2xl font-bold text-amber-700">{fat}g</div>
      </div>
    </div>
  );
};

export default function DietResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [diet, setDiet] = useState(null);
  
  // Na vida real, você obteria os dados de diet a partir de searchParams ou via API
  // Por exemplo, usando o dietId de searchParams.get('dietId')
  useEffect(() => {
    // Simulação de carregamento dos dados da dieta
    const loadDiet = () => {
      // Em um cenário real, você carregaria do banco de dados
      // const dietId = searchParams.get('dietId');
      
      // Mock de dados da dieta
      setDiet({
        id: "D-123456",
        title: "Dieta para Ganho Muscular",
        clientName: "João Silva",
        clientId: "A-01",
        calories: 2450,
        protein: 184,
        carbs: 245,
        fat: 82,
        goal: "gain",
        createdAt: new Date().toLocaleDateString(),
        mealPlan: mealPlanMock
      });
    };
    
    loadDiet();
  }, [searchParams]);
  
  // Se a dieta não foi carregada, mostrar mensagem de carregamento
  if (!diet) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Calcular totais diários
  const totalCalories = Object.values(diet.mealPlan).reduce(
    (acc, meal) => acc + meal.reduce((sum, food) => sum + food.calories, 0), 
    0
  );
  
  const totalProtein = Object.values(diet.mealPlan).reduce(
    (acc, meal) => acc + meal.reduce((sum, food) => sum + food.protein, 0), 
    0
  );
  
  const totalCarbs = Object.values(diet.mealPlan).reduce(
    (acc, meal) => acc + meal.reduce((sum, food) => sum + food.carbs, 0), 
    0
  );
  
  const totalFat = Object.values(diet.mealPlan).reduce(
    (acc, meal) => acc + meal.reduce((sum, food) => sum + food.fat, 0), 
    0
  );

  // Função para lidar com o envio via WhatsApp
  const handleSendWhatsApp = async () => {
    try {
      setIsLoading(true);
      
      // Gerar PDF e obter URL
      const pdfUrl = await generateDietPDFUrl(diet);
      
      // Enviar para o WhatsApp usando a Evolution API
      await sendPdfFile(
        "5511987654321", // Número de telefone do cliente (deve vir do banco de dados)
        pdfUrl,
        `Olá! Aqui está sua dieta de ${diet.title} com ${totalCalories} kcal diárias.`
      );
      
      // Debitar um crédito do usuário
      if (user) {
        await updateUserCredits(user.uid, 1);
      }
      
      toast.success("Dieta enviada com sucesso para o WhatsApp!");
    } catch (error) {
      console.error("Erro ao enviar dieta:", error);
      toast.error("Erro ao enviar a dieta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o download do PDF
  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      
      // Gerar e fazer download do PDF
      await downloadDietPDF(diet);
      
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para editar a dieta
  const handleEditDiet = () => {
    router.push(`/calculator/edit?dietId=${diet.id}`);
  };

  // Função para imprimir a dieta
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          <h1 className="text-2xl font-bold">{diet.title}</h1>
          <p className="text-gray-500">
            Cliente: {diet.clientName} • Criada em: {diet.createdAt}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleEditDiet}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Dieta
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDownloadPDF}
            loading={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
          
          <Button 
            onClick={handleSendWhatsApp}
            loading={isLoading}
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar WhatsApp
          </Button>
        </div>
      </div>
      
      <CardPremium variant="default" animation="fadeIn">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Resumo da Dieta</CardTitle>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>
          <CardDescription>
            Plano nutricional personalizado conforme o objetivo: <span className="font-medium">{diet.goal === "gain" ? "Ganho Muscular" : diet.goal === "lose" ? "Perda de Peso" : "Manutenção"}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="full">
            <TabsList className="mb-6">
              <TabsTrigger value="full">Dieta Completa</TabsTrigger>
              <TabsTrigger value="summary">Resumo</TabsTrigger>
              <TabsTrigger value="notes">Observações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="full">
              {/* Resumo de macronutrientes */}
              <MacroSummary 
                calories={totalCalories} 
                protein={totalProtein} 
                carbs={totalCarbs} 
                fat={totalFat} 
              />
              
              {/* Tabelas de refeições */}
              <MealTable 
                title="Café da Manhã" 
                icon={<Clock className="h-5 w-5 text-primary-500" />} 
                mealItems={diet.mealPlan.breakfast} 
              />
              
              <MealTable 
                title="Lanche da Manhã" 
                icon={<Clock className="h-5 w-5 text-amber-500" />} 
                mealItems={diet.mealPlan.morningSnack} 
              />
              
              <MealTable 
                title="Almoço" 
                icon={<Utensils className="h-5 w-5 text-primary-500" />} 
                mealItems={diet.mealPlan.lunch} 
              />
              
              <MealTable 
                title="Lanche da Tarde" 
                icon={<Clock className="h-5 w-5 text-amber-500" />} 
                mealItems={diet.mealPlan.afternoonSnack} 
              />
              
              <MealTable 
                title="Jantar" 
                icon={<Utensils className="h-5 w-5 text-primary-500" />} 
                mealItems={diet.mealPlan.dinner} 
              />
              
              <MealTable 
                title="Ceia" 
                icon={<Clock className="h-5 w-5 text-amber-500" />} 
                mealItems={diet.mealPlan.supper} 
              />
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="space-y-6">
                <MacroSummary 
                  calories={totalCalories} 
                  protein={totalProtein} 
                  carbs={totalCarbs} 
                  fat={totalFat} 
                />
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Resumo das Refeições</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary-500 mr-2" />
                        <span className="font-medium">Café da Manhã</span>
                      </div>
                      <span>{diet.mealPlan.breakfast.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium">Lanche da Manhã</span>
                      </div>
                      <span>{diet.mealPlan.morningSnack.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 text-primary-500 mr-2" />
                        <span className="font-medium">Almoço</span>
                      </div>
                      <span>{diet.mealPlan.lunch.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium">Lanche da Tarde</span>
                      </div>
                      <span>{diet.mealPlan.afternoonSnack.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <Utensils className="h-5 w-5 text-primary-500 mr-2" />
                        <span className="font-medium">Jantar</span>
                      </div>
                      <span>{diet.mealPlan.dinner.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium">Ceia</span>
                      </div>
                      <span>{diet.mealPlan.supper.reduce((acc, item) => acc + item.calories, 0)} kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-4">Observações Importantes</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary-700">Recomendações Gerais</h4>
                    <p className="mt-1 text-gray-600">
                      Consuma bastante água durante o dia, pelo menos 2 litros. 
                      Evite alimentos processados e prefira sempre os naturais.
                      Mantenha os horários das refeições o mais regular possível.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary-700">Suplementação Recomendada</h4>
                    <p className="mt-1 text-gray-600">
                      • Whey Protein: 1 scoop (30g) após o treino<br />
                      • Creatina: 5g diários<br />
                      • Multivitamínico: 1 cápsula ao dia
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary-700">Substituições Permitidas</h4>
                    <p className="mt-1 text-gray-600">
                      • Peito de frango pode ser substituído por peito de peru ou peixe branco<br />
                      • Arroz integral pode ser substituído por batata doce ou quinoa<br />
                      • Frutas podem ser trocadas por outras de valor calórico semelhante
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </CardPremium>
    </div>
  );
}