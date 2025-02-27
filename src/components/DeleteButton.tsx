import React from 'react';
import styled from 'styled-components';
import { TrashIcon } from '../icons/trash-icon';

interface DeleteButtonProps {
    onClick: () => void;
    className?: string;
  }
  
  const StyledDeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: white;
    border: 1px solid #D24747;
    border-radius: 4px;
    cursor: pointer;
    color: #EF4444;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #FEF2F2;
    }
  `;

  export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, className }) => {
    return (
      <StyledDeleteButton onClick={onClick} className={className}>
        <TrashIcon />
      </StyledDeleteButton>
    );
  };