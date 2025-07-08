import React, { useState, useEffect } from 'react';
import { evolutionService } from '../services/evolutionApi.js';
import { config } from '../config/index.js';

const WhatsAppDiagnostic = () => {
  const [status, setStatus] = useState({
    loading: true,
    connected: false,
    instanceExists: false,
    qrCode: null,
    error: null,
    lastCheck: null
  });

  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Teste de mensagem do NutriApp');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔍 Verificando status da instância WhatsApp...');
      
      // Verificar status da instância
      const instanceStatus = await evolutionService.getInstanceStatus();
      console.log('📊 Status da instância:', instanceStatus);
      
      if (instanceStatus.success) {
        setStatus({
          loading: false,
          connected: instanceStatus.connected,
          instanceExists: true,
          qrCode: null,
          error: null,
          lastCheck: new Date().toLocaleTimeString(),
          statusData: instanceStatus.data
        });
        
        // Se não estiver conectado, tentar obter QR Code
        if (!instanceStatus.connected) {
          console.log('📱 Instância não conectada, obtendo QR Code...');
          const qrResult = await evolutionService.getQRCode();
          if (qrResult.success && qrResult.data?.qrcode) {
            setStatus(prev => ({
              ...prev,
              qrCode: qrResult.data.qrcode
            }));
          }
        }
      } else {
        // Instância não existe, tentar criar
        console.log('🆕 Instância não encontrada, tentando criar...');
        const createResult = await evolutionService.createInstance();
        
        if (createResult.success) {
          console.log('✅ Instância criada com sucesso');
          // Aguardar um pouco e verificar novamente
          setTimeout(() => checkStatus(), 2000);
        } else {
          setStatus({
            loading: false,
            connected: false,
            instanceExists: false,
            qrCode: null,
            error: createResult.error || 'Erro ao criar instância',
            lastCheck: new Date().toLocaleTimeString()
          });
        }
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
      setStatus({
        loading: false,
        connected: false,
        instanceExists: false,
        qrCode: null,
        error: error.message,
        lastCheck: new Date().toLocaleTimeString()
      });
    }
  };

  const testSendMessage = async () => {
    if (!testPhone || !testMessage) {
      alert('Por favor, preencha o telefone e a mensagem de teste');
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      console.log('📤 Enviando mensagem de teste...');
      
      // Verificar se o número existe no WhatsApp
      const checkResult = await evolutionService.checkWhatsAppNumber(testPhone);
      console.log('📞 Verificação do número:', checkResult);
      
      if (!checkResult.success) {
        setTestResult({
          success: false,
          error: 'Erro ao verificar número: ' + checkResult.error
        });
        return;
      }
      
      if (!checkResult.exists) {
        setTestResult({
          success: false,
          error: 'Número não encontrado no WhatsApp'
        });
        return;
      }
      
      // Enviar mensagem
      const sendResult = await evolutionService.sendTextMessage(testPhone, testMessage);
      console.log('📨 Resultado do envio:', sendResult);
      
      setTestResult({
        success: sendResult.success,
        error: sendResult.success ? null : sendResult.error,
        data: sendResult.data
      });
      
    } catch (error) {
      console.error('❌ Erro no teste:', error);
      setTestResult({
        success: false,
        error: error.message
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔧 Diagnóstico WhatsApp</h2>
        <p className="text-gray-600">Verificação do status da integração com WhatsApp via Evolution API</p>
      </div>

      {/* Configurações */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">⚙️ Configurações</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>URL da API:</strong> {config.evolution.baseURL}</div>
          <div><strong>Instância:</strong> {config.evolution.instanceName}</div>
          <div><strong>API Key:</strong> {config.evolution.apiKey ? '***' + config.evolution.apiKey.slice(-4) : 'Não configurada'}</div>
          <div><strong>Telefone:</strong> {config.evolution.phone}</div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">📊 Status da Conexão</h3>
          <button 
            onClick={checkStatus}
            disabled={status.loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {status.loading ? '🔄 Verificando...' : '🔄 Atualizar'}
          </button>
        </div>
        
        {status.loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Verificando status...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className={`flex items-center space-x-2 ${status.connected ? 'text-green-600' : 'text-red-600'}`}>
              <span>{status.connected ? '✅' : '❌'}</span>
              <span><strong>Conexão:</strong> {status.connected ? 'Conectado' : 'Desconectado'}</span>
            </div>
            
            <div className={`flex items-center space-x-2 ${status.instanceExists ? 'text-green-600' : 'text-yellow-600'}`}>
              <span>{status.instanceExists ? '✅' : '⚠️'}</span>
              <span><strong>Instância:</strong> {status.instanceExists ? 'Existe' : 'Não encontrada'}</span>
            </div>
            
            {status.lastCheck && (
              <div className="text-gray-600">
                <strong>Última verificação:</strong> {status.lastCheck}
              </div>
            )}
            
            {status.error && (
              <div className="text-red-600 bg-red-50 p-3 rounded">
                <strong>Erro:</strong> {status.error}
              </div>
            )}
            
            {status.statusData && (
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Ver dados completos</summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(status.statusData, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>

      {/* QR Code */}
      {status.qrCode && (
        <div className="mb-6 p-4 border rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">📱 QR Code para Conectar</h3>
          <div className="bg-white p-4 inline-block rounded">
            <img src={status.qrCode} alt="QR Code WhatsApp" className="max-w-xs mx-auto" />
          </div>
          <p className="mt-4 text-gray-600">Escaneie este QR Code com o WhatsApp para conectar a instância</p>
        </div>
      )}

      {/* Teste de Envio */}
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">🧪 Teste de Envio de Mensagem</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Teste (com código do país)
            </label>
            <input
              type="text"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="Ex: 5511999999999"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem de Teste
            </label>
            <textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={testSendMessage}
            disabled={testing || !status.connected}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {testing ? '📤 Enviando...' : '📤 Enviar Teste'}
          </button>
          
          {!status.connected && (
            <p className="text-yellow-600 text-sm">⚠️ WhatsApp deve estar conectado para enviar mensagens</p>
          )}
        </div>
        
        {testResult && (
          <div className={`mt-4 p-3 rounded ${testResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <div className="flex items-center space-x-2">
              <span>{testResult.success ? '✅' : '❌'}</span>
              <span><strong>{testResult.success ? 'Sucesso!' : 'Erro:'}</strong></span>
            </div>
            {testResult.error && (
              <p className="mt-1 text-sm">{testResult.error}</p>
            )}
            {testResult.data && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">Ver resposta da API</summary>
                <pre className="mt-1 text-xs bg-white p-2 rounded overflow-auto">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppDiagnostic;