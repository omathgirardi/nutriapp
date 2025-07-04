/**
 * Utilitário para cálculos de dieta, calorias e macronutrientes
 */

// Fatores de atividade física
const ACTIVITY_FACTORS = {
  sedentary: 1.2, // Pouco ou nenhum exercício
  light: 1.375, // Exercício leve, 1-3 vezes por semana
  moderate: 1.55, // Exercício moderado, 3-5 vezes por semana
  active: 1.725, // Exercício intenso, 6-7 vezes por semana
  extreme: 1.9, // Exercício muito intenso, trabalho físico
};

// Fatores de objetivo
const GOAL_FACTORS = {
  lose: 0.8, // Perda de peso (déficit de 20%)
  maintain: 1.0, // Manutenção
  gain: 1.15, // Ganho de massa (superávit de 15%)
  performance: 1.2, // Melhora de performance (superávit de 20%)
};

// Distribuição de macronutrientes por objetivo
const MACRO_DISTRIBUTION = {
  lose: { protein: 0.4, carbs: 0.3, fat: 0.3 }, // Mais proteína para preservar massa
  maintain: { protein: 0.3, carbs: 0.4, fat: 0.3 }, // Distribuição equilibrada
  gain: { protein: 0.3, carbs: 0.5, fat: 0.2 }, // Mais carboidratos para energia
  performance: { protein: 0.25, carbs: 0.55, fat: 0.2 }, // Foco em carboidratos para energia
};

// Calorias por grama de cada macronutriente
const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
};

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor
 * 
 * @param gender Sexo ('male' ou 'female')
 * @param weight Peso em kg
 * @param height Altura em cm
 * @param age Idade em anos
 * @returns TMB em calorias por dia
 */
export function calculateBMR(
  gender: 'male' | 'female',
  weight: number,
  height: number,
  age: number
): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calcula o Gasto Energético Total Diário (TDEE)
 * 
 * @param bmr Taxa Metabólica Basal
 * @param activityLevel Nível de atividade física
 * @returns TDEE em calorias por dia
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: keyof typeof ACTIVITY_FACTORS
): number {
  return bmr * ACTIVITY_FACTORS[activityLevel];
}

/**
 * Calcula as calorias diárias com base no objetivo
 * 
 * @param tdee Gasto Energético Total Diário
 * @param goal Objetivo ('lose', 'maintain', 'gain', 'performance')
 * @returns Calorias diárias ajustadas pelo objetivo
 */
export function calculateTargetCalories(
  tdee: number,
  goal: keyof typeof GOAL_FACTORS
): number {
  return Math.round(tdee * GOAL_FACTORS[goal]);
}

/**
 * Calcula a distribuição de macronutrientes
 * 
 * @param calories Total de calorias
 * @param goal Objetivo ('lose', 'maintain', 'gain', 'performance')
 * @returns Objeto com quantidade de proteínas, carboidratos e gorduras em gramas
 */
export function calculateMacros(
  calories: number,
  goal: keyof typeof MACRO_DISTRIBUTION
): { protein: number; carbs: number; fat: number } {
  const distribution = MACRO_DISTRIBUTION[goal];
  
  const proteinCalories = calories * distribution.protein;
  const carbsCalories = calories * distribution.carbs;
  const fatCalories = calories * distribution.fat;
  
  return {
    protein: Math.round(proteinCalories / CALORIES_PER_GRAM.protein),
    carbs: Math.round(carbsCalories / CALORIES_PER_GRAM.carbs),
    fat: Math.round(fatCalories / CALORIES_PER_GRAM.fat),
  };
}

/**
 * Calcula o peso ideal com base na altura usando a fórmula do IMC
 * IMC normal: 18.5 - 24.9
 * 
 * @param height Altura em cm
 * @param gender Sexo ('male' ou 'female')
 * @returns Faixa de peso ideal em kg
 */
export function calculateIdealWeight(
  height: number,
  gender: 'male' | 'female'
): { min: number; max: number } {
  // Altura em metros
  const heightInMeters = height / 100;
  
  // IMC mínimo e máximo para peso normal
  const minIMI = gender === 'male' ? 20 : 18.5;
  const maxIMI = gender === 'male' ? 25 : 24.9;
  
  return {
    min: Math.round(minIMI * heightInMeters * heightInMeters),
    max: Math.round(maxIMI * heightInMeters * heightInMeters),
  };
}

/**
 * Calcula o Índice de Massa Corporal (IMC)
 * 
 * @param weight Peso em kg
 * @param height Altura em cm
 * @returns IMC
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Determina a classificação do IMC
 * 
 * @param bmi Índice de Massa Corporal
 * @returns Classificação do IMC
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return "Abaixo do peso";
  } else if (bmi < 25) {
    return "Peso normal";
  } else if (bmi < 30) {
    return "Sobrepeso";
  } else if (bmi < 35) {
    return "Obesidade grau I";
  } else if (bmi < 40) {
    return "Obesidade grau II";
  } else {
    return "Obesidade grau III";
  }
}

/**
 * Realiza todos os cálculos nutricionais de uma vez
 */
export function calculateNutrition(
  gender: 'male' | 'female',
  weight: number,
  height: number,
  age: number,
  activityLevel: keyof typeof ACTIVITY_FACTORS,
  goal: keyof typeof GOAL_FACTORS
) {
  // Calcular TMB
  const bmr = calculateBMR(gender, weight, height, age);
  
  // Calcular TDEE
  const tdee = calculateTDEE(bmr, activityLevel);
  
  // Calcular calorias-alvo
  const targetCalories = calculateTargetCalories(tdee, goal);
  
  // Calcular macronutrientes
  const macros = calculateMacros(targetCalories, goal);
  
  // Calcular IMC
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  
  // Calcular peso ideal
  const idealWeight = calculateIdealWeight(height, gender);
  
  return {
    bmr,
    tdee,
    targetCalories,
    macros,
    bmi,
    bmiCategory,
    idealWeight,
  };
}