"use client";

import { useState } from "react";
import { CardPremium, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card-premium";
import { Button } from "@/components/ui/button-premium";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  User, 
  Clock, 
  MapPin, 
  AlertCircle,
  X,
  Save,
  Edit
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNotifications } from "@/contexts/notification-context";

// Mock de clientes para o seletor
const mockClients = [
  { id: "A-01", name: "João Silva" },
  { id: "A-02", name: "Maria Santos" },
  { id: "A-03", name: "Pedro Oliveira" },
  { id: "A-04", name: "Ana Souza" },
  { id: "A-05", name: "Carlos Ferreira" },
];

// Mock de eventos para o calendário
const mockEvents = [
  {
    id: "evt-1",
    title: "Avaliação Física",
    clientId: "A-01",
    clientName: "João Silva",
    date: new Date(2023, 5, 10, 9, 0), // 10 de junho de 2023, 09:00
    duration: 60, // minutos
    location: "Consultório",
    type: "assessment",
    notes: "Avaliação física completa com medidas e bioimpedância"
  },
  {
    id: "evt-2",
    title: "Consulta Online",
    clientId: "A-02",
    clientName: "Maria Santos",
    date: new Date(2023, 5, 15, 14, 30), // 15 de junho de 2023, 14:30
    duration: 30, // minutos
    location: "Online - Zoom",
    type: "consultation",
    notes: "Revisão da dieta e ajustes necessários"
  },
  {
    id: "evt-3",
    title: "Reavaliação",
    clientId: "A-03",
    clientName: "Pedro Oliveira",
    date: new Date(2023, 5, 20, 11, 0), // 20 de junho de 2023, 11:00
    duration: 45, // minutos
    location: "Consultório",
    type: "assessment",
    notes: "Verificar progresso após 1 mês de dieta"
  }
];

// Componente de cabeçalho do calendário
const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, onAddEvent }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold mx-4">
          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={onAddEvent}>
        <Plus className="mr-2 h-4 w-4" />
        Novo Evento
      </Button>
    </div>
  );
};

// Componente de dia do calendário
const CalendarDay = ({ day, month, year, events, onViewEvent, isCurrentMonth, isToday }) => {
  // Filtrar eventos para este dia
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });

  return (
    <div 
      className={`border rounded-md min-h-[120px] p-1 transition ${
        !isCurrentMonth 
          ? "bg-gray-50 text-gray-400" 
          : isToday 
            ? "bg-primary-50 border-primary-200" 
            : "hover:border-gray-300"
      }`}
    >
      <div className="text-right">
        <span className={`text-sm ${isToday ? "font-bold bg-primary-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center" : ""}`}>
          {day}
        </span>
      </div>
      <div className="mt-1 space-y-1">
        {dayEvents.map(event => (
          <div 
            key={event.id}
            className={`text-xs p-1 rounded truncate cursor-pointer ${
              event.type === 'assessment'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-secondary-100 text-secondary-800'
            }`}
            onClick={() => onViewEvent(event)}
          >
            {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de formulário de evento
const EventForm = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState(event || {
    title: "",
    clientId: "",
    clientName: "",
    date: new Date(),
    time: "09:00",
    duration: 60,
    location: "Consultório",
    type: "assessment",
    notes: ""
  });

  const handleChange = (field, value) => {
    if (field === "clientId") {
      // Atualizar também o nome do cliente
      const selectedClient = mockClients.find(client => client.id === value);
      setFormData({
        ...formData,
        clientId: value,
        clientName: selectedClient ? selectedClient.name : ""
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Converter data e hora para objeto Date
    const dateObj = new Date(formData.date);
    const [hours, minutes] = formData.time.split(':').map(Number);
    dateObj.setHours(hours, minutes);
    
    const finalEvent = {
      ...formData,
      date: dateObj,
      id: event?.id || `evt-${Date.now()}`
    };
    
    onSave(finalEvent);
  };

  // Formatar data para o input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Formatar hora para o input
  const formatTimeForInput = (date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input 
          id="title" 
          value={formData.title} 
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Ex: Avaliação Física"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Cliente</Label>
          <select 
            id="client"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.clientId}
            onChange={(e) => handleChange("clientId", e.target.value)}
            required
          >
            <option value="" disabled>Selecione um cliente</option>
            {mockClients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <select 
            id="type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="assessment">Avaliação Física</option>
            <option value="consultation">Consulta</option>
            <option value="followup">Acompanhamento</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input 
            id="date" 
            type="date"
            value={event ? formatDateForInput(formData.date) : formatDateForInput(new Date())}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Horário</Label>
          <Input 
            id="time" 
            type="time"
            value={event ? formatTimeForInput(formData.date) : formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duração (min)</Label>
          <Input 
            id="duration" 
            type="number"
            min="15"
            step="15"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Local</Label>
        <Input 
          id="location" 
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Ex: Consultório, Online, etc."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <textarea 
          id="notes"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Informações adicionais sobre o evento"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {event ? "Atualizar Evento" : "Criar Evento"}
        </Button>
      </div>
    </form>
  );
};

// Componente de detalhes do evento
const EventDetails = ({ event, onEdit, onDelete, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-gray-500">
            {new Date(event.date).toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Cliente</div>
            <div>{event.clientName}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Horário</div>
            <div>
              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
              {' '}
              {new Date(new Date(event.date).getTime() + event.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {' '}
              ({event.duration} minutos)
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Local</div>
            <div>{event.location}</div>
          </div>
        </div>
        
        {event.notes && (
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Observações</div>
              <div className="text-sm">{event.notes}</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button 
          variant="destructive" 
          onClick={onDelete}
        >
          <X className="mr-2 h-4 w-4" />
          Excluir
        </Button>
      </div>
    </div>
  );
};

// Função auxiliar para obter os dias do mês
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Função auxiliar para obter o primeiro dia da semana do mês
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export default function CalendarPage() {
  const { addNotification } = useNotifications();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  
  // Avançar para o próximo mês
  const nextMonth = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };
  
  // Voltar para o mês anterior
  const prevMonth = () => {
    setCurrentDate(prev => {
      const prev1 = new Date(prev);
      prev1.setMonth(prev1.getMonth() - 1);
      return prev1;
    });
  };
  
  // Adicionar ou atualizar um evento
  const handleSaveEvent = (eventData) => {
    if (currentEvent) {
      // Atualizar evento existente
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id ? eventData : event
      );
      setEvents(updatedEvents);
      toast.success("Evento atualizado com sucesso!");
      
      // Adicionar notificação
      addNotification({
        type: "appointment",
        message: `Evento "${eventData.title}" com ${eventData.clientName} foi atualizado`,
        action: "calendar",
        date: eventData.date
      });
    } else {
      // Criar novo evento
      setEvents([...events, eventData]);
      toast.success("Evento criado com sucesso!");
      
      // Adicionar notificação
      addNotification({
        type: "appointment",
        message: `Novo evento "${eventData.title}" com ${eventData.clientName} agendado`,
        action: "calendar",
        date: eventData.date
      });
    }
    
    setShowEventForm(false);
    setCurrentEvent(null);
  };
  
  // Excluir um evento
  const handleDeleteEvent = () => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      const updatedEvents = events.filter(event => event.id !== currentEvent.id);
      setEvents(updatedEvents);
      toast.success("Evento excluído com sucesso!");
      
      // Adicionar notificação
      addNotification({
        type: "appointment",
        message: `Evento "${currentEvent.title}" com ${currentEvent.clientName} foi cancelado`,
        action: null
      });
      
      setShowEventDetails(false);
      setCurrentEvent(null);
    }
  };
  
  // Ver detalhes do evento
  const handleViewEvent = (event) => {
    setCurrentEvent(event);
    setShowEventDetails(true);
    setShowEventForm(false);
  };
  
  // Editar evento
  const handleEditEvent = () => {
    setShowEventForm(true);
    setShowEventDetails(false);
  };
  
  // Gerar as células do calendário
  const renderCalendarCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    
    // Dias do mês anterior para preencher o início do calendário
    const prevMonthDays = [];
    if (firstDayOfMonth > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        prevMonthDays.unshift(
          <CalendarDay 
            key={`prev-${i}`}
            day={daysInPrevMonth - i}
            month={prevMonth}
            year={prevMonthYear}
            events={events}
            onViewEvent={handleViewEvent}
            isCurrentMonth={false}
            isToday={false}
          />
        );
      }
    }
    
    // Dias do mês atual
    const currentMonthDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
      
      currentMonthDays.push(
        <CalendarDay 
          key={`current-${day}`}
          day={day}
          month={month}
          year={year}
          events={events}
          onViewEvent={handleViewEvent}
          isCurrentMonth={true}
          isToday={isToday}
        />
      );
    }
    
    // Dias do próximo mês para preencher o final do calendário
    const nextMonthDays = [];
    const totalCells = 42; // 6 semanas * 7 dias
    const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;
    
    if (remainingCells > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      
      for (let day = 1; day <= remainingCells; day++) {
        nextMonthDays.push(
          <CalendarDay 
            key={`next-${day}`}
            day={day}
            month={nextMonth}
            year={nextMonthYear}
            events={events}
            onViewEvent={handleViewEvent}
            isCurrentMonth={false}
            isToday={false}
          />
        );
      }
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendário</h1>
          <p className="text-gray-500">
            Gerencie seus compromissos e avaliações
          </p>
        </div>
      </div>
      
      <CardPremium>
        <CardHeader className="pb-0">
          <CalendarHeader 
            currentDate={currentDate}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onAddEvent={() => {
              setShowEventForm(true);
              setCurrentEvent(null);
              setShowEventDetails(false);
            }}
          />
        </CardHeader>
        <CardContent>
          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
              <div key={index} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Grade do calendário */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarCells()}
          </div>
        </CardContent>
      </CardPremium>
      
      {/* Formulário ou detalhes do evento */}
      {(showEventForm || showEventDetails) && (
        <CardPremium>
          <CardContent className="p-6">
            {showEventForm ? (
              <EventForm 
                event={currentEvent}
                onSave={handleSaveEvent}
                onCancel={() => {
                  setShowEventForm(false);
                  if (currentEvent) {
                    setShowEventDetails(true);
                  } else {
                    setCurrentEvent(null);
                  }
                }}
              />
            ) : (
              <EventDetails 
                event={currentEvent}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                onClose={() => {
                  setShowEventDetails(false);
                  setCurrentEvent(null);
                }}
              />
            )}
          </CardContent>
        </CardPremium>
      )}
    </div>
  );
}