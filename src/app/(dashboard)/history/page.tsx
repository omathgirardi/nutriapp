"use client";

import { useState } from "react";
import { CardPremium, CardContent } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FileText, 
  Filter, 
  ChevronDown, 
  Download, 
  ExternalLink, 
  MoreHorizontal,
  Calendar,
  Users,
  SlidersHorizontal
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DietHistoryCardProps {
  title: string;
  clientName: string;
  clientId: string;
  date: string;
  type: string;
}

const DietHistoryCard = ({ title, clientName, clientId, date, type }: DietHistoryCardProps) => {
  return (
    <CardPremium variant="default" className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-xs text-gray-500">
                Para: {clientName} ({clientId})
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                <span>Baixar PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Enviar por WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Criar nova a partir desta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              <Calendar className="inline h-3 w-3 mr-1" />
              Data:
            </span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              <Users className="inline h-3 w-3 mr-1" />
              Tipo:
            </span>
            <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs">
              {type}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm" fullWidth={true}>
            <FileText className="mr-2 h-4 w-4" />
            Ver Dieta
          </Button>
        </div>
      </CardContent>
    </CardPremium>
  );
};

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mock data for history
  const dietHistory = Array.from({ length: 9 }, (_, i) => ({
    id: `D-0${i+1}`,
    title: `Dieta ${["Emagrecimento", "Ganho Muscular", "Manutenção"][i % 3]} ${i+1}`,
    clientName: `Cliente Exemplo ${(i % 4) + 1}`,
    clientId: `A-0${(i % 4) + 1}`,
    date: `${Math.floor(Math.random() * 28) + 1}/0${Math.floor(Math.random() * 9) + 1}/2023`,
    type: ["Personalizada", "Template", "Personalizada IA"][i % 3],
  }));
  
  const filteredHistory = dietHistory.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.clientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Histórico de Dietas</h1>
          <p className="text-gray-500">Dietas geradas anteriormente</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por título ou cliente..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                Mais recentes
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Mais antigos
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Advanced Filter Panel (conditional) */}
      {filterOpen && (
        <CardPremium variant="outline" animation="fadeIn">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Cliente</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="client1">Cliente 1</SelectItem>
                    <SelectItem value="client2">Cliente 2</SelectItem>
                    <SelectItem value="client3">Cliente 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Tipo</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="personalized">Personalizada</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="ai">Personalizada IA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Data</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer data</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mês</SelectItem>
                    <SelectItem value="year">Este ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" size="sm" className="mr-2">
                  Limpar
                </Button>
                <Button size="sm">
                  Aplicar
                </Button>
              </div>
            </div>
          </CardContent>
        </CardPremium>
      )}

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHistory.map((item) => (
          <DietHistoryCard
            key={item.id}
            title={item.title}
            clientName={item.clientName}
            clientId={item.clientId}
            date={item.date}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}