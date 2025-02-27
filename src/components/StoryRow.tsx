import styled from 'styled-components';
import { StatusBadge } from './StatusBadge';
import { DeleteButton } from './DeleteButton';
import ActionButton from './button';
import { EditIcon } from '../icons/edit-icon';
import { ThumbnailGallery } from './ThumbnailGallery';
import { useState } from 'react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #1a202c;
`;

const ModalText = styled.p`
  margin: 0 0 24px 0;
  color: #4a5568;
  font-size: 14px;
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
  }
`;

const DeleteConfirmButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #e53e3e;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c53030;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 0.5fr 0.8fr 0.5fr 0.8fr;
  padding: 16px 0px 16px 16px;
  border-bottom: 1px solid #eaeaea;
  background-color: white;
  width: 100%;
  align-items: center;

  &:nth-child(even) {
    background-color: #F8F8FA;
  }
`;


const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #0066CC;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #71717A;
  margin: 0;
  line-height: 1.4;
`;


const Timestamp = styled.span`
  font-size: 14px;
  color: #52525B;
`;

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
`;




interface StoryRowProps {
  title: string;
  subtitle?: string;
  timestamp: string;
  status: string;
  thumbnails?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  liveFrom?: string;
  endsAt?: string;
}

const StoryRow: React.FC<StoryRowProps> = ({
  title,
  subtitle,
  timestamp,
  status,
  thumbnails = [],
  liveFrom,
  endsAt,
  onEdit,
  onDelete,
  className,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'published': return 'Published';
      case 'scheduled': return 'Scheduled';
      case 'archived': return 'Archived';
      default: return 'Draft';
    }
  };

  return (
    <>
      <RowContainer className={className}>
        <TitleSection>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleSection>
        
        {thumbnails.length > 0 ? (
          <ThumbnailGallery images={thumbnails} />
        ) : <div> {'_'} </div>}
        
        <Timestamp>{timestamp}</Timestamp>
        
        <StatusBadge 
          label={getStatusLabel(status)} 
          status={status === 'draft' ? 'default' : status} 
        />
        
        <div>{liveFrom ?? '_'}</div>
        <div>{endsAt ?? '_'}</div>
        
        <ActionSection>
          <DeleteButton onClick={handleDeleteClick} />
          <ActionButton 
            label="Edit" 
            icon={<EditIcon />} 
            color="#10B981"
            onClick={onEdit || (() => {})}
          />
        </ActionSection>
      </RowContainer>

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <ModalText>
              Are you sure you want to delete this story? This action cannot be undone.
            </ModalText>
            <ModalActions>
              <CancelButton onClick={handleDeleteCancel}>
                Cancel
              </CancelButton>
              <DeleteConfirmButton onClick={handleDeleteConfirm}>
                Delete
              </DeleteConfirmButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default StoryRow;