export interface Poet {
  id: string;
  name: string;
  nameUrdu?: string;
  avatar: string;
  bio: string;
  period: 'Classical' | 'Modern' | 'Contemporary';
}

export interface Shayari {
  id: string;
  content: string;
  poetId: string;
  category: string[];
  language: 'Urdu' | 'Hindi' | 'English';
  tags: string[];
  likes: number;
  views: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  shayariIds: string[];
  createdAt: number;
}

export type Theme = 'light' | 'dark' | 'sepia';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
