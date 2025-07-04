"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle,
  Trash2,
  Save,
  Edit,
  X,
  Clock,
  Utensils
} from "lucide-react";
import { toast } from "sonner";

const MealEditor = ({ mealName, mealItems, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([...mealItems]);
  
  // Atualizar items quando mealItems muda
  useEffect(() => {
    setItems([...mealItems]);
  }, [mealItems]);
  
  // Função para adicionar um novo item
  const addItem = () => {
    const newItem = {
      food: "",
      quantity: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    
    setItems([...items, newItem]);
  };
  
  // Função para remover um item
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  
  // Função para atualizar um item
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    
    // Se o campo for numérico, converter para número
    if (["calories", "protein", "carbs", "fat"].includes(field)) {
      newItems[index][field] = !isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    } else {
      newItems[index][field] = value;
    }
    
    setItems(newItems);
  };
  
  // Função para salvar as alterações
  const saveChanges = () => {
    onUpdate(mealName, items);
    setIsEditing(false);
    toast.success(`Refeição ${getMealTitle(mealName)} atualizada!`);
  };
  
  // Função para cancelar as alterações
  const cancelChanges = () => {
    setItems([...mealItems]);
    setIsEditing(false);
  };
  
  // Função para obter o título da refeição
  const getMealTitle = (meal) => {
    switch (meal) {
      case "breakfast": return "Café da Manhã";
      case "morningSnack": return "Lanche da Manhã";
      case "lunch": return "Almoço";
      case "afternoonSnack": return "Lanche da Tarde";
      case "dinner": return "Jantar";
      case "supper": return "Ceia";
      case "preworkoutSnack": return "Pré-treino";
      case "postworkout": return "Pós-treino";
      default: return meal;
    }
  };
  
  // Obter o ícone da refeição
  const getMealIcon = (meal) => {
    switch (meal) {
      case "breakfast": return <Clock className="h-5 w-5 text-primary-500" />;
      case "morningSnack": return <Clock className="h-5 w-5 text-amber-500" />;
      case "lunch": return <Utensils className="h-5 w-5 text-primary-500" />;
      case "afternoonSnack": return <Clock className="h-5 w-5 text-amber-500" />;
      case "dinner": return <Utensils className="h-5 w-5 text-primary-500" />;
      case "supper": return <Clock className="h-5 w-5 text-amber-500" />;
      case "preworkoutSnack": return <Clock className="h-5 w-5 text-amber-500" />;
      case "postworkout": return <Clock className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="mb-8 border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {getMealIcon(mealName)}
          <h3 className="text-lg font-medium ml-2">{getMealTitle(mealName)}</h3>
        </div>
        
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Refeição
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={cancelChanges}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button size="sm" onClick={saveChanges}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        )}
      </div>
      
      {!isEditing ? (
        // Modo visualização
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
              {items.map((item, index) => (
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
                <td className="py-2 px-3 text-sm text-right">
                  {items.reduce((acc, item) => acc + item.calories, 0)} kcal
                </td>
                <td className="py-2 px-3 text-sm text-right">
                  {items.reduce((acc, item) => acc + item.protein, 0)}g
                </td>
                <td className="py-2 px-3 text-sm text-right">
                  {items.reduce((acc, item) => acc + item.carbs, 0)}g
                </td>
                <td className="py-2 px-3 text-sm text-right">
                  {items.reduce((acc, item) => acc + item.fat, 0)}g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        // Modo edição
        <div>
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-3 mb-3">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Item #{index + 1}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <Label htmlFor={`food-${index}`} className="text-xs">
                    Alimento
                  </Label>
                  <Input
                    id={`food-${index}`}
                    value={item.food}
                    onChange={(e) => updateItem(index, "food", e.target.value)}
                    placeholder="Ex: Frango grelhado"
                  />
                </div>
                <div>
                  <Label htmlFor={`quantity-${index}`} className="text-xs">
                    Quantidade
                  </Label>
                  <Input
                    id={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                    placeholder="Ex: 100g"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <Label htmlFor={`calories-${index}`} className="text-xs">
                    Calorias (kcal)
                  </Label>
                  <Input
                    id={`calories-${index}`}
                    type="number"
                    value={item.calories}
                    onChange={(e) => updateItem(index, "calories", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor={`protein-${index}`} className="text-xs">
                    Proteína (g)
                  </Label>
                  <Input
                    id={`protein-${index}`}
                    type="number"
                    value={item.protein}
                    onChange={(e) => updateItem(index, "protein", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor={`carbs-${index}`} className="text-xs">
                    Carboidratos (g)
                  </Label>
                  <Input
                    id={`carbs-${index}`}
                    type="number"
                    value={item.carbs}
                    onChange={(e) => updateItem(index, "carbs", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor={`fat-${index}`} className="text-xs">
                    Gorduras (g)
                  </Label>
                  <Input
                    id={`fat-${index}`}
                    type="number"
                    value={item.fat}
                    onChange={(e) => updateItem(index, "fat", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={addItem}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Alimento
          </Button>
        </div>
      )}
    </div>
  );
};

export const DietEditor = ({ diet, onSave }) => {
  const [currentDiet, setCurrentDiet] = useState(diet);
  
  // Função para atualizar uma refeição
  const handleMealUpdate = (mealName, items) => {
    const updatedDiet = { ...currentDiet };
    updatedDiet.mealPlan[mealName] = items;
    setCurrentDiet(updatedDiet);
  };
  
  // Função para calcular macros totais
  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    Object.values(currentDiet.mealPlan).forEach(meal => {
      meal.forEach(item => {
        totalCalories += item.calories;
        totalProtein += item.protein;
        totalCarbs += item.carbs;
        totalFat += item.fat;
      });
    });
    
    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
  };
  
  // Função para salvar a dieta
  const handleSaveDiet = () => {
    const totals = calculateTotals();
    
    // Atualizar os totais na dieta
    const updatedDiet = {
      ...currentDiet,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat
    };
    
    onSave(updatedDiet);
    toast.success("Dieta salva com sucesso!");
  };
  
  // Renderizar totais
  const totals = calculateTotals();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Editor de Dieta</h2>
        <Button onClick={handleSaveDiet}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Dieta
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="font-medium mb-2">Resumo Nutricional</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-600 text-sm">Calorias</span>
            <p className="font-bold">{totals.calories} kcal</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Proteínas</span>
            <p className="font-bold">{totals.protein}g</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Carboidratos</span>
            <p className="font-bold">{totals.carbs}g</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Gorduras</span>
            <p className="font-bold">{totals.fat}g</p>
          </div>
        </div>
      </div>
      
      {/* Editores de refeição */}
      {Object.keys(currentDiet.mealPlan).map((mealName) => (
        <MealEditor 
          key={mealName}
          mealName={mealName}
          mealItems={currentDiet.mealPlan[mealName]}
          onUpdate={handleMealUpdate}
        />
      ))}
    </div>
  );
};