import React from 'react';

const BatteryMonitor = ({ drones }) => {
  const getBatteryColor = (percentage) => {
    if (percentage > 70) return '#10b981';
    if (percentage > 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      margin: '2rem 0',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <img src="/emojis/bateria.gif" alt="Bateria" style={{ width: '24px', height: '24px' }} />
        <h3>Status da Bateria</h3>
      </div>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {drones.map(drone => (
          <div key={drone.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/emojis/drone.gif" alt="Drone" style={{ width: '20px', height: '20px' }} />
              <div>
                <strong>Drone #{drone.id}</strong>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  Status: {drone.status}
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: getBatteryColor(drone.battery) }}>
                <img src="/emojis/bateria.gif" alt="Bateria" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
                {drone.battery}%
              </div>
              <div style={{
                width: '60px',
                height: '6px',
                background: '#e5e7eb',
                borderRadius: '3px',
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${drone.battery}%`,
                  height: '100%',
                  background: getBatteryColor(drone.battery),
                  borderRadius: '3px'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatteryMonitor;