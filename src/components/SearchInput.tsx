import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../icons/search-icon';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  width: 100%;
  border: 1px solid #BBBCC2;
  border-radius: 3px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 160px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 13px;
  }
`;

const SearchButton = styled.button`
  background-color: #D3D4D9;
  border: none;
  width: 34px;
  height: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e5e5e5;
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
  }
`;

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search',
  onSearch,
  className,
  initialValue = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value)
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer className={className}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch} aria-label="Search">
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
};

export default Search;