"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  PhoneCall, 
  Award, 
  CreditCard, 
  MessageSquare, 
  ChevronUp,
  Edit,
  Save,
  X,
  BookOpen,
  Download,
  Plus
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { getUserCreditTransactions } from "@/lib/firebase-services";
import { toast } from "sonner";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
}

const AchievementBadge = ({ title, description, icon, color, unlocked }) => {
  return (
    <div 
      className={`p-4 rounded-lg border ${
        unlocked 
          ? `${color} bg-opacity-10 border-opacity-30` 
          : 'border-gray-200 bg-gray-50'
      } transition-all`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          unlocked ? color : 'bg-gray-200'
        }`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${unlocked ? '' : 'text-gray-400'}`}>{title}</h4>
          <p className={`text-sm ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
            {description}
          </p>
          
          {!unlocked && (
            <div className="mt-2 text-xs text-gray-500">
              <span className="px-2 py-0.5 bg-gray-200 rounded-full">Bloqueado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    const loadTransactions = async () => {
      if (user?.uid) {
        setIsLoading(true);
        try {
          const txs = await getUserCreditTransactions(user.uid);
          setTransactions(txs);
        } catch (error) {
          console.error("Erro ao carregar transações:", error);
          toast.error("Erro ao carregar histórico de créditos");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadTransactions();
  }, [user?.uid]);
  
  const handleBuyCredits = () => {
    router.push("/profile/buy-credits");
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Perfil</h1>
          <p className="text-gray-500">Gerencie suas informações pessoais</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda */}
        <div className="col-span-1">
          <CardPremium variant="default" animation="fadeIn">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <User className="w-12 h-12" />
              </div>
              
              <h2 className="text-xl font-semibold mb-1">{user?.displayName || "Usuário"}</h2>
              <p className="text-gray-500 text-sm mb-4">Personal Trainer</p>
              
              <div className="w-full border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    <Mail className="h-4 w-4 inline mr-1" /> 
                    Email:
                  </span>
                  <span className="text-sm">{user?.email}</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    <PhoneCall className="h-4 w-4 inline mr-1" /> 
                    WhatsApp:
                  </span>
                  <span className="text-sm">{user?.whatsapp || "(Não informado)"}</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 inline mr-1" /> 
                    CREF:
                  </span>
                  <span className="text-sm">{user?.cref || "(Não informado)"}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <User className="h-4 w-4 inline mr-1" /> 
                    ID:
                  </span>
                  <span className="text-sm px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">
                    {user?.id || "P0001"}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => setEditing(!editing)}
              >
                {editing ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancelar Edição
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </>
                )}
              </Button>
            </CardContent>
          </CardPremium>
          
          <CardPremium variant="default" animation="fadeIn" className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Plano Intermediário</span>
                    <span className="text-sm px-2 py-0.5 bg-secondary-50 text-secondary-700 rounded-full">
                      Ativo
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Créditos:</span>
                    <span className="font-medium">{user?.credits || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Utilizados:</span>
                    <span>{user?.usedCredits || 0} ({user?.credits && user?.usedCredits ? Math.round((user.usedCredits / (user.credits + user.usedCredits)) * 100) : 0}%)</span>
                  </div>
                  
                  <div className="mt-2">
                    <Progress 
                      value={user?.credits && user?.usedCredits ? 
                        Math.round((user.usedCredits / (user.credits + user.usedCredits)) * 100) : 0
                      } 
                      className="h-2" 
                    />
                  </div>
                </div>
                
                <Button 
                  variant="default" 
                  fullWidth={true}
                  onClick={handleBuyCredits}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Comprar Créditos
                </Button>
              </div>
            </CardContent>
          </CardPremium>
        </div>
        
        {/* Coluna Direita */}
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              <TabsTrigger value="credits">Créditos</TabsTrigger>
              <TabsTrigger value="stats">Desempenho</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <CardPremium variant="default">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    {editing 
                      ? "Edite suas informações pessoais abaixo" 
                      : "Visualize suas informações pessoais"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Nome Completo</Label>
                      <Input 
                        id="fullname" 
                        defaultValue={user?.displayName || ""} 
                        disabled={!editing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cref">CREF</Label>
                      <Input 
                        id="cref" 
                        defaultValue={user?.cref || ""} 
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        defaultValue={user?.email || ""} 
                        disabled={!editing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input 
                        id="whatsapp" 
                        defaultValue={user?.whatsapp || ""} 
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Especialização</Label>
                    <Input 
                      id="specialization" 
                      defaultValue="Hipertrofia e Emagrecimento" 
                      disabled={!editing}
                    />
                  </div>
                </CardContent>
                {editing && (
                  <CardFooter>
                    <Button className="ml-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </Button>
                  </CardFooter>
                )}
              </CardPremium>
              
              <CardPremium variant="default" className="mt-6">
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Atualize sua senha de acesso
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      disabled={!editing}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input 
                        id="new-password" 
                        type="password"
                        disabled={!editing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </CardContent>
                {editing && (
                  <CardFooter>
                    <Button variant="outline" className="ml-auto">
                      Atualizar Senha
                    </Button>
                  </CardFooter>
                )}
              </CardPremium>
            </TabsContent>
            
            <TabsContent value="achievements">
              <CardPremium variant="default">
                <CardHeader>
                  <CardTitle>Minhas Conquistas</CardTitle>
                  <CardDescription>
                    Desbloqueie conquistas utilizando a plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <AchievementBadge 
                      title="Nutricionista Bronze"
                      description="Gerou 10 dietas personalizadas"
                      icon={<Award className="h-5 w-5 text-white" />}
                      color="bg-amber-500 border-amber-500"
                      unlocked={true}
                    />
                    
                    <AchievementBadge 
                      title="Nutricionista Prata"
                      description="Gerou 50 dietas personalizadas"
                      icon={<Award className="h-5 w-5 text-white" />}
                      color="bg-gray-400 border-gray-400"
                      unlocked={false}
                    />
                    
                    <AchievementBadge 
                      title="Nutricionista Ouro"
                      description="Gerou 100 dietas personalizadas"
                      icon={<Award className="h-5 w-5 text-white" />}
                      color="bg-yellow-500 border-yellow-500"
                      unlocked={false}
                    />
                    
                    <AchievementBadge 
                      title="Especialista em Dietas"
                      description="Criou dietas para 25 clientes diferentes"
                      icon={<User className="h-5 w-5 text-white" />}
                      color="bg-primary-500 border-primary-500"
                      unlocked={true}
                    />
                    
                    <AchievementBadge 
                      title="Mestre em Macros"
                      description="Ajustou manualmente macronutrientes em 10 dietas"
                      icon={<ChevronUp className="h-5 w-5 text-white" />}
                      color="bg-secondary-500 border-secondary-500"
                      unlocked={false}
                    />
                  </div>
                </CardContent>
              </CardPremium>
            </TabsContent>
            
            <TabsContent value="credits">
              <CardPremium variant="default">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Meus Créditos</CardTitle>
                      <CardDescription>
                        Histórico de compras e uso de créditos
                      </CardDescription>
                    </div>
                    
                    <Button onClick={handleBuyCredits}>
                      <Plus className="mr-2 h-4 w-4" />
                      Comprar Créditos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-primary-800 mb-1">Créditos Disponíveis</h4>
                        <p className="text-2xl font-bold text-primary-700">{user?.credits || 0}</p>
                      </div>
                      
                      <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-secondary-800 mb-1">Créditos Utilizados</h4>
                        <p className="text-2xl font-bold text-secondary-700">{user?.usedCredits || 0}</p>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Total Adquirido</h4>
                        <p className="text-2xl font-bold text-gray-700">{(user?.credits || 0) + (user?.usedCredits || 0)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Histórico de Transações</h3>
                      
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                        </div>
                      ) : transactions.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Pacote</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">Créditos</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-600">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="py-3 px-4">{tx.timestamp}</td>
                                  <td className="py-3 px-4">
                                    {tx.packageId === 'basic' 
                                      ? 'Pacote Básico' 
                                      : tx.packageId === 'pro' 
                                        ? 'Pacote Profissional' 
                                        : 'Pacote Premium'}
                                  </td>
                                  <td className="py-3 px-4 text-right">{tx.credits}</td>
                                  <td className="py-3 px-4 text-right">R$ {tx.amount.toFixed(2).replace('.', ',')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-gray-500">Nenhuma transação encontrada</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={handleBuyCredits}
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Comprar Primeiros Créditos
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </CardPremium>
            </TabsContent>
            
            <TabsContent value="stats">
              <CardPremium variant="default">
                <CardHeader>
                  <CardTitle>Estatísticas e Desempenho</CardTitle>
                  <CardDescription>
                    Acompanhe seu progresso na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-primary-50 border border-primary-100">
                        <h4 className="text-sm font-medium text-primary-800 mb-1">Dietas Geradas</h4>
                        <p className="text-2xl font-bold text-primary-700">{user?.usedCredits || 0}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-secondary-50 border border-secondary-100">
                        <h4 className="text-sm font-medium text-secondary-800 mb-1">Clientes Ativos</h4>
                        <p className="text-2xl font-bold text-secondary-700">15</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                        <h4 className="text-sm font-medium text-amber-800 mb-1">Créditos Utilizados</h4>
                        <p className="text-2xl font-bold text-amber-700">{user?.usedCredits || 0}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Utilização de Créditos</h4>
                      <div className="w-full bg-gray-100 rounded-full h-4">
                        <div 
                          className="bg-gradient-button h-4 rounded-full" 
                          style={{ width: `${user?.credits && user?.usedCredits ? 
                            Math.round((user.usedCredits / (user.credits + user.usedCredits)) * 100) : 0}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{user?.usedCredits || 0} utilizados</span>
                        <span className="text-xs text-gray-500">{user?.credits || 0} restantes</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tipos de Dietas Geradas</h4>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm">
                          <span className="font-medium">Emagrecimento:</span> 14
                        </div>
                        <div className="px-3 py-1.5 bg-secondary-50 text-secondary-700 rounded-lg text-sm">
                          <span className="font-medium">Ganho Muscular:</span> 10
                        </div>
                        <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          <span className="font-medium">Manutenção:</span> 8
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CardPremium>
              
              <CardPremium variant="default" className="mt-6">
                <CardHeader>
                  <CardTitle>Suporte</CardTitle>
                  <CardDescription>
                    Precisa de ajuda? Entre em contato conosco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Abrir Ticket de Suporte
                    </Button>
                    
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <h4 className="font-medium mb-2">Informações de Contato</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        suporte@nutriplan.com
                      </p>
                      <p className="text-sm text-gray-600">
                        <PhoneCall className="inline h-4 w-4 mr-1" />
                        (11) 3456-7890
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CardPremium>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}