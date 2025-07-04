"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button-premium";
import { CardPremium, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card-premium";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, Lock, Mail, User, BookOpen, PhoneCall } from "lucide-react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando carregamento
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
        {/* Seção Esquerda - Branding e Valor */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center py-8 animate-fadeIn">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text">
              NutriPlan
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              Transforme sua prática como Personal Trainer com dietas personalizadas
            </p>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary-500" />
                </div>
                <span className="text-gray-700">Cálculos de calorias precisos</span>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-50 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary-500" />
                </div>
                <span className="text-gray-700">Dietas personalizadas</span>
              </div>
            </div>
            <div className="flex items-center mt-4 justify-center lg:justify-start">
              <div className="bg-primary-50 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-primary-500" />
              </div>
              <span className="text-gray-700">Envio direto por WhatsApp</span>
            </div>
          </div>

          <div className="w-full max-w-md relative mt-8 hidden lg:block">
            <CardPremium 
              variant="glass" 
              className="animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">João Silva</h3>
                      <p className="text-xs text-gray-500">Cliente #A-01-P0001</p>
                    </div>
                  </div>
                  <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                    Ativo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Calorias Diárias</p>
                    <p className="font-semibold">2,450 kcal</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Objetivo</p>
                    <p className="font-semibold">Ganho muscular</p>
                  </div>
                </div>

                <Button variant="default" size="sm" fullWidth={true}>
                  Ver Dieta Completa
                </Button>
              </div>
            </CardPremium>

            <CardPremium 
              variant="glass" 
              className="absolute top-16 left-16 z-10 animate-slideUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dieta Personalizada</h3>
                    <p className="text-xs text-gray-500">4 refeições • 16 alimentos</p>
                  </div>
                </div>
              </div>
            </CardPremium>
          </div>
        </div>

        {/* Seção Direita - Formulário */}
        <div className="w-full max-w-md">
          <CardPremium variant="default" className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-center">Acesse sua conta</CardTitle>
              <CardDescription className="text-center">
                Faça login ou crie uma nova conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="********"
                          className="pl-10" 
                          required 
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="default" 
                      fullWidth={true}
                      loading={loading}
                    >
                      Entrar
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="fullname" 
                          type="text" 
                          placeholder="Seu nome completo"
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cref">CREF</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="cref" 
                          type="text" 
                          placeholder="Seu número CREF"
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <div className="relative">
                        <PhoneCall className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="whatsapp" 
                          type="tel" 
                          placeholder="(00) 00000-0000"
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="register-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mínimo 6 caracteres"
                          className="pl-10" 
                          required 
                          minLength={6}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="default" 
                      fullWidth={true}
                      loading={loading}
                    >
                      Cadastrar
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-gray-500 mt-4">
                Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </CardFooter>
          </CardPremium>
        </div>
      </div>
    </main>
  );
}