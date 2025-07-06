// Cálculos nutricionais
export const calculateBMR = (data) => {
  const { weight, height, age, gender } = data;
  
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  
  return bmr * (multipliers[activityLevel] || 1.2);
};

export const calculateTargetCalories = (tdee, goal, userProfile) => {
  const { experience = 'beginner', age = 25 } = userProfile;
  
  const adjustments = {
    'weight-loss': -500,
    'muscle-gain': 300,
    'maintenance': 0
  };
  
  let targetCalories = tdee + (adjustments[goal] || 0);
  
  // Ajustes baseados na experiência
  if (experience === 'advanced' && goal === 'muscle-gain') {
    targetCalories += 200;
  } else if (experience === 'beginner' && goal === 'weight-loss') {
    targetCalories += 100;
  }
  
  // Ajustes baseados na idade
  if (age > 40) {
    targetCalories *= 0.95;
  }
  
  return Math.round(targetCalories);
};

export const calculateCalories = (bmr, activityLevel, goal, userProfile = {}) => {
  const tdee = calculateTDEE(bmr, activityLevel);
  return calculateTargetCalories(tdee, goal, userProfile);
};

export const calculateMacros = (calories, goal, userProfile) => {
  const { dietaryPreference = 'balanced', healthConditions = [] } = userProfile;
  
  let proteinPercent = 0.25;
  let carbPercent = 0.45;
  let fatPercent = 0.30;
  
  // Ajustes baseados no objetivo
  if (goal === 'muscle-gain') {
    proteinPercent = 0.30;
    carbPercent = 0.40;
    fatPercent = 0.30;
  } else if (goal === 'weight-loss') {
    proteinPercent = 0.35;
    carbPercent = 0.35;
    fatPercent = 0.30;
  }
  
  // Ajustes baseados na preferência alimentar
  if (dietaryPreference === 'low-carb') {
    proteinPercent = 0.30;
    carbPercent = 0.20;
    fatPercent = 0.50;
  } else if (dietaryPreference === 'high-protein') {
    proteinPercent = 0.40;
    carbPercent = 0.30;
    fatPercent = 0.30;
  }
  
  // Ajustes baseados em condições de saúde
  if (healthConditions.includes('diabetes')) {
    carbPercent = Math.max(0.30, carbPercent - 0.10);
    proteinPercent += 0.05;
    fatPercent += 0.05;
  }
  
  const protein = Math.round((calories * proteinPercent) / 4);
  const carbs = Math.round((calories * carbPercent) / 4);
  const fat = Math.round((calories * fatPercent) / 9);
  
  return { protein, carbs, fat };
}; 