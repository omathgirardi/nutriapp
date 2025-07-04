"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Send, 
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  Calendar,
  User,
  Clock,
  Utensils
} from "lucide-react";
import { toast } from "sonner";

// Componente de filtro de período
const PeriodFilter = ({ activePeriod, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={activePeriod === "all" ? "default" : "outline"} 
        size="sm"
        onClick={() => onChange("all")}
      >
        Todos
      </Button>
      <Button 
        variant={activePeriod === "week" ? "default" : "outline"} 
        size="sm"
        onClick={() => onChange("week")}
      >
        Esta Semana
      </Button>
      <Button 
        variant={activePeriod === "month" ? "default" : "outline"} 
        size="sm"
        onClick={() => onChange("month")}
      >
        Este Mês
      </Button>
      <Button 
        variant={activePeriod === "quarter" ? "default" : "outline"} 
        size="sm"
        onClick={() => onChange("quarter")}
      >
        Este Trimestre
      </Button>
    </div>
  );
};

// Dados de exemplo para o histórico de dietas
const mockDiets = [
  {
    id: "D-123456",
    title: "Dieta para Ganho Muscular",
    clientName: "João Silva",
    clientId: "A-01",
    calories: 2450,
    protein: 184,
    carbs: 245,
    fat: 82,
    goal: "gain",
    type: "ai",
    createdAt: "10/06/2023",
    status: "active"
  },
  {
    id: "D-123457",
    title: "Dieta para Perda de Peso",
    clientName: "Maria Santos",
    clientId: "A-02",
    calories: 1850,
    protein: 150,
    carbs: 180,
    fat: 55,
    goal: "lose",
    type: "ai",
    createdAt: "05/06/2023",
    status: "active"
  },
  {
    id: "D-123458",
    title: "Dieta para Manutenção",
    clientName: "Pedro Oliveira",
    clientId: "A-03",
    calories: 2200,
    protein: 165,
    carbs: 220,
    fat: 73,
    goal: "maintain",
    type: "template",
    createdAt: "20/05/2023",
    status: "inactive"
  },
  {
    id: "D-123459",
    title: "Dieta para Performance",
    clientName: "Ana Souza",
    clientId: "A-04",
    calories: 2350,
    protein: 170,
    carbs: 265,
    fat: 65,
    goal: "performance",
    type: "ai",
    createdAt: "15/04/2023",
    status: "inactive"
  },
  {
    id: "D-123460",
    title: "Dieta para Perda de Peso",
    clientName: "Carlos Ferreira",
    clientId: "A-05",
    calories: 2100,
    protein: 175,
    carbs: 195,
    fat: 70,
    goal: "lose",
    type: "template",
    createdAt: "01/06/2023",
    status: "active"
  },
];

export default function HistoryPage() {
  const router = useRouter();
  const [diets, setDiets] = useState(mockDiets);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePeriod, setActivePeriod] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  
  // Função para lidar com a busca
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Função para ordenar por campo
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Função para visualizar detalhes da dieta
  const handleViewDiet = (dietId) => {
    router.push(`/calculator/result?dietId=${dietId}`);
  };
  
  // Função para baixar PDF da dieta
  const handleDownloadPDF = (dietId) => {
    toast.success("Iniciando download do PDF...");
    // Em uma implementação real, você chamaria o serviço de geração de PDF
  };
  
  // Função para enviar dieta por WhatsApp
  const handleSendWhatsApp = (dietId) => {
    toast.success("Enviando dieta para o WhatsApp do cliente...");
    // Em uma implementação real, você chamaria o serviço de envio de mensagens
  };
  
  // Filtrar dietas
  const filteredDiets = diets.filter(diet => {
    // Filtro de busca
    const matchesSearch = diet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        diet.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        diet.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de período
    if (activePeriod === "all") {
      return matchesSearch;
    }
    
    // Em uma implementação real, você filtraria por data usando momentjs ou similar
    // Este é apenas um exemplo simplificado
    const today = new Date();
    const dietDate = new Date(diet.createdAt.split('/').reverse().join('-'));
    
    if (activePeriod === "week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return matchesSearch && dietDate >= weekAgo;
    }
    
    if (activePeriod === "month") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      return matchesSearch && dietDate >= monthAgo;
    }
    
    if (activePeriod === "quarter") {
      const quarterAgo = new Date(today);
      quarterAgo.setMonth(today.getMonth() - 3);
      return matchesSearch && dietDate >= quarterAgo;
    }
    
    return matchesSearch;
  });
  
  // Ordenar dietas
  const sortedDiets = [...filteredDiets].sort((a, b) => {
    if (sortField === "createdAt") {
      // Ordenar por data
      const dateA = new Date(a.createdAt.split('/').reverse().join('-'));
      const dateB = new Date(b.createdAt.split('/').reverse().join('-'));
      
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortField === "calories") {
      // Ordenar por número
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      // Ordenar por texto
      const valueA = a[sortField]?.toString().toLowerCase() || "";
      const valueB = b[sortField]?.toString().toLowerCase() || "";
      
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Histórico de Dietas</h1>
          <p className="text-gray-500">
            Visualize e gerencie todas as dietas geradas
          </p>
        </div>
        
        <Button onClick={() => router.push("/calculator")}>
          <Utensils className="mr-2 h-4 w-4" />
          Nova Dieta
        </Button>
      </div>
      
      <CardPremium>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Dietas Geradas</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar dieta..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="mb-6">
            <PeriodFilter 
              activePeriod={activePeriod}
              onChange={setActivePeriod}
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      Título
                      {sortField === "title" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                    onClick={() => handleSort("clientName")}
                  >
                    <div className="flex items-center">
                      Cliente
                      {sortField === "clientName" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                    onClick={() => handleSort("calories")}
                  >
                    <div className="flex items-center">
                      Calorias
                      {sortField === "calories" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Data
                      {sortField === "createdAt" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Tipo</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedDiets.length > 0 ? (
                  sortedDiets.map((diet) => (
                    <tr key={diet.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{diet.id}</td>
                      <td className="py-3 px-4">
                        <div 
                          className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                          onClick={() => handleViewDiet(diet.id)}
                        >
                          {diet.title}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{diet.clientName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {diet.calories} kcal
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm">{diet.createdAt}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          diet.type === "ai" ? "bg-primary-100 text-primary-800" : 
                          "bg-secondary-100 text-secondary-800"
                        }`}>
                          {diet.type === "ai" ? "IA" : "Template"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewDiet(diet.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Baixar PDF"
                            onClick={() => handleDownloadPDF(diet.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Enviar por WhatsApp"
                            onClick={() => handleSendWhatsApp(diet.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      Nenhuma dieta encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="text-sm text-gray-500">
            Mostrando {sortedDiets.length} de {diets.length} dietas
          </div>
        </CardFooter>
      </CardPremium>
    </div>
  );
}