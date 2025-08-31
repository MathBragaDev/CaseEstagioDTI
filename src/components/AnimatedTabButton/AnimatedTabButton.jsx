import React from 'react';
import { TabButton } from '../../styles';

const AnimatedTabButton = ({ active, onClick, tab, label, emojiFile }) => {
  return (
    <TabButton 
      active={active} 
      onClick={() => onClick(tab)}
      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
    >
      <img 
        src={`/emojis/${emojiFile}`} 
        alt={label}
        style={{ 
          width: '24px', 
          height: '24px',
          filter: active ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      />
      {label}
    </TabButton>
  );
};

export default AnimatedTabButton;