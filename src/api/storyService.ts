import { PaginatedResponse } from '../types/pagination';
import { Story } from '../types/story';
import { faker } from '@faker-js/faker';
import thumbnail1 from '../icons/thumbnail1.svg';
import thumbnail2 from '../icons/thumbnail2.svg';
import thumbnail3 from '../icons/thumbnail3.svg';
import thumbnail4 from '../icons/thumbnail4.svg';
import thumbnail5 from '../icons/thumbnail5.svg';
import thumbnail6 from '../icons/thumbnail6.svg';
import thumbnail7 from '../icons/thumbnail7.svg';
import thumbnail8 from '../icons/thumbnail8.svg';


const getRandomElement = (array: any) => array[Math.floor(Math.random() * array.length)]

const generateMockStories = (count: number): Story[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    subtitle: `(${faker.date.future().toLocaleDateString()})`,
    status: getRandomElement(['draft', 'scheduled', 'live']),
    thumbnails: Array.from(
      { length: faker.number.int({ min: 2, max: 7 }) },
      () => {
        const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5, thumbnail6, thumbnail7, thumbnail8];
        return thumbnails[faker.number.int({ min: 0, max: 7 })];
      }
    ),
    lastModified: faker.date.recent().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    liveFrom: faker.date.future().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    ends: faker.date.future().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }));
};

// Generate 100 mock stories
const mockStories: Story[] = generateMockStories(100);

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service
export const storyService = {
  // Get stories with pagination
  getStories: async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Story>> => {
    await delay(800); // Simulate network delay
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedStories = mockStories.slice(start, end);
    
    return {
      data: paginatedStories,
      total: mockStories.length,
      currentPage: page,
      itemsPerPage: pageSize,
      totalPages: Math.ceil(mockStories.length / pageSize)
    };
  },

  // Create a new story
  createStory: async (story: Omit<Story, 'id' | 'lastModified'>): Promise<Story> => {
    await delay(1000); 
    const newStory: Story = {
      ...story,
      id: faker.string.uuid(),
      lastModified: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };
    mockStories.unshift(newStory);
    return newStory;
  },

  deleteStory: async (id: string): Promise<void> => {
    await delay(500); 
    const index = mockStories.findIndex(story => story.id === id);
    if (index === -1) {
      throw new Error('Story not found');
    }
    mockStories.splice(index, 1);
  }
};