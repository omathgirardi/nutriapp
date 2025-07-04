import { doc, getDoc, updateDoc, setDoc, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Atualiza os créditos do usuário
 * @param {string} userId ID do usuário
 * @param {number} creditsToDeduct Número de créditos a debitar (positivo para debitar, negativo para adicionar)
 * @returns {Promise<{success: boolean, newCredits: number}>} Resultado da operação
 */
export async function updateUserCredits(userId, creditsToDeduct) {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("Usuário não encontrado");
    }
    
    const userData = userDoc.data();
    const currentCredits = userData.credits || 0;
    const usedCredits = userData.usedCredits || 0;
    
    // Verificar se há créditos suficientes para debitar
    if (creditsToDeduct > 0 && currentCredits < creditsToDeduct) {
      throw new Error("Créditos insuficientes");
    }
    
    // Calcular novos valores
    const newCredits = currentCredits - creditsToDeduct;
    const newUsedCredits = creditsToDeduct > 0 ? usedCredits + creditsToDeduct : usedCredits;
    
    // Atualizar no Firestore
    await updateDoc(userRef, {
      credits: newCredits,
      usedCredits: newUsedCredits,
      lastUpdated: serverTimestamp()
    });
    
    return {
      success: true,
      newCredits
    };
  } catch (error) {
    console.error("Erro ao atualizar créditos:", error);
    throw error;
  }
}

/**
 * Adiciona créditos à conta do usuário
 * @param {string} userId ID do usuário
 * @param {number} creditsToAdd Número de créditos a adicionar
 * @param {string} packageId ID do pacote de créditos
 * @param {number} amount Valor pago em reais
 * @returns {Promise<{success: boolean, newCredits: number}>} Resultado da operação
 */
export async function addCreditsToUser(userId, creditsToAdd, packageId, amount) {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("Usuário não encontrado");
    }
    
    const userData = userDoc.data();
    const currentCredits = userData.credits || 0;
    
    // Calcular novos créditos
    const newCredits = currentCredits + creditsToAdd;
    
    // Atualizar no Firestore
    await updateDoc(userRef, {
      credits: newCredits,
      lastUpdated: serverTimestamp()
    });
    
    // Registrar a transação
    await addCreditTransaction(userId, creditsToAdd, packageId, amount);
    
    return {
      success: true,
      newCredits
    };
  } catch (error) {
    console.error("Erro ao adicionar créditos:", error);
    throw error;
  }
}

/**
 * Registra uma transação de créditos
 * @param {string} userId ID do usuário
 * @param {number} credits Número de créditos
 * @param {string} packageId ID do pacote de créditos
 * @param {number} amount Valor pago em reais
 * @returns {Promise<{success: boolean, transactionId: string}>} Resultado da operação
 */
export async function addCreditTransaction(userId, credits, packageId, amount) {
  try {
    const transactionRef = collection(db, "creditTransactions");
    
    const docRef = await addDoc(transactionRef, {
      userId,
      credits,
      packageId,
      amount,
      timestamp: serverTimestamp(),
      status: "completed"
    });
    
    return {
      success: true,
      transactionId: docRef.id
    };
  } catch (error) {
    console.error("Erro ao registrar transação:", error);
    throw error;
  }
}

/**
 * Obtém o histórico de transações de créditos do usuário
 * @param {string} userId ID do usuário
 * @returns {Promise<Array>} Lista de transações
 */
export async function getUserCreditTransactions(userId) {
  try {
    const transactionsRef = collection(db, "creditTransactions");
    const q = query(
      transactionsRef,
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const transactions = [];
    
    querySnapshot.forEach((doc) => {
      transactions.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
      });
    });
    
    return transactions;
  } catch (error) {
    console.error("Erro ao obter transações:", error);
    throw error;
  }
}

/**
 * Registra uma dieta gerada no histórico
 * @param {string} userId ID do usuário
 * @param {Object} diet Dados da dieta
 * @returns {Promise<{success: boolean, dietId: string}>} Resultado da operação
 */
export async function saveDietToHistory(userId, diet) {
  try {
    const dietsRef = collection(db, "diets");
    
    const docRef = await addDoc(dietsRef, {
      userId,
      ...diet,
      createdAt: serverTimestamp()
    });
    
    return {
      success: true,
      dietId: docRef.id
    };
  } catch (error) {
    console.error("Erro ao salvar dieta:", error);
    throw error;
  }
}

/**
 * Obtém o histórico de dietas do usuário
 * @param {string} userId ID do usuário
 * @returns {Promise<Array>} Lista de dietas
 */
export async function getUserDiets(userId) {
  try {
    const dietsRef = collection(db, "diets");
    const q = query(
      dietsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    
    const querySnapshot = await getDocs(q);
    const diets = [];
    
    querySnapshot.forEach((doc) => {
      diets.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
      });
    });
    
    return diets;
  } catch (error) {
    console.error("Erro ao obter dietas:", error);
    throw error;
  }
}

/**
 * Obtém detalhes de uma dieta específica
 * @param {string} dietId ID da dieta
 * @returns {Promise<Object>} Dados da dieta
 */
export async function getDietById(dietId) {
  try {
    const dietRef = doc(db, "diets", dietId);
    const dietDoc = await getDoc(dietRef);
    
    if (!dietDoc.exists()) {
      throw new Error("Dieta não encontrada");
    }
    
    return {
      id: dietDoc.id,
      ...dietDoc.data(),
      createdAt: dietDoc.data().createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error("Erro ao obter dieta:", error);
    throw error;
  }
}