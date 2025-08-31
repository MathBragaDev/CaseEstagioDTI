import React, { useState } from 'react';
import { DeliverySystem } from './utils/dataStructures';
import Dashboard from './components/Dashboard/Dashboard';
import DroneManager from './components/DroneManager/DroneManager';
import OrderManager from './components/OrderManager/OrderManager';
import Simulation from './components/Simulation/Simulation';
import BatteryMonitor from './components/BatteryMonitor/BatteryMonitor';
import {
  Container,
  Header,
  Sidebar,
  Main,
  TabButton,
  Button
} from './styles';

function App() {
  const [deliverySystem] = useState(new DeliverySystem());
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [refresh, setRefresh] = useState(0);

  const refreshApp = () => setRefresh(prev => prev + 1);

  const addSampleData = () => {
    deliverySystem.drones = [];
    deliverySystem.orders = [];
    deliverySystem.undeliveredOrders = [];

    deliverySystem.addDrone(5, 50);
    deliverySystem.addDrone(3, 30);
    deliverySystem.addDrone(7, 70);

    deliverySystem.addOrder({ x: 10, y: 5 }, 2.0, 'alta');
    deliverySystem.addOrder({ x: 15, y: 8 }, 1.5, 'média');
    deliverySystem.addOrder({ x: 5, y: 12 }, 0.8, 'alta');
    deliverySystem.addOrder({ x: 20, y: 3 }, 2.5, 'baixa');
    deliverySystem.addOrder({ x: 8, y: 15 }, 1.2, 'média');

    refreshApp();
  };

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/emojis/dti.png" alt="Drone" style={{ width: '32px', height: '32px' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
              Drone Delivery
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Sistema de Entregas por Drones
            </p>
          </div>
        </div>
        <Button 
          onClick={addSampleData}
          variant="primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <img src="/emojis/camera-drone.png" alt="Dados" style={{ width: '20px', height: '20px' }} />
          Dados de Exemplo
        </Button>
      </Header>
      
      <Sidebar>
        <nav>
          <TabButton 
            active={selectedTab === 'dashboard'} 
            onClick={() => setSelectedTab('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img 
              src="/emojis/dashboard.gif" 
              alt="Painel" 
              style={{ 
                width: '24px', 
                height: '24px',
                filter: selectedTab === 'dashboard' ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
            Painel de Controle
          </TabButton>
          
          <TabButton 
            active={selectedTab === 'drones'} 
            onClick={() => setSelectedTab('drones')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img 
              src="/emojis/drone.gif" 
              alt="Drones" 
              style={{ 
                width: '24px', 
                height: '24px',
                filter: selectedTab === 'drones' ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
            Frota de Drones
          </TabButton>
          
          <TabButton 
            active={selectedTab === 'orders'} 
            onClick={() => setSelectedTab('orders')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img 
              src="/emojis/package.gif" 
              alt="Pedidos" 
              style={{ 
                width: '24px', 
                height: '24px',
                filter: selectedTab === 'orders' ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
            Gestão de Pedidos
          </TabButton>
          
          <TabButton 
            active={selectedTab === 'simulation'} 
            onClick={() => setSelectedTab('simulation')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img 
              src="/emojis/simulation.gif" 
              alt="Simulação" 
              style={{ 
                width: '24px', 
                height: '24px',
                filter: selectedTab === 'simulation' ? 'brightness(0) invert(1)' : 'none'
              }} 
            />
            Simulação de Rotas
          </TabButton>
        </nav>
      </Sidebar>

      <Main>
        {selectedTab === 'dashboard' && (
          <>
            <Dashboard system={deliverySystem} />
            <BatteryMonitor drones={deliverySystem.drones} />
          </>
        )}
        {selectedTab === 'drones' && (
          <DroneManager system={deliverySystem} onUpdate={refreshApp} />
        )}
        {selectedTab === 'orders' && (
          <OrderManager system={deliverySystem} onUpdate={refreshApp} />
        )}
        {selectedTab === 'simulation' && (
          <Simulation system={deliverySystem} onUpdate={refreshApp} />
        )}
      </Main>
    </Container>
  );
}

export default App;