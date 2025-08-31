import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DroneList,
  DroneItem
} from '../../styles';

const DroneManager = ({ system, onUpdate }) => {
  const [capacity, setCapacity] = useState('');
  const [distance, setDistance] = useState('');

  const handleAddDrone = (e) => {
    e.preventDefault();
    if (capacity && distance) {
      system.addDrone(parseFloat(capacity), parseFloat(distance));
      setCapacity('');
      setDistance('');
      onUpdate();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <img src="/emojis/drone.gif" alt="Drones" style={{ width: '32px', height: '32px' }} />
        <h2 style={{ margin: 0 }}>Frota de Drones</h2>
      </div>
      
      <Form onSubmit={handleAddDrone}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <img src="/emojis/camera-drone.png" alt="Adicionar" style={{ width: '20px', height: '20px' }} />
          <h3>Adicionar Novo Drone</h3>
        </div>
        <Input
          type="number"
          placeholder="Capacidade máxima (kg)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          step="0.1"
          min="0.1"
          required
        />
        <Input
          type="number"
          placeholder="Distância máxima (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          step="0.1"
          min="0.1"
          required
        />
        <Button type="submit" variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/emojis/camera-drone.png" alt="Adicionar" style={{ width: '16px', height: '16px' }} />
          Adicionar Drone
        </Button>
      </Form>

      <DroneList>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <img src="/emojis/camera-drone.png" alt="Lista" style={{ width: '20px', height: '20px' }} />
          <h3>Frota de Drones</h3>
        </div>
        {system.drones.length === 0 ? (
          <p>Nenhum drone cadastrado.</p>
        ) : (
          system.drones.map(drone => (
            <DroneItem key={drone.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/emojis/drone.gif" alt="Drone" style={{ width: '24px', height: '24px' }} />
                <div>
                  <strong>Drone #{drone.id}</strong>
                  <br />
                  Capacidade: {drone.maxCapacity}kg
                  <br />
                  Distância: {drone.maxDistance}km
                </div>
              </div>
            </DroneItem>
          ))
        )}
      </DroneList>
    </div>
  );
};

export default DroneManager;