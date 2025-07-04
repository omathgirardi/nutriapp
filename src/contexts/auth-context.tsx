"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt?: Date;
  cref?: string;
  whatsapp?: string;
  role?: "personal" | "admin";
  id?: string; // ID formato P0001
  credits?: number;
  usedCredits?: number;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, cref: string, whatsapp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Recuperar dados adicionais do Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          const userData: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            ...userDoc.data(),
          };
          
          setUser(userData);
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
          // Mesmo com erro, definir os dados básicos do usuário
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função para gerar ID no formato P0001
  const generatePersonalId = async () => {
    try {
      // Obter contagem de personals existentes
      // Aqui você precisaria implementar uma lógica para obter o próximo ID disponível
      // Por simplicidade, vamos supor que já existe uma função para isso
      const count = 1; // Exemplo: ID será P0001
      return `P${count.toString().padStart(4, '0')}`;
    } catch (error) {
      console.error("Erro ao gerar ID:", error);
      return `P0001`; // Fallback
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      let message = "Ocorreu um erro ao fazer login.";
      
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          message = "Email ou senha incorretos.";
          break;
        case "auth/too-many-requests":
          message = "Muitas tentativas. Tente novamente mais tarde.";
          break;
      }
      
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, cref: string, whatsapp: string) => {
    try {
      setLoading(true);
      
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar o perfil com o nome completo
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      
      // Enviar email de verificação
      await sendEmailVerification(userCredential.user);
      
      // Gerar ID único para o personal
      const personalId = await generatePersonalId();
      
      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: fullName,
        email,
        cref,
        whatsapp,
        role: "personal",
        id: personalId,
        credits: 200, // Plano básico inicial
        usedCredits: 0,
        createdAt: serverTimestamp(),
      });
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar sua conta.");
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      let message = "Ocorreu um erro ao criar sua conta.";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Este email já está em uso.";
          break;
        case "auth/invalid-email":
          message = "Email inválido.";
          break;
        case "auth/weak-password":
          message = "Senha fraca. Use pelo menos 6 caracteres.";
          break;
      }
      
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Ocorreu um erro ao fazer logout.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}