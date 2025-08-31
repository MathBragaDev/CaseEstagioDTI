import React from 'react';
import {
  DashboardContainer,
  StatCard,
  StatValue,
  StatLabel,
  colors,
  Badge,
  ProgressBar,
  ProgressFill
} from '../../styles';

const Dashboard = ({ system }) => {
  const stats = system.getStats();

  const getStatusColor = (status) => {
    switch(status) {
      case 'disponível': return 'success';
      case 'entregando': return 'warning';
      case 'recarregando': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.8rem', 
          fontWeight: '800',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
           Painel de Controle
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Badge variant="success">{stats.totalDrones} Drones</Badge>
          <Badge variant="primary">{stats.totalOrders} Pedidos</Badge>
          <Badge variant="warning">{stats.pendingOrders} Pendentes</Badge>
        </div>
      </div>
      
      <DashboardContainer>
        <StatCard color={colors.primary}>
          <StatLabel>Frota Ativa</StatLabel>
          <StatValue>{stats.totalDrones}</StatValue>
          <div style={{ fontSize: '0.9rem', color: colors.gray, marginTop: '0.5rem' }}>
            {stats.avgBattery}% bateria média
          </div>
          <ProgressBar>
            <ProgressFill percentage={stats.avgBattery} color={colors.primary} />
          </ProgressBar>
        </StatCard>
        
        <StatCard color={colors.success}>
          <StatLabel>Total de Entregas</StatLabel>
          <StatValue>{stats.totalOrders}</StatValue>
          <div style={{ fontSize: '0.9rem', color: colors.gray, marginTop: '0.5rem' }}>
            {stats.deliveredOrders} concluídas
          </div>
        </StatCard>
        
        <StatCard color={colors.warning}>
          <StatLabel>Pedidos Pendentes</StatLabel>
          <StatValue>{stats.pendingOrders}</StatValue>
          <div style={{ fontSize: '0.9rem', color: colors.gray, marginTop: '0.5rem' }}>
            Na fila de processamento
          </div>
        </StatCard>
        
        <StatCard color={colors.secondary}>
          <StatLabel>Taxa de Sucesso</StatLabel>
          <StatValue>{stats.deliveryRate}%</StatValue>
          <div style={{ fontSize: '0.9rem', color: colors.gray, marginTop: '0.5rem' }}>
            Eficiência do sistema
          </div>
          <ProgressBar>
            <ProgressFill percentage={stats.deliveryRate} color={colors.secondary} />
          </ProgressBar>
        </StatCard>
      </DashboardContainer>

      {/* ... resto do componente mantém a lógica, mas com classes modernas ... */}
    </div>
  );
};

export default Dashboard;