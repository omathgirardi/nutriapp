/**
 * Serviço para cálculos nutricionais
 */

// Fatores de atividade
const ACTIVITY_FACTORS = {
  sedentary: 1.2, // Pouco ou nenhum exercício
  light: 1.375, // Exercício leve 1-3 dias/semana
  moderate: 1.55, // Exercício moderado 3-5 dias/semana
  active: 1.725, // Exercício intenso 6-7 dias/semana
  extreme: 1.9 // Exercício muito intenso, trabalho físico
};

// Fatores de objetivo
const GOAL_FACTORS = {
  lose: -500, // Déficit calórico para perda de peso
  maintain: 0, // Manutenção de peso
  gain: 500, // Superávit calórico para ganho de massa
  performance: 300 // Melhora de performance
};

// Distribuição de macronutrientes (proteína/carboidrato/gordura)
const MACRO_RATIOS = {
  lose: {
    protein: 0.4, // 40% das calorias de proteína
    carbs: 0.3, // 30% das calorias de carboidratos
    fat: 0.3 // 30% das calorias de gordura
  },
  maintain: {
    protein: 0.3, // 30% das calorias de proteína
    carbs: 0.4, // 40% das calorias de carboidratos
    fat: 0.3 // 30% das calorias de gordura
  },
  gain: {
    protein: 0.3, // 30% das calorias de proteína
    carbs: 0.5, // 50% das calorias de carboidratos
    fat: 0.2 // 20% das calorias de gordura
  },
  performance: {
    protein: 0.25, // 25% das calorias de proteína
    carbs: 0.55, // 55% das calorias de carboidratos
    fat: 0.2 // 20% das calorias de gordura
  }
};

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor
 * @param {Object} data Dados do cliente
 * @param {string} data.gender Sexo (male/female)
 * @param {number} data.weight Peso em kg
 * @param {number} data.height Altura em cm
 * @param {number} data.age Idade em anos
 * @returns {number} TMB em calorias
 */
export function calculateBMR({ gender, weight, height, age }) {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

/**
 * Calcula o Gasto Energético Total Diário (GETD)
 * @param {number} bmr Taxa Metabólica Basal
 * @param {string} activityLevel Nível de atividade
 * @returns {number} GETD em calorias
 */
export function calculateTDEE(bmr, activityLevel) {
  return bmr * ACTIVITY_FACTORS[activityLevel];
}

/**
 * Calcula as calorias diárias necessárias baseadas no objetivo
 * @param {number} tdee Gasto Energético Total Diário
 * @param {string} goal Objetivo (lose/maintain/gain/performance)
 * @returns {number} Calorias diárias recomendadas
 */
export function calculateDailyCalories(tdee, goal) {
  return Math.round(tdee + GOAL_FACTORS[goal]);
}

/**
 * Calcula a distribuição de macronutrientes
 * @param {number} calories Calorias diárias totais
 * @param {string} goal Objetivo (lose/maintain/gain/performance)
 * @returns {Object} Quantidade de proteínas, carboidratos e gorduras em gramas
 */
export function calculateMacros(calories, goal) {
  const ratio = MACRO_RATIOS[goal];
  
  // Calorias por macro
  const proteinCalories = calories * ratio.protein;
  const carbsCalories = calories * ratio.carbs;
  const fatCalories = calories * ratio.fat;
  
  // Converter para gramas (proteína: 4 cal/g, carboidratos: 4 cal/g, gordura: 9 cal/g)
  const protein = Math.round(proteinCalories / 4);
  const carbs = Math.round(carbsCalories / 4);
  const fat = Math.round(fatCalories / 9);
  
  return { protein, carbs, fat };
}

/**
 * Calcula o plano nutricional completo
 * @param {Object} data Dados do cliente e preferências
 * @returns {Object} Plano nutricional completo
 */
export function calculateNutritionPlan(data) {
  const bmr = calculateBMR(data);
  const tdee = calculateTDEE(bmr, data.activityLevel);
  const dailyCalories = calculateDailyCalories(tdee, data.goal);
  const macros = calculateMacros(dailyCalories, data.goal);
  
  return {
    bmr,
    tdee,
    dailyCalories,
    macros,
    // Valores de referência
    referenceValues: {
      minProtein: Math.round(data.weight * 1.6), // mínimo de 1.6g de proteína por kg
      maxProtein: Math.round(data.weight * 2.2), // máximo de 2.2g de proteína por kg
      minCarbs: Math.round(data.weight * 3), // mínimo de 3g de carboidratos por kg
      minFat: Math.round(data.weight * 0.8) // mínimo de 0.8g de gordura por kg
    }
  };
}

/**
 * Distribui as calorias e macros entre as refeições do dia
 * @param {Object} nutritionPlan Plano nutricional
 * @param {number} meals Número de refeições
 * @returns {Object} Distribuição de calorias e macros por refeição
 */
export function distributeMeals(nutritionPlan, meals) {
  const { dailyCalories, macros } = nutritionPlan;
  
  // Distribuições padrão baseadas no número de refeições
  let distribution;
  
  if (meals === 3) {
    // Café da manhã, almoço, jantar
    distribution = {
      breakfast: 0.3, // 30%
      lunch: 0.4, // 40%
      dinner: 0.3 // 30%
    };
  } else if (meals === 4) {
    // Café da manhã, lanche, almoço, jantar
    distribution = {
      breakfast: 0.25, // 25%
      morningSnack: 0.15, // 15%
      lunch: 0.35, // 35%
      dinner: 0.25 // 25%
    };
  } else if (meals === 5) {
    // Café da manhã, lanche manhã, almoço, lanche tarde, jantar
    distribution = {
      breakfast: 0.25, // 25%
      morningSnack: 0.1, // 10%
      lunch: 0.3, // 30%
      afternoonSnack: 0.1, // 10%
      dinner: 0.25 // 25%
    };
  } else if (meals === 6) {
    // Café da manhã, lanche manhã, almoço, lanche tarde, jantar, ceia
    distribution = {
      breakfast: 0.2, // 20%
      morningSnack: 0.1, // 10%
      lunch: 0.25, // 25%
      afternoonSnack: 0.1, // 10%
      dinner: 0.25, // 25%
      supper: 0.1 // 10%
    };
  } else {
    // Padrão 5 refeições
    distribution = {
      breakfast: 0.25,
      morningSnack: 0.1,
      lunch: 0.3,
      afternoonSnack: 0.1,
      dinner: 0.25
    };
  }
  
  // Calcular calorias e macros para cada refeição
  const mealPlan = {};
  
  for (const [meal, ratio] of Object.entries(distribution)) {
    const calories = Math.round(dailyCalories * ratio);
    const protein = Math.round(macros.protein * ratio);
    const carbs = Math.round(macros.carbs * ratio);
    const fat = Math.round(macros.fat * ratio);
    
    mealPlan[meal] = { calories, protein, carbs, fat };
  }
  
  return mealPlan;
}