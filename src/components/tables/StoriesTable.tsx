import React, { useState, useEffect } from 'react';
import StoryRow from '../StoryRow';
import Search from '../SearchInput';
import StatusDropdown from '../DropdownMenu';
import ActionButton from '../button';
import { PlusIcon } from '../../icons/plus-icon';
import { Story } from '../../types/story';


import { PaginatedResponse } from '../../types/pagination';
import { useIsMobile } from '../../hook/useIsMobile';
import { ColumnHeader, ColumnHeaders, ControlsRow, EmptyState, EmptyStateText, FilterGroup, HeaderContainer, PageInput, PaginationButton, PaginationContainer, PaginationControls, PaginationInfo, RowsPerPageSelect, TableBody, TableContainer, TableHeader, Title, TitleRow } from './styles';
import { useIntl } from 'react-intl';
import { SortIcon } from '../SortIcon';

interface StoriesTableProps {
  data: PaginatedResponse<Story>;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onNewStory?: () => void;
  onEditStory?: (id: string) => void;
  onDeleteStory?: (id: string) => void;
  className?: string;
}

const StoriesTable: React.FC<StoriesTableProps> = ({
  data,
  onPageChange,
  onRowsPerPageChange,
  onNewStory,
  onEditStory,
  onDeleteStory,
  className,
}) => {
  const intl = useIntl()
  const [filteredData, setFilteredData] = useState<Story[]>(data.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<{ id: string; label: string }[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc' | 'none';
  }>({ key: 'lastModified', direction: 'desc' });
  const isMobile = useIsMobile()
  const allData = data?.data

  const statusOptions = [
    { id: 'all', label: intl.formatMessage({ id: 'stories.status.all', defaultMessage: 'All Statuses' }) },
    { id: 'draft', label: intl.formatMessage({ id: 'stories.status.draft', defaultMessage: 'Draft' }) },
    { id: 'scheduled', label: intl.formatMessage({ id: 'stories.status.scheduled', defaultMessage: 'Scheduled' }) },
    { id: 'live', label: intl.formatMessage({ id: 'stories.status.live', defaultMessage: 'Live' }) },
    { id: 'past', label: intl.formatMessage({ id: 'stories.status.past', defaultMessage: 'Past' }) },
  ];
  

  useEffect(() => {
    let result = [...allData];
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(story => 
        story.title.toLowerCase().includes(lowerCaseQuery) || 
        (story.subtitle && story.subtitle.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    if (selectedStatuses.length > 0 && !selectedStatuses.some(s => s.id === 'all')) {
      const statusIds = selectedStatuses.map(s => s.id);
      result = result.filter(story => statusIds.includes(story.status));
    }
    
    if (sortConfig.direction !== 'none') {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Story];
        const bValue = b[sortConfig.key as keyof Story];
        
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        
        return 0;
      });
    }
    
    setFilteredData(result);
  }, [data, searchQuery, selectedStatuses, sortConfig]);

  const totalPages = data.totalPages;
  const startIndex = (data.currentPage - 1) * data.itemsPerPage;
  const endIndex = Math.min(startIndex + data.itemsPerPage, data.total);
  const currentData = filteredData;

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | 'none' = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = 'none';
    }
    
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: string) => {
    const direction = sortConfig.key === key ? sortConfig.direction : 'none';
    return <SortIcon direction={direction} columnType={key} />;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusChange = (selected: { id: string; label: string }[]) => {
    setSelectedStatuses(selected);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      handlePageChange(value);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(e.target.value);
    onRowsPerPageChange(newRowsPerPage);
  };

  return (
    <TableContainer className={className}>
      <TableHeader>
        <HeaderContainer>
          <TitleRow>
          <Title>{intl.formatMessage({ id: 'stories.title', defaultMessage: 'Stories' })}</Title>
          {
            isMobile && (
              <ActionButton 
                  label={intl.formatMessage({ id: 'stories.newStory', defaultMessage: 'New Story' })} 
                  icon={<PlusIcon />} 
                  onClick={onNewStory}
              />
            )
          }
          </TitleRow>
        
        <ControlsRow>
        <FilterGroup>
            <Search 
            placeholder={intl.formatMessage({ id: 'stories.search.placeholder', defaultMessage: 'Search' })} 
            onSearch={handleSearch}
            initialValue={searchQuery}
            />
            <StatusDropdown 
            options={statusOptions}
            onChange={handleStatusChange}
            multiSelect={true}
            />
            <PaginationInfo>
            {intl.formatMessage(
              { id: 'stories.pagination.showing', defaultMessage: 'Showing {start} to {end} of {total}' },
              { start: startIndex + 1, end: endIndex, total: filteredData.length }
            )}
            </PaginationInfo>
        </FilterGroup>
        {
          !isMobile && (
            <ActionButton 
              label="New Story" 
              icon={<PlusIcon />} 
              onClick={onNewStory}
          />
          )
        }
        </ControlsRow>
        
        <ColumnHeaders>
        <ColumnHeader 
            onClick={() => handleSort('title')}
            sortActive={sortConfig.key === 'title' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.title', defaultMessage: 'Title' })} {renderSortIcon('title')}
        </ColumnHeader>
        <ColumnHeader 
            onClick={() => handleSort('thumbnails')}
            sortActive={sortConfig.key === 'thumbnails' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.pages', defaultMessage: 'Pages' })} {renderSortIcon('thumbnails')}
        </ColumnHeader>
        <ColumnHeader 
            onClick={() => handleSort('lastModified')}
            sortActive={sortConfig.key === 'lastModified' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.lastModified', defaultMessage: 'Last Modified' })} {renderSortIcon('lastModified')}
        </ColumnHeader>
        <ColumnHeader 
            onClick={() => handleSort('status')}
            sortActive={sortConfig.key === 'status' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.status', defaultMessage: 'Status' })} {renderSortIcon('status')}
        </ColumnHeader>
        <ColumnHeader 
            onClick={() => handleSort('liveFrom')}
            sortActive={sortConfig.key === 'liveFrom' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.liveFrom', defaultMessage: 'Live From' })} {renderSortIcon('liveFrom')}
        </ColumnHeader>
        <ColumnHeader 
            onClick={() => handleSort('ends')}
            sortActive={sortConfig.key === 'ends' && sortConfig.direction !== 'none'}
        >
            {intl.formatMessage({ id: 'stories.column.ends', defaultMessage: 'Ends' })} {renderSortIcon('ends')}
        </ColumnHeader>
        <div></div> {/* Empty header for actions column */}
        </ColumnHeaders>
        </HeaderContainer>
      </TableHeader>
      
      <TableBody>
        {currentData.length > 0 ? (
          currentData.map((story) => (
            <StoryRow
              key={story.id}
              title={story.title}
              subtitle={story.subtitle}
              timestamp={story.lastModified}
              status={story.status}
              thumbnails={story.thumbnails}
              liveFrom={story.liveFrom}
              endsAt={story.ends}
              onEdit={() => onEditStory && onEditStory(story.id)}
              onDelete={() => onDeleteStory && onDeleteStory(story.id)}
            />
          ))
        ) : (
          <EmptyState>
            <EmptyStateText>
              {filteredData.length === 0 && data?.data.length > 0
                ? intl.formatMessage({ 
                  id: 'stories.empty.filtered', 
                  defaultMessage: 'No stories match your filters. Try adjusting your search or filter criteria.' 
                })
                : intl.formatMessage({ 
                  id: 'stories.empty.noStories', 
                  defaultMessage: 'No stories found. Create your first story to get started.' 
                })}
            </EmptyStateText>
            {filteredData.length === 0 && data?.data.length === 0 && (
              <ActionButton 
                label="New Story" 
                icon={<PlusIcon />} 
                onClick={onNewStory}
              />
            )}
          </EmptyState>
        )}
      </TableBody>
      
      <PaginationContainer>
        <div>
          <span>{intl.formatMessage({ id: 'stories.pagination.page', defaultMessage: 'Page' })} </span>
          <PageInput 
            type="text" 
            value={data?.currentPage} 
            onChange={handlePageInputChange} 
            aria-label="Page number"
          /> 
          <span> {intl.formatMessage({ id: 'stories.pagination.of', defaultMessage: 'of' })} {totalPages}</span>
        </div>
        
        <RowsPerPageSelect
          value={data.itemsPerPage}
          onChange={handleRowsPerPageChange}
          aria-label="Rows per page"
        >
          <option value="10">{intl.formatMessage({ id: 'stories.pagination.rows', defaultMessage: '{count} Rows' }, { count: 10 })}</option>
          <option value="20">{intl.formatMessage({ id: 'stories.pagination.rows', defaultMessage: '{count} Rows' }, { count: 20 })}</option>
          <option value="50">{intl.formatMessage({ id: 'stories.pagination.rows', defaultMessage: '{count} Rows' }, { count: 50 })}</option>
          <option value="100">{intl.formatMessage({ id: 'stories.pagination.rows', defaultMessage: '{count} Rows' }, { count: 100 })}</option>
        </RowsPerPageSelect>
        
        <PaginationControls>
          <PaginationButton
            onClick={() => handlePageChange(data?.currentPage - 1)}
            disabled={data?.currentPage === 1}
            aria-label="Previous page"
          >
            &larr;
          </PaginationButton>
          <PaginationButton
            onClick={() => handlePageChange(data?.currentPage + 1)}
            disabled={data?.currentPage === totalPages}
            aria-label="Next page"
          >
            &rarr;
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
    </TableContainer>
  );
};

export default StoriesTable;