import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CheckIcon } from '../icons/check-icon';
import { IoIosArrowDown } from "react-icons/io";


const DropdownContainer = styled.div`
  position: relative;
  width: 240px;
  font-family: sans-serif;
  @media (max-width: 768px) {
    max-width: 160px;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #333;
    @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 13px;
    height: 34px;
  }
`;

const ArrowIcon = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export interface Status {
  id: string;
  label: string;
}

interface StatusDropdownProps {
  options: Status[];
  onChange: (selectedStatuses: Status[]) => void;
  multiSelect?: boolean;
  className?: string;
  initialSelected?: Status[];
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  options,
  onChange,
  multiSelect = false,
  className,
  initialSelected = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Status[]>(initialSelected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (status: Status) => {
    let newSelectedItems: Status[];
    
    if (multiSelect) {
      if (selectedItems.some(item => item.id === status.id)) {
        newSelectedItems = selectedItems.filter(item => item.id !== status.id);
      } else {
        newSelectedItems = [...selectedItems, status];
      }
    } else {
      newSelectedItems = [status];
      setIsOpen(false);
    }
    
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const isSelected = (status: Status) => {
    return selectedItems.some(item => item.id === status.id);
  };

  const getDisplayText = () => {
    if (selectedItems.length === 0) {
      return "All Statuses";
    } else if (selectedItems.length === 1) {
      return selectedItems[0].label;
    } else {
      return `${selectedItems.length} statuses selected`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} className={className}>
      <DropdownButton onClick={toggleDropdown}>
        {getDisplayText()}
        <ArrowIcon isOpen={isOpen}><IoIosArrowDown /></ArrowIcon>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {options.map((status) => (
          <MenuItem key={status.id} onClick={() => handleItemClick(status)}>
            {status.label}
            {isSelected(status) && <CheckIcon />}
          </MenuItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default StatusDropdown;