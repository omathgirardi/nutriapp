"use client";

import { useState } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Plus, 
  Users, 
  User, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FileText,
  Send,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Check,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "sonner";

// Componente de dropdown para ações
const ActionDropdown = ({ onEdit, onDelete, onSendDiet }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                onSendDiet();
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Dieta
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                onDelete();
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de formulário de cliente
const ClientForm = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState(client || {
    name: "",
    email: "",
    phone: "",
    gender: "male",
    age: "",
    weight: "",
    height: "",
    goal: "maintain",
    notes: ""
  });
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input 
            id="name" 
            placeholder="Nome do cliente"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="cliente@exemplo.com"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input 
            id="phone" 
            placeholder="(00) 00000-0000"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Sexo</Label>
          <select
            id="gender"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.gender || "male"}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Idade</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Anos"
            value={formData.age || ""}
            onChange={(e) => handleChange("age", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="Quilogramas"
            value={formData.weight || ""}
            onChange={(e) => handleChange("weight", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="Centímetros"
            value={formData.height || ""}
            onChange={(e) => handleChange("height", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="goal">Objetivo Principal</Label>
        <select
          id="goal"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.goal || "maintain"}
          onChange={(e) => handleChange("goal", e.target.value)}
        >
          <option value="lose">Perda de Peso</option>
          <option value="maintain">Manutenção de Peso</option>
          <option value="gain">Ganho de Massa Muscular</option>
          <option value="performance">Melhora de Performance</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <textarea
          id="notes"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Informações adicionais, preferências, restrições, etc."
          value={formData.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {client ? "Atualizar Cliente" : "Cadastrar Cliente"}
        </Button>
      </div>
    </form>
  );
};

// Componente de detalhes do cliente
const ClientDetails = ({ client, onClose, onEdit }) => {
  // Calcular IMC
  const calculateBMI = () => {
    if (!client.weight || !client.height) return "N/A";
    
    const weight = parseFloat(client.weight);
    const height = parseFloat(client.height) / 100; // cm para metros
    const bmi = weight / (height * height);
    
    return bmi.toFixed(1);
  };
  
  // Classificar IMC
  const getBMIClass = () => {
    const bmi = parseFloat(calculateBMI());
    
    if (isNaN(bmi)) return "N/A";
    
    if (bmi < 18.5) return "Abaixo do peso";
    if (bmi < 25) return "Peso normal";
    if (bmi < 30) return "Sobrepeso";
    if (bmi < 35) return "Obesidade Grau I";
    if (bmi < 40) return "Obesidade Grau II";
    return "Obesidade Grau III";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p className="text-gray-500">
              {client.gender === "male" ? "Masculino" : "Feminino"}, {client.age} anos
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-sm font-medium text-primary-700 mb-2">Contato</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">{client.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">{client.phone}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-100">
          <h3 className="text-sm font-medium text-secondary-700 mb-2">Dados Físicos</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-gray-500">Peso</span>
              <p className="font-medium">{client.weight} kg</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Altura</span>
              <p className="font-medium">{client.height} cm</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">IMC</span>
              <p className="font-medium">{calculateBMI()}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Classificação</span>
              <p className="font-medium">{getBMIClass()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
          <h3 className="text-sm font-medium text-amber-700 mb-2">Objetivo</h3>
          <p className="font-medium">
            {client.goal === "lose" ? "Perda de Peso" : 
             client.goal === "maintain" ? "Manutenção de Peso" : 
             client.goal === "gain" ? "Ganho de Massa Muscular" : 
             "Melhora de Performance"}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Histórico de Dietas</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 border-b">Data</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 border-b">Tipo</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 border-b">Calorias</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 text-sm">10/06/2023</td>
                <td className="py-2 px-4 text-sm">Perda de Peso</td>
                <td className="py-2 px-4 text-sm">1,850 kcal</td>
                <td className="py-2 px-4 text-sm">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-sm">25/05/2023</td>
                <td className="py-2 px-4 text-sm">Perda de Peso</td>
                <td className="py-2 px-4 text-sm">1,950 kcal</td>
                <td className="py-2 px-4 text-sm">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Próximas Avaliações</h3>
        
        <div className="space-y-2">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Calendar className="h-5 w-5 text-primary-500 mr-3" />
            <div>
              <p className="font-medium">Avaliação Física</p>
              <p className="text-sm text-gray-500">15/07/2023 às 10:00</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Agendar Avaliação
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Observações</h3>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm">
            {client.notes || "Nenhuma observação registrada."}
          </p>
        </div>
      </div>
    </div>
  );
};

// Mock de clientes para exemplo
const mockClients = [
  { 
    id: "A-01", 
    name: "João Silva", 
    email: "joao@example.com",
    phone: "(11) 98765-4321",
    gender: "male", 
    age: "32", 
    weight: "78", 
    height: "180", 
    goal: "gain",
    status: "active",
    lastAssessment: "10/06/2023",
    nextAssessment: "15/07/2023"
  },
  { 
    id: "A-02", 
    name: "Maria Santos", 
    email: "maria@example.com",
    phone: "(11) 91234-5678",
    gender: "female", 
    age: "28", 
    weight: "64", 
    height: "165", 
    goal: "lose",
    status: "active",
    lastAssessment: "05/06/2023",
    nextAssessment: "05/07/2023"
  },
  { 
    id: "A-03", 
    name: "Pedro Oliveira", 
    email: "pedro@example.com",
    phone: "(11) 99876-5432",
    gender: "male", 
    age: "35", 
    weight: "85", 
    height: "175", 
    goal: "maintain",
    status: "pending",
    lastAssessment: "20/05/2023",
    nextAssessment: "20/06/2023"
  },
  { 
    id: "A-04", 
    name: "Ana Souza", 
    email: "ana@example.com",
    phone: "(11) 98888-7777",
    gender: "female", 
    age: "42", 
    weight: "70", 
    height: "170", 
    goal: "performance",
    status: "inactive",
    lastAssessment: "15/04/2023",
    nextAssessment: null
  },
  { 
    id: "A-05", 
    name: "Carlos Ferreira", 
    email: "carlos@example.com",
    phone: "(11) 97777-8888",
    gender: "male", 
    age: "25", 
    weight: "92", 
    height: "185", 
    goal: "lose",
    status: "active",
    lastAssessment: "01/06/2023",
    nextAssessment: "01/07/2023"
  },
];

export default function Clients() {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
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
      setSortDirection("asc");
    }
  };
  
  // Função para criar/editar cliente
  const handleSaveClient = (clientData) => {
    if (currentClient) {
      // Atualizar cliente existente
      const updatedClients = clients.map(client => 
        client.id === currentClient.id ? { ...client, ...clientData } : client
      );
      setClients(updatedClients);
      toast.success("Cliente atualizado com sucesso!");
    } else {
      // Criar novo cliente
      const newClient = {
        ...clientData,
        id: `A-${(clients.length + 1).toString().padStart(2, '0')}`,
        status: "active",
        lastAssessment: null,
        nextAssessment: null
      };
      setClients([...clients, newClient]);
      toast.success("Cliente cadastrado com sucesso!");
    }
    
    setShowForm(false);
    setCurrentClient(null);
  };
  
  // Função para editar cliente
  const handleEditClient = (client) => {
    setCurrentClient(client);
    setShowForm(true);
    setShowDetails(false);
  };
  
  // Função para excluir cliente
  const handleDeleteClient = (clientId) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      const updatedClients = clients.filter(client => client.id !== clientId);
      setClients(updatedClients);
      toast.success("Cliente excluído com sucesso!");
    }
  };
  
  // Função para ver detalhes do cliente
  const handleViewDetails = (client) => {
    setCurrentClient(client);
    setShowDetails(true);
    setShowForm(false);
  };
  
  // Função para enviar dieta
  const handleSendDiet = (clientId) => {
    toast.success("Redirecionando para criar uma nova dieta para este cliente...");
    // Em uma implementação real, redirecionaria para a calculadora com o cliente pré-selecionado
  };
  
  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    // Filtro de busca
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        client.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de status
    const matchesStatus = activeFilter === "all" || 
                          (activeFilter === "active" && client.status === "active") ||
                          (activeFilter === "pending" && client.status === "pending") ||
                          (activeFilter === "inactive" && client.status === "inactive");
    
    return matchesSearch && matchesStatus;
  });
  
  // Ordenar clientes
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortField === "lastAssessment") {
      // Ordenar por data
      const dateA = a.lastAssessment ? new Date(a.lastAssessment.split('/').reverse().join('-')) : new Date(0);
      const dateB = b.lastAssessment ? new Date(b.lastAssessment.split('/').reverse().join('-')) : new Date(0);
      
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
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
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-gray-500">
            Gerencie seus clientes e acompanhe seu progresso
          </p>
        </div>
        
        <Button onClick={() => {
          setShowForm(true);
          setCurrentClient(null);
          setShowDetails(false);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      
      <CardPremium>
        {showForm ? (
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6">
              {currentClient ? "Editar Cliente" : "Novo Cliente"}
            </h2>
            <ClientForm 
              client={currentClient}
              onSave={handleSaveClient}
              onCancel={() => {
                setShowForm(false);
                setCurrentClient(null);
              }}
            />
          </CardContent>
        ) : showDetails ? (
          <CardContent className="p-6">
            <ClientDetails 
              client={currentClient}
              onClose={() => {
                setShowDetails(false);
                setCurrentClient(null);
              }}
              onEdit={() => handleEditClient(currentClient)}
            />
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Lista de Clientes</CardTitle>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Buscar cliente..."
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
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveFilter}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="active">Ativos</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                  <TabsTrigger value="inactive">Inativos</TabsTrigger>
                </TabsList>
                
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
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center">
                            Nome
                            {sortField === "name" && (
                              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                          onClick={() => handleSort("goal")}
                        >
                          <div className="flex items-center">
                            Objetivo
                            {sortField === "goal" && (
                              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b cursor-pointer"
                          onClick={() => handleSort("lastAssessment")}
                        >
                          <div className="flex items-center">
                            Última Avaliação
                            {sortField === "lastAssessment" && (
                              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Status</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 border-b">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedClients.length > 0 ? (
                        sortedClients.map((client) => (
                          <tr key={client.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{client.id}</td>
                            <td className="py-3 px-4">
                              <div 
                                className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                                onClick={() => handleViewDetails(client)}
                              >
                                {client.name}
                              </div>
                              <div className="text-xs text-gray-500">{client.email}</div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {client.goal === "lose" ? "Perda de Peso" : 
                              client.goal === "maintain" ? "Manutenção" : 
                              client.goal === "gain" ? "Ganho Muscular" : 
                              "Performance"}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {client.lastAssessment || "Não realizada"}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                client.status === "active" ? "bg-emerald-100 text-emerald-800" : 
                                client.status === "pending" ? "bg-amber-100 text-amber-800" : 
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {client.status === "active" ? "Ativo" : 
                                client.status === "pending" ? "Pendente" : 
                                "Inativo"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewDetails(client)}
                                >
                                  Ver
                                </Button>
                                <ActionDropdown 
                                  onEdit={() => handleEditClient(client)}
                                  onDelete={() => handleDeleteClient(client.id)}
                                  onSendDiet={() => handleSendDiet(client.id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-gray-500">
                            Nenhum cliente encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Tabs>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-gray-500">
                Mostrando {sortedClients.length} de {clients.length} clientes
              </div>
            </CardFooter>
          </>
        )}
      </CardPremium>
    </div>
  );
}