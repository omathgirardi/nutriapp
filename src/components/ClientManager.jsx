import React, { useState } from 'react';
import { useClients } from '../hooks/useTenantData';
import Button from './Button';
import Modal from './Modal';
import ClientForm from './ClientForm';
import Card from './Card';

const ClientManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    clients,
    loading: clientsLoading,
    error: clientsError,
    createClient,
    updateClient,
    deleteClient
  } = useClients();

  const handleCreateClient = async (clientData) => {
    setLoading(true);
    try {
      const result = await createClient(clientData);
      if (result.success) {
        setShowModal(false);
        setSelectedClient(null);
      } else {
        alert('Erro ao criar cliente: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClient = async (clientData) => {
    if (!selectedClient) return;
    setLoading(true);
    try {
      const result = await updateClient(selectedClient.id, clientData);
      if (result.success) {
        setShowModal(false);
        setSelectedClient(null);
      } else {
        alert('Erro ao atualizar cliente: ' + result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    try {
      const result = await deleteClient(clientId);
      if (!result.success) {
        alert('Erro ao excluir cliente: ' + result.error);
      }
    } catch (error) {
      alert('Erro ao excluir cliente: ' + error.message);
    }
  };

  if (clientsLoading) {
    return <div>Carregando...</div>;
  }

  if (clientsError) {
    return <div>Erro ao carregar clientes: {clientsError}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
        <Button
          onClick={() => {
            setSelectedClient(null);
            setShowModal(true);
          }}
        >
          Novo Cliente
        </Button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => (
          <Card key={client.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.email}</p>
                {client.phone && (
                  <p className="text-sm text-gray-600">{client.phone}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    setSelectedClient(client);
                    setShowModal(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
            
            {/* Detalhes do Cliente */}
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Gênero</p>
                <p>{client.gender === 'M' ? 'Masculino' : client.gender === 'F' ? 'Feminino' : client.gender || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Data Nasc.</p>
                <p>{client.birthDate || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Altura</p>
                <p>{client.height ? `${client.height} cm` : '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Peso</p>
                <p>{client.weight ? `${client.weight} kg` : '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Objetivo</p>
                <p>{client.objective ? {
                  weight_loss: 'Perda de Peso',
                  muscle_gain: 'Ganho de Massa',
                  maintenance: 'Manutenção',
                  health: 'Saúde Geral'
                }[client.objective] : '-'}</p>
              </div>
              {client.notes && (
                <div className="col-span-2">
                  <p className="text-gray-600">Observações</p>
                  <p className="whitespace-pre-wrap">{client.notes}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Criar/Editar Cliente */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedClient(null);
        }}
        title={selectedClient ? 'Editar Cliente' : 'Novo Cliente'}
      >
        <ClientForm
          initialData={selectedClient}
          onSubmit={selectedClient ? handleUpdateClient : handleCreateClient}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default ClientManager; 