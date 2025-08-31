# 🚁 Drone Delivery System

Sistema inteligente de gerenciamento e simulação de entregas por drones com interface moderna e funcionalidades avançadas.

![Dashboard](docs/Demonstrativo.mp4)

## ✨ Funcionalidades

- **🎯 Gestão Inteligente de Frotas**: Cadastro e monitoramento de drones com capacidades personalizadas
- **📦 Sistema de Pedidos Prioritários**: Entregas classificadas por urgência (alta, média, baixa)
- **🔋 Monitoramento de Bateria**: Controle em tempo real da autonomia dos drones
- **🔄 Simulação de Rotas**: Algoritmo otimizado para menor número de viagens
- **📊 Dashboard Interativo**: Visualização completa de métricas e desempenho
- **🎨 Interface Moderna**: Design responsivo com emojis animados

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Estilização**: Styled Components
- **Ícones**: Emojis animados (GIF/PNG)
- **Build Tool**: Vite
- **Desenvolvimento**: JavaScript ES6+

🎮 Como Usar
Adicione Drones: Configure a frota com capacidade e alcance

Cadastre Pedidos: Defina localização, peso e prioridade

Simule Entregas: Execute a otimização de rotas

Monitore Resultados: Acompanhe métricas e desempenho

Exemplo de Uso
javascript
// Adicionar um drone
Sistema.addDrone(5, 50); // 5kg de capacidade, 50km de alcance

// Adicionar um pedido
Sistema.addOrder({ x: 10, y: 5 }, 2.0, 'alta');

;

🏗️ Estrutura do Projeto
text
src/
├── components/          # Componentes React
│   ├── Dashboard/      # Painel de controle
│   ├── DroneManager/   # Gerenciamento de drones
│   ├── OrderManager/   # Gestão de pedidos
│   ├── Simulation/     # Simulação de entregas
│   └── BatteryMonitor/ # Monitor de bateria
├── utils/              # Utilitários e classes
│   └── dataStructures.js # Sistema principal
└── styles.js           # Estilos e temas
🎨 Componentes Principais
Drone Class
javascript
class Drone {
  constructor(id, capacity, distance) {
    this.id = id;
    this.maxCapacity = capacity;
    this.maxDistance = distance;
    this.battery = 100;
    this.status = 'disponível';
  }
}
Order Class
javascript
class Order {
  constructor(id, location, weight, priority) {
    this.id = id;
    this.location = location;
    this.weight = weight;
    this.priority = priority; // alta, média, baixa
  }
}
⚡ Scripts Disponíveis
bash
npm run dev      # Modo desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Análise de código
📊 Métricas de Desempenho
Taxa de Entrega: Eficiência geral do sistema

Utilização de Frota: Otimização de recursos

Tempo Médio: Velocidade das entregas

Consumo de Bateria: Autonomia dos drones


🤝 Contribuição
Faça o fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Autor
Matheus Braga - Seu GitHub

🙋‍♂️ Suporte
Para dúvidas ou sugestões, abra uma issue no GitHub.

Desenvolvido com ❤️ para o processo seletivo de estágio

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/drone-delivery-system.git

# Entre no diretório
cd drone-delivery-system

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
