"use client";

import { useState, useEffect } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-premium";
import { Search, Download, Eye, CreditCard, MoreHorizontal, CheckCircle, XCircle, Filter, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useNotifications } from "@/contexts/notification-context";

// Mock de dados de compras mais detalhado
const mockPurchases = [
  {
    id: "P-78901",
    userId: "U-1234",
    userName: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    plan: "Plano Mensal Premium",
    amount: 199.90,
    status: "completed",
    date: new Date(Date.now() - 1800000).toISOString(),
    paymentMethod: "Cartão de Crédito",
    cardInfo: "**** **** **** 5678"
  },
  {
    id: "P-78902",
    userId: "U-5678",
    userName: "Amanda Soares",
    email: "amanda.soares@example.com",
    plan: "Plano Anual Premium",
    amount: 1799.90,
    status: "completed",
    date: new Date(Date.now() - 7200000).toISOString(),
    paymentMethod: "Cartão de Crédito",
    cardInfo: "**** **** **** 9012"
  },
  {
    id: "P-78903",
    userId: "U-9012",
    userName: "Roberto Silva",
    email: "roberto.silva@example.com",
    plan: "Plano Mensal Basic",
    amount: 99.90,
    status: "pending",
    date: new Date(Date.now() - 10800000).toISOString(),
    paymentMethod: "Boleto",
    cardInfo: null
  },
  {
    id: "P-78904",
    userId: "U-3456",
    userName: "Juliana Costa",
    email: "juliana.costa@example.com",
    plan: "Plano Trimestral Premium",
    amount: 539.70,
    status: "completed",
    date: new Date(Date.now() - 86400000).toISOString(),
    paymentMethod: "Pix",
    cardInfo: null
  },
  {
    id: "P-78905",
    userId: "U-7890",
    userName: "Fernando Oliveira",
    email: "fernando.oliveira@example.com",
    plan: "Plano Anual Basic",
    amount: 1079.00,
    status: "failed",
    date: new Date(Date.now() - 172800000).toISOString(),
    paymentMethod: "Cartão de Crédito",
    cardInfo: "**** **** **** 3456"
  }
];

export default function PurchasesPage() {
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get('id');
  const { purchases: notificationPurchases } = useNotifications();
  
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  
  useEffect(() => {
    // Simular carregamento de dados e mesclagem com notificações
    const loadData = async () => {
      // Em um cenário real, buscaríamos as compras do banco de dados
      setTimeout(() => {
        // Adicionar as compras das notificações ao nosso conjunto de dados
        const notificationData = notificationPurchases.map(notification => ({
          id: notification.purchaseId,
          userId: `U-${Math.floor(1000 + Math.random() * 9000)}`,
          userName: notification.message.split("por ")[1],
          email: `${notification.message.split("por ")[1].toLowerCase().replace(/\s/g, ".")}@example.com`,
          plan: notification.plan,
          amount: notification.amount,
          status: "completed",
          date: notification.date,
          paymentMethod: ["Cartão de Crédito", "Pix", "Boleto"][Math.floor(Math.random() * 3)],
          cardInfo: ["Cartão de Crédito"].includes(["Cartão de Crédito", "Pix", "Boleto"][Math.floor(Math.random() * 3)]) 
            ? `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`
            : null
        }));
        
        // Mesclar com os dados de mock, removendo duplicatas
        const allPurchases = [...mockPurchases];
        notificationData.forEach(newPurchase => {
          if (!allPurchases.some(p => p.id === newPurchase.id)) {
            allPurchases.push(newPurchase);
          }
        });
        
        // Ordenar por data, mais recente primeiro
        allPurchases.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setPurchases(allPurchases);
        
        // Se temos um ID específico, selecionar essa compra
        if (purchaseId) {
          const purchase = allPurchases.find(p => p.id === purchaseId);
          if (purchase) {
            setSelectedPurchase(purchase);
          }
        }
        
        setLoading(false);
      }, 1000);
    };
    
    loadData();
  }, [purchaseId, notificationPurchases]);
  
  // Filtrar compras por termo de busca e status
  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.plan.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      purchase.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
  
  // Formatação da data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Renderizar badge de status
  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Concluído
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Pendente
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Falhou
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
        <p className="text-gray-500 mt-1">
          Gerencie e visualize todas as transações da plataforma.
        </p>
      </div>
      
      {/* Filtros e Pesquisa */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar por ID, cliente ou plano..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            <select 
              className="text-sm border rounded-md px-2 py-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="completed">Concluídos</option>
              <option value="pending">Pendentes</option>
              <option value="failed">Falhos</option>
            </select>
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de Compras */}
        <div className="md:col-span-2">
          <CardPremium>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Lista de Compras</CardTitle>
              <CardDescription>
                {filteredPurchases.length} transações encontradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID/Cliente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plano
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPurchases.length > 0 ? (
                        filteredPurchases.map((purchase) => (
                          <tr key={purchase.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900">
                                  {purchase.id}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {purchase.userName}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {purchase.plan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                R$ {purchase.amount.toFixed(2)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderStatusBadge(purchase.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(purchase.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedPurchase(purchase)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Detalhes
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                            Nenhuma compra encontrada com os filtros aplicados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </CardPremium>
        </div>
        
        {/* Detalhes da Compra */}
        <div className="md:col-span-1">
          <CardPremium>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">
                {selectedPurchase ? "Detalhes da Compra" : "Selecione uma Compra"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPurchase ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{selectedPurchase.id}</h3>
                    {renderStatusBadge(selectedPurchase.status)}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Cliente</div>
                      <div className="font-medium">{selectedPurchase.userName}</div>
                      <div className="text-sm text-gray-500">{selectedPurchase.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Plano</div>
                      <div className="font-medium">{selectedPurchase.plan}</div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Valor</div>
                        <div className="font-medium">R$ {selectedPurchase.amount.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Data</div>
                        <div className="font-medium">{formatDate(selectedPurchase.date)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Detalhes do Pagamento</h4>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="font-medium">{selectedPurchase.paymentMethod}</div>
                        {selectedPurchase.cardInfo && (
                          <div className="text-sm text-gray-500">{selectedPurchase.cardInfo}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Recibo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedPurchase(null)}
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma compra selecionada</h3>
                  <p className="text-sm text-gray-500">
                    Selecione uma compra na lista para ver seus detalhes.
                  </p>
                </div>
              )}
            </CardContent>
          </CardPremium>
        </div>
      </div>
    </div>
  );
}