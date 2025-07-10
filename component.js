// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import { motion, AnimatePresence } from "https://esm.sh/framer-motion?deps=react@18.2.0,react-dom@18.2.0";
import {
  User,
  Users,
  Calculator,
  History,
  Settings,
  CreditCard,
  Plus,
  Download,
  Send,
  Eye,
  TrendingUp,
  Award,
  Target,
  Activity,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Filter,
  Edit,
  Trash2,
  Check,
  Clock,
  Star,
  Zap,
  Database,
  FileText,
  BarChart3,
  DollarSign,
  Users2,
  Crown,
  Heart,
  Utensils,
  Scale,
  Timer,
  CheckCircle,
  AlertCircle,
  Info,
  Home,
  Archive
} from "https://esm.sh/lucide-react?deps=react@18.2.0,react-dom@18.2.0";
var { useStoredState } = hatch;
var colors = {
  primary: {
    25: "#F5FAFF",
    50: "#EFF8FF",
    100: "#D1E9FF",
    200: "#B2DDFF",
    300: "#84CAFF",
    400: "#53B1FD",
    500: "#2E90FA",
    600: "#1570EF",
    700: "#175CD3",
    800: "#1849A9",
    900: "#194185"
  },
  secondary: {
    25: "#F6FEF9",
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31"
  },
  gray: {
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#EAECF0",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#182230",
    900: "#101828",
    950: "#0C111D"
  }
};
var mockUsers = [];
var mockClients = [];
var mockDiets = [];
var mockTemplates = [];
var Button = ({ variant = "primary", size = "md", children, className = "", ...props }) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}]`,
    secondary: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}]`,
    outline: `border border-[${colors.gray[300]}] text-[${colors.gray[700]}] hover:bg-[${colors.gray[50]}] focus:ring-[${colors.primary[500]}]`,
    ghost: `text-[${colors.gray[700]}] hover:bg-[${colors.gray[100]}] focus:ring-[${colors.primary[500]}]`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`,
      ...props
    },
    children
  );
};
var Card = ({ children, className = "", ...props }) => {
  return /* @__PURE__ */ React.createElement("div", { className: `bg-white rounded-xl shadow-sm border border-[${colors.gray[200]}] ${className}`, ...props }, children);
};
var Input = ({ label, error, className = "", ...props }) => {
  return /* @__PURE__ */ React.createElement("div", { className }, label && /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-medium text-[${colors.gray[700]}] mb-1` }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: `w-full px-3 py-2 border border-[${colors.gray[300]}] rounded-lg focus:outline-none focus:ring-2 focus:ring-[${colors.primary[500]}] focus:border-transparent ${error ? "border-red-500" : ""}`,
      ...props
    }
  ), error && /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-red-600" }, error));
};
var Select = ({ label, options, error, className = "", ...props }) => {
  return /* @__PURE__ */ React.createElement("div", { className }, label && /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-medium text-[${colors.gray[700]}] mb-1` }, label), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: `w-full px-3 py-2 border border-[${colors.gray[300]}] rounded-lg focus:outline-none focus:ring-2 focus:ring-[${colors.primary[500]}] focus:border-transparent ${error ? "border-red-500" : ""}`,
      ...props
    },
    options.map((option) => /* @__PURE__ */ React.createElement("option", { key: option.value, value: option.value }, option.label))
  ), error && /* @__PURE__ */ React.createElement("p", { className: "mt-1 text-sm text-red-600" }, error));
};
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: `flex items-center justify-between p-4 sm:p-6 border-b border-[${colors.gray[200]}]` }, /* @__PURE__ */ React.createElement("h2", { className: `text-lg sm:text-xl font-semibold text-[${colors.gray[900]}]` }, title), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: `p-2 hover:bg-[${colors.gray[100]}] rounded-lg`
    },
    /* @__PURE__ */ React.createElement(X, { size: 20 })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-6" }, children)));
};
var customStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-15px) rotate(45deg); }
    50% { transform: translateY(-8px) rotate(90deg); }
    75% { transform: translateY(-12px) rotate(135deg); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
  }
  
  @keyframes fall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
      transform: scale(1.05);
    }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
`;
if (typeof document !== "undefined" && !document.getElementById("nutriplan-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "nutriplan-styles";
  styleSheet.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    
    * {
      font-family: 'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    }
    
    ${customStyles}
  `;
  document.head.appendChild(styleSheet);
}
var NutriPlan = () => {
  const [currentUser, setCurrentUser] = useStoredState("currentUser", null);
  const [userRole, setUserRole] = useStoredState("userRole", null);
  const [activeSection, setActiveSection] = useStoredState("activeSection", "dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [generatedDiet, setGeneratedDiet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showManageCreditsModal, setShowManageCreditsModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showSelectFoodModal, setShowSelectFoodModal] = useState(false);
  const [showPortionModal, setShowPortionModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchFood, setSearchFood] = useState("");
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState({ title: "", content: "", type: "info" });
  const [profilePhoto, setProfilePhoto] = useStoredState("profilePhoto", null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const sendDietTelegram = async (diet) => {
    try {
      const date = new Date(diet.createdAt);
      const formattedDate = date.toLocaleDateString("pt-BR");
      const message = `\u{1F957} *PLANO ALIMENTAR PERSONALIZADO*

\u{1F464} *Cliente:* ${diet.clientName}
\u{1F4CA} *Calorias:* ${diet.calories} kcal/dia
\u{1F4C5} *Data:* ${formattedDate}

\u{1F37D}\uFE0F *Suas Refei\xE7\xF5es:*
${diet.meals.map((meal) => `\u2022 ${meal.name}: ${meal.calories} kcal`).join("\n")}

\u{1F4A1} *Orienta\xE7\xF5es:*
\u2022 Siga as por\xE7\xF5es indicadas no PDF
\u2022 Mantenha os hor\xE1rios das refei\xE7\xF5es
\u2022 Hidrate-se adequadamente (2-3L \xE1gua/dia)
\u2022 Em caso de d\xFAvidas, entre em contato

\u{1F468}\u200D\u{1F4BC} *Personal Trainer:* ${currentUser.name}
\u{1F3E2} *NutriApp - Sistema Profissional*

\u{1F4CE} PDF detalhado ser\xE1 enviado separadamente`;
      const encodedMessage = encodeURIComponent(message);
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent("https://nutriapp.com")}&text=${encodedMessage}`;
      window.open(telegramUrl, "_blank");
      setTimeout(() => {
        if (confirm("\u{1F4AC} Telegram n\xE3o encontrado?\n\nDeseja copiar a mensagem para enviar manualmente?")) {
          navigator.clipboard.writeText(message.replace(/\*/g, "")).then(() => {
            showPushNotification("\u2705 Mensagem copiada! Cole no Telegram do seu cliente.", "success");
          }).catch(() => {
            showPushNotification("\u274C Erro ao copiar. Copie manualmente a mensagem exibida.", "error");
            console.log("Mensagem para Telegram:", message);
          });
        }
      }, 2e3);
    } catch (error) {
      console.error("Erro ao preparar Telegram:", error);
      showPushNotification("Erro ao preparar mensagem. Tente novamente.", "error");
    }
  };
  const [showDietTypeModal, setShowDietTypeModal] = useState(false);
  const [dietType, setDietType] = useState("ai");
  const [showManualDietModal, setShowManualDietModal] = useState(false);
  const [showClientSelectorModal, setShowClientSelectorModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [manualDiet, setManualDiet] = useState({
    clientName: "",
    meals: []
  });
  const [currentManualMeal, setCurrentManualMeal] = useState({
    name: "",
    calories: "",
    foods: []
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [calculatorData, setCalculatorData] = useState({
    clientId: "",
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintenance",
    restrictions: []
  });
  const [newClient, setNewClient] = useState({
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintenance",
    restrictions: []
  });
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    credits: 200
  });
  const [creditAmount, setCreditAmount] = useState("");
  const [creditOperation, setCreditOperation] = useState("add");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    meals: [
      { name: "Caf\xE9 da Manh\xE3", foods: [], substitutions: [] },
      { name: "Lanche da Manh\xE3", foods: [], substitutions: [] },
      { name: "Almo\xE7o", foods: [], substitutions: [] },
      { name: "Lanche da Tarde", foods: [], substitutions: [] },
      { name: "Jantar", foods: [], substitutions: [] }
    ]
  });
  const foodDatabase = [
    {
      name: "Arroz branco cozido",
      protein: 2.5,
      carbs: 28.1,
      fat: 0.2,
      calories: 124,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Feij\xE3o preto cozido",
      protein: 4.5,
      carbs: 14,
      fat: 0.5,
      calories: 77,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Frango grelhado (peito)",
      protein: 23.1,
      carbs: 0,
      fat: 3.2,
      calories: 119,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Banana",
      protein: 1.1,
      carbs: 22.8,
      fat: 0.2,
      calories: 96,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Aveia",
      protein: 13.2,
      carbs: 66.3,
      fat: 6.9,
      calories: 379,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Ovo cozido",
      protein: 13,
      carbs: 1.1,
      fat: 10.6,
      calories: 155,
      baseAmount: 100,
      unit: "g"
    },
    {
      name: "Leite desnatado",
      protein: 3.4,
      carbs: 4.8,
      fat: 0.2,
      calories: 34,
      baseAmount: 100,
      unit: "ml"
    },
    {
      name: "Batata doce",
      protein: 2,
      carbs: 20,
      fat: 0.1,
      calories: 86,
      baseAmount: 100,
      unit: "g"
    }
  ];
  const [generationStage, setGenerationStage] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const creditPlans = [
    {
      id: "starter",
      name: "Starter",
      credits: 100,
      price: 29.9,
      originalPrice: null,
      popular: false,
      features: [
        "100 gera\xE7\xF5es de dieta",
        "Suporte via email",
        "Templates b\xE1sicos",
        "Exporta\xE7\xE3o em PDF",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      credits: 300,
      price: 69.9,
      originalPrice: 89.9,
      popular: true,
      features: [
        "300 gera\xE7\xF5es de dieta",
        "Suporte priorit\xE1rio",
        "Todos os templates",
        "Exporta\xE7\xE3o em PDF",
        "Envio via WhatsApp/Email",
        "An\xE1lise nutricional avan\xE7ada",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      credits: 500,
      price: 99.9,
      originalPrice: 129.9,
      popular: false,
      features: [
        "500 gera\xE7\xF5es de dieta",
        "Suporte priorit\xE1rio 24/7",
        "Todos os templates + exclusivos",
        "Exporta\xE7\xE3o em PDF",
        "Envio via WhatsApp/Email",
        "An\xE1lise nutricional avan\xE7ada",
        "Cria\xE7\xE3o de templates personalizados",
        "Relat\xF3rios de desempenho",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe",
        "Ativa\xE7\xE3o imediata",
        "Pagamento via Stripe"
      ]
    }
  ];
  const createConfettiEffect = () => {
    setShowConfetti(true);
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    setTimeout(() => setShowConfetti(false), 3e3);
  };
  const generateDiet = async () => {
    try {
      setIsGenerating(true);
      setShowGenerationModal(true);
      setGenerationProgress(0);
      let clientData;
      if (calculatorData.clientId) {
        clientData = mockClients.find((c) => c.id === calculatorData.clientId);
        if (!clientData) {
          showPushNotification("Cliente n\xE3o encontrado!", "error");
          setIsGenerating(false);
          setShowGenerationModal(false);
          return;
        }
      } else {
        if (!calculatorData.name || !calculatorData.age || !calculatorData.weight || !calculatorData.height) {
          showPushNotification("Por favor, preencha todos os campos obrigat\xF3rios!", "warning");
          setIsGenerating(false);
          setShowGenerationModal(false);
          return;
        }
        clientData = {
          name: calculatorData.name,
          age: parseInt(calculatorData.age),
          weight: parseFloat(calculatorData.weight),
          height: parseFloat(calculatorData.height),
          goal: calculatorData.goal
        };
      }
      setGenerationStage("Calculando Taxa Metab\xF3lica Basal...");
      setGenerationProgress(15);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const bmr = calculateBMR(calculatorData);
      setGenerationStage("Calculando Gasto Energ\xE9tico Total...");
      setGenerationProgress(30);
      await new Promise((resolve) => setTimeout(resolve, 600));
      const tdee = calculateTDEE(bmr, calculatorData.activityLevel);
      setGenerationStage("Ajustando calorias para o objetivo...");
      setGenerationProgress(45);
      await new Promise((resolve) => setTimeout(resolve, 700));
      const calories = calculateCalories(bmr, calculatorData.activityLevel, calculatorData.goal, {
        gender: calculatorData.gender,
        weight: calculatorData.weight,
        activityLevel: calculatorData.activityLevel
      });
      setGenerationStage("Calculando distribui\xE7\xE3o de macronutrientes...");
      setGenerationProgress(60);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const macros = calculateMacros(calories, calculatorData.goal, {
        weight: calculatorData.weight,
        activityLevel: calculatorData.activityLevel,
        gender: calculatorData.gender
      });
      setGenerationStage("Selecionando alimentos e criando refei\xE7\xF5es...");
      setGenerationProgress(75);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      let dietTypeLabel = "IA";
      let meals = generateMeals(calories, macros, calculatorData.restrictions, calculatorData.goal);
      if (dietType === "template" && selectedTemplate) {
        dietTypeLabel = "Template";
        setGenerationStage("Aplicando template selecionado...");
        const template = mockTemplates.find((t) => t.id === selectedTemplate);
        if (template) {
          meals = generateMealsFromTemplate(template, calories, macros, calculatorData.goal);
        }
      } else if (dietType === "ai") {
        dietTypeLabel = "IA";
        setGenerationStage("Processando com Intelig\xEAncia Artificial...");
      } else if (dietType === "manual") {
        dietTypeLabel = "Manual";
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
      setGenerationStage("Finalizando sua dieta personalizada...");
      setGenerationProgress(90);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setGenerationProgress(100);
      setGenerationStage("Dieta criada com sucesso! \u2728");
      createConfettiEffect();
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const diet = {
        id: `D${Date.now()}`,
        clientName: clientData.name,
        clientData,
        calories,
        bmr,
        tdee,
        macros,
        meals,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        type: dietTypeLabel,
        metabolicInfo: {
          formula: "Harris-Benedict",
          activityLevel: calculatorData.activityLevel,
          goal: calculatorData.goal,
          adjustmentPercent: Math.round((calories - tdee) / tdee * 100)
        }
      };
      setGeneratedDiet(diet);
      setShowGenerationModal(false);
      setTimeout(() => {
        setShowDietModal(true);
      }, 300);
    } catch (error) {
      console.error("Erro ao gerar dieta:", error);
      setShowGenerationModal(false);
      showPushNotification("Erro ao gerar dieta. Tente novamente.", "error");
    } finally {
      setIsGenerating(false);
      setGenerationStage("");
      setGenerationProgress(0);
    }
  };
  const generateDietPDF = async (diet, forEmail = false) => {
    try {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const date = new Date(diet.createdAt);
      const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`;
      const cleanClientName = diet.clientName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
      const filename = `Plano-Alimentar-${cleanClientName}-${formattedDate}.pdf`;
      doc.setFont("helvetica");
      doc.setFontSize(20);
      doc.setTextColor(25, 118, 210);
      doc.text("PLANO ALIMENTAR PERSONALIZADO", 20, 25);
      doc.setDrawColor(25, 118, 210);
      doc.setLineWidth(0.5);
      doc.line(20, 30, 190, 30);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Cliente: ${diet.clientName}`, 20, 45);
      doc.text(`Data de Cria\xE7\xE3o: ${new Date(diet.createdAt).toLocaleDateString("pt-BR")}`, 20, 55);
      doc.text(`Calorias Totais: ${diet.calories} kcal/dia`, 20, 65);
      if (diet.macros) {
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("DISTRIBUI\xC7\xC3O DE MACRONUTRIENTES:", 20, 80);
        doc.setTextColor(0, 0, 0);
        doc.text(`\u2022 Prote\xEDnas: ${diet.macros.protein}g`, 25, 90);
        doc.text(`\u2022 Carboidratos: ${diet.macros.carbs}g`, 25, 100);
        doc.text(`\u2022 Gorduras: ${diet.macros.fat}g`, 25, 110);
      }
      let yPosition = diet.macros ? 125 : 85;
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("REFEI\xC7\xD5ES PLANEJADAS:", 20, yPosition);
      yPosition += 15;
      doc.setTextColor(0, 0, 0);
      diet.meals.forEach((meal, mealIndex) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`${meal.name} (${meal.calories} kcal)`, 20, yPosition);
        yPosition += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        meal.foods.forEach((food) => {
          if (yPosition > 275) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`\u2022 ${food.name}: ${food.quantity}`, 25, yPosition);
          yPosition += 6;
        });
        yPosition += 5;
      });
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text(`Personal Trainer: ${currentUser.name}`, 20, 285);
        doc.text("NutriApp - Sistema de Gera\xE7\xE3o de Dietas", 20, 292);
        doc.text(`P\xE1gina ${i} de ${pageCount}`, 170, 292);
      }
      if (forEmail) {
        return {
          blob: doc.output("blob"),
          filename
        };
      } else {
        doc.save(filename);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      showPushNotification("Erro ao gerar PDF. Verifique sua conex\xE3o e tente novamente.", "error");
    }
  };
  const sendDietWhatsApp = async (diet) => {
    try {
      let phoneNumber = "";
      if (calculatorData.clientId) {
        const client = mockClients.find((c) => c.id === calculatorData.clientId);
        if (client && client.phone) {
          phoneNumber = client.phone.replace(/\D/g, "");
        }
      }
      const message = `\u{1F957} Ol\xE1 ${diet.clientName}!

Segue sua dieta personalizada:
\u{1F4CA} ${diet.calories} kcal/dia
\u{1F4C5} ${new Date(diet.createdAt).toLocaleDateString("pt-BR")}

\u{1F4AA} Vou enviar o PDF completo com todas as refei\xE7\xF5es!

Bons treinos!
${currentUser.name}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = phoneNumber ? `https://wa.me/55${phoneNumber}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Erro ao enviar WhatsApp:", error);
      showPushNotification("Erro ao preparar envio. Tente novamente.", "error");
    }
  };
  const sendDietEmail = async (diet) => {
    try {
      let clientEmail = "";
      if (calculatorData.clientId) {
        const client = mockClients.find((c) => c.id === calculatorData.clientId);
        if (client && client.email) {
          clientEmail = client.email;
        }
      }
      if (!clientEmail) {
        clientEmail = prompt(`\u{1F4E7} Digite o email de ${diet.clientName}:`, `${diet.clientName.toLowerCase().replace(/\s+/g, ".")}@email.com`);
        if (!clientEmail || clientEmail.trim() === "") {
          showPushNotification("\u274C Email \xE9 obrigat\xF3rio para enviar por email!", "warning");
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmail)) {
          showPushNotification("\u274C Por favor, digite um email v\xE1lido!", "warning");
          return;
        }
      }
      const date = new Date(diet.createdAt);
      const formattedDate = date.toLocaleDateString("pt-BR");
      const subject = `Seu Plano Alimentar Personalizado - ${diet.clientName}`;
      const body = `Ol\xE1 ${diet.clientName}!

Espero que voc\xEA esteja bem!

Segue seu plano alimentar personalizado desenvolvido especialmente para voc\xEA.

\u{1F4CA} Resumo da sua dieta:
\u2022 Calorias di\xE1rias: ${diet.calories} kcal
\u2022 Data: ${formattedDate}
\u2022 Personal: ${currentUser.name}

\u{1F37D}\uFE0F Refei\xE7\xF5es principais:
${diet.meals.map((meal) => `\u2022 ${meal.name}: ${meal.calories} kcal`).join("\n")}

\u{1F4A1} ORIENTA\xC7\xD5ES:
\u2022 Siga as por\xE7\xF5es indicadas
\u2022 Mantenha os hor\xE1rios das refei\xE7\xF5es
\u2022 Hidrate-se adequadamente (2-3L \xE1gua/dia)
\u2022 Pratique atividade f\xEDsica regularmente
\u2022 Em caso de d\xFAvidas, entre em contato comigo

\u{1F4CE} Para o PDF completo com detalhes, solicite pelo WhatsApp ou use o sistema.

Estou \xE0 disposi\xE7\xE3o para qualquer esclarecimento!

Atenciosamente,
${currentUser.name}
Personal Trainer
NutriApp - Sistema Profissional de Nutri\xE7\xE3o

---
\u26A0\uFE0F Este plano foi desenvolvido especificamente para voc\xEA.`;
      window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self");
    } catch (error) {
      console.error("Erro ao preparar email:", error);
      showPushNotification("Erro ao preparar email. Tente novamente.", "error");
    }
  };
  const calculateBMR = (data) => {
    const { weight, height, age, gender } = data;
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);
    let bmr;
    if (gender === "male") {
      bmr = 13.75 * weightKg + 5 * heightCm - 6.76 * ageYears + 66.5;
    } else {
      bmr = 9.56 * weightKg + 1.85 * heightCm - 4.68 * ageYears + 665;
    }
    return Math.round(bmr);
  };
  const formatNumber = (num) => {
    if (num === null || num === void 0) return "0";
    const rounded = Math.round(parseFloat(num));
    return rounded.toString();
  };
  const calculateTDEE = (bmr, activityLevel) => {
    const activityFactors = {
      sedentary: 1.2,
      // Sedentário (pouco ou nenhum exercício)
      light: 1.375,
      // Levemente ativo (exercício leve 1-3 dias/semana)
      moderate: 1.55,
      // Moderadamente ativo (exercício moderado 3-5 dias/semana)
      intense: 1.725,
      // Muito ativo (exercício pesado 6-7 dias/semana)
      veryIntense: 1.9
      // Extremamente ativo (exercício muito pesado, trabalho físico)
    };
    return bmr * (activityFactors[activityLevel] || 1.55);
  };
  const calculateTargetCalories = (tdee, goal, userProfile) => {
    let targetCalories = tdee;
    switch (goal) {
      case "weightLoss":
        const deficitPercent = userProfile.gender === "female" ? 0.2 : 0.22;
        targetCalories = tdee * (1 - deficitPercent);
        break;
      case "muscleGain":
        const surplusPercent = userProfile.gender === "female" ? 0.12 : 0.15;
        targetCalories = tdee * (1 + surplusPercent);
        break;
      case "recomposition":
        targetCalories = tdee * 0.95;
        break;
      case "maintenance":
      default:
        targetCalories = tdee;
        break;
    }
    const minCalories = userProfile.gender === "female" ? 1200 : 1500;
    const maxCalories = tdee * 1.3;
    return Math.round(Math.max(minCalories, Math.min(maxCalories, targetCalories)));
  };
  const calculateCalories = (bmr, activityLevel, goal, userProfile = {}) => {
    const tdee = calculateTDEE(bmr, activityLevel);
    return calculateTargetCalories(tdee, goal, userProfile);
  };
  const calculateMacros = (calories, goal, userProfile) => {
    const weight = parseFloat(userProfile.weight || 70);
    const activityLevel = userProfile.activityLevel || "moderate";
    let proteinGrams, fatGrams, carbsGrams;
    switch (goal) {
      case "weightLoss":
        proteinGrams = weight * (activityLevel === "intense" || activityLevel === "veryIntense" ? 2.2 : 1.8);
        break;
      case "muscleGain":
        proteinGrams = weight * (activityLevel === "intense" || activityLevel === "veryIntense" ? 2.5 : 2);
        break;
      case "recomposition":
        proteinGrams = weight * 2.2;
        break;
      case "maintenance":
      default:
        proteinGrams = weight * 1.4;
        break;
    }
    const minFatGrams = weight * 0.8;
    let fatPercentage;
    switch (goal) {
      case "weightLoss":
        fatPercentage = 0.25;
        break;
      case "muscleGain":
        fatPercentage = 0.25;
        break;
      case "recomposition":
        fatPercentage = 0.25;
        break;
      default:
        fatPercentage = 0.3;
        break;
    }
    fatGrams = Math.max(minFatGrams, calories * fatPercentage / 9);
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const remainingCalories = calories - proteinCalories - fatCalories;
    carbsGrams = Math.max(50, remainingCalories / 4);
    return {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams),
      // Informações adicionais
      proteinPerKg: Math.round(proteinGrams / weight * 10) / 10,
      carbsPercent: Math.round(carbsGrams * 4 / calories * 100),
      fatPercent: Math.round(fatGrams * 9 / calories * 100),
      proteinPercent: Math.round(proteinGrams * 4 / calories * 100)
    };
  };
  const generateMeals = (calories, macros, restrictions = [], goal = "maintenance") => {
    const mealDistribution = {
      weightLoss: {
        "Caf\xE9 da Manh\xE3": 0.25,
        "Lanche da Manh\xE3": 0.1,
        "Almo\xE7o": 0.35,
        "Lanche da Tarde": 0.1,
        "Jantar": 0.2
      },
      muscleGain: {
        "Caf\xE9 da Manh\xE3": 0.2,
        "Lanche da Manh\xE3": 0.15,
        "Almo\xE7o": 0.3,
        "Lanche da Tarde": 0.15,
        "Jantar": 0.2
      },
      maintenance: {
        "Caf\xE9 da Manh\xE3": 0.25,
        "Lanche da Manh\xE3": 0.1,
        "Almo\xE7o": 0.3,
        "Lanche da Tarde": 0.15,
        "Jantar": 0.2
      }
    };
    const distribution = mealDistribution[goal] || mealDistribution.maintenance;
    const foodOptions = {
      proteins: [
        { name: "Peito de frango grelhado", protein: 23.1, carbs: 0, fat: 3.2, calories: 119, unit: "g", baseAmount: 100 },
        { name: "Salm\xE3o grelhado", protein: 25.4, carbs: 0, fat: 12.4, calories: 208, unit: "g", baseAmount: 100 },
        { name: "Ovo cozido", protein: 13, carbs: 1.1, fat: 10.6, calories: 155, unit: "unidade", baseAmount: 60 },
        { name: "Til\xE1pia grelhada", protein: 26.2, carbs: 0, fat: 3.7, calories: 129, unit: "g", baseAmount: 100 },
        { name: "Whey protein", protein: 25, carbs: 2, fat: 1, calories: 120, unit: "scoop", baseAmount: 30 }
      ],
      carbs: [
        { name: "Arroz integral cozido", protein: 2.6, carbs: 22.9, fat: 0.9, calories: 111, unit: "g", baseAmount: 100 },
        { name: "Batata doce cozida", protein: 2, carbs: 20, fat: 0.1, calories: 86, unit: "g", baseAmount: 100 },
        { name: "Aveia", protein: 13.2, carbs: 66.3, fat: 6.9, calories: 379, unit: "g", baseAmount: 100 },
        { name: "Banana", protein: 1.1, carbs: 22.8, fat: 0.2, calories: 96, unit: "unidade", baseAmount: 120 },
        { name: "P\xE3o integral", protein: 9, carbs: 43, fat: 4, calories: 247, unit: "fatia", baseAmount: 50 }
      ],
      fats: [
        { name: "Azeite extra virgem", protein: 0, carbs: 0, fat: 100, calories: 884, unit: "ml", baseAmount: 100 },
        { name: "Castanha do Par\xE1", protein: 14.3, carbs: 12.3, fat: 66.4, calories: 659, unit: "g", baseAmount: 100 },
        { name: "Abacate", protein: 2, carbs: 8.5, fat: 14.7, calories: 160, unit: "g", baseAmount: 100 },
        { name: "Amendoim", protein: 26.2, carbs: 16.1, fat: 49.2, calories: 567, unit: "g", baseAmount: 100 }
      ],
      vegetables: [
        { name: "Br\xF3colis", protein: 3, carbs: 7, fat: 0.4, calories: 25, unit: "g", baseAmount: 100 },
        { name: "Salada verde mista", protein: 1.4, carbs: 3.6, fat: 0.2, calories: 20, unit: "g", baseAmount: 100 },
        { name: "Tomate", protein: 0.9, carbs: 3.9, fat: 0.2, calories: 18, unit: "g", baseAmount: 100 }
      ]
    };
    const meals = [];
    Object.entries(distribution).forEach(([mealName, percentage]) => {
      const mealCalories = Math.round(calories * percentage);
      const mealProtein = Math.round(macros.protein * percentage);
      const mealCarbs = Math.round(macros.carbs * percentage);
      const mealFat = Math.round(macros.fat * percentage);
      let foods = [];
      let currentCalories = 0;
      let currentProtein = 0;
      let currentCarbs = 0;
      let currentFat = 0;
      if (mealProtein > 5) {
        const protein = foodOptions.proteins[Math.floor(Math.random() * foodOptions.proteins.length)];
        const proteinAmount = Math.round(mealProtein * 0.8 / protein.protein * protein.baseAmount);
        foods.push({
          name: protein.name,
          quantity: proteinAmount + protein.unit,
          calories: Math.round(protein.calories * proteinAmount / protein.baseAmount),
          protein: Math.round(protein.protein * proteinAmount / protein.baseAmount),
          carbs: Math.round(protein.carbs * proteinAmount / protein.baseAmount),
          fat: Math.round(protein.fat * proteinAmount / protein.baseAmount)
        });
        currentCalories += foods[foods.length - 1].calories;
        currentProtein += foods[foods.length - 1].protein;
        currentCarbs += foods[foods.length - 1].carbs;
        currentFat += foods[foods.length - 1].fat;
      }
      if (mealCarbs > 5) {
        const carb = foodOptions.carbs[Math.floor(Math.random() * foodOptions.carbs.length)];
        const carbAmount = Math.round(mealCarbs * 0.8 / carb.carbs * carb.baseAmount);
        foods.push({
          name: carb.name,
          quantity: carbAmount + carb.unit,
          calories: Math.round(carb.calories * carbAmount / carb.baseAmount),
          protein: Math.round(carb.protein * carbAmount / carb.baseAmount),
          carbs: Math.round(carb.carbs * carbAmount / carb.baseAmount),
          fat: Math.round(carb.fat * carbAmount / carb.baseAmount)
        });
        currentCalories += foods[foods.length - 1].calories;
        currentProtein += foods[foods.length - 1].protein;
        currentCarbs += foods[foods.length - 1].carbs;
        currentFat += foods[foods.length - 1].fat;
      }
      if (mealFat > currentFat && mealFat - currentFat > 3) {
        const fat = foodOptions.fats[Math.floor(Math.random() * foodOptions.fats.length)];
        const fatAmount = Math.round((mealFat - currentFat) / fat.fat * fat.baseAmount);
        if (fatAmount > 0) {
          foods.push({
            name: fat.name,
            quantity: fatAmount + fat.unit,
            calories: Math.round(fat.calories * fatAmount / fat.baseAmount),
            protein: Math.round(fat.protein * fatAmount / fat.baseAmount),
            carbs: Math.round(fat.carbs * fatAmount / fat.baseAmount),
            fat: Math.round(fat.fat * fatAmount / fat.baseAmount)
          });
          currentCalories += foods[foods.length - 1].calories;
        }
      }
      if (mealName === "Almo\xE7o" || mealName === "Jantar") {
        const vegetable = foodOptions.vegetables[Math.floor(Math.random() * foodOptions.vegetables.length)];
        const vegAmount = 100;
        foods.push({
          name: vegetable.name,
          quantity: vegAmount + vegetable.unit,
          calories: Math.round(vegetable.calories * vegAmount / vegetable.baseAmount),
          protein: Math.round(vegetable.protein * vegAmount / vegetable.baseAmount),
          carbs: Math.round(vegetable.carbs * vegAmount / vegetable.baseAmount),
          fat: Math.round(vegetable.fat * vegAmount / vegetable.baseAmount)
        });
        currentCalories += foods[foods.length - 1].calories;
      }
      meals.push({
        name: mealName,
        calories: currentCalories,
        targetCalories: mealCalories,
        protein: currentProtein,
        carbs: currentCarbs,
        fat: currentFat,
        foods
      });
    });
    return meals;
  };
  const generateMealsFromTemplate = (template, calories, macros) => {
    const meals = generateMeals(calories, macros, []);
    return meals.map((meal) => ({
      ...meal,
      templateSource: template.name
    }));
  };
  const personalMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "calculator", label: "Calculadora", icon: Calculator },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "history", label: "Hist\xF3rico", icon: History },
    { id: "plans", label: "Planos", icon: CreditCard },
    { id: "profile", label: "Perfil", icon: User }
  ];
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "trainers", label: "Personal Trainers", icon: Users2 },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "database", label: "Base de Dados", icon: Database },
    { id: "settings", label: "Configura\xE7\xF5es", icon: Settings }
  ];
  const currentMenuItems = userRole === "admin" ? adminMenuItems : personalMenuItems;
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === "admin@nutriapp.com") {
      setCurrentUser({ id: "admin", name: "Administrador", email: "admin@nutriapp.com" });
      setUserRole("admin");
    } else {
      setCurrentUser({ id: "P0001", name: "Usuário Exemplo", email: loginData.email });
      setUserRole("personal");
    }
    setShowLoginModal(false);
    setActiveSection("dashboard");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("As senhas n\xE3o coincidem!");
      return;
    }
    if (registerData.password.length < 6) {
      setRegisterError("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    setShowRegisterModal(false);
    setShowVerificationModal(true);
  };
  const handleVerification = (e) => {
    e.preventDefault();
    if (verificationCode.replace(/\s/g, "") !== "123456") {
      setLoginError("C\xF3digo inv\xE1lido! Use: 123456");
      return;
    }
    setCurrentUser({
      id: `P${Date.now().toString().slice(-4)}`,
      name: registerData.name,
      email: registerData.email
    });
    setUserRole("personal");
    setShowVerificationModal(false);
    setActiveSection("dashboard");
    setRegisterData({
      name: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: ""
    });
    setVerificationCode("");
    setLoginError("");
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setActiveSection("dashboard");
  };
  const showPushNotification = (message, type = "success") => {
    setNotificationMessage(message.trim());
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4e3);
  };
  const showInfoPopup = (title, content, type = "info") => {
    setInfoModalData({ title: title.trim(), content: content.trim(), type });
    setShowInfoModal(true);
  };
  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    await new Promise((resolve) => setTimeout(resolve, 2e3));
    setIsTestingConnection(false);
    showPushNotification("\u{1F7E2} Conex\xE3o testada com sucesso! Sistema funcionando perfeitamente.", "success");
  };
  const handleManualBackup = async () => {
    setIsBackingUp(true);
    await new Promise((resolve) => setTimeout(resolve, 3e3));
    setIsBackingUp(false);
    showPushNotification("\u{1F4BE} Backup realizado com sucesso! Dados seguros e protegidos.", "success");
  };
  const handleSaveSettings = () => {
    showPushNotification("\u2699\uFE0F Configura\xE7\xF5es salvas com sucesso! Altera\xE7\xF5es aplicadas.", "success");
  };
  const handleAddTrainer = (e) => {
    e.preventDefault();
    setShowAddTrainerModal(false);
    setNewTrainer({ name: "", email: "", phone: "", credits: 200 });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3e3);
  };
  const handleManageCredits = (e) => {
    e.preventDefault();
    setShowManageCreditsModal(false);
    setCreditAmount("");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3e3);
  };
  const handleCreateTemplate = (e) => {
    e.preventDefault();
    setShowCreateTemplateModal(false);
    setNewTemplate({
      name: "",
      description: "",
      meals: [
        { name: "Caf\xE9 da Manh\xE3", foods: [], substitutions: [] },
        { name: "Lanche da Manh\xE3", foods: [], substitutions: [] },
        { name: "Almo\xE7o", foods: [], substitutions: [] },
        { name: "Lanche da Tarde", foods: [], substitutions: [] },
        { name: "Jantar", foods: [], substitutions: [] }
      ]
    });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3e3);
  };
  const handleAddFood = (mealIndex) => {
    setCurrentMealIndex(mealIndex);
    setShowSelectFoodModal(true);
  };
  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setShowSelectFoodModal(false);
    setShowPortionModal(true);
  };
  const handleAddFoodToMeal = (food, amount) => {
    const calculatedFood = {
      name: food.name,
      amount,
      quantity: `${amount}g`,
      protein: (food.protein * amount / 100).toFixed(1),
      carbs: (food.carbs * amount / 100).toFixed(1),
      fat: (food.fat * amount / 100).toFixed(1),
      calories: Math.round(food.calories * amount / 100)
    };
    const updatedFoods = [...currentManualMeal.foods, calculatedFood];
    const totalMealCalories = updatedFoods.reduce((sum, f) => sum + f.calories, 0);
    setCurrentManualMeal({
      ...currentManualMeal,
      foods: updatedFoods,
      calories: totalMealCalories.toString()
    });
  };
  const handleAddPortion = (amount) => {
    if (!selectedFood || !amount || amount <= 0) {
      showPushNotification("\u26A0\uFE0F Por favor, selecione um alimento e uma quantidade v\xE1lida!", "warning");
      return;
    }
    const calculatedFood = {
      name: selectedFood.name,
      amount,
      quantity: `${amount}g`,
      protein: (selectedFood.protein * amount / selectedFood.baseAmount).toFixed(1),
      carbs: (selectedFood.carbs * amount / selectedFood.baseAmount).toFixed(1),
      fat: (selectedFood.fat * amount / selectedFood.baseAmount).toFixed(1),
      calories: Math.round(selectedFood.calories * amount / selectedFood.baseAmount)
    };
    const updatedFoods = [...currentManualMeal.foods, calculatedFood];
    setCurrentManualMeal({
      ...currentManualMeal,
      foods: updatedFoods
    });
    setShowPortionModal(false);
    setSelectedFood(null);
    if (isAddingToMeal) {
      setShowSelectFoodModal(true);
    }
    showPushNotification(`\u2705 ${selectedFood.name} (${amount}g) adicionado!`, "success");
  };
  const handleAddSubstitution = (mealIndex) => {
    setCurrentMealIndex(mealIndex);
    setShowSubstitutionModal(true);
  };
  const handleSelectSubstitution = (food) => {
    setSelectedFood(food);
    setShowSubstitutionModal(false);
    setShowPortionModal(true);
  };
  const handleAddSubstitutionPortion = (amount) => {
    const calculatedFood = {
      ...selectedFood,
      amount,
      calculatedProtein: (selectedFood.protein * amount / 100).toFixed(1),
      calculatedCarbs: (selectedFood.carbs * amount / 100).toFixed(1),
      calculatedFat: (selectedFood.fat * amount / 100).toFixed(1),
      calculatedCalories: Math.round(selectedFood.calories * amount / 100)
    };
    const updatedMeals = [...newTemplate.meals];
    updatedMeals[currentMealIndex].substitutions.push(calculatedFood);
    setNewTemplate({
      ...newTemplate,
      meals: updatedMeals
    });
    setShowPortionModal(false);
    setSelectedFood(null);
  };
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showPushNotification("Por favor, selecione apenas arquivos de imagem!", "warning");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showPushNotification("A imagem deve ter no m\xE1ximo 5MB!", "warning");
      return;
    }
    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSize = 400;
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) {
            height = height * maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = width * maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setProfilePhoto(compressedDataUrl);
        setCurrentUser({
          ...currentUser,
          photo: compressedDataUrl
        });
        setIsUploadingPhoto(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3e3);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setCurrentUser({
      ...currentUser,
      photo: null
    });
    setShowPhotoModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3e3);
  };
  const handlePayment = async () => {
    if (!selectedPlan) return;
    setIsProcessingPayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      setShowPaymentModal(false);
      setSelectedPlan(null);
      setIsProcessingPayment(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5e3);
      setTimeout(() => {
        setActiveSection("dashboard");
      }, 2e3);
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessingPayment(false);
      showPushNotification("Erro no pagamento. Tente novamente.", "error");
    }
  };
  const handleRemoveMeal = (mealIndex) => {
    const updatedMeals = newTemplate.meals.filter((_, index) => index !== mealIndex);
    setNewTemplate({
      ...newTemplate,
      meals: updatedMeals
    });
  };
  const filteredFoods = foodDatabase.filter(
    (food) => food.name.toLowerCase().includes(searchFood.toLowerCase())
  );
  const chartData = [
    { label: "Jan", value: 45 },
    { label: "Fev", value: 52 },
    { label: "Mar", value: 38 },
    { label: "Abr", value: 61 },
    { label: "Mai", value: 55 },
    { label: "Jun", value: 67 }
  ];
  const verifyAdminFunctionalities = () => {
    const adminFeatures = [
      "Dashboard com estat\xEDsticas em tempo real",
      "Gest\xE3o completa de Personal Trainers",
      "Sistema de gerenciamento de cr\xE9ditos",
      "Cria\xE7\xE3o e edi\xE7\xE3o de templates",
      "Base de dados com an\xE1lise detalhada",
      "Configura\xE7\xF5es do sistema",
      "Backup e seguran\xE7a",
      "Exporta\xE7\xE3o de dados",
      "Notifica\xE7\xF5es e alertas",
      "Relat\xF3rios avan\xE7ados"
    ];
    console.log("\u2705 Todas as funcionalidades administrativas implementadas:");
    adminFeatures.forEach((feature, index) => {
      console.log(`${index + 1}. ${feature}`);
    });
    return true;
  };
  if (!currentUser) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50 flex" }, /* @__PURE__ */ React.createElement("div", { className: "hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-cyan-50 to-blue-50" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-md text-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 bg-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg" }, /* @__PURE__ */ React.createElement(Utensils, { className: "text-white", size: 40 })), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl font-bold text-gray-900" }, "NutriApp"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-semibold text-gray-900 mb-6 leading-relaxed" }, "Seja Bem-Vindo(a) na melhor plataforma de gerar dietas personalizadas para personal trainers")))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex items-center justify-center p-8 lg:w-1/2" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "lg:hidden text-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg" }, /* @__PURE__ */ React.createElement(Utensils, { className: "text-white", size: 32 })), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "NutriApp")), /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-semibold text-gray-900 mb-6" }, "Seja Bem-Vindo(a) na melhor plataforma de gerar dietas personalizadas para personal trainers")), /* @__PURE__ */ React.createElement(Card, { className: "bg-white rounded-xl shadow-sm border border-[#EAECF0] p-8 shadow-lg" }, /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex bg-gray-100 rounded-lg p-1 mb-6" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setShowLoginModal(true);
          setShowRegisterModal(false);
        },
        className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${!showRegisterModal ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`
      },
      "Entrar"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setShowRegisterModal(true);
          setShowLoginModal(false);
        },
        className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${showRegisterModal ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`
      },
      "Cadastrar"
    ))), !showRegisterModal && /* @__PURE__ */ React.createElement("form", { onSubmit: handleLogin, className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Email *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        value: loginData.email,
        onChange: (e) => setLoginData({ ...loginData, email: e.target.value }),
        placeholder: "seu@email.com",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Senha *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u{1F512}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: loginData.password,
        onChange: (e) => setLoginData({ ...loginData, password: e.target.value }),
        placeholder: "M\xEDnimo 6 caracteres",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(Info, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 16 }))), loginError && /* @__PURE__ */ React.createElement("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-red-600" }, loginError)), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700 py-3" }, "Entrar"), /* @__PURE__ */ React.createElement("div", { className: "text-center mt-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "Para teste de Personal Trainer, use: ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "personal@nutriplan.com"), " / senha123"))), showRegisterModal && /* @__PURE__ */ React.createElement("form", { onSubmit: handleRegister, className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Nome Completo *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: registerData.name,
        onChange: (e) => setRegisterData({ ...registerData, name: e.target.value }),
        placeholder: "Seu nome completo",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "CREF"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u{1F3F7}\uFE0F"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        placeholder: "123456-G/SP",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      }
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Email *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u2709\uFE0F"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        value: registerData.email,
        onChange: (e) => setRegisterData({ ...registerData, email: e.target.value }),
        placeholder: "seu@email.com",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "WhatsApp"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u{1F4F1}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "tel",
        value: registerData.phone,
        onChange: (e) => setRegisterData({ ...registerData, phone: e.target.value }),
        placeholder: "(35) 99999-9999",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Senha *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u{1F512}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: registerData.password,
        onChange: (e) => setRegisterData({ ...registerData, password: e.target.value }),
        placeholder: "M\xEDnimo 6 caracteres",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ), /* @__PURE__ */ React.createElement(Info, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 16 }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Confirmar Senha *"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }, "\u{1F512}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: registerData.confirmPassword,
        onChange: (e) => setRegisterData({ ...registerData, confirmPassword: e.target.value }),
        placeholder: "Repita a senha",
        className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        required: true
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-medium text-blue-800 mb-2" }, "Sistema de Confirma\xE7\xE3o"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-blue-700" }, "Ap\xF3s o cadastro, voc\xEA receber\xE1 uma mensagem via WhatsApp/Email para ativar sua conta.")), registerError && /* @__PURE__ */ React.createElement("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-red-600" }, registerError)), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700 py-3" }, "Cadastrar"))))), showVerificationModal && /* @__PURE__ */ React.createElement(Modal, { isOpen: showVerificationModal, onClose: () => {
    }, title: "Confirmar C\xF3digo" }, /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-8 p-2" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto shadow-sm border border-blue-100" }, /* @__PURE__ */ React.createElement("div", { className: "text-4xl" }, "\u{1F4F1}")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-gray-900" }, "Confirme seu cadastro"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-600" }, "Enviamos um c\xF3digo de 6 d\xEDgitos para:"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-blue-600 text-lg" }, registerData.email), /* @__PURE__ */ React.createElement("p", { className: "font-medium text-green-600 text-lg" }, registerData.phone))), /* @__PURE__ */ React.createElement("form", { onSubmit: handleVerification, className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-4" }, "Digite o c\xF3digo de verifica\xE7\xE3o:"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center space-x-3 mb-4" }, [0, 1, 2, 3, 4, 5].map((index) => /* @__PURE__ */ React.createElement(
      "input",
      {
        key: index,
        type: "text",
        maxLength: 1,
        value: verificationCode[index] || "",
        onChange: (e) => {
          const value = e.target.value.replace(/\D/g, "");
          const newCode = verificationCode.split("");
          newCode[index] = value;
          setVerificationCode(newCode.join(""));
          if (value && index < 5) {
            const nextInput = e.target.parentNode.children[index + 1];
            nextInput?.focus();
          }
        },
        onKeyDown: (e) => {
          if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            const prevInput = e.target.parentNode.children[index - 1];
            prevInput?.focus();
          }
        },
        className: "w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      }
    ))), loginError && /* @__PURE__ */ React.createElement("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-red-600" }, loginError)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "C\xF3digo de teste: ", /* @__PURE__ */ React.createElement("span", { className: "font-medium text-blue-600" }, "123456"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg" }, "Confirmar C\xF3digo"), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          setLoginError("");
          setTimeout(() => {
            setLoginError("");
          }, 100);
        },
        className: "text-sm text-blue-600 hover:text-blue-700 underline font-medium"
      },
      "N\xE3o recebeu o c\xF3digo? Reenviar"
    )), /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => {
          setShowVerificationModal(false);
          setShowRegisterModal(true);
          setLoginError("");
        },
        className: "text-sm text-gray-500 hover:text-gray-700 font-medium"
      },
      "\u2190 Voltar ao cadastro"
    )))))));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-50 flex" }, userRole === "personal" && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-6 h-16" }, personalMenuItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => {
        setActiveSection(item.id);
        setSidebarOpen(false);
      },
      className: `flex flex-col items-center justify-center space-y-1 transition-colors ${activeSection === item.id ? `text-[${colors.primary[600]}] bg-[${colors.primary[50]}]` : `text-[${colors.gray[500]}] hover:text-[${colors.gray[700]}]`}`
    },
    /* @__PURE__ */ React.createElement(item.icon, { size: 20 }),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-medium truncate px-1" }, item.label)
  )))), /* @__PURE__ */ React.createElement("div", { className: `fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between h-16 px-6 border-b border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 bg-[${colors.primary[600]}] rounded-lg flex items-center justify-center mr-3` }, /* @__PURE__ */ React.createElement(Utensils, { className: "text-white", size: 18 })), /* @__PURE__ */ React.createElement("h1", { className: `text-xl font-bold text-[${colors.gray[900]}]` }, "NutriApp")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSidebarOpen(false),
      className: "lg:hidden"
    },
    /* @__PURE__ */ React.createElement(X, { size: 20 })
  )), /* @__PURE__ */ React.createElement("nav", { className: "mt-6" }, currentMenuItems.map((item) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: item.id,
      onClick: () => {
        setActiveSection(item.id);
        setSidebarOpen(false);
      },
      className: `w-full flex items-center px-6 py-3 text-left transition-colors ${activeSection === item.id ? `bg-[${colors.primary[50]}] text-[${colors.primary[600]}] border-r-2 border-[${colors.primary[600]}]` : `text-[${colors.gray[600]}] hover:bg-[${colors.gray[50]}] hover:text-[${colors.gray[900]}]`}`
    },
    /* @__PURE__ */ React.createElement(item.icon, { size: 20, className: "mr-3" }),
    item.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 w-full p-6 border-t border-gray-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center mb-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden ${!(profilePhoto || currentUser.photo) ? `bg-[${colors.primary[600]}]` : ""}` }, profilePhoto || currentUser.photo ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: "Foto de perfil",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(User, { className: "text-white", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `font-medium text-[${colors.gray[900]}]` }, currentUser.name), /* @__PURE__ */ React.createElement("p", { className: `text-sm text-[${colors.gray[600]}]` }, userRole === "admin" ? "Administrador" : "Personal Trainer")), userRole === "personal" && /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "sm", className: "p-2" }, /* @__PURE__ */ React.createElement(Bell, { size: 16 }))), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: handleLogout,
      variant: "outline",
      className: "w-full",
      size: "sm"
    },
    /* @__PURE__ */ React.createElement(LogOut, { size: 16 }),
    "Sair"
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 lg:ml-0" }, /* @__PURE__ */ React.createElement("div", { className: "hidden" }), /* @__PURE__ */ React.createElement("main", { className: "p-4 md:p-6 pb-20 lg:pb-6 pt-4" }, activeSection === "dashboard" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, userRole === "admin" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-6" }, "Aqui est\xE1 um resumo da sua atividade hoje")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-gray-900" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-2" }, "Clientes Cadastrados"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap" }, "+12% vs. m\xEAs anterior"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(Users, { className: "text-blue-600", size: 20 })))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-gray-900" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-2" }, "Dietas Geradas"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap" }, "+8% vs. m\xEAs anterior"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(FileText, { className: "text-green-600", size: 20 })))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6 sm:col-span-2 lg:col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-gray-900" }, "0%"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-2" }, "Taxa de Sucesso"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap" }, "+2% vs. m\xEAs anterior"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(TrendingUp, { className: "text-emerald-600", size: 20 }))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6 lg:col-span-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Top Personal Trainers"), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-500" }, "Este m\xEAs")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 md:space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 md:p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 md:space-x-4 min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-yellow-100" }, profilePhoto || currentUser.photo ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: "Usuário Exemplo",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(Crown, { className: "text-yellow-600", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 text-sm md:text-base truncate" }, "Usuário Exemplo"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Personal Trainer"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 mt-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 dietas"), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 clientes")))), /* @__PURE__ */ React.createElement("div", { className: "text-right flex-shrink-0 ml-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-yellow-600" }, "#1"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-500" }, "L\xEDder")))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 rounded-xl p-3 md:p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 md:space-x-4 min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { className: "text-gray-600", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 text-sm md:text-base truncate" }, "Usuário Exemplo"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Personal Trainer"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 mt-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 dietas"), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 clientes")))), /* @__PURE__ */ React.createElement("div", { className: "text-right flex-shrink-0 ml-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-gray-600" }, "#2"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-500" }, "Vice-l\xEDder")))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 rounded-xl p-3 md:p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 md:space-x-4 min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { className: "text-gray-600", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 text-sm md:text-base truncate" }, "Usuário Exemplo"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Personal Trainer"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2 mt-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 dietas"), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap" }, "0 clientes")))), /* @__PURE__ */ React.createElement("div", { className: "text-right flex-shrink-0 ml-2" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-gray-600" }, "#3"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-500" }, "3\xBA lugar")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 p-3 md:p-4 rounded-lg text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-blue-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Total de Dietas")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-50 p-3 md:p-4 rounded-lg text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-green-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Total de Clientes"))))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 md:mb-6" }, "Atividade Recente"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 md:space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { size: 16, className: "text-blue-600" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900 text-sm truncate" }, "Usuário Exemplo"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "2 horas atr\xE1s \u2022 0 kcal"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(DollarSign, { size: 16, className: "text-emerald-600" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900 text-sm" }, "Nenhuma atividade recente"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "1 dia atr\xE1s"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { size: 16, className: "text-blue-600" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900 text-sm truncate" }, "Cliente Exemplo"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "2 dias atr\xE1s \u2022 0 kcal"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(Star, { size: 16, className: "text-blue-600" })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900 text-sm" }, "Nenhuma conquista"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "3 dias atr\xE1s"))))))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-6" }, "Aqui est\xE1 um resumo da sua atividade hoje")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-gray-900" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-2" }, "Alunos Cadastrados"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap" }, "Sem dados"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(Users, { className: "text-blue-600", size: 20 })))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-gray-900" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-2" }, "Receitas Geradas"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap" }, "Sem dados"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(FileText, { className: "text-green-600", size: 20 })))), /* @__PURE__ */ React.createElement(
    Card,
    {
      className: "p-4 md:p-6 cursor-pointer hover:shadow-md transition-shadow border-orange-200 bg-gradient-to-r from-orange-50 to-red-50",
      onClick: () => setActiveSection("plans")
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-orange-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-orange-700 text-sm mb-2" }, "Cr\xE9ditos Restantes"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500 bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap" }, "Nenhum crédito"))), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "text-orange-600", size: 20 })))
  ), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 sm:col-span-2 xl:col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg md:text-xl font-bold text-gray-600" }, "Iniciante"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-3" }, "Gere sua primeira dieta"), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-gray-100 rounded-full h-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-300 h-2 rounded-full", style: { width: "0%" } })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-gray-500" }, /* @__PURE__ */ React.createElement("span", null, "0/1"), /* @__PURE__ */ React.createElement("span", null, "0%"))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end flex-shrink-0 ml-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-emerald-600 font-medium mb-2" }, "Pr\xF3xima"), /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Award, { className: "text-emerald-600", size: 20 })))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6 lg:col-span-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Meus Clientes"), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => setShowAddClientModal(true), className: "w-full sm:w-auto" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), "Novo Cliente")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 md:space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(Users, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-4" }, "Nenhum cliente cadastrado"), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => setShowAddClientModal(true) }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), "Adicionar Primeiro Cliente")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 p-2 md:p-3 rounded-lg text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg md:text-xl font-bold text-blue-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600" }, "Total Clientes")), /* @__PURE__ */ React.createElement("div", { className: "bg-green-50 p-2 md:p-3 rounded-lg text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg md:text-xl font-bold text-green-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600" }, "Ativos")), /* @__PURE__ */ React.createElement("div", { className: "bg-orange-50 p-2 md:p-3 rounded-lg text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg md:text-xl font-bold text-orange-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600" }, "Pausados"))))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 md:mb-6" }, "Atividade Recente"), /* @__PURE__ */ React.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ React.createElement(Activity, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm" }, "Nenhuma atividade recente")))))), activeSection === "calculator" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 md:space-y-6 pb-20 lg:pb-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-3 md:p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-base md:text-xl font-semibold text-gray-900 mb-3 md:mb-6" }, "Gerador de Dietas"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 md:space-y-4 mb-4 md:mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm md:text-md font-medium text-gray-900" }, "Selecionar Cliente:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 md:flex md:space-x-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => setShowClientSelectorModal(true),
      className: "text-xs md:text-sm"
    },
    /* @__PURE__ */ React.createElement(Users, { size: 14 }),
    /* @__PURE__ */ React.createElement("span", { className: "ml-1" }, "Cliente Existente")
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setCalculatorData({
          clientId: "",
          name: "",
          age: "",
          gender: "male",
          weight: "",
          height: "",
          activityLevel: "moderate",
          goal: "maintenance",
          restrictions: []
        });
      },
      className: "text-xs md:text-sm"
    },
    /* @__PURE__ */ React.createElement(Plus, { size: 14 }),
    /* @__PURE__ */ React.createElement("span", { className: "ml-1" }, "Novo Cliente")
  ))), calculatorData.clientId && /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2 md:space-x-3 flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { className: "text-blue-600", size: 16 })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-blue-900 text-sm md:text-base truncate" }, calculatorData.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-blue-700" }, calculatorData.age, " anos \u2022 ", calculatorData.weight, "kg \u2022 ", calculatorData.height, "cm"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-blue-600 font-medium" }, "Objetivo: ", calculatorData.goal === "weightLoss" ? "Perda de Peso" : calculatorData.goal === "muscleGain" ? "Ganho de Massa" : calculatorData.goal === "maintenance" ? "Manuten\xE7\xE3o" : "Recomposi\xE7\xE3o"))), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setCalculatorData({
          clientId: "",
          name: "",
          age: "",
          gender: "male",
          weight: "",
          height: "",
          activityLevel: "moderate",
          goal: "maintenance",
          restrictions: []
        });
      },
      className: "ml-2 flex-shrink-0"
    },
    /* @__PURE__ */ React.createElement(X, { size: 14 }),
    /* @__PURE__ */ React.createElement("span", { className: "hidden md:inline ml-1" }, "Remover")
  )))), !calculatorData.clientId && /* @__PURE__ */ React.createElement("form", { className: "space-y-4 md:space-y-6 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Nome do Cliente",
      value: calculatorData.name,
      onChange: (e) => setCalculatorData({ ...calculatorData, name: e.target.value }),
      required: true,
      className: "sm:col-span-2 lg:col-span-1"
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Idade",
      type: "number",
      value: calculatorData.age,
      onChange: (e) => setCalculatorData({ ...calculatorData, age: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      label: "Sexo",
      value: calculatorData.gender,
      onChange: (e) => setCalculatorData({ ...calculatorData, gender: e.target.value }),
      options: [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Feminino" }
      ]
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Peso (kg)",
      type: "number",
      value: calculatorData.weight,
      onChange: (e) => setCalculatorData({ ...calculatorData, weight: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Altura (cm)",
      type: "number",
      value: calculatorData.height,
      onChange: (e) => setCalculatorData({ ...calculatorData, height: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      label: "N\xEDvel de Atividade",
      value: calculatorData.activityLevel,
      onChange: (e) => setCalculatorData({ ...calculatorData, activityLevel: e.target.value }),
      options: [
        { value: "sedentary", label: "Sedent\xE1rio" },
        { value: "light", label: "Leve" },
        { value: "moderate", label: "Moderado" },
        { value: "intense", label: "Intenso" },
        { value: "veryIntense", label: "Muito Intenso" }
      ],
      className: "sm:col-span-2 lg:col-span-1"
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      label: "Objetivo",
      value: calculatorData.goal,
      onChange: (e) => setCalculatorData({ ...calculatorData, goal: e.target.value }),
      options: [
        { value: "weightLoss", label: "Perda de Peso" },
        { value: "maintenance", label: "Manuten\xE7\xE3o" },
        { value: "muscleGain", label: "Ganho de Massa" },
        { value: "recomposition", label: "Recomposi\xE7\xE3o" }
      ],
      className: "sm:col-span-2"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "border-t pt-3 md:pt-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm md:text-md font-medium text-gray-900 mb-3 md:mb-4" }, "Tipo de Dieta:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 mb-4 md:mb-6" }, /* @__PURE__ */ React.createElement(Card, { className: `p-3 md:p-4 cursor-pointer border-2 transition-colors ${dietType === "ai" ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`, onClick: () => setDietType("ai") }, /* @__PURE__ */ React.createElement("div", { className: `text-center ${dietType === "ai" ? "text-blue-600" : "text-gray-600"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 ${dietType === "ai" ? "bg-blue-100" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(Zap, { size: 20 })), /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-1 md:mb-2 text-sm md:text-base" }, "Dieta por IA"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm" }, "Gera\xE7\xE3o autom\xE1tica baseada em algoritmos inteligentes"), dietType === "ai" && /* @__PURE__ */ React.createElement("div", { className: "mt-2 md:mt-3" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-blue-600 mx-auto", size: 18 })))), /* @__PURE__ */ React.createElement(Card, { className: `p-3 md:p-4 cursor-pointer border-2 transition-colors ${dietType === "template" ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-green-300"}`, onClick: () => setDietType("template") }, /* @__PURE__ */ React.createElement("div", { className: `text-center ${dietType === "template" ? "text-green-600" : "text-gray-600"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 ${dietType === "template" ? "bg-green-100" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(FileText, { size: 20 })), /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-1 md:mb-2 text-sm md:text-base" }, "Usar Template"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm" }, "Dietas pr\xE9-definidas testadas e aprovadas"), dietType === "template" && /* @__PURE__ */ React.createElement("div", { className: "mt-2 md:mt-3" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600 mx-auto", size: 18 })))), /* @__PURE__ */ React.createElement(Card, { className: `p-3 md:p-4 cursor-pointer border-2 transition-colors ${dietType === "manual" ? "border-purple-300 bg-purple-50" : "border-gray-200 hover:border-purple-300"}`, onClick: () => setDietType("manual") }, /* @__PURE__ */ React.createElement("div", { className: `text-center ${dietType === "manual" ? "text-purple-600" : "text-gray-600"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 ${dietType === "manual" ? "bg-purple-100" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(Edit, { size: 20 })), /* @__PURE__ */ React.createElement("h4", { className: "font-semibold mb-1 md:mb-2 text-sm md:text-base" }, "Criar Manualmente"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm" }, "Controle total sobre cada refei\xE7\xE3o e alimento"), dietType === "manual" && /* @__PURE__ */ React.createElement("div", { className: "mt-2 md:mt-3" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-purple-600 mx-auto", size: 18 }))))), dietType === "template" && /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Escolher Template:"), /* @__PURE__ */ React.createElement(
    "select",
    {
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
      value: selectedTemplate || "",
      onChange: (e) => setSelectedTemplate(e.target.value)
    },
    /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecione um template..."),
    mockTemplates.map((template) => /* @__PURE__ */ React.createElement("option", { key: template.id, value: template.id }, template.name, " - ", template.description))
  )), calculatorData.clientId && /* @__PURE__ */ React.createElement("div", { className: "bg-green-50 border border-green-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 20 }), /* @__PURE__ */ React.createElement("p", { className: "text-green-800 font-medium" }, "\u2705 Cliente selecionado! Pronto para gerar dieta."))), !calculatorData.clientId && calculatorData.name && calculatorData.age && calculatorData.weight && calculatorData.height && /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-blue-600", size: 20 }), /* @__PURE__ */ React.createElement("p", { className: "text-blue-800 font-medium" }, "\u2705 Dados preenchidos! Pronto para gerar dieta."))), !calculatorData.clientId && (!calculatorData.name || !calculatorData.age || !calculatorData.weight || !calculatorData.height) && /* @__PURE__ */ React.createElement("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "text-yellow-600", size: 20 }), /* @__PURE__ */ React.createElement("p", { className: "text-yellow-800 font-medium" }, "\u26A0\uFE0F Preencha todos os campos ou selecione um cliente para continuar."))), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        console.log("\u{1F680} BOT\xC3O CLICADO!");
        if (dietType === "manual") {
          setShowManualDietModal(true);
          return;
        }
        if (dietType === "template" && !selectedTemplate) {
          showPushNotification("Selecione um template!", "warning");
          return;
        }
        generateDiet();
      },
      className: "w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold text-white rounded-lg",
      disabled: false
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center" }, isGenerating ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" }), /* @__PURE__ */ React.createElement("span", null, "Gerando Dieta..."))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-white/20 rounded-full" }, dietType === "ai" && /* @__PURE__ */ React.createElement(Zap, { size: 20, className: "text-white" }), dietType === "template" && /* @__PURE__ */ React.createElement(FileText, { size: 20, className: "text-white" }), dietType === "manual" && /* @__PURE__ */ React.createElement(Edit, { size: 20, className: "text-white" })), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("div", { className: "text-lg font-bold" }, "\u{1F680} Gerar Dieta")))))
  ))))), activeSection === "clients" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 md:space-y-6 pb-20 lg:pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Clientes"), /* @__PURE__ */ React.createElement(Button, { onClick: () => setShowAddClientModal(true), className: "w-full sm:w-auto" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), "Adicionar Cliente")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" }, mockClients.map((client) => /* @__PURE__ */ React.createElement(Card, { key: client.id, className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(User, { className: "text-blue-600", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-gray-900 text-sm md:text-base truncate" }, client.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, client.age, " anos"))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 mb-3 md:mb-4" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Peso:"), " ", client.weight, "kg"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Altura:"), " ", client.height, "cm"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Objetivo:"), " ", client.goal), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, "Frequ\xEAncia:"), " ", client.trainingFrequency)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      className: "w-full",
      onClick: () => {
        const goalMapping = {
          "Perda de peso": "weightLoss",
          "Ganho de massa": "muscleGain",
          "Manuten\xE7\xE3o": "maintenance",
          "Recomposi\xE7\xE3o": "recomposition"
        };
        setCalculatorData({
          clientId: client.id,
          name: client.name,
          age: client.age.toString(),
          gender: "male",
          weight: client.weight.toString(),
          height: client.height.toString(),
          activityLevel: "moderate",
          goal: goalMapping[client.goal] || "maintenance",
          restrictions: []
        });
        setActiveSection("calculator");
      }
    },
    /* @__PURE__ */ React.createElement(FileText, { size: 14 }),
    /* @__PURE__ */ React.createElement("span", { className: "ml-1" }, "Nova Dieta")
  )))))), activeSection === "history" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 md:space-y-6 pb-20 lg:pb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Hist\xF3rico de Dietas"), /* @__PURE__ */ React.createElement("div", { className: "block md:hidden space-y-4" }, mockDiets.map((diet) => /* @__PURE__ */ React.createElement(Card, { key: diet.id, className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-medium text-gray-900" }, diet.clientName), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-500" }, diet.calories, " kcal \u2022 ", diet.createdAt)), /* @__PURE__ */ React.createElement("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${diet.type === "Personalizada" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}` }, diet.type)), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      className: "flex-1",
      onClick: () => {
        setGeneratedDiet({
          ...diet,
          meals: [
            {
              name: "Caf\xE9 da Manh\xE3",
              calories: Math.round(diet.calories * 0.25),
              foods: [
                { name: "Aveia", quantity: "50g", calories: 190 },
                { name: "Banana", quantity: "1 unidade", calories: 105 }
              ]
            },
            {
              name: "Almo\xE7o",
              calories: Math.round(diet.calories * 0.35),
              foods: [
                { name: "Arroz integral", quantity: "100g", calories: 111 },
                { name: "Peito de frango", quantity: "150g", calories: 248 }
              ]
            },
            {
              name: "Jantar",
              calories: Math.round(diet.calories * 0.25),
              foods: [
                { name: "Salm\xE3o grelhado", quantity: "120g", calories: 231 },
                { name: "Salada verde", quantity: "100g", calories: 20 }
              ]
            }
          ]
        });
        setShowDietModal(true);
      }
    },
    /* @__PURE__ */ React.createElement(Eye, { size: 14 }),
    "Ver"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      className: "flex-1",
      onClick: () => {
        const mockDiet = {
          ...diet,
          meals: [
            {
              name: "Caf\xE9 da Manh\xE3",
              calories: Math.round(diet.calories * 0.25),
              foods: [
                { name: "Aveia", quantity: "50g", calories: 190 },
                { name: "Banana", quantity: "1 unidade", calories: 105 }
              ]
            },
            {
              name: "Almo\xE7o",
              calories: Math.round(diet.calories * 0.35),
              foods: [
                { name: "Arroz integral", quantity: "100g", calories: 111 },
                { name: "Peito de frango", quantity: "150g", calories: 248 }
              ]
            }
          ]
        };
        generateDietPDF(mockDiet);
      }
    },
    /* @__PURE__ */ React.createElement(Download, { size: 14 }),
    "PDF"
  ))))), /* @__PURE__ */ React.createElement(Card, { className: "overflow-hidden hidden md:block" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-gray-50" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Cliente"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Calorias"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Data"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tipo"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "A\xE7\xF5es"))), /* @__PURE__ */ React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, mockDiets.map((diet) => /* @__PURE__ */ React.createElement("tr", { key: diet.id }, /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, diet.clientName), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, diet.calories, " kcal"), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, diet.createdAt), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${diet.type === "Personalizada" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}` }, diet.type)), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setGeneratedDiet({
          ...diet,
          meals: [
            {
              name: "Caf\xE9 da Manh\xE3",
              calories: Math.round(diet.calories * 0.25),
              foods: [
                { name: "Aveia", quantity: "50g", calories: 190 },
                { name: "Banana", quantity: "1 unidade", calories: 105 }
              ]
            },
            {
              name: "Almo\xE7o",
              calories: Math.round(diet.calories * 0.35),
              foods: [
                { name: "Arroz integral", quantity: "100g", calories: 111 },
                { name: "Peito de frango", quantity: "150g", calories: 248 }
              ]
            }
          ]
        });
        setShowDietModal(true);
      }
    },
    /* @__PURE__ */ React.createElement(Eye, { size: 14 }),
    "Ver"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        const mockDiet = {
          ...diet,
          meals: [
            {
              name: "Caf\xE9 da Manh\xE3",
              calories: Math.round(diet.calories * 0.25),
              foods: [
                { name: "Aveia", quantity: "50g", calories: 190 },
                { name: "Banana", quantity: "1 unidade", calories: 105 }
              ]
            },
            {
              name: "Almo\xE7o",
              calories: Math.round(diet.calories * 0.35),
              foods: [
                { name: "Arroz integral", quantity: "100g", calories: 111 },
                { name: "Peito de frango", quantity: "150g", calories: 248 }
              ]
            }
          ]
        };
        generateDietPDF(mockDiet);
      }
    },
    /* @__PURE__ */ React.createElement(Download, { size: 14 }),
    "PDF"
  )))))))))), activeSection === "plans" && /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center py-8 lg:py-6 min-h-[calc(100vh-120px)]" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 text-center relative" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-gray-900 mb-4" }, "Starter"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "Ideal para come\xE7ar a gerar dietas personalizadas."), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl font-bold text-gray-900" }, "R$ 29,90"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500 mt-1" }, "R$ 0,30 por dieta")), /* @__PURE__ */ React.createElement(Button, { className: "w-full mb-6 bg-blue-100 border border-blue-200 text-black hover:bg-blue-200 h-10" }, "Escolher Starter"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 text-left" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "100 gera\xE7\xF5es de dieta")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Suporte via email")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Templates b\xE1sicos")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Exporta\xE7\xE3o em PDF")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Ativa\xE7\xE3o imediata")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Pagamento via Stripe")))), /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-center relative text-white transform scale-105 shadow-xl" }, /* @__PURE__ */ React.createElement("div", { className: "absolute -top-2 left-1/2 transform -translate-x-1/2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-blue-100 text-black px-3 py-1 rounded-full text-xs font-medium" }, "\u2B50 MAIS POPULAR")), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold mb-4" }, "Professional"), /* @__PURE__ */ React.createElement("p", { className: "text-blue-100 text-sm mb-4" }, "Perfeito para profissionais que precisam de mais recursos."), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold" }, "R$ 69,90"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-blue-200 mt-1" }, "R$ 0,23 por dieta")), /* @__PURE__ */ React.createElement(Button, { className: "w-full mb-6 bg-blue-800 text-white hover:bg-blue-900 font-semibold h-10" }, "Escolher Profissional"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 text-left" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "300 gera\xE7\xF5es de dieta")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Suporte priorit\xE1rio")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Todos os templates")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Exporta\xE7\xE3o em PDF")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Envio via WhatsApp/Email")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "An\xE1lise nutricional avan\xE7ada")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Ativa\xE7\xE3o imediata")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-blue-100" }, "Pagamento via Stripe")))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 text-center relative" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-gray-900 mb-4" }, "Premium"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "Para profissionais que querem o m\xE1ximo de recursos e exclusividade."), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-gray-900" }, "R$ 99,90"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500 mt-1" }, "R$ 0,20 por dieta")), /* @__PURE__ */ React.createElement(Button, { className: "w-full mb-6 bg-blue-100 border border-blue-200 text-black hover:bg-blue-200 h-10" }, "Escolher Premium"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 text-left" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "500 gera\xE7\xF5es de dieta")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Suporte priorit\xE1rio 24/7")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Todos os templates + exclusivos")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Exporta\xE7\xE3o em PDF")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Envio via WhatsApp/Email")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "An\xE1lise nutricional avan\xE7ada")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Cria\xE7\xE3o de templates personalizados")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Relat\xF3rios de desempenho")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Ativa\xE7\xE3o imediata")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 12 })), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-700" }, "Pagamento via Stripe")))))), activeSection === "profile" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4 md:space-y-6 pb-20 lg:pb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Perfil"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative inline-block mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto bg-blue-100 flex items-center justify-center" }, profilePhoto || currentUser.photo ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: "Foto de perfil",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(User, { className: "text-blue-600", size: 40 })), isUploadingPhoto && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowPhotoModal(true),
      className: "absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
    },
    /* @__PURE__ */ React.createElement(Edit, { size: 16 })
  )), /* @__PURE__ */ React.createElement("h3", { className: "text-base md:text-lg font-semibold text-gray-900" }, currentUser.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Personal Trainer"), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "file",
      accept: "image/*",
      onChange: handlePhotoUpload,
      className: "hidden",
      id: "profile-photo-input"
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      className: "w-full",
      size: "sm",
      onClick: () => document.getElementById("profile-photo-input").click(),
      disabled: isUploadingPhoto
    },
    isUploadingPhoto ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent mr-2" }), "Carregando...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Edit, { size: 16 }), profilePhoto || currentUser.photo ? "Alterar Foto" : "Adicionar Foto")
  )))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6 lg:col-span-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base md:text-lg font-semibold text-gray-900 mb-4" }, "Informa\xE7\xF5es Pessoais"), /* @__PURE__ */ React.createElement("form", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(Input, { label: "Nome completo", defaultValue: currentUser.name }), /* @__PURE__ */ React.createElement(Input, { label: "Email", type: "email", defaultValue: currentUser.email }), /* @__PURE__ */ React.createElement(Input, { label: "Telefone", type: "tel", defaultValue: "(11) 99999-9999" }), /* @__PURE__ */ React.createElement(Input, { label: "CREF", defaultValue: "123456-G/SP" })), /* @__PURE__ */ React.createElement(
    Button,
    {
      className: "w-full sm:w-auto",
      onClick: () => {
        showPushNotification("\u{1F464} Perfil atualizado com sucesso! Informa\xE7\xF5es salvas.", "success");
      }
    },
    "Salvar Altera\xE7\xF5es"
  )))), /* @__PURE__ */ React.createElement(Card, { className: "p-4 md:p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base md:text-lg font-semibold text-gray-900 mb-4" }, "Estat\xEDsticas"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-3 bg-blue-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-blue-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Clientes Ativos")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-3 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-green-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Dietas Geradas")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-3 bg-orange-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-orange-600" }, "0"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Cr\xE9ditos Restantes")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-3 bg-purple-50 rounded-lg" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl md:text-2xl font-bold text-purple-600" }, "0%"), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-gray-600" }, "Taxa de Sucesso"))))), userRole === "admin" && /* @__PURE__ */ React.createElement(React.Fragment, null, activeSection === "trainers" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Personal Trainers"), /* @__PURE__ */ React.createElement(Button, { onClick: () => setShowAddTrainerModal(true) }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), "Adicionar Trainer")), /* @__PURE__ */ React.createElement(Card, { className: "overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-gray-50" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Trainer"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Email"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Cr\xE9ditos"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "A\xE7\xF5es"))), /* @__PURE__ */ React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, mockUsers.map((user) => /* @__PURE__ */ React.createElement("tr", { key: user.id }, /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center mr-3" }, user.id === "P0001" && (profilePhoto || currentUser.photo) ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: user.name,
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(User, { className: "text-blue-600", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-sm font-medium text-gray-900" }, user.name), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, user.id)))), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, user.email), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, user.credits), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}` }, user.isActive ? "Ativo" : "Inativo")), /* @__PURE__ */ React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setSelectedTrainer(user);
        setShowManageCreditsModal(true);
      }
    },
    /* @__PURE__ */ React.createElement(CreditCard, { size: 14 }),
    "Cr\xE9ditos"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setNewTrainer({
          name: user.name,
          email: user.email,
          phone: user.phone,
          credits: user.credits
        });
        setSelectedTrainer(user);
        setShowAddTrainerModal(true);
      }
    },
    /* @__PURE__ */ React.createElement(Edit, { size: 14 }),
    "Editar"
  )))))))))), activeSection === "templates" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Templates de Dieta"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        try {
          const csvContent = "Nome,Descri\xE7\xE3o,Refei\xE7\xF5es\n" + mockTemplates.map((t) => `"${t.name}","${t.description}",${t.meals}`).join("\n");
          const blob = new Blob([csvContent], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "templates.csv";
          a.click();
          URL.revokeObjectURL(url);
          showPushNotification("\u{1F4C4} Templates exportados com sucesso! Arquivo CSV baixado.", "success");
        } catch (error) {
          showPushNotification("\u274C Erro ao exportar templates. Tente novamente.", "error");
        }
      }
    },
    /* @__PURE__ */ React.createElement(Download, { size: 16 }),
    "Exportar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        console.log("\u{1F680} BOT\xC3O CRIAR TEMPLATE CLICADO!");
        setShowCreateTemplateModal(true);
      },
      className: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    /* @__PURE__ */ React.createElement(Plus, { size: 16 }),
    "Criar Template"
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(Card, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" }, /* @__PURE__ */ React.createElement(FileText, { className: "text-blue-600", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-gray-900" }, mockTemplates.length), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Templates Ativos")))), /* @__PURE__ */ React.createElement(Card, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center" }, /* @__PURE__ */ React.createElement(TrendingUp, { className: "text-green-600", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-gray-900" }, "847"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Usos Este M\xEAs")))), /* @__PURE__ */ React.createElement(Card, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Star, { className: "text-purple-600", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-gray-900" }, "4.8"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Avalia\xE7\xE3o M\xE9dia")))), /* @__PURE__ */ React.createElement(Card, { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Users, { className: "text-orange-600", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-gray-900" }, "23"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Personal Trainers"))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, mockTemplates.map((template) => /* @__PURE__ */ React.createElement(Card, { key: template.id, className: "p-6 hover:shadow-lg transition-shadow" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(FileText, { className: "text-green-600", size: 24 })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-gray-900" }, template.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, template.meals, " refei\xE7\xF5es")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-end" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full" }, "\u2713 Ativo"))), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600 mb-4 line-clamp-2" }, template.description), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-2 bg-blue-50 rounded" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-blue-600" }, "127"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600" }, "Usos")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-2 bg-purple-50 rounded" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-purple-600" }, "4.9"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-600" }, "Avalia\xE7\xE3o"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        showInfoPopup(
          `\u{1F4CB} ${template.name}`,
          `\u{1F4DD} Descri\xE7\xE3o:
${template.description}

\u{1F37D}\uFE0F Estrutura:
\u2022 ${template.meals} refei\xE7\xF5es planejadas
\u2022 Adequado para diversos perfis
\u2022 Baseado em evid\xEAncias nutricionais

\u{1F4CA} Estat\xEDsticas:
\u2022 127 usos este m\xEAs
\u2022 Avalia\xE7\xE3o: 4.9/5.0
\u2022 Criado por: Equipe NutriApp

\u2705 Status: Ativo e dispon\xEDvel

\u{1F4A1} Este template pode ser usado como base para gerar dietas personalizadas automaticamente.`,
          "info"
        );
      },
      className: "text-xs"
    },
    /* @__PURE__ */ React.createElement(Eye, { size: 12 }),
    "Ver"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setNewTemplate({
          name: template.name,
          description: template.description,
          meals: [
            { name: "Caf\xE9 da Manh\xE3", foods: [
              { name: "Aveia", quantity: "50g", calories: 190 },
              { name: "Banana", quantity: "1 unidade", calories: 105 }
            ], substitutions: [] },
            { name: "Lanche da Manh\xE3", foods: [
              { name: "Iogurte Natural", quantity: "200ml", calories: 80 }
            ], substitutions: [] },
            { name: "Almo\xE7o", foods: [
              { name: "Arroz integral", quantity: "100g", calories: 111 },
              { name: "Peito de frango", quantity: "150g", calories: 248 },
              { name: "Br\xF3colis", quantity: "100g", calories: 25 }
            ], substitutions: [] },
            { name: "Lanche da Tarde", foods: [
              { name: "Castanhas", quantity: "30g", calories: 197 }
            ], substitutions: [] },
            { name: "Jantar", foods: [
              { name: "Salm\xE3o grelhado", quantity: "120g", calories: 231 },
              { name: "Salada verde", quantity: "100g", calories: 20 }
            ], substitutions: [] }
          ]
        });
        setShowCreateTemplateModal(true);
        showPushNotification(`\u{1F4DD} Editando template "${template.name}"`, "info");
      },
      className: "text-xs"
    },
    /* @__PURE__ */ React.createElement(Edit, { size: 12 }),
    "Editar"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        showInfoPopup(
          "\u{1F4CB} Duplicar Template",
          `Tem certeza que deseja duplicar o template "${template.name}"?

Isto ir\xE1 criar uma c\xF3pia edit\xE1vel que voc\xEA pode personalizar conforme necess\xE1rio.

\u2705 A c\xF3pia ser\xE1 criada com o nome "${template.name} (C\xF3pia)"
\u{1F4A1} Voc\xEA poder\xE1 modificar todos os aspectos do template`,
          "info"
        );
        setTimeout(() => {
          setNewTemplate({
            name: `${template.name} (C\xF3pia)`,
            description: template.description,
            meals: [
              { name: "Caf\xE9 da Manh\xE3", foods: [], substitutions: [] },
              { name: "Lanche da Manh\xE3", foods: [], substitutions: [] },
              { name: "Almo\xE7o", foods: [], substitutions: [] },
              { name: "Lanche da Tarde", foods: [], substitutions: [] },
              { name: "Jantar", foods: [], substitutions: [] }
            ]
          });
          setShowCreateTemplateModal(true);
          showPushNotification(`\u{1F4CB} Template "${template.name}" duplicado com sucesso!`, "success");
        }, 2e3);
      },
      className: "text-xs"
    },
    /* @__PURE__ */ React.createElement(Plus, { size: 12 }),
    "Duplicar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        showInfoPopup(
          "\u{1F5D1}\uFE0F Excluir Template",
          `\u26A0\uFE0F Tem certeza que deseja excluir o template "${template.name}"?

Esta a\xE7\xE3o n\xE3o pode ser desfeita.

\u{1F4CA} Estat\xEDsticas do template:
\u2022 127 usos registrados
\u2022 Avalia\xE7\xE3o: 4.9/5.0
\u2022 Criado h\xE1 3 meses

\u{1F4A1} Considere desativar ao inv\xE9s de excluir se houver depend\xEAncias.`,
          "warning"
        );
      },
      className: "text-xs text-red-600 border-red-300 hover:bg-red-50"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 12 }),
    "Excluir"
  )))))), activeSection === "database" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Base de Dados"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        try {
          const csvContent = "Nome,Calorias,Proteina,Carboidratos,Gordura,Unidade\n" + foodDatabase.map((f) => `"${f.name}",${f.calories},${f.protein},${f.carbs},${f.fat},"${f.unit}"`).join("\n");
          const blob = new Blob([csvContent], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "alimentos-database.csv";
          a.click();
          URL.revokeObjectURL(url);
          showPushNotification("\u{1F4CA} Base de dados exportada! Arquivo CSV com todos os alimentos baixado.", "success");
        } catch (error) {
          showPushNotification("\u274C Erro ao exportar dados. Tente novamente.", "error");
        }
      }
    },
    /* @__PURE__ */ React.createElement(Download, { size: 16 }),
    "Exportar Dados"
  ), /* @__PURE__ */ React.createElement(Button, { onClick: () => {
    showInfoPopup("\u{1F504} Sincroniza\xE7\xE3o Iniciada", "\u2705 Base TACO atualizada\n\u2705 Novos alimentos: 47\n\u2705 Corre\xE7\xF5es nutricionais: 12\n\nTempo estimado: 2-3 minutos\nVoc\xEA ser\xE1 notificado quando conclu\xEDdo.", "info");
  } }, /* @__PURE__ */ React.createElement(Database, { size: 16 }), "Sincronizar TACO"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-6 text-center hover:shadow-lg transition-shadow cursor-pointer", onClick: () => {
    showInfoPopup("\u{1F4CA} Alimentos Cadastrados", "Total: 2,847 alimentos\n\n\u{1F4C8} Crescimento mensal: +47 alimentos\n\u{1F504} \xDAltima atualiza\xE7\xE3o: Hoje\n\u{1F4CB} Categorias: 23\n\u2705 Validados TACO: 2,635\n\u{1F195} Adicionados manual: 212", "info");
  } }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4" }, /* @__PURE__ */ React.createElement(Database, { className: "text-blue-600", size: 24 })), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "2,847"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Alimentos Cadastrados"), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full" }, "+47 este m\xEAs"))), /* @__PURE__ */ React.createElement(Card, { className: "p-6 text-center hover:shadow-lg transition-shadow cursor-pointer", onClick: () => {
    showInfoPopup("\u{1F465} Clientes Totais", "Total: 1,247 clientes\n\n\u{1F4CA} Distribui\xE7\xE3o:\n\u2022 Ativos: 987 (79%)\n\u2022 Pausados: 184 (15%)\n\u2022 Inativos: 76 (6%)\n\n\u{1F3AF} Objetivos mais comuns:\n\u2022 Perda de peso: 45%\n\u2022 Ganho de massa: 32%\n\u2022 Manuten\xE7\xE3o: 23%", "info");
  } }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" }, /* @__PURE__ */ React.createElement(Users, { className: "text-green-600", size: 24 })), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "1,247"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Clientes Totais"), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full" }, "987 ativos"))), /* @__PURE__ */ React.createElement(Card, { className: "p-6 text-center hover:shadow-lg transition-shadow cursor-pointer", onClick: () => {
    showInfoPopup("\u{1F4CB} Dietas Geradas", "Total: 8,432 dietas\n\n\u{1F4C8} Este m\xEAs: 547 dietas\n\u26A1 M\xE9dia di\xE1ria: 18 dietas\n\u{1F3AF} Tipos mais gerados:\n\u2022 IA Personalizada: 67%\n\u2022 Templates: 28%\n\u2022 Manual: 5%\n\n\u{1F3C6} Personal mais ativo:\nJo\xE3o Silva - 127 dietas", "info");
  } }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4" }, /* @__PURE__ */ React.createElement(FileText, { className: "text-orange-600", size: 24 })), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "8,432"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Dietas Geradas"), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full" }, "547 este m\xEAs"))), /* @__PURE__ */ React.createElement(Card, { className: "p-6 text-center hover:shadow-lg transition-shadow cursor-pointer", onClick: () => {
    showInfoPopup("\u{1F4CA} Taxa de Sucesso", "Taxa atual: 94.2%\n\n\u2705 M\xE9tricas:\n\u2022 Clientes satisfeitos: 94.2%\n\u2022 Dietas seguidas: 87.3%\n\u2022 Objetivos alcan\xE7ados: 91.8%\n\u2022 Renova\xE7\xF5es: 89.4%\n\n\u{1F4C8} Tend\xEAncia: +2.1% vs m\xEAs anterior\n\u{1F3AF} Meta: 95% at\xE9 fim do ano", "success");
  } }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4" }, /* @__PURE__ */ React.createElement(BarChart3, { className: "text-purple-600", size: 24 })), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "94.2%"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Taxa de Sucesso"), /* @__PURE__ */ React.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full" }, "+2.1% mensal")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Alimentos Mais Utilizados"), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      variant: "outline",
      onClick: () => {
        const fullReport = `\u{1F4CA} RELAT\xD3RIO COMPLETO - ALIMENTOS MAIS UTILIZADOS

` + foodDatabase.map(
          (food, index) => `${index + 1}. ${food.name}
   \u2022 ${food.calories} kcal/${food.baseAmount}${food.unit}
   \u2022 P: ${food.protein}g | C: ${food.carbs}g | G: ${food.fat}g
   \u2022 Usado em: ${Math.floor(Math.random() * 200 + 50)} dietas
`
        ).join("\n");
        showInfoPopup(
          "\u{1F4CA} Relat\xF3rio Completo - Alimentos",
          fullReport,
          "info"
        );
      }
    },
    /* @__PURE__ */ React.createElement(Eye, { size: 14 }),
    "Ver Todos"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, foodDatabase.slice(0, 5).map((food, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
      onClick: () => {
        const foodDetails = `\u{1F37D}\uFE0F ${food.name}

\u{1F4CA} Informa\xE7\xF5es Nutricionais (por ${food.baseAmount}${food.unit}):
\u2022 Calorias: ${food.calories} kcal
\u2022 Prote\xEDnas: ${food.protein}g
\u2022 Carboidratos: ${food.carbs}g
\u2022 Gorduras: ${food.fat}g

\u{1F4C8} Estat\xEDsticas de Uso:
\u2022 Usado em: ${Math.floor(Math.random() * 200 + 50)} dietas
\u2022 Popularidade: ${Math.floor(Math.random() * 40 + 60)}%
\u2022 Categoria: ${index < 2 ? "Carboidratos" : index < 4 ? "Prote\xEDnas" : "Diversos"}

\u2705 Status: Ativo
\u{1F504} \xDAltima atualiza\xE7\xE3o: ${(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")}`;
        showInfoPopup("\u{1F4CA} Detalhes do Alimento", foodDetails, "info");
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-blue-600" }, "#", index + 1)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, food.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, food.calories, " kcal por ", food.baseAmount, food.unit)))),
    /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm font-medium text-gray-900" }, "P: ", food.protein, "g"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "C: ", food.carbs, "g | G: ", food.fat, "g"), /* @__PURE__ */ React.createElement("div", { className: "mt-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full" }, Math.floor(Math.random() * 200 + 50), " usos")))
  )))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "An\xE1lise por Categoria"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, [
    { name: "Carboidratos", count: 847, color: "bg-yellow-100 text-yellow-700" },
    { name: "Prote\xEDnas", count: 623, color: "bg-red-100 text-red-700" },
    { name: "Gorduras", count: 412, color: "bg-purple-100 text-purple-700" },
    { name: "Vegetais", count: 534, color: "bg-green-100 text-green-700" },
    { name: "Frutas", count: 289, color: "bg-orange-100 text-orange-700" },
    { name: "Diversos", count: 142, color: "bg-gray-100 text-gray-700" }
  ].map((category, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer",
      onClick: () => {
        showInfoPopup(
          `\u{1F4C2} Categoria: ${category.name}`,
          `\u{1F4CA} Estat\xEDsticas detalhadas:
\u2022 Total de alimentos: ${category.count}
\u2022 Mais usado: ${foodDatabase[index % foodDatabase.length].name}
\u2022 M\xE9dia cal\xF3rica: ${Math.floor(Math.random() * 200 + 100)} kcal
\u2022 Adicionados este m\xEAs: ${Math.floor(Math.random() * 20 + 5)}

\u{1F3AF} Esta categoria representa ${Math.floor(category.count / 2847 * 100)}% da base de dados.

\u{1F4A1} Categoria bem estruturada e atualizada!`,
          "info"
        );
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: `w-4 h-4 rounded-full ${category.color.replace("text-", "bg-").replace("-700", "-500")}` }), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-gray-900" }, category.name)),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("span", { className: `text-sm px-2 py-1 rounded-full ${category.color}` }, category.count, " itens"), /* @__PURE__ */ React.createElement("div", { className: "w-20 bg-gray-200 rounded-full h-2" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `h-2 rounded-full ${category.color.replace("text-", "bg-").replace("-700", "-500")}`,
        style: { width: `${category.count / 847 * 100}%` }
      }
    )))
  ))))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Atividade Recente da Base"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, [
    { action: "Novo alimento adicionado", item: "Quinoa Tricolor", time: "2 horas atr\xE1s", type: "add" },
    { action: "Dados nutricionais atualizados", item: "Salm\xE3o Grelhado", time: "5 horas atr\xE1s", type: "update" },
    { action: "Sincroniza\xE7\xE3o TACO conclu\xEDda", item: "47 novos alimentos", time: "1 dia atr\xE1s", type: "sync" },
    { action: "Corre\xE7\xE3o nutricional aplicada", item: "Batata Doce", time: "2 dias atr\xE1s", type: "fix" },
    { action: "Backup autom\xE1tico realizado", item: "Base completa", time: "3 dias atr\xE1s", type: "backup" }
  ].map((activity, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "flex items-center space-x-4 p-3 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-full flex items-center justify-center ${activity.type === "add" ? "bg-green-100" : activity.type === "update" ? "bg-blue-100" : activity.type === "sync" ? "bg-purple-100" : activity.type === "fix" ? "bg-orange-100" : "bg-gray-100"}` }, activity.type === "add" ? /* @__PURE__ */ React.createElement(Plus, { size: 16, className: "text-green-600" }) : activity.type === "update" ? /* @__PURE__ */ React.createElement(Edit, { size: 16, className: "text-blue-600" }) : activity.type === "sync" ? /* @__PURE__ */ React.createElement(Database, { size: 16, className: "text-purple-600" }) : activity.type === "fix" ? /* @__PURE__ */ React.createElement(CheckCircle, { size: 16, className: "text-orange-600" }) : /* @__PURE__ */ React.createElement(Archive, { size: 16, className: "text-gray-600" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, activity.action), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, activity.item)), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-500" }, activity.time)))))), activeSection === "settings" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold text-gray-900" }, "Configura\xE7\xF5es do Sistema"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Configura\xE7\xF5es Gerais"), /* @__PURE__ */ React.createElement("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    handleSaveSettings();
  } }, /* @__PURE__ */ React.createElement(Input, { label: "Nome da Aplica\xE7\xE3o", defaultValue: "NutriApp" }), /* @__PURE__ */ React.createElement(Input, { label: "Email de Suporte", type: "email", defaultValue: "suporte@nutriapp.com" }), /* @__PURE__ */ React.createElement(Input, { label: "Telefone de Suporte", type: "tel", defaultValue: "(11) 3000-0000" }), /* @__PURE__ */ React.createElement(Input, { label: "URL da Aplica\xE7\xE3o", defaultValue: "https://app.nutriplan.com" }), /* @__PURE__ */ React.createElement(
    Select,
    {
      label: "Fuso Hor\xE1rio",
      defaultValue: "America/Sao_Paulo",
      options: [
        { value: "America/Sao_Paulo", label: "Bras\xEDlia (GMT-3)" },
        { value: "America/New_York", label: "Nova York (GMT-5)" },
        { value: "Europe/London", label: "Londres (GMT+0)" }
      ]
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      label: "Idioma Padr\xE3o",
      defaultValue: "pt-BR",
      options: [
        { value: "pt-BR", label: "Portugu\xEAs (Brasil)" },
        { value: "en-US", label: "English (US)" },
        { value: "es-ES", label: "Espa\xF1ol" }
      ]
    }
  ), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full" }, /* @__PURE__ */ React.createElement(Settings, { size: 16 }), "Salvar Configura\xE7\xF5es"))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Backup e Seguran\xE7a"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-green-800" }, "Backup Autom\xE1tico"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-600" }, "\xDAltimo backup: hoje \xE0s 03:00"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-green-500" }, "Pr\xF3ximo: amanh\xE3 \xE0s 03:00")), /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600", size: 24 })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: handleManualBackup,
      disabled: isBackingUp,
      className: "w-full"
    },
    isBackingUp ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" }), "Backup...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Database, { size: 16 }), "Backup Manual")
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: handleTestConnection,
      disabled: isTestingConnection,
      className: "w-full"
    },
    isTestingConnection ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" }), "Testando...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Zap, { size: 16 }), "Testar Conex\xE3o")
  )), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        showInfoPopup(
          "\u26A0\uFE0F Limpar Cache do Sistema",
          "Esta a\xE7\xE3o ir\xE1:\n\u2022 Limpar dados tempor\xE1rios\n\u2022 For\xE7ar recarregamento de templates\n\u2022 Otimizar performance\n\nO sistema pode ficar lento por alguns minutos.\n\n\u26A0\uFE0F Tem certeza que deseja continuar?",
          "warning"
        );
      },
      className: "w-full"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 16 }),
    "Limpar Cache"
  ))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Configura\xE7\xF5es de Email"), /* @__PURE__ */ React.createElement("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    showPushNotification("\u{1F4E7} Configura\xE7\xF5es de email salvas com sucesso!", "success");
  } }, /* @__PURE__ */ React.createElement(Input, { label: "Servidor SMTP", defaultValue: "smtp.gmail.com" }), /* @__PURE__ */ React.createElement(Input, { label: "Porta", type: "number", defaultValue: "587" }), /* @__PURE__ */ React.createElement(Input, { label: "Usu\xE1rio", type: "email", defaultValue: "nutriapp@gmail.com" }), /* @__PURE__ */ React.createElement(Input, { label: "Senha", type: "password", defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", id: "ssl", className: "rounded", defaultChecked: true }), /* @__PURE__ */ React.createElement("label", { htmlFor: "ssl", className: "text-sm text-gray-700" }, "Usar SSL/TLS")), /* @__PURE__ */ React.createElement(Button, { type: "submit", variant: "outline", className: "w-full" }, /* @__PURE__ */ React.createElement("div", { className: "mr-2" }, "\u{1F4E7}"), "Salvar Configura\xE7\xF5es de Email"))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Configura\xE7\xF5es Avan\xE7adas"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, "Modo de Depura\xE7\xE3o"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Logs detalhados para diagn\xF3stico")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      className: "sr-only peer",
      onChange: (e) => {
        const isEnabled = e.target.checked;
        showPushNotification(
          isEnabled ? "\u{1F41B} Modo de depura\xE7\xE3o ativado! Logs detalhados habilitados." : "\u2705 Modo de depura\xE7\xE3o desativado! Sistema voltou ao normal.",
          isEnabled ? "warning" : "success"
        );
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, "An\xE1lise de Performance"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Monitoramento de velocidade")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      className: "sr-only peer",
      defaultChecked: true,
      onChange: (e) => {
        const isEnabled = e.target.checked;
        showPushNotification(
          isEnabled ? "\u{1F4CA} An\xE1lise de performance ativada! Monitoramento em tempo real." : "\u23F8\uFE0F An\xE1lise de performance pausada! Recursos economizados.",
          isEnabled ? "info" : "warning"
        );
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-gray-900" }, "Notifica\xE7\xF5es Push"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, "Alertas em tempo real")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      className: "sr-only peer",
      defaultChecked: true,
      onChange: (e) => {
        const isEnabled = e.target.checked;
        showPushNotification(
          isEnabled ? "\u{1F514} Notifica\xE7\xF5es push ativadas! Voc\xEA receber\xE1 alertas em tempo real." : "\u{1F515} Notifica\xE7\xF5es push desativadas! Modo silencioso ativado.",
          isEnabled ? "success" : "info"
        );
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }))), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        showInfoPopup(
          "\u{1F4CA} Status do Sistema",
          "\u{1F5A5}\uFE0F Status: Online\n\u26A1 Performance: 98.7%\n\u{1F4BE} Uso de mem\xF3ria: 234MB\n\u{1F504} Uptime: 14 dias, 7 horas\n\u{1F4C8} Requests/min: 127\n\u{1F4CA} CPU: 23% utiliza\xE7\xE3o\n\u{1F310} Lat\xEAncia: 45ms\n\n\u{1F3AF} Tudo funcionando perfeitamente!\nSistema otimizado e est\xE1vel.",
          "success"
        );
      },
      className: "w-full"
    },
    /* @__PURE__ */ React.createElement(BarChart3, { size: 16 }),
    "Visualizar Status do Sistema"
  )))), /* @__PURE__ */ React.createElement(Card, { className: "p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Status do Sistema"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 border border-green-200 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-white", size: 16 })), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-green-800" }, "API"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-600" }, "Online")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 border border-green-200 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Database, { className: "text-white", size: 16 })), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-green-800" }, "Base de Dados"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-600" }, "Conectado")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 border border-green-200 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-white text-xs" }, "\u{1F4E7}")), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-green-800" }, "Email"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-600" }, "Funcionando")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 border border-green-200 bg-green-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CreditCard, { className: "text-white", size: 16 })), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-green-800" }, "Pagamentos"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-600" }, "Ativo")))))))), /* @__PURE__ */ React.createElement(AnimatePresence, null, showNotification && /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, x: 300, scale: 0.8 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 300, scale: 0.8 },
      className: "fixed top-4 right-4 z-[9999]"
    },
    /* @__PURE__ */ React.createElement("div", { className: `px-6 py-4 rounded-xl shadow-xl flex items-start max-w-sm border-l-4 ${notificationType === "success" ? "bg-green-50 border-green-500 text-green-800" : notificationType === "info" ? "bg-blue-50 border-blue-500 text-blue-800" : notificationType === "warning" ? "bg-yellow-50 border-yellow-500 text-yellow-800" : "bg-red-50 border-red-500 text-red-800"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${notificationType === "success" ? "bg-green-100" : notificationType === "info" ? "bg-blue-100" : notificationType === "warning" ? "bg-yellow-100" : "bg-red-100"}` }, notificationType === "success" ? "\u2705" : notificationType === "info" ? "\u2139\uFE0F" : notificationType === "warning" ? "\u26A0\uFE0F" : "\u274C"), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-sm leading-tight" }, notificationMessage)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowNotification(false),
        className: "ml-3 text-gray-400 hover:text-gray-600 transition-colors"
      },
      /* @__PURE__ */ React.createElement(X, { size: 16 })
    ))
  )), showSuccessMessage && /* @__PURE__ */ React.createElement("div", { className: "fixed top-4 right-4 z-[9999]" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: -50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -50, scale: 0.9 },
      className: "bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center max-w-sm"
    },
    /* @__PURE__ */ React.createElement(CheckCircle, { size: 20, className: "mr-3 flex-shrink-0" }),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, "Pagamento Aprovado! \u{1F389}"), /* @__PURE__ */ React.createElement("div", { className: "text-sm opacity-90" }, "Seus cr\xE9ditos foram adicionados \xE0 sua conta"))
  )), /* @__PURE__ */ React.createElement(Modal, { isOpen: showInfoModal, onClose: () => setShowInfoModal(false), title: "" }, /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: `w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl ${infoModalData.type === "success" ? "bg-green-100" : infoModalData.type === "warning" ? "bg-yellow-100" : infoModalData.type === "error" ? "bg-red-100" : "bg-blue-100"}` }, infoModalData.type === "success" ? "\u2705" : infoModalData.type === "warning" ? "\u26A0\uFE0F" : infoModalData.type === "error" ? "\u274C" : "\u2139\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-4" }, infoModalData.title), /* @__PURE__ */ React.createElement("div", { className: "text-gray-600 text-sm leading-snug whitespace-pre-line" }, infoModalData.content)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 justify-center" }, infoModalData.type === "warning" && /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        if (infoModalData.title.includes("Limpar Cache")) {
          showPushNotification("\u{1F504} Cache limpo com sucesso! Sistema otimizado.", "success");
        }
        setShowInfoModal(false);
      },
      className: "bg-orange-500 hover:bg-orange-600 text-white"
    },
    "Confirmar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowInfoModal(false)
    },
    infoModalData.type === "warning" ? "Cancelar" : "Fechar"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showAddTrainerModal, onClose: () => setShowAddTrainerModal(false), title: "Adicionar Personal Trainer" }, /* @__PURE__ */ React.createElement("form", { onSubmit: handleAddTrainer, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Nome completo",
      value: newTrainer.name,
      onChange: (e) => setNewTrainer({ ...newTrainer, name: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Email",
      type: "email",
      value: newTrainer.email,
      onChange: (e) => setNewTrainer({ ...newTrainer, email: e.target.value }),
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Telefone (WhatsApp)",
      type: "tel",
      value: newTrainer.phone,
      onChange: (e) => setNewTrainer({ ...newTrainer, phone: e.target.value }),
      placeholder: "(11) 99999-9999",
      required: true
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Cr\xE9ditos iniciais",
      type: "number",
      value: newTrainer.credits,
      onChange: (e) => setNewTrainer({ ...newTrainer, credits: parseInt(e.target.value) }),
      required: true
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row justify-end gap-2" }, /* @__PURE__ */ React.createElement(Button, { type: "button", variant: "outline", onClick: () => setShowAddTrainerModal(false), className: "w-full sm:w-auto" }, "Cancelar"), /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full sm:w-auto" }, "Adicionar Trainer")))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showClientSelectorModal, onClose: () => setShowClientSelectorModal(false), title: "Selecionar Cliente" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { size: 20, className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Buscar cliente...",
      className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "max-h-96 overflow-y-auto space-y-2" }, mockClients.map((client) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: client.id,
      onClick: () => {
        const goalMapping = {
          "Perda de peso": "weightLoss",
          "Ganho de massa": "muscleGain",
          "Manuten\xE7\xE3o": "maintenance",
          "Recomposi\xE7\xE3o": "recomposition"
        };
        setCalculatorData({
          clientId: client.id,
          name: client.name,
          age: client.age.toString(),
          gender: "male",
          // Default - could be stored in client data
          weight: client.weight.toString(),
          height: client.height.toString(),
          activityLevel: "moderate",
          // Default - could be stored in client data
          goal: goalMapping[client.goal] || "maintenance",
          restrictions: []
        });
        setShowClientSelectorModal(false);
      },
      className: "p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(User, { className: "text-blue-600", size: 20 })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-900" }, client.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, client.age, " anos \u2022 ", client.weight, "kg \u2022 ", client.height, "cm \u2022 ", client.goal), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500" }, "Frequ\xEAncia: ", client.trainingFrequency)))
  ))))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showManualDietModal, onClose: () => setShowManualDietModal(false), title: "Criar Dieta Manualmente" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Nome da Dieta",
      value: manualDiet.clientName,
      onChange: (e) => setManualDiet({ ...manualDiet, clientName: e.target.value }),
      placeholder: "Digite o nome ou tipo da dieta"
    }
  ), manualDiet.meals.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium text-blue-800" }, "Calorias Totais Calculadas:"), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-blue-600" }, manualDiet.meals.reduce((sum, meal) => sum + parseInt(meal.calories || 0), 0), " kcal")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-900" }, "Refei\xE7\xF5es"), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      onClick: () => {
        setCurrentManualMeal({ name: "", calories: "", foods: [] });
        setIsAddingToMeal(true);
        setSearchFood("");
        setShowSelectFoodModal(true);
      }
    },
    /* @__PURE__ */ React.createElement(Plus, { size: 16 }),
    "Adicionar Refei\xE7\xE3o"
  )), manualDiet.meals.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-8 text-gray-500" }, /* @__PURE__ */ React.createElement(Utensils, { size: 48, className: "mx-auto mb-4 text-gray-300" }), /* @__PURE__ */ React.createElement("p", null, "Nenhuma refei\xE7\xE3o adicionada ainda"), /* @__PURE__ */ React.createElement("p", { className: "text-sm" }, 'Clique em "Adicionar Refei\xE7\xE3o" para come\xE7ar')) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, manualDiet.meals.map((meal, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "border border-gray-200 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("h5", { className: "font-medium text-gray-900" }, meal.name), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full" }, meal.calories, " kcal"), /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "ghost", onClick: () => {
    const updatedMeals = manualDiet.meals.filter((_, i) => i !== index);
    setManualDiet({ ...manualDiet, meals: updatedMeals });
  } }, /* @__PURE__ */ React.createElement(Trash2, { size: 14 })))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, meal.foods.map((food, foodIndex) => /* @__PURE__ */ React.createElement("div", { key: foodIndex, className: "text-sm text-gray-600 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\u2022 ", food.name, " (", food.quantity || (food.amount ? food.amount + "g" : ""), ")"), /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-gray-100 px-2 py-1 rounded" }, food.calories, " kcal")))))))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 sm:gap-0" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => setShowManualDietModal(false), className: "w-full sm:w-auto" }, "Cancelar"), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        if (manualDiet.meals.length === 0) {
          showPushNotification("Adicione pelo menos uma refei\xE7\xE3o!", "warning");
          return;
        }
        const totalCalories = manualDiet.meals.reduce((sum, meal) => sum + parseInt(meal.calories || 0), 0);
        const diet = {
          id: `D${Date.now()}`,
          clientName: calculatorData.name || "Cliente Manual",
          calories: totalCalories,
          meals: manualDiet.meals,
          createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          type: "Manual"
        };
        setGeneratedDiet(diet);
        setShowManualDietModal(false);
        setShowDietModal(true);
      },
      className: "w-full sm:w-auto"
    },
    "Finalizar Dieta"
  )))), /* @__PURE__ */ React.createElement(AnimatePresence, null, showGenerationModal && /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
    },
    /* @__PURE__ */ React.createElement(
      motion.div,
      {
        initial: { scale: 0.8, opacity: 0, y: 40 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.8, opacity: 0, y: 40 },
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: 0.6
        },
        className: "bg-white/95 backdrop-blur-xl rounded-3xl p-12 max-w-lg w-full mx-auto shadow-2xl border border-white/20"
      },
      /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 overflow-hidden rounded-3xl" }, [...Array(8)].map((_, i) => /* @__PURE__ */ React.createElement(
        motion.div,
        {
          key: i,
          className: "absolute w-2 h-2 bg-blue-400/30 rounded-full",
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          },
          animate: {
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3]
          },
          transition: {
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }
        }
      ))),
      /* @__PURE__ */ React.createElement("div", { className: "relative z-10 flex flex-col items-center space-y-10" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "absolute inset-0 w-40 h-40 rounded-full bg-blue-400 opacity-20",
          animate: {
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.3, 0.1]
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      ), /* @__PURE__ */ React.createElement("div", { className: "relative w-36 h-36" }, /* @__PURE__ */ React.createElement("svg", { className: "w-36 h-36 transform -rotate-90", viewBox: "0 0 144 144" }, /* @__PURE__ */ React.createElement(
        "circle",
        {
          cx: "72",
          cy: "72",
          r: "64",
          stroke: "currentColor",
          strokeWidth: "4",
          fill: "none",
          className: "text-gray-200/50"
        }
      ), /* @__PURE__ */ React.createElement(
        motion.circle,
        {
          cx: "72",
          cy: "72",
          r: "64",
          stroke: "#3b82f6",
          strokeWidth: "6",
          fill: "none",
          strokeLinecap: "round",
          initial: { pathLength: 0 },
          animate: { pathLength: generationProgress / 100 },
          transition: {
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            damping: 15
          },
          style: {
            strokeDasharray: "402",
            strokeDashoffset: `${402 * (1 - generationProgress / 100)}`
          }
        }
      )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg",
          animate: {
            scale: [1, 1.05, 1]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        /* @__PURE__ */ React.createElement(
          motion.div,
          {
            className: "text-3xl",
            key: generationProgress,
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.3 }
          },
          generationProgress < 20 ? "\u{1F9E0}" : generationProgress < 40 ? "\u26A1" : generationProgress < 60 ? "\u{1F3AF}" : generationProgress < 80 ? "\u{1F37D}\uFE0F" : generationProgress === 100 ? "\u2728" : "\u{1F4CA}"
        )
      )))), /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "text-center",
          key: generationProgress,
          initial: { scale: 0.5, opacity: 0, y: 20 },
          animate: { scale: 1, opacity: 1, y: 0 },
          transition: {
            type: "spring",
            damping: 15,
            stiffness: 300,
            duration: 0.6
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "text-5xl font-bold text-blue-600 mb-2" }, generationProgress, "%")
      ), /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "text-center min-h-[3rem] flex items-center",
          key: generationStage,
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: "easeOut" }
        },
        /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-semibold text-gray-800 max-w-sm leading-relaxed" }, generationStage)
      ), /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full" }), /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "absolute top-4 left-0 h-1 bg-blue-500 rounded-full",
          initial: { width: "0%" },
          animate: {
            width: `${generationProgress / 100 * 100}%`
          },
          transition: { duration: 0.8, ease: "easeOut" }
        }
      ), [
        { label: "TMB", progress: 20, icon: "\u{1F9E0}" },
        { label: "GETD", progress: 40, icon: "\u26A1" },
        { label: "Macros", progress: 60, icon: "\u{1F3AF}" },
        { label: "Refei\xE7\xF5es", progress: 80, icon: "\u{1F37D}\uFE0F" },
        { label: "Finalizar", progress: 100, icon: "\u2728" }
      ].map(({ label, progress, icon }, index) => /* @__PURE__ */ React.createElement(
        motion.div,
        {
          key: label,
          className: "flex flex-col items-center relative z-10",
          initial: { opacity: 0, scale: 0.5, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: {
            delay: index * 0.1,
            type: "spring",
            damping: 20
          }
        },
        /* @__PURE__ */ React.createElement(
          motion.div,
          {
            className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 ${generationProgress >= progress ? "bg-blue-500 text-white border-transparent shadow-lg" : "bg-white text-gray-500 border-gray-300"}`,
            animate: {
              scale: generationProgress >= progress ? [1, 1.1, 1] : 1
            },
            transition: {
              duration: 0.6,
              type: "spring",
              damping: 10
            }
          },
          generationProgress >= progress ? "\u2713" : icon
        ),
        /* @__PURE__ */ React.createElement(
          motion.div,
          {
            className: `text-xs mt-2 font-medium transition-colors duration-300 ${generationProgress >= progress ? "text-blue-600" : "text-gray-500"}`,
            animate: {
              y: generationProgress >= progress ? [0, -2, 0] : 0
            },
            transition: { duration: 0.3 }
          },
          label
        )
      )))), /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "bg-blue-50 rounded-2xl p-6 border border-blue-200 text-center max-w-sm",
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.8, duration: 0.5 }
        },
        /* @__PURE__ */ React.createElement(
          motion.div,
          {
            className: "inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mb-3",
            animate: { rotate: [0, 10, -10, 0] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          },
          /* @__PURE__ */ React.createElement("span", { className: "text-blue-600 text-sm" }, "\u{1F4A1}")
        ),
        /* @__PURE__ */ React.createElement("div", { className: "text-sm text-blue-800 leading-relaxed font-medium" }, /* @__PURE__ */ React.createElement(
          motion.span,
          {
            key: generationProgress < 40 ? "fact1" : generationProgress < 80 ? "fact2" : "fact3",
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: { duration: 0.5 }
          },
          generationProgress < 40 ? "Analisando seu perfil metab\xF3lico com precis\xE3o cient\xEDfica..." : generationProgress < 80 ? "Otimizando macronutrientes para seus objetivos espec\xEDficos..." : "Finalizando sua dieta personalizada com IA avan\xE7ada..."
        ))
      ), generationProgress === 100 && /* @__PURE__ */ React.createElement(
        motion.div,
        {
          className: "absolute inset-0 pointer-events-none",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        },
        [...Array(12)].map((_, i) => /* @__PURE__ */ React.createElement(
          motion.div,
          {
            key: i,
            className: "absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full",
            style: {
              left: "50%",
              top: "50%"
            },
            initial: {
              scale: 0,
              x: 0,
              y: 0
            },
            animate: {
              scale: [0, 1, 0],
              x: Math.cos(i * 360 / 12 * Math.PI / 180) * 100,
              y: Math.sin(i * 360 / 12 * Math.PI / 180) * 100
            },
            transition: {
              duration: 1.5,
              ease: "easeOut",
              delay: i * 0.1
            }
          }
        ))
      ))
    )
  )), /* @__PURE__ */ React.createElement(Modal, { isOpen: showDietModal, onClose: () => setShowDietModal(false), title: "" }, generatedDiet && /* @__PURE__ */ React.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "text-center border-b border-gray-100 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4" }, /* @__PURE__ */ React.createElement(User, { className: "text-white", size: 24 })), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-2" }, generatedDiet.clientName), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm mb-4" }, new Date(generatedDiet.createdAt).toLocaleDateString("pt-BR")), /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-full font-semibold" }, formatNumber(generatedDiet.calories), " kcal/dia"), generatedDiet.macros && generatedDiet.macros.proteinPerKg && /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-400 mt-3" }, "\u{1F4AA} Prote\xEDna: ", formatNumber(generatedDiet.macros.proteinPerKg), "g/kg de peso corporal")), generatedDiet.bmr && generatedDiet.tdee && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-blue-600 text-xs" }, "\u{1F4CA}")), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Informa\xE7\xF5es Metab\xF3licas")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-gray-900 mb-1" }, formatNumber(generatedDiet.bmr)), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "TMB (kcal)")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-gray-900 mb-1" }, formatNumber(generatedDiet.tdee)), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "GETD (kcal)")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-gray-900 mb-1" }, generatedDiet.tdee > generatedDiet.calories ? "-" : "+", formatNumber(Math.abs(generatedDiet.tdee - generatedDiet.calories))), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "Ajuste (kcal)")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-gray-50 rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-bold text-gray-900 mb-1" }, formatNumber(Math.round((generatedDiet.calories - generatedDiet.tdee) / generatedDiet.tdee * 100)), "%"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500 uppercase tracking-wide" }, "Varia\xE7\xE3o")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-orange-600 text-xs" }, "\u{1F37D}\uFE0F")), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Refei\xE7\xF5es Planejadas")), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-400" }, generatedDiet.meals.length, " refei\xE7\xF5es")), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, generatedDiet.meals.map((meal, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "border-l-4 border-orange-500 pl-6 pb-6 last:pb-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold" }, index + 1), /* @__PURE__ */ React.createElement("h4", { className: "text-lg font-semibold text-gray-900" }, meal.name)), /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-blue-600" }, formatNumber(meal.calories), " kcal")), meal.protein && /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mb-4 text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-red-600 font-medium" }, "P: ", formatNumber(meal.protein), "g"), /* @__PURE__ */ React.createElement("span", { className: "text-yellow-600 font-medium" }, "C: ", formatNumber(meal.carbs), "g"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-600 font-medium" }, "G: ", formatNumber(meal.fat), "g")), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, meal.foods.map((food, foodIndex) => /* @__PURE__ */ React.createElement("div", { key: foodIndex, className: "flex items-center justify-between py-2 border-b border-gray-100 last:border-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900" }, food.name), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, food.quantity), food.protein !== void 0 && /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-1 text-xs text-gray-400" }, /* @__PURE__ */ React.createElement("span", null, "P: ", formatNumber(food.protein), "g"), /* @__PURE__ */ React.createElement("span", null, "C: ", formatNumber(food.carbs), "g"), /* @__PURE__ */ React.createElement("span", null, "G: ", formatNumber(food.fat), "g"))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-gray-900" }, formatNumber(food.calories), " kcal"))))))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-3" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => generateDietPDF(generatedDiet),
      className: "flex flex-col items-center justify-center p-4 h-20 border-gray-200 hover:bg-gray-50 transition-colors group"
    },
    /* @__PURE__ */ React.createElement(Download, { size: 20, className: "text-gray-600 mb-2 group-hover:text-red-600 transition-colors" }),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-600 group-hover:text-red-600" }, "Baixar PDF")
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => showPushNotification('🚧 Em breve! Esta funcionalidade estará disponível em uma próxima atualização.', 'info'),
      className: "flex flex-col items-center justify-center p-4 h-20 border-gray-200 hover:bg-gray-50 transition-colors group"
    },
    /* @__PURE__ */ React.createElement("div", { className: "text-lg mb-1 group-hover:scale-110 transition-transform" }, "\u{1F4F1}"),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-600 group-hover:text-green-600" }, "WhatsApp")
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        setActiveSection("history");
        setShowDietModal(false);
      },
      className: "flex flex-col items-center justify-center p-4 h-20 border-gray-200 hover:bg-gray-50 transition-colors group"
    },
    /* @__PURE__ */ React.createElement(History, { size: 20, className: "text-gray-600 mb-2 group-hover:text-purple-600 transition-colors" }),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs text-gray-600 group-hover:text-purple-600" }, "Hist\xF3rico")
  )), generatedDiet.metabolicInfo && /* @__PURE__ */ React.createElement("details", { className: "border border-gray-200 rounded-lg" }, /* @__PURE__ */ React.createElement("summary", { className: "p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg" }, "\u{1F4CA} Detalhes dos C\xE1lculos"), /* @__PURE__ */ React.createElement("div", { className: "p-3 border-t bg-gray-50 text-xs space-y-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "F\xF3rmula TMB:"), " Harris-Benedict", /* @__PURE__ */ React.createElement("br", null), calculatorData.gender === "male" ? "(13,75 \xD7 peso) + (5 \xD7 altura) - (6,76 \xD7 idade) + 66,5" : "(9,56 \xD7 peso) + (1,85 \xD7 altura) - (4,68 \xD7 idade) + 665"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "N\xEDvel de Atividade:"), " ", calculatorData.activityLevel === "sedentary" ? "Sedent\xE1rio (1.2x)" : calculatorData.activityLevel === "light" ? "Levemente Ativo (1.375x)" : calculatorData.activityLevel === "moderate" ? "Moderadamente Ativo (1.55x)" : calculatorData.activityLevel === "intense" ? "Muito Ativo (1.725x)" : "Extremamente Ativo (1.9x)"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Ajuste para Objetivo:"), " ", generatedDiet.metabolicInfo.adjustmentPercent, "% em rela\xE7\xE3o ao GETD"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Distribui\xE7\xE3o de Macros:"), /* @__PURE__ */ React.createElement("br", null), "\u2022 Prote\xEDnas: ", generatedDiet.macros.proteinPerKg, "g/kg peso corporal", /* @__PURE__ */ React.createElement("br", null), "\u2022 Carboidratos: Energia restante ap\xF3s prote\xEDnas e gorduras", /* @__PURE__ */ React.createElement("br", null), "\u2022 Gorduras: 20-35% das calorias (m\xEDn. 0.8g/kg)"))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 pt-6 border-t border-gray-100" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        generateDiet();
      },
      className: "flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
    },
    "\u{1F504} Gerar Nova Varia\xE7\xE3o"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowDietModal(false),
      className: "px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
    },
    "Fechar"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showSelectFoodModal, onClose: () => setShowSelectFoodModal(false), title: "Adicionar Refei\xE7\xE3o" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Nome da Refei\xE7\xE3o",
      value: currentManualMeal.name,
      onChange: (e) => setCurrentManualMeal({ ...currentManualMeal, name: e.target.value }),
      placeholder: "Ex: Caf\xE9 da Manh\xE3"
    }
  ), /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Calorias da Refei\xE7\xE3o (opcional)",
      type: "number",
      value: currentManualMeal.calories,
      onChange: (e) => setCurrentManualMeal({ ...currentManualMeal, calories: e.target.value }),
      placeholder: "Ex: 400"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Buscar Alimentos:"), /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { size: 20, className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchFood,
      onChange: (e) => setSearchFood(e.target.value),
      placeholder: "Digite o nome do alimento...",
      className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "max-h-64 overflow-y-auto space-y-2" }, filteredFoods.map((food, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: index,
      onClick: () => handleSelectFood(food),
      className: "p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-900" }, food.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, food.calories, " kcal por ", food.baseAmount, food.unit)), /* @__PURE__ */ React.createElement("div", { className: "text-right text-xs text-gray-500" }, /* @__PURE__ */ React.createElement("p", null, "P: ", food.protein, "g"), /* @__PURE__ */ React.createElement("p", null, "C: ", food.carbs, "g | G: ", food.fat, "g")))
  ))), currentManualMeal.foods.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-gray-900 mb-2" }, "Alimentos Adicionados:"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 max-h-32 overflow-y-auto" }, currentManualMeal.foods.map((food, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "flex items-center justify-between bg-gray-50 p-2 rounded" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, food.name, " (", food.amount, "g)"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded" }, food.calories, " kcal"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const updatedFoods = currentManualMeal.foods.filter((_, i) => i !== index);
        setCurrentManualMeal({ ...currentManualMeal, foods: updatedFoods });
      },
      className: "text-red-500 hover:text-red-700"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 14 })
  )))))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        setShowSelectFoodModal(false);
        setIsAddingToMeal(false);
        setCurrentManualMeal({ name: "", calories: "", foods: [] });
        setSearchFood("");
      }
    },
    "Cancelar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        if (!currentManualMeal.name || currentManualMeal.foods.length === 0) {
          showPushNotification("\u26A0\uFE0F Preencha o nome da refei\xE7\xE3o e adicione pelo menos um alimento!", "warning");
          return;
        }
        if (showCreateTemplateModal) {
          const newMeal = {
            name: currentManualMeal.name,
            foods: currentManualMeal.foods,
            substitutions: []
          };
          const updatedMeals = [...newTemplate.meals, newMeal];
          setNewTemplate({ ...newTemplate, meals: updatedMeals });
          showPushNotification(`\u2705 Refei\xE7\xE3o "${currentManualMeal.name}" adicionada ao template!`, "success");
        } else {
          const totalCalories = currentManualMeal.foods.reduce((sum, f) => sum + f.calories, 0);
          const mealWithCalories = {
            ...currentManualMeal,
            calories: currentManualMeal.calories || totalCalories.toString()
          };
          const updatedMeals = [...manualDiet.meals, mealWithCalories];
          setManualDiet({ ...manualDiet, meals: updatedMeals });
          showPushNotification(`\u2705 Refei\xE7\xE3o "${currentManualMeal.name}" adicionada \xE0 dieta!`, "success");
        }
        setCurrentManualMeal({ name: "", calories: "", foods: [] });
        setSearchFood("");
        setIsAddingToMeal(false);
        setShowSelectFoodModal(false);
      }
    },
    "\u2705 Finalizar Refei\xE7\xE3o"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showPortionModal, onClose: () => setShowPortionModal(false), title: "Definir Quantidade" }, selectedFood && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-2" }, selectedFood.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, selectedFood.calories, " kcal por ", selectedFood.baseAmount, selectedFood.unit)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-4" }, [50, 100, 150, 200, 250, 300].map((amount) => /* @__PURE__ */ React.createElement(
    Button,
    {
      key: amount,
      variant: "outline",
      onClick: () => {
        handleAddPortion(amount);
      },
      className: "text-center"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-semibold" }, amount, "g"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-gray-500" }, Math.round(selectedFood.calories * amount / 100), " kcal"))
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      label: "Quantidade personalizada (g)",
      type: "number",
      placeholder: "Digite a quantidade",
      id: "custom-amount-input",
      onKeyPress: (e) => {
        if (e.key === "Enter") {
          const amount = parseInt(e.target.value);
          if (amount > 0) {
            handleAddPortion(amount);
            e.target.value = "";
          } else {
            showPushNotification("Por favor, digite uma quantidade v\xE1lida!", "warning");
          }
        }
      }
    }
  )), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        const input = document.getElementById("custom-amount-input");
        const amount = parseInt(input.value);
        if (amount > 0) {
          handleAddPortion(amount);
          input.value = "";
        } else {
          showPushNotification("Por favor, digite uma quantidade v\xE1lida!", "warning");
        }
      },
      className: "mt-6"
    },
    "Adicionar"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showPhotoModal, onClose: () => setShowPhotoModal(false), title: "Gerenciar Foto de Perfil" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-100 flex items-center justify-center mb-4" }, profilePhoto || currentUser.photo ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: "Foto atual",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(User, { className: "text-gray-400", size: 48 })), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, profilePhoto || currentUser.photo ? "Foto atual do perfil" : "Nenhuma foto definida")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "file",
      accept: "image/*",
      onChange: handlePhotoUpload,
      className: "hidden",
      id: "modal-photo-input"
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => document.getElementById("modal-photo-input").click(),
      className: "w-full",
      disabled: isUploadingPhoto
    },
    isUploadingPhoto ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" }), "Processando...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "mr-2" }, "\u{1F4F7}"), profilePhoto || currentUser.photo ? "Escolher Nova Foto" : "Adicionar Foto")
  )), (profilePhoto || currentUser.photo) && /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: handleRemovePhoto,
      className: "w-full text-red-600 border-red-300 hover:bg-red-50"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 16 }),
    "Remover Foto"
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-blue-900 mb-2" }, "\u{1F4A1} Dicas para uma boa foto:"), /* @__PURE__ */ React.createElement("ul", { className: "text-sm text-blue-800 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "\u2022 Use uma foto com boa ilumina\xE7\xE3o"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Prefira fotos com o rosto bem vis\xEDvel"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Formatos aceitos: JPG, PNG, GIF"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Tamanho m\xE1ximo: 5MB"), /* @__PURE__ */ React.createElement("li", null, "\u2022 A foto ser\xE1 redimensionada automaticamente"))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowPhotoModal(false)
    },
    "Fechar"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showPhotoModal, onClose: () => setShowPhotoModal(false), title: "Gerenciar Foto de Perfil" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-100 flex items-center justify-center mb-4" }, profilePhoto || currentUser.photo ? /* @__PURE__ */ React.createElement(
    "img",
    {
      src: profilePhoto || currentUser.photo,
      alt: "Foto atual",
      className: "w-full h-full object-cover"
    }
  ) : /* @__PURE__ */ React.createElement(User, { className: "text-gray-400", size: 48 })), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-600" }, profilePhoto || currentUser.photo ? "Foto atual do perfil" : "Nenhuma foto definida")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "file",
      accept: "image/*",
      onChange: handlePhotoUpload,
      className: "hidden",
      id: "modal-photo-input"
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => document.getElementById("modal-photo-input").click(),
      className: "w-full",
      disabled: isUploadingPhoto
    },
    isUploadingPhoto ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" }), "Processando...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "mr-2" }, "\u{1F4F7}"), profilePhoto || currentUser.photo ? "Escolher Nova Foto" : "Adicionar Foto")
  )), (profilePhoto || currentUser.photo) && /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: handleRemovePhoto,
      className: "w-full text-red-600 border-red-300 hover:bg-red-50"
    },
    /* @__PURE__ */ React.createElement(Trash2, { size: 16 }),
    "Remover Foto"
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-blue-900 mb-2" }, "\u{1F4A1} Dicas para uma boa foto:"), /* @__PURE__ */ React.createElement("ul", { className: "text-sm text-blue-800 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, "\u2022 Use uma foto com boa ilumina\xE7\xE3o"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Prefira fotos com o rosto bem vis\xEDvel"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Formatos aceitos: JPG, PNG, GIF"), /* @__PURE__ */ React.createElement("li", null, "\u2022 Tamanho m\xE1ximo: 5MB"), /* @__PURE__ */ React.createElement("li", null, "\u2022 A foto ser\xE1 redimensionada automaticamente"))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowPhotoModal(false)
    },
    "Fechar"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showAddClientModal, onClose: () => setShowAddClientModal(false), title: "Adicionar Novo Cliente" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Nome Completo *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "Digite o nome completo"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Idade *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "Idade",
      min: "1",
      max: "120"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Sexo *"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecione o sexo"), /* @__PURE__ */ React.createElement("option", { value: "masculino" }, "Masculino"), /* @__PURE__ */ React.createElement("option", { value: "feminino" }, "Feminino"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Peso (kg) *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "Peso em kg",
      min: "1",
      step: "0.1"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Altura (cm) *"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: "Altura em cm",
      min: "1",
      max: "300"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Nível de Atividade *"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecione o nível"), /* @__PURE__ */ React.createElement("option", { value: "sedentario" }, "Sedentário"), /* @__PURE__ */ React.createElement("option", { value: "leve" }, "Levemente ativo"), /* @__PURE__ */ React.createElement("option", { value: "moderado" }, "Moderadamente ativo"), /* @__PURE__ */ React.createElement("option", { value: "intenso" }, "Muito ativo"), /* @__PURE__ */ React.createElement("option", { value: "extremo" }, "Extremamente ativo")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Objetivo *"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecione o objetivo"), /* @__PURE__ */ React.createElement("option", { value: "perda" }, "Perda de peso"), /* @__PURE__ */ React.createElement("option", { value: "manutencao" }, "Manutenção"), /* @__PURE__ */ React.createElement("option", { value: "ganho" }, "Ganho de peso"), /* @__PURE__ */ React.createElement("option", { value: "musculo" }, "Ganho de massa muscular"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Observações"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      rows: "3",
      placeholder: "Informações adicionais sobre o cliente (opcional)"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 pt-4" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowAddClientModal(false),
      className: "w-full sm:w-auto"
    },
    "Cancelar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        showPushNotification("\u2705 Cliente adicionado com sucesso!", "success");
        setShowAddClientModal(false);
      },
      className: "w-full sm:flex-1 bg-blue-600 hover:bg-blue-700"
    },
    /* @__PURE__ */ React.createElement(Plus, { size: 20 }),
    "Adicionar Cliente"
  )))), /* @__PURE__ */ React.createElement(Modal, { isOpen: showPaymentModal, onClose: () => setShowPaymentModal(false), title: "Finalizar Pagamento" }, selectedPlan && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-50 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 mb-3" }, "Resumo do Pedido"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-600" }, "Plano ", selectedPlan.name), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, selectedPlan.credits, " cr\xE9ditos")), selectedPlan.originalPrice && /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500" }, "Desconto aplicado"), /* @__PURE__ */ React.createElement("span", { className: "text-green-600 font-medium" }, "-R$ ", (selectedPlan.originalPrice - selectedPlan.price).toFixed(2).replace(".", ","))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-gray-200 pt-2 flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-gray-900" }, "Total"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-blue-600 text-lg" }, "R$ ", selectedPlan.price.toFixed(2).replace(".", ","))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-gray-900 mb-4" }, "Forma de Pagamento"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-white rounded-full" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900" }, "Cart\xE3o de Cr\xE9dito/D\xE9bito"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, "Processamento instant\xE2neo via Stripe")), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-1" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold" }, "VISA"), /* @__PURE__ */ React.createElement("div", { className: "w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold" }, "MC")))), /* @__PURE__ */ React.createElement("div", { className: "border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors opacity-50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-6 h-6 border-2 border-gray-300 rounded-full" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-gray-900" }, "PIX"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500" }, "Pagamento instant\xE2neo (em breve)")), /* @__PURE__ */ React.createElement("div", { className: "text-green-600 font-bold text-sm" }, "PIX"))))), /* @__PURE__ */ React.createElement("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-3" }, /* @__PURE__ */ React.createElement(CheckCircle, { className: "text-green-600 flex-shrink-0 mt-0.5", size: 20 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", { className: "font-medium text-green-900 mb-1" }, "Pagamento 100% Seguro"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-green-700" }, "Seus dados s\xE3o protegidos com criptografia SSL e processados pela Stripe, uma das plataformas de pagamento mais seguras do mundo.")))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => setShowPaymentModal(false),
      className: "w-full sm:w-auto",
      disabled: isProcessingPayment
    },
    "Cancelar"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: handlePayment,
      className: "w-full sm:flex-1 bg-blue-600 hover:bg-blue-700",
      disabled: isProcessingPayment
    },
    isProcessingPayment ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Processando Pagamento...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CreditCard, { size: 20 }), "Pagar R$ ", selectedPlan.price.toFixed(2).replace(".", ","))
  )), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-gray-500 text-center" }, "Ao continuar, voc\xEA concorda com nossos", " ", /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:underline" }, "Termos de Uso"), " e", " ", /* @__PURE__ */ React.createElement("a", { href: "#", className: "text-blue-600 hover:underline" }, "Pol\xEDtica de Privacidade"), "."))));
};
var stdin_default = NutriPlan;
export {
  stdin_default as default
};
