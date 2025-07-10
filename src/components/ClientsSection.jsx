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
import { useClients } from '../hooks/useNutriService.js';
import { Button, Card, Input, Select, Modal } from './index.js';

const ClientsSection = () => {
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
      activityLevel: 'moderate',
      goal: 'maintenance',
      restrictions: '',
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

  // Salvar cliente
  const handleSaveClient = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Iniciando salvamento do cliente...');
    console.log('📝 Dados do formulário:', clientForm);
    console.log('✏️ Modo de edição:', isEditing);
    
    try {
      let result;
      if (isEditing) {
        console.log('🔄 Atualizando cliente existente...');
        result = await updateClient(selectedClient.id, clientForm);
      } else {
        console.log('🔄 Criando novo cliente...');
        result = await createClient(clientForm);
      }
      
      console.log('📊 Resultado da operação:', result);
      console.log('👥 Lista atual de clientes:', clients);
      
      setShowClientModal(false);
      resetForm();
      
      console.log('✅ Modal fechado e formulário resetado');
    } catch (err) {
      console.error('❌ Erro ao salvar cliente:', err);
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
          {/* Tabela de clientes */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dados Físicos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objetivo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedClients.map((client) => {
                    const bmi = calculateBMI(client.weight, client.height);
                    const bmiStatus = getBMIStatus(bmi);
                    
                    return (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User size={20} className="text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {client.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {client.age} anos • {client.gender === 'male' ? 'Masculino' : 'Feminino'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{client.email}</div>
                          <div className="text-sm text-gray-500">{client.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {client.weight}kg • {client.height}cm
                          </div>
                          {bmi && (
                            <div className="text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${bmiStatus.color}-100 text-${bmiStatus.color}-800`}>
                                IMC: {bmi}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {client.goal === 'weight_loss' && 'Perda de peso'}
                            {client.goal === 'weight_gain' && 'Ganho de peso'}
                            {client.goal === 'maintenance' && 'Manutenção'}
                            {client.goal === 'muscle_gain' && 'Ganho muscular'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.activityLevel === 'sedentary' && 'Sedentário'}
                            {client.activityLevel === 'light' && 'Leve'}
                            {client.activityLevel === 'moderate' && 'Moderado'}
                            {client.activityLevel === 'intense' && 'Intenso'}
                            {client.activityLevel === 'very_intense' && 'Muito intenso'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            client.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {client.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              onClick={() => handleViewClient(client)}
                              variant="outline"
                              size="sm"
                              className="p-2"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              onClick={() => handleEditClient(client)}
                              variant="outline"
                              size="sm"
                              className="p-2"
                            >
                              <Edit size={16} />
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IMC
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600">
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
                label="Nível de atividade"
                value={clientForm.activityLevel}
                onChange={(e) => setClientForm({ ...clientForm, activityLevel: e.target.value })}
                required
              >
                <option value="sedentary">Sedentário</option>
                <option value="light">Leve (1-3 dias/semana)</option>
                <option value="moderate">Moderado (3-5 dias/semana)</option>
                <option value="intense">Intenso (6-7 dias/semana)</option>
                <option value="very_intense">Muito intenso (2x/dia)</option>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
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
                    {selectedClient.activityLevel === 'sedentary' && 'Sedentário'}
                    {selectedClient.activityLevel === 'light' && 'Leve'}
                    {selectedClient.activityLevel === 'moderate' && 'Moderado'}
                    {selectedClient.activityLevel === 'intense' && 'Intenso'}
                    {selectedClient.activityLevel === 'very_intense' && 'Muito intenso'}
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