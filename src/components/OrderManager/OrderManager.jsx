import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  OrderList,
  OrderItem
} from '../../styles';

const OrderManager = ({ system, onUpdate }) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [weight, setWeight] = useState('');
  const [priority, setPriority] = useState('média');

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (x && y && weight) {
      system.addOrder(
        { x: parseFloat(x), y: parseFloat(y) },
        parseFloat(weight),
        priority
      );
      setX('');
      setY('');
      setWeight('');
      setPriority('média');
      onUpdate();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <img src="/emojis/caixa.gif" alt="Pedidos" style={{ width: '32px', height: '32px' }} />
        <h2 style={{ margin: 0 }}>Gestão de Pedidos</h2>
      </div>
      
      <Form onSubmit={handleAddOrder}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <img src="/emojis/caixa.png" alt="Adicionar" style={{ width: '20px', height: '20px' }} />
          <h3>Adicionar Novo Pedido</h3>
        </div>
        <Input
          type="number"
          placeholder="Coordenada X"
          value={x}
          onChange={(e) => setX(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Coordenada Y"
          value={y}
          onChange={(e) => setY(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Peso (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          step="0.1"
          min="0.1"
          required
        />
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baixa">Baixa Prioridade</option>
          <option value="média">Média Prioridade</option>
          <option value="alta">Alta Prioridade</option>
        </Select>
        <Button type="submit" variant="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/emojis/caixa.png" alt="Adicionar" style={{ width: '16px', height: '16px' }} />
          Adicionar Pedido
        </Button>
      </Form>

      <OrderList>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <img src="/emojis/caixa.png" alt="Lista" style={{ width: '20px', height: '20px' }} />
          <h3>Pedidos Cadastrados</h3>
        </div>
        {system.orders.length === 0 ? (
          <p>Nenhum pedido cadastrado.</p>
        ) : (
          system.orders.map(order => (
            <OrderItem key={order.id} $priority={order.priority}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <img src="/emojis/package.gif" alt="Pedido" style={{ width: '20px', height: '20px' }} />
                <strong>Pedido #{order.id}</strong>
              </div>
              Localização: ({order.location.x}, {order.location.y})
              <br />
              Peso: {order.weight}kg
              <br />
              Prioridade: {order.priority}
              <br />
              Status: {order.status === 'pending' ? '⏳ Pendente' : '✅ Entregue'}
            </OrderItem>
          ))
        )}
      </OrderList>
    </div>
  );
};

export default OrderManager;