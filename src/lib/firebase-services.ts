import { db, storage } from "./firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  limit,
  DocumentData
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Tipo para clientes
export interface Client {
  id: string;
  personalId: string;
  name: string;
  email: string;
  whatsapp: string;
  gender?: "male" | "female";
  age?: number;
  weight?: number;
  height?: number;
  activityLevel?: string;
  goal?: string;
  restrictions?: string[];
  createdAt: any; // Timestamp do Firebase
  updatedAt: any; // Timestamp do Firebase
}

// Tipo para dietas
export interface Diet {
  id: string;
  clientId: string;
  personalId: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: string;
  meals: any[]; // Array de refeições
  restrictions: string[];
  createdAt: any; // Timestamp do Firebase
  pdfUrl?: string;
}

/**
 * Gera um ID para um novo cliente no formato A-XX-PXXXX
 * onde XX é um número sequencial e PXXXX é o ID do personal
 */
export async function generateClientId(personalId: string): Promise<string> {
  try {
    // Contar quantos clientes este personal já tem
    const clientsRef = collection(db, "clients");
    const q = query(clientsRef, where("personalId", "==", personalId));
    const querySnapshot = await getDocs(q);
    
    // O próximo número será o count + 1
    const nextNumber = querySnapshot.size + 1;
    
    // Formatar o ID como A-XX-PXXXX
    return `A-${nextNumber.toString().padStart(2, '0')}-${personalId}`;
  } catch (error) {
    console.error("Erro ao gerar ID de cliente:", error);
    throw error;
  }
}

/**
 * Cadastrar um novo cliente
 */
export async function createClient(clientData: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
  try {
    // Gerar ID do cliente
    const clientId = await generateClientId(clientData.personalId);
    
    // Criar objeto do cliente com timestamps
    const newClient: Client = {
      ...clientData,
      id: clientId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Salvar no Firestore
    await setDoc(doc(db, "clients", clientId), newClient);
    
    return newClient;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}

/**
 * Buscar todos os clientes de um personal
 */
export async function getClientsByPersonalId(personalId: string): Promise<Client[]> {
  try {
    const clientsRef = collection(db, "clients");
    const q = query(
      clientsRef, 
      where("personalId", "==", personalId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const clients: Client[] = [];
    
    querySnapshot.forEach((doc) => {
      clients.push(doc.data() as Client);
    });
    
    return clients;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

/**
 * Buscar cliente por ID
 */
export async function getClientById(clientId: string): Promise<Client | null> {
  try {
    const clientDoc = await getDoc(doc(db, "clients", clientId));
    
    if (clientDoc.exists()) {
      return clientDoc.data() as Client;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
}

/**
 * Atualizar um cliente
 */
export async function updateClient(clientId: string, data: Partial<Client>): Promise<void> {
  try {
    await updateDoc(doc(db, "clients", clientId), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
}

/**
 * Excluir um cliente
 */
export async function deleteClient(clientId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "clients", clientId));
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
}

/**
 * Criar uma nova dieta
 */
export async function createDiet(dietData: Omit<Diet, "id" | "createdAt">): Promise<Diet> {
  try {
    // Gerar ID único para a dieta
    const dietId = `D-${Date.now().toString(36)}`;
    
    // Criar objeto da dieta com timestamp
    const newDiet: Diet = {
      ...dietData,
      id: dietId,
      createdAt: serverTimestamp()
    };
    
    // Salvar no Firestore
    await setDoc(doc(db, "diets", dietId), newDiet);
    
    return newDiet;
  } catch (error) {
    console.error("Erro ao criar dieta:", error);
    throw error;
  }
}

/**
 * Buscar dietas por ID do personal
 */
export async function getDietsByPersonalId(personalId: string): Promise<Diet[]> {
  try {
    const dietsRef = collection(db, "diets");
    const q = query(
      dietsRef, 
      where("personalId", "==", personalId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const diets: Diet[] = [];
    
    querySnapshot.forEach((doc) => {
      diets.push(doc.data() as Diet);
    });
    
    return diets;
  } catch (error) {
    console.error("Erro ao buscar dietas:", error);
    throw error;
  }
}

/**
 * Buscar dietas por ID do cliente
 */
export async function getDietsByClientId(clientId: string): Promise<Diet[]> {
  try {
    const dietsRef = collection(db, "diets");
    const q = query(
      dietsRef, 
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const diets: Diet[] = [];
    
    querySnapshot.forEach((doc) => {
      diets.push(doc.data() as Diet);
    });
    
    return diets;
  } catch (error) {
    console.error("Erro ao buscar dietas do cliente:", error);
    throw error;
  }
}

/**
 * Buscar dieta por ID
 */
export async function getDietById(dietId: string): Promise<Diet | null> {
  try {
    const dietDoc = await getDoc(doc(db, "diets", dietId));
    
    if (dietDoc.exists()) {
      return dietDoc.data() as Diet;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dieta:", error);
    throw error;
  }
}

/**
 * Atualizar uma dieta
 */
export async function updateDiet(dietId: string, data: Partial<Diet>): Promise<void> {
  try {
    await updateDoc(doc(db, "diets", dietId), data);
  } catch (error) {
    console.error("Erro ao atualizar dieta:", error);
    throw error;
  }
}

/**
 * Fazer upload de PDF da dieta
 */
export async function uploadDietPdf(file: File, dietId: string): Promise<string> {
  try {
    const storageRef = ref(storage, `diets/${dietId}.pdf`);
    await uploadBytes(storageRef, file);
    
    // Obter URL de download
    const downloadUrl = await getDownloadURL(storageRef);
    
    // Atualizar a dieta com a URL do PDF
    await updateDiet(dietId, { pdfUrl: downloadUrl });
    
    return downloadUrl;
  } catch (error) {
    console.error("Erro ao fazer upload do PDF:", error);
    throw error;
  }
}

/**
 * Atualizar créditos do usuário
 */
export async function updateUserCredits(
  userId: string, 
  usedCredits: number = 1
): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentUsedCredits = userData.usedCredits || 0;
      const totalCredits = userData.credits || 0;
      
      // Verificar se tem créditos suficientes
      if (totalCredits - currentUsedCredits - usedCredits < 0) {
        throw new Error("Créditos insuficientes");
      }
      
      // Atualizar contagem de créditos usados
      await updateDoc(userRef, {
        usedCredits: currentUsedCredits + usedCredits
      });
    } else {
      throw new Error("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao atualizar créditos:", error);
    throw error;
  }
}