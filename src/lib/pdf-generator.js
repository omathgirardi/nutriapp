import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Gera um PDF com a dieta formatada
 * 
 * @param diet Objeto com os dados da dieta
 * @returns Blob do PDF gerado
 */
export async function generateDietPDF(diet) {
  // Criar uma nova instância do jsPDF
  const doc = new jsPDF();
  
  // Configurações
  const primaryColor = '#1570EF';
  const secondaryColor = '#039855';
  
  // Adicionar cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(primaryColor);
  doc.text(diet.title, 105, 20, { align: 'center' });
  
  // Informações do cliente
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Cliente: ${diet.clientName} (ID: ${diet.clientId})`, 105, 30, { align: 'center' });
  doc.text(`Data: ${diet.createdAt}`, 105, 35, { align: 'center' });
  
  // Adicionar linha
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 40, 190, 40);
  
  // Resumo de macros
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.text('Resumo Nutricional', 20, 50);
  
  // Calcular totais
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
  
  // Calcular percentuais
  const proteinCalories = totalProtein * 4;
  const carbsCalories = totalCarbs * 4;
  const fatCalories = totalFat * 9;
  
  const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
  const carbsPercentage = Math.round((carbsCalories / totalCalories) * 100);
  const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
  
  // Tabela de macros
  doc.autoTable({
    startY: 55,
    head: [['Calorias', 'Proteínas', 'Carboidratos', 'Gorduras']],
    body: [
      [
        `${totalCalories} kcal`, 
        `${totalProtein}g (${proteinPercentage}%)`, 
        `${totalCarbs}g (${carbsPercentage}%)`, 
        `${totalFat}g (${fatPercentage}%)`
      ]
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryColor },
    styles: { halign: 'center' },
  });
  
  // Adicionar cada refeição
  let yPosition = doc.autoTable.previous.finalY + 15;
  
  // Array de refeições e seus ícones
  const meals = [
    { name: 'Café da Manhã', items: diet.mealPlan.breakfast },
    { name: 'Lanche da Manhã', items: diet.mealPlan.morningSnack },
    { name: 'Almoço', items: diet.mealPlan.lunch },
    { name: 'Lanche da Tarde', items: diet.mealPlan.afternoonSnack },
    { name: 'Jantar', items: diet.mealPlan.dinner },
    { name: 'Ceia', items: diet.mealPlan.supper },
  ];
  
  // Processar cada refeição
  for (const meal of meals) {
    // Verificar se precisa adicionar uma nova página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Adicionar título da refeição
    doc.setFontSize(14);
    doc.setTextColor(secondaryColor);
    doc.text(meal.name, 20, yPosition);
    
    // Preparar dados para a tabela
    const tableBody = meal.items.map(item => [
      item.food,
      item.quantity,
      `${item.calories} kcal`,
      `${item.protein}g`,
      `${item.carbs}g`,
      `${item.fat}g`,
    ]);
    
    // Adicionar linha com totais
    const totalMealCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);
    const totalMealProtein = meal.items.reduce((sum, item) => sum + item.protein, 0);
    const totalMealCarbs = meal.items.reduce((sum, item) => sum + item.carbs, 0);
    const totalMealFat = meal.items.reduce((sum, item) => sum + item.fat, 0);
    
    tableBody.push([
      'TOTAL',
      '',
      `${totalMealCalories} kcal`,
      `${totalMealProtein}g`,
      `${totalMealCarbs}g`,
      `${totalMealFat}g`,
    ]);
    
    // Adicionar tabela da refeição
    doc.autoTable({
      startY: yPosition + 5,
      head: [['Alimento', 'Quantidade', 'Calorias', 'Proteínas', 'Carboidratos', 'Gorduras']],
      body: tableBody,
      theme: 'striped',
      headStyles: { fillColor: secondaryColor },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 },
      },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
      styles: { fontSize: 8 },
    });
    
    // Atualizar posição Y para a próxima refeição
    yPosition = doc.autoTable.previous.finalY + 15;
  }
  
  // Adicionar observações em uma nova página
  doc.addPage();
  
  // Título observações
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text('Observações Importantes', 105, 20, { align: 'center' });
  
  // Recomendações gerais
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor);
  doc.text('Recomendações Gerais', 20, 35);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(
    'Consuma bastante água durante o dia, pelo menos 2 litros. ' +
    'Evite alimentos processados e prefira sempre os naturais. ' +
    'Mantenha os horários das refeições o mais regular possível.',
    20, 45, { maxWidth: 170 }
  );
  
  // Suplementação
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor);
  doc.text('Suplementação Recomendada', 20, 65);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text('• Whey Protein: 1 scoop (30g) após o treino', 20, 75);
  doc.text('• Creatina: 5g diários', 20, 82);
  doc.text('• Multivitamínico: 1 cápsula ao dia', 20, 89);
  
  // Substituições
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor);
  doc.text('Substituições Permitidas', 20, 105);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text('• Peito de frango pode ser substituído por peito de peru ou peixe branco', 20, 115);
  doc.text('• Arroz integral pode ser substituído por batata doce ou quinoa', 20, 122);
  doc.text('• Frutas podem ser trocadas por outras de valor calórico semelhante', 20, 129);
  
  // Rodapé
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Gerado por NutriPlan - Página ${i} de ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Retornar o PDF como Blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}

/**
 * Salva o PDF no dispositivo do usuário
 */
export async function downloadDietPDF(diet) {
  try {
    const pdfBlob = await generateDietPDF(diet);
    
    // Criar um URL para o Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Criar um link temporário e acionar o download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Dieta_${diet.clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.click();
    
    // Limpar o URL do objeto
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 100);
    
    return true;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
}

/**
 * Gera o PDF e retorna a URL para compartilhar
 */
export async function generateDietPDFUrl(diet) {
  try {
    const pdfBlob = await generateDietPDF(diet);
    
    // Em um ambiente real, você faria upload para o Firebase Storage
    // e retornaria a URL pública
    
    // Simular uma URL para teste
    const mockUrl = "https://firebasestorage.googleapis.com/nutriplan/dieta.pdf";
    return mockUrl;
  } catch (error) {
    console.error("Erro ao gerar URL do PDF:", error);
    throw error;
  }
}