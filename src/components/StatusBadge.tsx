import React from 'react';
import styled from 'styled-components';

export interface BadgeProps {
    label: string;
    status: string;
    className?: string;
  }
  
  const StyledBadge = styled.span<{ status: string }>`
    display: inline-block;
    padding: 2px;
    margin-right: 8px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    background-color: ${({ status }) => {
      switch (status?.toLocaleLowerCase()) {
        case 'draft': return '#1C62EB';
        case 'published': return '#ECFDF5';
        case 'scheduled': return '#FEF3C7';
        case 'archived': return '#F3F4F6';
        default: return '#EEF2FF';
      }
    }};
    color: ${({ status }) => {
      switch (status) {
        case 'draft': return '#4F46E5';
        case 'published': return '#059669';
        case 'scheduled': return '#D97706';
        case 'archived': return '#6B7280';
        default: return '#4F46E5';
      }
    }};
  `;
  
  export const StatusBadge: React.FC<BadgeProps> = ({ label, status }) => {
    return (
      <StyledBadge status={status}>
        {label}
      </StyledBadge>
    );
  };