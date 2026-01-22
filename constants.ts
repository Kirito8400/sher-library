import { Poet, Shayari } from './types';

export const POETS: Poet[] = [
  {
    id: 'ghalib',
    name: 'Mirza Ghalib',
    nameUrdu: 'مرزا غالب',
    avatar: 'https://picsum.photos/id/1005/200/200',
    bio: 'The last great poet of the Mughal Era, known for his philosophical depth.',
    period: 'Classical'
  },
  {
    id: 'iqbal',
    name: 'Allama Iqbal',
    nameUrdu: 'علامہ اقبال',
    avatar: 'https://picsum.photos/id/1011/200/200',
    bio: 'Philosopher, poet, and politician in British India.',
    period: 'Modern'
  },
  {
    id: 'faiz',
    name: 'Faiz Ahmed Faiz',
    nameUrdu: 'فیض احمد فیض',
    avatar: 'https://picsum.photos/id/1025/200/200',
    bio: 'Revolutionary poet and one of the most celebrated writers of the Urdu language.',
    period: 'Modern'
  },
  {
    id: 'rahat',
    name: 'Rahat Indori',
    nameUrdu: 'راحت اندوری',
    avatar: 'https://picsum.photos/id/1001/200/200',
    bio: 'Indian Bollywood lyricist and Urdu language poet.',
    period: 'Contemporary'
  },
  {
    id: 'jaun',
    name: 'Jaun Elia',
    nameUrdu: 'جون ایلیا',
    avatar: 'https://picsum.photos/id/1012/200/200',
    bio: 'Known for his unconventional style and deep melancholy.',
    period: 'Modern'
  }
];

export const CATEGORIES = [
  { id: 'love', label: 'Mohabbat', labelUrdu: 'محبت', icon: '❤️' },
  { id: 'sad', label: 'Dukh', labelUrdu: 'دکھ', icon: '😢' },
  { id: 'life', label: 'Zindagi', labelUrdu: 'زندگی', icon: '🌱' },
  { id: 'wine', label: 'Maikhana', labelUrdu: 'میخانہ', icon: '🍷' },
  { id: 'friendship', label: 'Dosti', labelUrdu: 'دوستی', icon: '🤝' },
  { id: 'heartbreak', label: 'Bewafai', labelUrdu: 'بے وفائی', icon: '💔' },
];

export const SHAYARIS: Shayari[] = [
  {
    id: 's1',
    poetId: 'ghalib',
    content: `Hazaron khwahishen aisi ke har khwahish pe dam nikle\nBahut nikle mere armaan lekin phir bhi kam nikle`,
    category: ['life', 'desire'],
    language: 'Urdu',
    tags: ['classic', 'famous'],
    likes: 12400,
    views: 50000
  },
  {
    id: 's2',
    poetId: 'ghalib',
    content: `Ishq ne Ghalib nikamma kar diya\nVarna hum bhi aadmi they kaam ke`,
    category: ['love', 'humor'],
    language: 'Urdu',
    tags: ['classic', 'love'],
    likes: 8900,
    views: 32000
  },
  {
    id: 's3',
    poetId: 'iqbal',
    content: `Sitaron se aage jahan aur bhi hain\nAbhi ishq ke imtihan aur bhi hain`,
    category: ['life', 'motivation'],
    language: 'Urdu',
    tags: ['inspiration'],
    likes: 15600,
    views: 45000
  },
  {
    id: 's4',
    poetId: 'faiz',
    content: `Aur bhi dukh hain zamane mein mohabbat ke siwa\nRahatein aur bhi hain vasl ki rahat ke siwa`,
    category: ['sad', 'reality'],
    language: 'Urdu',
    tags: ['revolutionary'],
    likes: 11200,
    views: 28000
  },
  {
    id: 's5',
    poetId: 'jaun',
    content: `Ye mujhe chain kyun nahi padta\nEk hi shakhs tha jahan mein kya`,
    category: ['sad', 'love'],
    language: 'Urdu',
    tags: ['intense'],
    likes: 9800,
    views: 21000
  },
  {
    id: 's6',
    poetId: 'rahat',
    content: `Bulati hai magar jaane ka nai\nWo duniya hai udhar jaane ka nai`,
    category: ['life', 'modern'],
    language: 'Hindi',
    tags: ['viral'],
    likes: 25000,
    views: 100000
  }
];
