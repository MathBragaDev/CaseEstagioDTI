import React, { useState } from 'react';
import {
  Button,
  Results,
  TripCard
} from '../../styles';

const Simulation = ({ system, onUpdate }) => {
  const [simulationResults, setSimulationResults] = useState(null);

  const runSimulation = () => {
    const results = system.simulateDelivery();
    setSimulationResults(results);
    onUpdate();
  };

  const resetSimulation = () => {
    system.orders.forEach(order => {
      order.status = 'pending';
      order.assignedDrone = null;
    });
    system.undeliveredOrders = [...system.orders];
    system.drones.forEach(drone => drone.reset());
    setSimulationResults(null);
    onUpdate();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <img src="/emojis/caminhao-rota.gif" alt="Simulação" style={{ width: '32px', height: '32px' }} />
        <h2 style={{ margin: 0 }}>Simulação de Rotas</h2>
      </div>
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <Button variant="primary" onClick={runSimulation} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
          <img src="/emojis/caminhao-rota.gif" alt="Executar" style={{ width: '20px', height: '20px' }} />
          Executar Simulação
        </Button>
        <Button variant="success" onClick={resetSimulation} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px auto' }}>
          <img src="/emojis/reset.gif" alt="Reiniciar" style={{ width: '20px', height: '20px' }} />
          Reiniciar Simulação
        </Button>
      </div>

      {simulationResults && (
        <Results>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <img src="/emojis/camera-drone.png" alt="Resultados" style={{ width: '20px', height: '20px' }} />
            <h3>Resultados da Simulação</h3>
          </div>
          <p>
            <strong>Total de Viagens:</strong> {simulationResults.length}
          </p>
          <p>
            <strong>Pedidos Pendentes:</strong> {system.undeliveredOrders.length}
          </p>

          {simulationResults.map((trip, index) => (
            <TripCard key={trip.tripNumber}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <img src="/emojis/caminhao-rota.gif" alt="Viagem" style={{ width: '20px', height: '20px' }} />
                <h4>Viagem #{trip.tripNumber}</h4>
              </div>
              {trip.drones.map(drone => (
                <div key={drone.droneId} style={{ margin: '10px 0', padding: '10px', background: '#f1f3f4', borderRadius: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <img src="/emojis/drone.gif" alt="Drone" style={{ width: '18px', height: '18px' }} />
                    <strong>Drone #{drone.droneId}</strong>
                  </div>
                  Peso Total: {drone.totalWeight.toFixed(2)}kg
                  <br />
                  Distância Total: {drone.totalDistance.toFixed(2)}km
                  <br />
                  Pedidos: {drone.orders.length}
                  <ul>
                    {drone.orders.map(order => (
                      <li key={order.id}>
                        Pedido #{order.id} - {order.weight}kg - {order.priority}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TripCard>
          ))}
        </Results>
      )}

      {!simulationResults && system.undeliveredOrders.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img src="/emojis/espera.gif" alt="Aguardando" style={{ width: '40px', height: '40px', marginBottom: '10px' }} />
          <p>📦 {system.undeliveredOrders.length} pedidos aguardando entrega</p>
          <p>🚁 {system.drones.length} drones disponíveis</p>
        </div>
      )}
    </div>
  );
};

export default Simulation;