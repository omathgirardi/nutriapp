/**
 * Biblioteca de templates de dietas predefinidos
 */

// Templates para diferentes objetivos
export const DIET_TEMPLATES = {
  // Dieta para perda de peso
  lose: {
    title: "Dieta para Perda de Peso",
    description: "Plano alimentar com déficit calórico para promover perda de gordura de forma saudável.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
        { food: "Torrada integral", quantity: "1 fatia", calories: 80, protein: 3, carbs: 15, fat: 1 },
        { food: "Tomate", quantity: "1/2 unidade", calories: 15, protein: 1, carbs: 3, fat: 0 }
      ],
      morningSnack: [
        { food: "Maçã", quantity: "1 unidade média", calories: 95, protein: 0, carbs: 25, fat: 0 },
        { food: "Castanhas", quantity: "10g", calories: 60, protein: 2, carbs: 1, fat: 6 }
      ],
      lunch: [
        { food: "Peito de frango grelhado", quantity: "120g", calories: 198, protein: 37, carbs: 0, fat: 4 },
        { food: "Brócolis cozido", quantity: "100g", calories: 55, protein: 3, carbs: 11, fat: 0 },
        { food: "Arroz integral", quantity: "50g cozido", calories: 65, protein: 1.5, carbs: 14, fat: 0.5 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 40, protein: 0, carbs: 0, fat: 4.5 }
      ],
      afternoonSnack: [
        { food: "Iogurte natural desnatado", quantity: "170g", calories: 100, protein: 17, carbs: 6, fat: 0 },
        { food: "Morangos", quantity: "100g", calories: 35, protein: 0.7, carbs: 8, fat: 0.3 }
      ],
      dinner: [
        { food: "Peixe assado", quantity: "120g", calories: 140, protein: 28, carbs: 0, fat: 3 },
        { food: "Legumes no vapor", quantity: "150g", calories: 75, protein: 4, carbs: 15, fat: 0 },
        { food: "Batata doce", quantity: "80g", calories: 70, protein: 1.5, carbs: 16, fat: 0 }
      ],
      supper: [
        { food: "Chá verde", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Queijo cottage", quantity: "50g", calories: 60, protein: 10, carbs: 2, fat: 2 }
      ]
    }
  },
  
  // Dieta para manutenção de peso
  maintain: {
    title: "Dieta para Manutenção",
    description: "Plano alimentar balanceado para manter o peso atual com foco em saúde.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
        { food: "Pão integral", quantity: "2 fatias", calories: 160, protein: 8, carbs: 28, fat: 2 },
        { food: "Abacate", quantity: "1/4 unidade", calories: 80, protein: 1, carbs: 4, fat: 7 }
      ],
      morningSnack: [
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Pasta de amendoim", quantity: "10g", calories: 60, protein: 2.5, carbs: 2, fat: 5 }
      ],
      lunch: [
        { food: "Filé de frango grelhado", quantity: "150g", calories: 250, protein: 47, carbs: 0, fat: 5 },
        { food: "Arroz integral", quantity: "100g", calories: 130, protein: 3, carbs: 27, fat: 1 },
        { food: "Feijão", quantity: "80g", calories: 80, protein: 5, carbs: 14, fat: 0.5 },
        { food: "Salada de folhas", quantity: "à vontade", calories: 25, protein: 2, carbs: 5, fat: 0 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      afternoonSnack: [
        { food: "Iogurte grego", quantity: "170g", calories: 150, protein: 15, carbs: 8, fat: 5 },
        { food: "Granola", quantity: "20g", calories: 90, protein: 3, carbs: 15, fat: 3 }
      ],
      dinner: [
        { food: "Carne magra", quantity: "150g", calories: 200, protein: 40, carbs: 0, fat: 7 },
        { food: "Batata", quantity: "100g", calories: 130, protein: 3, carbs: 30, fat: 0 },
        { food: "Legumes variados", quantity: "150g", calories: 70, protein: 3, carbs: 15, fat: 0 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 45, protein: 0, carbs: 0, fat: 5 }
      ],
      supper: [
        { food: "Chá de camomila", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Castanhas", quantity: "15g", calories: 90, protein: 3, carbs: 2, fat: 8 }
      ]
    }
  },
  
  // Dieta para ganho de massa
  gain: {
    title: "Dieta para Ganho Muscular",
    description: "Plano alimentar hipercalórico para promover ganho de massa muscular.",
    meals: {
      breakfast: [
        { food: "Ovos inteiros", quantity: "3 unidades", calories: 270, protein: 18, carbs: 0, fat: 21 },
        { food: "Pão integral", quantity: "3 fatias", calories: 240, protein: 12, carbs: 42, fat: 3 },
        { food: "Pasta de amendoim", quantity: "20g", calories: 120, protein: 5, carbs: 4, fat: 10 },
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 }
      ],
      morningSnack: [
        { food: "Whey protein", quantity: "30g (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1.5 },
        { food: "Aveia em flocos", quantity: "40g", calories: 150, protein: 5, carbs: 27, fat: 3 },
        { food: "Leite integral", quantity: "250ml", calories: 150, protein: 8, carbs: 12, fat: 8 }
      ],
      lunch: [
        { food: "Carne bovina", quantity: "180g", calories: 350, protein: 50, carbs: 0, fat: 16 },
        { food: "Arroz branco", quantity: "150g", calories: 200, protein: 4, carbs: 45, fat: 0.5 },
        { food: "Feijão", quantity: "100g", calories: 100, protein: 7, carbs: 18, fat: 0.5 },
        { food: "Legumes", quantity: "100g", calories: 50, protein: 2, carbs: 10, fat: 0 },
        { food: "Azeite de oliva", quantity: "15ml", calories: 135, protein: 0, carbs: 0, fat: 15 }
      ],
      afternoonSnack: [
        { food: "Batata doce", quantity: "150g", calories: 135, protein: 2, carbs: 32, fat: 0 },
        { food: "Frango desfiado", quantity: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.5 },
        { food: "Abacate", quantity: "1/2 unidade", calories: 160, protein: 2, carbs: 8, fat: 15 }
      ],
      dinner: [
        { food: "Salmão", quantity: "180g", calories: 370, protein: 40, carbs: 0, fat: 22 },
        { food: "Arroz integral", quantity: "150g", calories: 195, protein: 4.5, carbs: 40, fat: 1.5 },
        { food: "Brócolis", quantity: "120g", calories: 42, protein: 5, carbs: 8, fat: 0.5 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      supper: [
        { food: "Iogurte grego", quantity: "200g", calories: 180, protein: 18, carbs: 10, fat: 7 },
        { food: "Whey protein", quantity: "15g (1/2 scoop)", calories: 60, protein: 12, carbs: 1.5, fat: 0.75 },
        { food: "Mel", quantity: "15g", calories: 45, protein: 0, carbs: 12, fat: 0 }
      ]
    }
  },
  
  // Dieta para performance
  performance: {
    title: "Dieta para Performance Esportiva",
    description: "Plano alimentar otimizado para melhorar a performance atlética e recuperação.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "3 unidades", calories: 270, protein: 18, carbs: 0, fat: 21 },
        { food: "Aveia", quantity: "50g", calories: 190, protein: 7, carbs: 33, fat: 3.5 },
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Mel", quantity: "10g", calories: 30, protein: 0, carbs: 8, fat: 0 }
      ],
      morningSnack: [
        { food: "Pão integral", quantity: "2 fatias", calories: 160, protein: 8, carbs: 28, fat: 2 },
        { food: "Atum em água", quantity: "90g", calories: 100, protein: 22, carbs: 0, fat: 1 }
      ],
      lunch: [
        { food: "Peito de frango", quantity: "170g", calories: 280, protein: 53, carbs: 0, fat: 6 },
        { food: "Arroz integral", quantity: "150g", calories: 195, protein: 4.5, carbs: 40, fat: 1.5 },
        { food: "Batata doce", quantity: "150g", calories: 135, protein: 2, carbs: 32, fat: 0 },
        { food: "Brócolis", quantity: "100g", calories: 35, protein: 2.5, carbs: 7, fat: 0.4 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      preworkoutSnack: [
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Pasta de amendoim", quantity: "15g", calories: 90, protein: 3.5, carbs: 3, fat: 7.5 }
      ],
      postworkout: [
        { food: "Whey protein", quantity: "30g (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1.5 },
        { food: "Dextrose", quantity: "30g", calories: 120, protein: 0, carbs: 30, fat: 0 }
      ],
      dinner: [
        { food: "Carne bovina magra", quantity: "170g", calories: 290, protein: 52, carbs: 0, fat: 8 },
        { food: "Quinoa", quantity: "100g", calories: 120, protein: 4, carbs: 21, fat: 2 },
        { food: "Legumes variados", quantity: "150g", calories: 70, protein: 3, carbs: 15, fat: 0 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 45, protein: 0, carbs: 0, fat: 5 }
      ],
      supper: [
        { food: "Iogurte grego", quantity: "200g", calories: 180, protein: 18, carbs: 10, fat: 7 },
        { food: "Caseína", quantity: "30g (1 scoop)", calories: 110, protein: 24, carbs: 3, fat: 0.5 },
        { food: "Nozes", quantity: "15g", calories: 100, protein: 2.5, carbs: 2, fat: 9 }
      ]
    }
  },
  
  // Dietas especiais
  
  // Vegetariana
  vegetarian: {
    title: "Dieta Vegetariana",
    description: "Plano alimentar balanceado sem carne, peixe ou frango.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
        { food: "Pão integral", quantity: "2 fatias", calories: 160, protein: 8, carbs: 28, fat: 2 },
        { food: "Abacate", quantity: "1/4 unidade", calories: 80, protein: 1, carbs: 4, fat: 7 }
      ],
      morningSnack: [
        { food: "Iogurte", quantity: "170g", calories: 100, protein: 8, carbs: 12, fat: 2.5 },
        { food: "Granola", quantity: "30g", calories: 120, protein: 3, carbs: 20, fat: 4 }
      ],
      lunch: [
        { food: "Lentilhas", quantity: "150g cozidas", calories: 170, protein: 13, carbs: 30, fat: 0.5 },
        { food: "Arroz integral", quantity: "100g", calories: 130, protein: 3, carbs: 27, fat: 1 },
        { food: "Brócolis", quantity: "100g", calories: 35, protein: 2.5, carbs: 7, fat: 0.4 },
        { food: "Tofu", quantity: "100g", calories: 80, protein: 8, carbs: 2, fat: 4 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      afternoonSnack: [
        { food: "Maçã", quantity: "1 unidade", calories: 95, protein: 0, carbs: 25, fat: 0 },
        { food: "Castanhas", quantity: "30g", calories: 180, protein: 6, carbs: 5, fat: 16 }
      ],
      dinner: [
        { food: "Grão de bico", quantity: "150g cozido", calories: 270, protein: 14, carbs: 45, fat: 4 },
        { food: "Legumes variados", quantity: "200g", calories: 100, protein: 5, carbs: 20, fat: 0.5 },
        { food: "Queijo", quantity: "30g", calories: 110, protein: 7, carbs: 0.5, fat: 9 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 45, protein: 0, carbs: 0, fat: 5 }
      ],
      supper: [
        { food: "Chá de camomila", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Iogurte grego", quantity: "100g", calories: 90, protein: 9, carbs: 5, fat: 3.5 }
      ]
    }
  },
  
  // Vegana
  vegan: {
    title: "Dieta Vegana",
    description: "Plano alimentar baseado exclusivamente em vegetais.",
    meals: {
      breakfast: [
        { food: "Aveia", quantity: "50g", calories: 190, protein: 7, carbs: 33, fat: 3.5 },
        { food: "Leite vegetal fortificado", quantity: "250ml", calories: 90, protein: 3, carbs: 12, fat: 3.5 },
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Pasta de amendoim", quantity: "15g", calories: 90, protein: 3.5, carbs: 3, fat: 7.5 }
      ],
      morningSnack: [
        { food: "Smoothie de frutas", quantity: "300ml", calories: 150, protein: 2, carbs: 35, fat: 1 },
        { food: "Proteína vegetal em pó", quantity: "30g", calories: 110, protein: 22, carbs: 5, fat: 1 }
      ],
      lunch: [
        { food: "Tofu firme", quantity: "150g", calories: 120, protein: 12, carbs: 3, fat: 6 },
        { food: "Arroz integral", quantity: "150g", calories: 195, protein: 4.5, carbs: 40, fat: 1.5 },
        { food: "Lentilhas", quantity: "100g cozidas", calories: 115, protein: 9, carbs: 20, fat: 0.4 },
        { food: "Legumes variados", quantity: "200g", calories: 100, protein: 5, carbs: 20, fat: 0.5 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      afternoonSnack: [
        { food: "Frutas secas", quantity: "30g", calories: 80, protein: 1, carbs: 20, fat: 0 },
        { food: "Nozes", quantity: "30g", calories: 200, protein: 5, carbs: 4, fat: 18 }
      ],
      dinner: [
        { food: "Seitan", quantity: "120g", calories: 180, protein: 35, carbs: 8, fat: 2 },
        { food: "Quinoa", quantity: "150g", calories: 180, protein: 6, carbs: 31, fat: 3 },
        { food: "Abóbora", quantity: "200g", calories: 60, protein: 2, carbs: 14, fat: 0 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      supper: [
        { food: "Chá verde", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Hummus", quantity: "50g", calories: 80, protein: 4, carbs: 8, fat: 4 },
        { food: "Cenoura", quantity: "100g", calories: 40, protein: 1, carbs: 9, fat: 0 }
      ]
    }
  },
  
  // Sem glúten
  glutenFree: {
    title: "Dieta Sem Glúten",
    description: "Plano alimentar livre de glúten para intolerantes ou celíacos.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
        { food: "Tapioca", quantity: "50g", calories: 170, protein: 0, carbs: 42, fat: 0 },
        { food: "Queijo branco", quantity: "30g", calories: 80, protein: 4, carbs: 1, fat: 7 }
      ],
      morningSnack: [
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Castanhas", quantity: "20g", calories: 120, protein: 4, carbs: 3, fat: 10 }
      ],
      lunch: [
        { food: "Frango grelhado", quantity: "150g", calories: 250, protein: 47, carbs: 0, fat: 5 },
        { food: "Arroz integral", quantity: "120g", calories: 155, protein: 3.5, carbs: 32, fat: 1 },
        { food: "Batata doce", quantity: "100g", calories: 90, protein: 1.5, carbs: 21, fat: 0 },
        { food: "Legumes variados", quantity: "150g", calories: 75, protein: 3, carbs: 15, fat: 0.5 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      afternoonSnack: [
        { food: "Iogurte natural", quantity: "170g", calories: 100, protein: 8, carbs: 12, fat: 2.5 },
        { food: "Frutas vermelhas", quantity: "100g", calories: 60, protein: 1, carbs: 14, fat: 0.5 }
      ],
      dinner: [
        { food: "Salmão", quantity: "150g", calories: 280, protein: 35, carbs: 0, fat: 16 },
        { food: "Quinoa", quantity: "100g", calories: 120, protein: 4, carbs: 21, fat: 2 },
        { food: "Aspargos", quantity: "100g", calories: 25, protein: 2.5, carbs: 5, fat: 0 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 45, protein: 0, carbs: 0, fat: 5 }
      ],
      supper: [
        { food: "Chá de camomila", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Queijo cottage", quantity: "80g", calories: 80, protein: 14, carbs: 3, fat: 2 }
      ]
    }
  },
  
  // Sem lactose
  lactoseFree: {
    title: "Dieta Sem Lactose",
    description: "Plano alimentar livre de leite e derivados para intolerantes à lactose.",
    meals: {
      breakfast: [
        { food: "Ovos mexidos", quantity: "2 unidades", calories: 180, protein: 12, carbs: 0, fat: 14 },
        { food: "Pão integral", quantity: "2 fatias", calories: 160, protein: 8, carbs: 28, fat: 2 },
        { food: "Abacate", quantity: "1/4 unidade", calories: 80, protein: 1, carbs: 4, fat: 7 }
      ],
      morningSnack: [
        { food: "Iogurte de coco", quantity: "170g", calories: 120, protein: 2, carbs: 12, fat: 7 },
        { food: "Granola sem leite", quantity: "30g", calories: 120, protein: 3, carbs: 20, fat: 4 }
      ],
      lunch: [
        { food: "Peito de frango", quantity: "150g", calories: 250, protein: 47, carbs: 0, fat: 5 },
        { food: "Arroz integral", quantity: "120g", calories: 155, protein: 3.5, carbs: 32, fat: 1 },
        { food: "Feijão", quantity: "100g", calories: 100, protein: 7, carbs: 18, fat: 0.5 },
        { food: "Legumes variados", quantity: "150g", calories: 75, protein: 3, carbs: 15, fat: 0.5 },
        { food: "Azeite de oliva", quantity: "10ml", calories: 90, protein: 0, carbs: 0, fat: 10 }
      ],
      afternoonSnack: [
        { food: "Banana", quantity: "1 unidade", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { food: "Pasta de amendoim", quantity: "15g", calories: 90, protein: 3.5, carbs: 3, fat: 7.5 }
      ],
      dinner: [
        { food: "Peixe assado", quantity: "150g", calories: 180, protein: 36, carbs: 0, fat: 4 },
        { food: "Batata doce", quantity: "120g", calories: 110, protein: 2, carbs: 26, fat: 0 },
        { food: "Brócolis", quantity: "100g", calories: 35, protein: 2.5, carbs: 7, fat: 0.4 },
        { food: "Azeite de oliva", quantity: "5ml", calories: 45, protein: 0, carbs: 0, fat: 5 }
      ],
      supper: [
        { food: "Chá de camomila", quantity: "1 xícara", calories: 0, protein: 0, carbs: 0, fat: 0 },
        { food: "Frutas", quantity: "100g", calories: 60, protein: 1, carbs: 15, fat: 0 }
      ]
    }
  }
};

/**
 * Obtém um template de dieta baseado no objetivo e restrições
 * @param {string} goal Objetivo da dieta ('lose', 'maintain', 'gain', 'performance')
 * @param {string} restrictions Restrições alimentares ('none', 'vegetarian', 'vegan', 'gluten', 'lactose')
 * @returns {Object} Template de dieta correspondente
 */
export function getDietTemplate(goal, restrictions) {
  // Verificar se existe um template específico para a restrição
  if (restrictions && restrictions !== 'none') {
    switch (restrictions) {
      case 'vegetarian':
        return DIET_TEMPLATES.vegetarian;
      case 'vegan':
        return DIET_TEMPLATES.vegan;
      case 'gluten':
        return DIET_TEMPLATES.glutenFree;
      case 'lactose':
        return DIET_TEMPLATES.lactoseFree;
    }
  }
  
  // Caso não tenha restrição específica, usar o template baseado no objetivo
  return DIET_TEMPLATES[goal] || DIET_TEMPLATES.maintain;
}

/**
 * Ajusta um template de dieta para as necessidades calóricas do cliente
 * @param {Object} template Template de dieta base
 * @param {Object} nutritionPlan Plano nutricional calculado
 * @returns {Object} Template ajustado às necessidades do cliente
 */
export function adjustDietTemplate(template, nutritionPlan) {
  const { dailyCalories, macros } = nutritionPlan;
  
  // Calcular o fator de ajuste de calorias
  const totalTemplateCalories = Object.values(template.meals).reduce(
    (acc, meal) => acc + meal.reduce((sum, food) => sum + food.calories, 0), 
    0
  );
  
  const caloriesAdjustmentFactor = dailyCalories / totalTemplateCalories;
  
  // Criar uma cópia do template para ajustar
  const adjustedTemplate = JSON.parse(JSON.stringify(template));
  
  // Ajustar as calorias e macros de cada refeição
  for (const mealName in adjustedTemplate.meals) {
    const meal = adjustedTemplate.meals[mealName];
    
    // Ajustar cada alimento da refeição
    for (const food of meal) {
      // Ajustar proporcionalmente as calorias e macros
      food.calories = Math.round(food.calories * caloriesAdjustmentFactor);
      food.protein = Math.round(food.protein * caloriesAdjustmentFactor);
      food.carbs = Math.round(food.carbs * caloriesAdjustmentFactor);
      food.fat = Math.round(food.fat * caloriesAdjustmentFactor);
    }
  }
  
  return adjustedTemplate;
}