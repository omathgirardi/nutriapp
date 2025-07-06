// Geração de dietas e refeições
export const generateMeals = (calories, macros, restrictions = [], goal = 'maintenance') => {
  const mealDistribution = {
    breakfast: 0.25,
    morningSnack: 0.10,
    lunch: 0.30,
    afternoonSnack: 0.10,
    dinner: 0.25
  };

  const meals = [];
  
  Object.entries(mealDistribution).forEach(([mealName, percentage]) => {
    const mealCalories = Math.round(calories * percentage);
    const mealProtein = Math.round(macros.protein * percentage);
    const mealCarbs = Math.round(macros.carbs * percentage);
    const mealFat = Math.round(macros.fat * percentage);
    
    const meal = {
      name: getMealName(mealName),
      calories: mealCalories,
      protein: mealProtein,
      carbs: mealCarbs,
      fat: mealFat,
      foods: generateFoodsForMeal(mealName, mealCalories, { protein: mealProtein, carbs: mealCarbs, fat: mealFat }, restrictions, goal)
    };
    
    meals.push(meal);
  });
  
  return meals;
};

export const generateMealsFromTemplate = (template, calories, macros) => {
  const baseMeals = generateMeals(calories, macros);
  
  return baseMeals.map(meal => ({
    ...meal,
    templateId: template.id,
    templateName: template.name
  }));
};

const getMealName = (mealKey) => {
  const names = {
    breakfast: 'Café da Manhã',
    morningSnack: 'Lanche da Manhã',
    lunch: 'Almoço',
    afternoonSnack: 'Lanche da Tarde',
    dinner: 'Jantar'
  };
  return names[mealKey] || mealKey;
};

const generateFoodsForMeal = (mealType, calories, macros, restrictions, goal) => {
  const foodDatabase = {
    breakfast: [
      { name: 'Aveia', calories: 150, protein: 5, carbs: 27, fat: 3, amount: '50g' },
      { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, amount: '1 unidade' },
      { name: 'Leite desnatado', calories: 83, protein: 8, carbs: 12, fat: 0, amount: '200ml' },
      { name: 'Ovos', calories: 155, protein: 13, carbs: 1, fat: 11, amount: '2 unidades' }
    ],
    lunch: [
      { name: 'Arroz integral', calories: 216, protein: 5, carbs: 45, fat: 2, amount: '150g' },
      { name: 'Feijão', calories: 245, protein: 15, carbs: 45, fat: 1, amount: '150g' },
      { name: 'Frango grelhado', calories: 231, protein: 43, carbs: 0, fat: 5, amount: '150g' },
      { name: 'Salada verde', calories: 25, protein: 2, carbs: 5, fat: 0, amount: '100g' }
    ],
    dinner: [
      { name: 'Salmão grelhado', calories: 206, protein: 22, carbs: 0, fat: 12, amount: '100g' },
      { name: 'Batata doce', calories: 103, protein: 2, carbs: 24, fat: 0, amount: '120g' },
      { name: 'Brócolis', calories: 34, protein: 3, carbs: 7, fat: 0, amount: '100g' },
      { name: 'Azeite', calories: 120, protein: 0, carbs: 0, fat: 14, amount: '1 colher de sopa' }
    ]
  };
  
  const snackFoods = [
    { name: 'Iogurte grego', calories: 130, protein: 20, carbs: 6, fat: 4, amount: '170g' },
    { name: 'Castanhas', calories: 185, protein: 4, carbs: 4, fat: 18, amount: '30g' },
    { name: 'Frutas vermelhas', calories: 84, protein: 1, carbs: 21, fat: 0, amount: '150g' },
    { name: 'Queijo cottage', calories: 98, protein: 11, carbs: 4, fat: 4, amount: '100g' }
  ];
  
  let availableFoods = foodDatabase[mealType] || snackFoods;
  
  // Filtrar alimentos baseado nas restrições
  if (restrictions.length > 0) {
    availableFoods = availableFoods.filter(food => 
      !restrictions.some(restriction => 
        food.name.toLowerCase().includes(restriction.toLowerCase())
      )
    );
  }
  
  // Selecionar alimentos que se aproximem das necessidades calóricas
  const selectedFoods = [];
  let remainingCalories = calories;
  
  while (remainingCalories > 50 && availableFoods.length > 0) {
    const randomFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    
    if (randomFood.calories <= remainingCalories + 50) {
      selectedFoods.push(randomFood);
      remainingCalories -= randomFood.calories;
    }
    
    // Remove o alimento para não repetir
    availableFoods = availableFoods.filter(food => food.name !== randomFood.name);
  }
  
  return selectedFoods;
}; 