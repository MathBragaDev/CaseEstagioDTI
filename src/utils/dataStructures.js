export class Drone {
  constructor(id, maxCapacity, maxDistance) {
    this.id = id;
    this.maxCapacity = maxCapacity;
    this.maxDistance = maxDistance;
    this.currentLoad = 0;
    this.currentDistance = 0;
    this.orders = [];
    this.position = { x: 0, y: 0 };
    this.status = 'disponível'; // disponível, carregando, em_voo, entregando, retornando
    this.battery = 100; // 🔋 Bateria em porcentagem
    this.batteryConsumptionRate = 0.8; // 0.8% por km
    this.speed = 40; // km/h
  }

  canCarry(order) {
    const newLoad = this.currentLoad + order.weight;
    const distanceToOrder = this.calculateDistance(this.position, order.location);
    const returnDistance = this.calculateDistance(order.location, { x: 0, y: 0 });
    const totalDistance = this.currentDistance + distanceToOrder + returnDistance;
    
    const batteryNeeded = totalDistance * this.batteryConsumptionRate;
    
    return newLoad <= this.maxCapacity && 
           totalDistance <= this.maxDistance && 
           this.battery >= batteryNeeded;
  }

  addOrder(order) {
    if (this.canCarry(order)) {
      const distanceToOrder = this.calculateDistance(this.position, order.location);
      this.orders.push(order);
      this.currentLoad += order.weight;
      this.currentDistance += distanceToOrder;
      this.position = order.location;
      
      // 🔋 Consome bateria
      const batteryUsed = distanceToOrder * this.batteryConsumptionRate;
      this.battery = Math.max(0, this.battery - batteryUsed);
      
      this.status = 'carregando';
      order.status = 'atribuído';
      order.assignedDrone = this.id;
      
      // ⏰ Calcula tempo estimado de entrega
      order.calculateEstimatedTime(this.speed);
      
      return true;
    }
    return false;
  }

  calculateDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
  }

  // 🔋 Simula uma entrega completa
  deliverOrders() {
    if (this.orders.length === 0) return;
    
    this.status = 'entregando';
    
    // Simula tempo de entrega (1 minuto por pedido)
    const deliveryTime = this.orders.length * 1;
    
    // Consome bateria adicional durante a entrega
    const deliveryBatteryUse = this.orders.length * 0.5;
    this.battery = Math.max(0, this.battery - deliveryBatteryUse);
    
    // Marca pedidos como entregues
    this.orders.forEach(order => {
      order.status = 'entregue';
      order.actualDeliveryTime = new Date();
    });
    
    this.status = 'retornando';
    
    // Consome bateria no retorno
    const returnDistance = this.calculateDistance(this.position, { x: 0, y: 0 });
    const returnBatteryUse = returnDistance * this.batteryConsumptionRate;
    this.battery = Math.max(0, this.battery - returnBatteryUse);
    
    this.position = { x: 0, y: 0 };
    this.status = this.battery > 20 ? 'disponível' : 'recarregando';
  }

  // 🔋 Recarrega o drone
  recharge() {
    if (this.battery < 100) {
      this.battery = Math.min(100, this.battery + 25); // Recarrega 25% por vez
      this.status = 'recarregando';
    }
    
    if (this.battery >= 100) {
      this.status = 'disponível';
    }
  }

  reset() {
    this.currentLoad = 0;
    this.currentDistance = 0;
    this.orders = [];
    this.position = { x: 0, y: 0 };
    this.status = this.battery > 20 ? 'disponível' : 'recarregando';
  }

  // 🔄 Obtém ícone do status
  getStatusIcon() {
    switch(this.status) {
      case 'disponível': return '🟢';
      case 'carregando': return '🟡';
      case 'em_voo': return '✈️';
      case 'entregando': return '📦';
      case 'retornando': return '↩️';
      case 'recarregando': return '🔋';
      default: return '⚪';
    }
  }
}

export class Order {
  constructor(id, location, weight, priority = 'média') {
    this.id = id;
    this.location = location;
    this.weight = weight;
    this.priority = priority;
    this.status = 'pendente';
    this.assignedDrone = null;
    this.createdAt = new Date();
    this.estimatedDeliveryTime = null;
    this.actualDeliveryTime = null;
  }

  calculateEstimatedTime(droneSpeed) {
    if (!this.assignedDrone) return null;
    
    const distance = Math.sqrt(
      Math.pow(this.location.x, 2) + Math.pow(this.location.y, 2)
    );
    
    const timeHours = distance / droneSpeed;
    this.estimatedDeliveryTime = timeHours * 60; // Convert to minutes
    return this.estimatedDeliveryTime;
  }

  // ⏰ Tempo de espera em minutos
  getWaitTime() {
    const now = new Date();
    return Math.round((now - this.createdAt) / 60000); // minutos
  }
}

export class DeliverySystem {
  constructor() {
    this.drones = [];
    this.orders = [];
    this.undeliveredOrders = [];
  }

  addDrone(maxCapacity, maxDistance) {
    const drone = new Drone(this.drones.length + 1, maxCapacity, maxDistance);
    this.drones.push(drone);
    return drone;
  }

  addOrder(location, weight, priority) {
    const order = new Order(this.orders.length + 1, location, weight, priority);
    this.orders.push(order);
    this.undeliveredOrders.push(order);
    return order;
  }

  // 🎯 Sistema de fila inteligente
  prioritizeOrders() {
    const priorityWeights = { alta: 100, média: 50, baixa: 10 };
    
    return [...this.undeliveredOrders].sort((a, b) => {
      // Calcula score baseado em prioridade + tempo de espera
      const scoreA = priorityWeights[a.priority] + (a.getWaitTime() * 0.1);
      const scoreB = priorityWeights[b.priority] + (b.getWaitTime() * 0.1);
      
      return scoreB - scoreA; // Maior score primeiro
    });
  }

  assignOrdersToDrones() {
    const prioritizedOrders = this.prioritizeOrders();
    const availableDrones = this.drones.filter(drone => 
      drone.status === 'disponível' && drone.battery > 20
    );
    
    let assignments = 0;
    
    prioritizedOrders.forEach(order => {
      if (order.status === 'pendente') {
        for (const drone of availableDrones) {
          if (drone.addOrder(order)) {
            assignments++;
            break;
          }
        }
      }
    });
    
    return assignments;
  }

  // 🔋 Recarrega drones com bateria baixa
  rechargeDrones() {
    this.drones.forEach(drone => {
      if (drone.battery < 100 && drone.status !== 'em_voo') {
        drone.recharge();
      }
    });
  }

  // 🚀 Simula todo o processo de entrega
  simulateDelivery() {
    const trips = [];
    let totalTrips = 0;
    
    while (this.undeliveredOrders.length > 0) {
      this.rechargeDrones();
      
      const tripAssignments = this.assignOrdersToDrones();
      if (tripAssignments === 0) break;
      
      totalTrips++;
      
      // Simula as entregas desta viagem
      this.drones.forEach(drone => {
        if (drone.orders.length > 0) {
          drone.deliverOrders();
        }
      });
      
      trips.push({
        tripNumber: totalTrips,
        drones: this.drones.filter(d => d.orders.length > 0).map(d => ({
          droneId: d.id,
          orders: d.orders,
          totalWeight: d.currentLoad,
          totalDistance: d.currentDistance,
          batteryUsed: (100 - d.battery).toFixed(1)
        }))
      });
      
      // Prepara para próxima viagem
      this.drones.forEach(drone => drone.reset());
      this.undeliveredOrders = this.undeliveredOrders.filter(order => 
        order.status === 'pendente'
      );
      
      this.rechargeDrones();
    }
    
    return trips;
  }

  // 📊 Estatísticas do sistema
  getStats() {
    const deliveredOrders = this.orders.filter(o => o.status === 'entregue').length;
    const pendingOrders = this.undeliveredOrders.length;
    
    const totalBattery = this.drones.reduce((sum, drone) => sum + drone.battery, 0);
    const avgBattery = this.drones.length > 0 ? (totalBattery / this.drones.length).toFixed(1) : 0;
    
    return {
      totalDrones: this.drones.length,
      totalOrders: this.orders.length,
      deliveredOrders,
      pendingOrders,
      avgBattery,
      deliveryRate: this.orders.length > 0 ? 
        ((deliveredOrders / this.orders.length) * 100).toFixed(1) : 0
    };
  }
}