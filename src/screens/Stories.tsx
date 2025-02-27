import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StoriesTable from '../components/tables/StoriesTable';
import { storyService } from '../api/storyService';
import { Story } from '../types/story';

const PageContainer = styled.div`
  background-color: #fff;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;


export const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await storyService.getStories(currentPage, itemsPerPage);
      setStories(data.data);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setItemsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

 const handleNewStory = async () => {
    try {
      const newStory = await storyService.createStory({
        title: 'New Story',
        subtitle: '(No publish date set)',
        status: 'draft',
        thumbnails: [],
        liveFrom: '—',
        ends: '—'
      });
      setStories(prevStories => [...prevStories, newStory]);
    } catch (error) {
      console.error('Failed to create story:', error);
    }
  };

  const handleEditStory = (id: string) => {
    console.log('Edit story with ID:', id);
  };

  const handleDeleteStory = async (id: string) => {
    try {
        await storyService.deleteStory(id);
        setStories(prevStories => prevStories.filter(story => story.id !== id));
      } catch (error) {
        console.error('Failed to delete story:', error);
      }
  };

  return (
    <PageContainer>
      <StoriesTable
        data={{
          data: stories,
          total: stories.length,
          currentPage,
          totalPages: Math.ceil(stories.length / itemsPerPage),
          itemsPerPage
        }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onNewStory={handleNewStory}
        onEditStory={handleEditStory}
        onDeleteStory={handleDeleteStory}
      />
    </PageContainer>
  );
};