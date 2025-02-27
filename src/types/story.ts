export interface Story {
  id: string;
  title: string;
  subtitle: string;
  status: 'draft' | 'scheduled' | 'live';
  thumbnails: string[];
  lastModified: string;
  liveFrom: string;
  ends: string;
}