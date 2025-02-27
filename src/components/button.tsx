import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: ${({ color }) => color || '#10B981'}; // Default to green
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover {
    background-color: ${({ color }) => {
      if (color) {
        return color === '#10B981' ? '#0EA271' : color + 'DD';
      }
      return '#0EA271';
    }};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background-color: #A1A1AA;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  color,
  onClick,
  disabled = false,
  className,
  type = 'button',
}) => {
  return (
    <ButtonContainer
      type={type}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {label}
    </ButtonContainer>
  );
};

export default ActionButton;