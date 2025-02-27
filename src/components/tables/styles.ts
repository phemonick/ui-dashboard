import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableHeader = styled.div`
  border-bottom: 1px solid #eaeaea;
  background-color: #F8F8FA;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
    justify-content: space-between;
  }
`;

export const PaginationInfo = styled.div`
  font-size: 14px;
  color: #52525B;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ColumnHeaders = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 0.5fr 0.8fr 0.5fr 0.8fr;
  background-color: #F9FAFB;
  align-items: center;
  justify-items: start;
  min-width: 90rem;
`;

export const ColumnHeader = styled.button<{ sortActive?: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: ${props => props.sortActive ? '600' : '500'};
  color: #374151;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  
  &:hover {
    color: #111827;
  }

  &:last-child {
    justify-self: flex-end;
  }
`;

export const TableBody = styled.div`
  height: calc(90vh - 22rem);
  overflow-y: auto;
  min-width: 90rem;
  border-bottom: 1px solid #eaeaea;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: #6B7280;
`;

export const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  padding: 16px 24px;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderContainer = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: #F9FAFB;
  }
`;

export const PageInput = styled.input`
  width: 40px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`;

export const RowsPerPageSelect = styled.select`
  height: 32px;
  padding: 0 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`;