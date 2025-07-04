"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { ArrowLeft, Save, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { DietEditor } from "@/components/diet-editor";
import { saveDietToHistory } from "@/lib/firebase-services";

// Mock de dados da dieta
const mockDiet = {
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
  mealPlan: {
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
  }
};

export default function EditDiet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [diet, setDiet] = useState(null);
  
  useEffect(() => {
    // Simulação de carregamento dos dados da dieta
    // Em um ambiente real, você carregaria os dados do banco de dados
    // const dietId = searchParams.get('dietId');
    
    setDiet(mockDiet);
  }, [searchParams]);
  
  // Se a dieta não foi carregada, mostrar mensagem de carregamento
  if (!diet) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  const handleSaveDiet = async (updatedDiet) => {
    try {
      setIsLoading(true);
      
      // Em um ambiente real, você salvaria as alterações no banco de dados
      // await updateDiet(updatedDiet.id, updatedDiet);
      
      // Vamos simular o salvamento
      if (user?.uid) {
        await saveDietToHistory(user.uid, {
          ...updatedDiet,
          updatedAt: new Date().toISOString()
        });
      }
      
      toast.success("Dieta atualizada com sucesso!");
      
      // Redirecionar para a página de visualização
      setTimeout(() => {
        router.push("/calculator/result");
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar dieta:", error);
      toast.error("Erro ao salvar dieta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetDiet = () => {
    // Confirmar antes de resetar
    if (confirm("Tem certeza que deseja resetar todas as alterações?")) {
      setDiet(mockDiet);
      toast.info("Dieta restaurada aos valores originais.");
    }
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
          <h1 className="text-2xl font-bold">Editar Dieta</h1>
          <p className="text-gray-500">
            Cliente: {diet.clientName} • Gerada em: {diet.createdAt}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetDiet}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Resetar
          </Button>
          
          <Button 
            onClick={() => handleSaveDiet(diet)}
            loading={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
      
      <CardPremium variant="default" animation="fadeIn">
        <CardHeader>
          <CardTitle>Editor de Dieta Personalizada</CardTitle>
          <CardDescription>
            Edite manualmente as refeições e alimentos da dieta gerada.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <DietEditor 
            diet={diet} 
            onSave={handleSaveDiet}
          />
        </CardContent>
      </CardPremium>
    </div>
  );
}