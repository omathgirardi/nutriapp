import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Calendar,
  User,
  MapPin,
  Activity,
  Target,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  UserPlus,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import { useClients } from '../../hooks/useNutriService.js';
import { Button, Card, Input, Select, Modal } from './index.js';

const ClientsSection = () => {
  console.log('🚀 ClientsSection renderizado!');
  const { clients, loading, error, createClient, updateClient, deleteClient, fetchClients } = useClients();
  
  // Debug: Log mudanças na lista de clientes
  useEffect(() => {
    console.log('🔄 Lista de clientes atualizada:', clients);
    console.log('📊 Total de clientes:', clients.length);
  }, [clients]);
  
  // Debug: Log estados de loading e error
  useEffect(() => {
    console.log('⏳ Loading:', loading);
    if (error) console.log('❌ Error:', error);
  }, [loading, error]);
  
  // Estados locais
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'table'
  const [expandedCards, setExpandedCards] = useState(new Set());
  
  // Formulário do cliente
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',

    activityLevel: 'moderate',
    goal: 'maintenance',
    restrictions: '',
    isVegan: false,
    isIntolerant: false,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    healthInfo: {
      allergies: '',
      medications: '',
      medicalConditions: ''
    },
    notes: '',
    status: 'active'
  });

  // Resetar formulário
  const resetForm = () => {
    setClientForm({
      name: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
      height: '',
      gender: 'male',
      goal: 'maintenance',
      restrictions: '',
      isVegan: false,
      isIntolerant: false,
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      healthInfo: {
        allergies: '',
        medications: '',
        medicalConditions: ''
      },
      notes: '',
      status: 'active'
    });
  };

  // Filtrar e ordenar clientes
  const filteredClients = clients
    .filter(client => {
      const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.phone?.includes(searchTerm);
      const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  // Paginação
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Abrir modal para novo cliente
  const handleNewClient = () => {
    resetForm();
    setIsEditing(false);
    setSelectedClient(null);
    setShowClientModal(true);
  };

  // Abrir modal para editar cliente
  const handleEditClient = (client) => {
    setClientForm({
      ...client,
      address: client.address || {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      healthInfo: client.healthInfo || {
        allergies: '',
        medications: '',
        medicalConditions: ''
      }
    });
    setSelectedClient(client);
    setIsEditing(true);
    setShowClientModal(true);
  };

  // Visualizar detalhes do cliente
  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  // Confirmar exclusão
  const handleDeleteClient = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  // Expandir/contrair card no mobile
  const toggleCardExpansion = (clientId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId);
    } else {
      newExpanded.add(clientId);
    }
    setExpandedCards(newExpanded);
  };

  // Salvar cliente
  const handleSaveClient = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Iniciando salvamento do cliente...');
    console.log('📝 Dados do formulário:', clientForm);
    console.log('✏️ Modo de edição:', isEditing);
    
    // Validar campos obrigatórios
    const requiredFields = {
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      age: 'Idade',
      weight: 'Peso',
      height: 'Altura',
      goal: 'Objetivo'
    };
    
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!clientForm[field] || clientForm[field] === '') {
        console.error(`❌ Campo obrigatório ausente: ${label}`);
        alert(`Por favor, preencha o campo: ${label}`);
        return;
      }
    }
    
    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientForm.email)) {
      console.error('❌ Email inválido');
      alert('Por favor, insira um email válido');
      return;
    }
    
    // Validar idade
    const age = parseInt(clientForm.age);
    if (isNaN(age) || age < 1 || age > 120) {
      console.error('❌ Idade inválida');
      alert('Por favor, insira uma idade válida (1-120 anos)');
      return;
    }
    
    // Validar peso
    const weight = parseFloat(clientForm.weight);
    if (isNaN(weight) || weight < 1 || weight > 500) {
      console.error('❌ Peso inválido');
      alert('Por favor, insira um peso válido (1-500 kg)');
      return;
    }
    
    // Validar altura
    const height = parseInt(clientForm.height);
    if (isNaN(height) || height < 50 || height > 250) {
      console.error('❌ Altura inválida');
      alert('Por favor, insira uma altura válida (50-250 cm)');
      return;
    }
    
    console.log('✅ Validação dos dados passou');
    
    try {
      // Preparar dados para envio
      const clientData = {
        ...clientForm,
        age: age,
        weight: weight,
        height: height,
        // Garantir que campos opcionais tenham valores padrão
        restrictions: clientForm.restrictions || '',
        notes: clientForm.notes || '',
        status: clientForm.status || 'active'
      };
      
      console.log('📦 Dados preparados para envio:', clientData);
      
      let result;
      if (isEditing) {
        console.log('🔄 Atualizando cliente existente...');
        result = await updateClient(selectedClient.id, clientData);
      } else {
        console.log('🔄 Criando novo cliente...');
        result = await createClient(clientData);
      }
      
      console.log('📊 Resultado da operação:', result);
      
      if (result && result.success) {
        console.log('✅ Operação realizada com sucesso!');
        setShowClientModal(false);
        resetForm();
        console.log('✅ Modal fechado e formulário resetado');
        
        // Mostrar mensagem de sucesso
        alert(isEditing ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!');
      } else {
        console.error('❌ Operação falhou:', result?.error || 'Erro desconhecido');
        alert(`Erro ao ${isEditing ? 'atualizar' : 'criar'} cliente: ${result?.error || 'Erro desconhecido'}`);
      }
      
      console.log('👥 Lista atual de clientes:', clients);
    } catch (err) {
      console.error('❌ Erro ao salvar cliente:', err);
      alert(`Erro inesperado: ${err.message}`);
    }
  };

  // Confirmar exclusão
  const confirmDelete = async () => {
    try {
      await deleteClient(selectedClient.id);
      setShowDeleteModal(false);
      setSelectedClient(null);
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  };

  // Calcular IMC
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  // Obter status do IMC
  const getBMIStatus = (bmi) => {
    if (!bmi) return { text: 'N/A', color: 'gray' };
    if (bmi < 18.5) return { text: 'Abaixo do peso', color: 'blue' };
    if (bmi < 25) return { text: 'Peso normal', color: 'green' };
    if (bmi < 30) return { text: 'Sobrepeso', color: 'yellow' };
    return { text: 'Obesidade', color: 'red' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">
            Gerencie seus clientes e acompanhe seu progresso
          </p>
        </div>
        <Button
          onClick={handleNewClient}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus size={20} className="mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Filtros e busca */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="min-w-[120px]"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </Select>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-w-[120px]"
            >
              <option value="name">Nome</option>
              <option value="email">Email</option>
              <option value="createdAt">Data</option>
            </Select>
            <Button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              variant="outline"
              className="px-3"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Lista de clientes */}
      {loading ? (
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Carregando clientes...</p>
        </Card>
      ) : error ? (
        <Card className="p-8 text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">Erro ao carregar clientes</p>
          <p className="text-gray-500 mt-1">{error}</p>
          <Button onClick={fetchClients} className="mt-4">
            Tentar novamente
          </Button>
        </Card>
      ) : paginatedClients.length === 0 ? (
        <Card className="p-8 text-center">
          <Users size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Nenhum cliente encontrado</p>
          <p className="text-gray-500 mt-1">
            {searchTerm || filterStatus !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece adicionando seu primeiro cliente'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Button onClick={handleNewClient} className="mt-4">
              <Plus size={20} className="mr-2" />
              Adicionar Cliente
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* Cards de clientes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedClients.map((client) => {
              const bmi = calculateBMI(client.weight, client.height);
              const bmiStatus = getBMIStatus(bmi);
              const isExpanded = expandedCards.has(client.id);
              
              return (
                <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
                  {/* Header do card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User size={24} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{client.name}</h3>
                        <p className="text-sm text-gray-500">
                          {client.age} anos • {client.gender === 'male' ? 'Masculino' : 'Feminino'}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>

                  {/* Informações principais (sempre visíveis) */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  {/* Informações expandidas (ocultas por padrão) */}
                  <div className={`space-y-3 mb-4 ${
                    isExpanded ? 'block' : 'hidden'
                  }`}>
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity size={16} className="mr-2 text-gray-400" />
                      <span>{client.weight}kg • {client.height}cm</span>
                      {bmi && (
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-${bmiStatus.color}-100 text-${bmiStatus.color}-800`}>
                          IMC: {bmi}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Target size={16} className="mr-2 text-gray-400" />
                      <span>
                        {client.goal === 'weight_loss' && 'Perda de peso'}
                        {client.goal === 'weight_gain' && 'Ganho de peso'}
                        {client.goal === 'maintenance' && 'Manutenção'}
                        {client.goal === 'muscle_gain' && 'Ganho muscular'}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Nível de Atividade</h4>
                      <p className="text-sm text-gray-600">
                        {client.activityLevel === 'sedentary' && 'Sedentário - 1x por semana'}
                        {client.activityLevel === 'light' && 'Levemente ativo - 2x por semana'}
                        {client.activityLevel === 'moderate' && 'Moderadamente ativo - 3x por semana'}
                        {client.activityLevel === 'active' && 'Ativo - 4x por semana'}
                        {client.activityLevel === 'very_active' && 'Muito ativo - 5x por semana'}
                        {client.activityLevel === 'extremely_active' && 'Extremamente ativo - 6x por semana'}
                        {client.activityLevel === 'super_active' && 'Super ativo - 7x por semana'}
                      </p>
                    </div>
                    
                    {client.restrictions && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Restrições Alimentares</h4>
                        <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">{client.restrictions}</p>
                      </div>
                    )}
                    
                    {(client.isVegan || client.isIntolerant) && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Características</h4>
                        <div className="flex gap-2">
                          {client.isVegan && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Vegano</span>
                          )}
                          {client.isIntolerant && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Intolerante</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {client.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Observações</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{client.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Botões de ação */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <Button
                      onClick={() => toggleCardExpansion(client.id)}
                      variant="outline"
                      size="sm"
                    >
                      {isExpanded ? 'Ver menos' : 'Ver mais'}
                    </Button>
                    <div className="flex items-center space-x-2 ml-auto">
                      <Button
                        onClick={() => handleEditClient(client)}
                        variant="outline"
                        size="sm"
                        className="p-2"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => handleViewClient(client)}
                        variant="outline"
                        size="sm"
                        className="p-2"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClient(client)}
                        variant="outline"
                        size="sm"
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredClients.length)} de {filteredClients.length} clientes
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Anterior
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? 'primary' : 'outline'}
                    size="sm"
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal de cadastro/edição */}
      <Modal
        isOpen={showClientModal}
        onClose={() => {
          setShowClientModal(false);
          resetForm();
        }}
        title={isEditing ? 'Editar Cliente' : 'Novo Cliente'}
        size="lg"
      >
        <form onSubmit={handleSaveClient} className="space-y-6">
          {/* Dados pessoais */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome completo"
                type="text"
                value={clientForm.name}
                onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={clientForm.email}
                onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                required
              />
              <Input
                label="Telefone"
                type="tel"
                value={clientForm.phone}
                onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                required
              />
              <Input
                label="Idade"
                type="number"
                value={clientForm.age}
                onChange={(e) => setClientForm({ ...clientForm, age: e.target.value })}
                required
              />
              <Select
                label="Gênero"
                value={clientForm.gender}
                onChange={(e) => setClientForm({ ...clientForm, gender: e.target.value })}
                required
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </Select>
              <Select
                label="Status"
                value={clientForm.status}
                onChange={(e) => setClientForm({ ...clientForm, status: e.target.value })}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
            </div>
          </div>

          {/* Dados físicos */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dados Físicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Peso (kg)"
                type="number"
                step="0.1"
                value={clientForm.weight}
                onChange={(e) => setClientForm({ ...clientForm, weight: e.target.value })}
                required
              />
              <Input
                label="Altura (cm)"
                type="number"
                value={clientForm.height}
                onChange={(e) => setClientForm({ ...clientForm, height: e.target.value })}
                required
              />
              <div>
                <label 
                  htmlFor="client-bmi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  IMC
                </label>
                <div 
                  id="client-bmi"
                  className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600"
                  role="textbox"
                  aria-readonly="true"
                >
                  {clientForm.weight && clientForm.height
                    ? calculateBMI(clientForm.weight, clientForm.height)
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Objetivos e atividade */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Objetivos e Atividade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Objetivo"
                value={clientForm.goal}
                onChange={(e) => setClientForm({ ...clientForm, goal: e.target.value })}
                required
              >
                <option value="weight_loss">Perda de peso</option>
                <option value="weight_gain">Ganho de peso</option>
                <option value="maintenance">Manutenção</option>
                <option value="muscle_gain">Ganho muscular</option>
              </Select>
              <Select
                label="Nível de Atividade"
                value={clientForm.activityLevel}
                onChange={(e) => setClientForm({ ...clientForm, activityLevel: e.target.value })}
                required
              >
                <option value="sedentary">Sedentário - 1x por semana</option>
                <option value="light">Levemente ativo - 2x por semana</option>
                <option value="moderate">Moderadamente ativo - 3x por semana</option>
                <option value="active">Ativo - 4x por semana</option>
                <option value="very_active">Muito ativo - 5x por semana</option>
                <option value="extremely_active">Extremamente ativo - 6x por semana</option>
                <option value="super_active">Super ativo - 7x por semana</option>
              </Select>

            </div>
          </div>

          {/* Restrições e observações */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações Adicionais</h3>
            <div className="space-y-4">
              <Input
                label="Restrições alimentares"
                type="text"
                value={clientForm.restrictions}
                onChange={(e) => setClientForm({ ...clientForm, restrictions: e.target.value })}
                placeholder="Ex: Lactose, glúten, vegetariano..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isVegan"
                    checked={clientForm.isVegan}
                    onChange={(e) => setClientForm({ ...clientForm, isVegan: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isVegan" className="block text-sm font-medium text-gray-700">
                    Vegano
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isIntolerant"
                    checked={clientForm.isIntolerant}
                    onChange={(e) => setClientForm({ ...clientForm, isIntolerant: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isIntolerant" className="block text-sm font-medium text-gray-700">
                    Intolerante
                  </label>
                </div>
              </div>
              <div>
                <label 
                  htmlFor="client-notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Observações
                </label>
                <textarea
                  id="client-notes"
                  name="client-notes"
                  value={clientForm.notes}
                  onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações gerais sobre o cliente..."
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              onClick={() => {
                setShowClientModal(false);
                resetForm();
              }}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedClient(null);
        }}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertCircle size={24} className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-900">
                Tem certeza que deseja excluir o cliente <strong>{selectedClient?.name}</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedClient(null);
              }}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Excluindo...
                </div>
              ) : (
                'Excluir'
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de detalhes do cliente */}
      <Modal
        isOpen={showClientDetails}
        onClose={() => {
          setShowClientDetails(false);
          setSelectedClient(null);
        }}
        title={`Detalhes - ${selectedClient?.name}`}
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-6">
            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Informações Pessoais</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Nome:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Telefone:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Idade:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.age} anos</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Dados Físicos</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Activity size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Peso:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.weight} kg</span>
                  </div>
                  <div className="flex items-center">
                    <Activity size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Altura:</span>
                    <span className="text-sm font-medium ml-2">{selectedClient.height} cm</span>
                  </div>
                  <div className="flex items-center">
                    <Target size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">IMC:</span>
                    <span className="text-sm font-medium ml-2">
                      {calculateBMI(selectedClient.weight, selectedClient.height) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Objetivos */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Objetivos e Atividade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Objetivo</div>
                  <div className="text-blue-900 font-semibold">
                    {selectedClient.goal === 'weight_loss' && 'Perda de peso'}
                    {selectedClient.goal === 'weight_gain' && 'Ganho de peso'}
                    {selectedClient.goal === 'maintenance' && 'Manutenção'}
                    {selectedClient.goal === 'muscle_gain' && 'Ganho muscular'}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Nível de Atividade</div>
                  <div className="text-green-900 font-semibold">
                    {selectedClient.activityLevel === 'sedentary' && 'Sedentário - 1x por semana'}
                    {selectedClient.activityLevel === 'light' && 'Levemente ativo - 2x por semana'}
                    {selectedClient.activityLevel === 'moderate' && 'Moderadamente ativo - 3x por semana'}
                    {selectedClient.activityLevel === 'active' && 'Ativo - 4x por semana'}
                    {selectedClient.activityLevel === 'very_active' && 'Muito ativo - 5x por semana'}
                    {selectedClient.activityLevel === 'extremely_active' && 'Extremamente ativo - 6x por semana'}
                    {selectedClient.activityLevel === 'super_active' && 'Super ativo - 7x por semana'}
                  </div>
                </div>

              </div>
            </div>

            {/* Restrições e observações */}
            {(selectedClient.restrictions || selectedClient.notes) && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Informações Adicionais</h3>
                {selectedClient.restrictions && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 font-medium mb-1">Restrições Alimentares:</div>
                    <div className="text-sm text-gray-900 p-3 bg-yellow-50 rounded-lg">
                      {selectedClient.restrictions}
                    </div>
                  </div>
                )}
                {selectedClient.notes && (
                  <div>
                    <div className="text-sm text-gray-600 font-medium mb-1">Observações:</div>
                    <div className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                      {selectedClient.notes}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                onClick={() => {
                  setShowClientDetails(false);
                  handleEditClient(selectedClient);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit size={16} className="mr-2" />
                Editar Cliente
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClientsSection;