import styled from 'styled-components'

// Cores modernas
export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  dark: '#1f2937',
  light: '#f8fafc',
  gray: '#6b7280',
  grayLight: '#f3f4f6'
}

// Tipografia moderna
export const typography = {
  heading: 'font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: 700;',
  body: 'font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: 400;',
  mono: 'font-family: "Fira Code", "Roboto Mono", monospace;'
}

// Sombras modernas
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}

// Container principal
export const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  gap: 0;
`

// Header moderno
export const Header = styled.header`
  grid-column: 1 / -1;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: ${shadows.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// Sidebar moderna com glassmorphism
export const Sidebar = styled.aside`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${shadows.md};
  height: 100vh;
  position: sticky;
  top: 0;
`

// Área principal
export const Main = styled.main`
  padding: 2rem;
  background: ${colors.light};
  min-height: 100vh;
`

// Botões modernos
export const TabButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  margin: 0.5rem 0;
  border: none;
  background: ${props => props.active ? colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : colors.dark};
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  border-radius: 0;
  border-right: 3px solid ${props => props.active ? colors.secondary : 'transparent'};

  &:hover {
    background: ${props => props.active ? colors.primaryDark : colors.grayLight};
  }
`

// Botões primários
export const Button = styled.button`
  background: ${props => props.variant === 'primary' ? colors.primary : 
               props.variant === 'success' ? colors.success : 
               props.variant === 'warning' ? colors.warning : colors.danger};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
    background: ${props => props.variant === 'primary' ? colors.primaryDark : 
                 props.variant === 'success' ? '#0da271' : 
                 props.variant === 'warning' ? '#e78b08' : '#dc2626'};
  }

  &:active {
    transform: translateY(0);
  }
`

// Formulários modernos
export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: ${shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.2);
`

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  margin: 0.75rem 0;
  border: 2px solid ${colors.grayLight};
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: ${colors.light};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: white;
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem;
  margin: 0.75rem 0;
  border: 2px solid ${colors.grayLight};
  border-radius: 12px;
  font-size: 0.95rem;
  background: ${colors.light};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: white;
  }
`

// Cards modernos
export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

export const StatCard = styled.div`
  background: linear-gradient(135deg, white 0%, #fdfdff 100%);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: ${shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || colors.primary};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.xl};
  }
`

export const StatValue = styled.h2`
  font-size: 2.5rem;
  margin: 1rem 0 0.5rem 0;
  color: ${colors.dark};
  font-weight: 800;
  ${typography.heading}
`

export const StatLabel = styled.p`
  color: ${colors.gray};
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  ${typography.body}
`

// Listas modernas
export const DroneList = styled.div`
  margin-top: 2rem;
`

export const DroneItem = styled.div`
  background: linear-gradient(135deg, white 0%, #fdfdff 100%);
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 16px;
  box-shadow: ${shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: ${shadows.lg};
  }
`

export const OrderList = styled.div`
  margin-top: 2rem;
`

export const OrderItem = styled.div`
  background: linear-gradient(135deg, white 0%, #fdfdff 100%);
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 16px;
  box-shadow: ${shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 4px solid ${props => {
    switch(props.$priority) {
      case 'alta': return colors.danger;
      case 'média': return colors.warning;
      case 'baixa': return colors.success;
      default: return colors.primary;
    }
  }};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: ${shadows.lg};
  }
`

// Resultados e viagens
export const Results = styled.div`
  margin-top: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: ${shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.5);
`

export const TripCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
  margin: 1.5rem 0;
  border-radius: 16px;
  box-shadow: ${shadows.md};
  border: 1px solid #e2e8f0;
`

// Badges modernos
export const Badge = styled.span`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.variant === 'success' ? '#d1fae5' : 
               props.variant === 'warning' ? '#fef3c7' : 
               props.variant === 'danger' ? '#fee2e2' : '#e0e7ff'};
  color: ${props => props.variant === 'success' ? '#065f46' : 
               props.variant === 'warning' ? '#92400e' : 
               props.variant === 'danger' ? '#b91c1c' : '#3730a3'};
`

// Progress bars modernas
export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${colors.grayLight};
  border-radius: 10px;
  overflow: hidden;
  margin: 0.5rem 0;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || colors.primary};
  border-radius: 10px;
  transition: width 0.3s ease;
  width: ${props => props.percentage}%;
`