export const customStyles = `
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
  
  .shimmer {
    animation: shimmer 2s infinite;
  }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
  
  .glow {
    animation: glow 2s ease-in-out infinite alternate;
  }
  
  .fall {
    animation: fall 3s ease-in-out infinite;
  }
  
  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .gradient-shift {
    animation: gradient-shift 4s ease-in-out infinite;
  }
`; 