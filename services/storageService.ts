import { Shayari, Collection } from '../types';

const KEYS = {
  FAVORITES: 'rekhtaverse_favorites',
  HISTORY: 'rekhtaverse_history',
  COLLECTIONS: 'rekhtaverse_collections',
  THEME: 'rekhtaverse_theme'
};

export const storageService = {
  getFavorites: (): string[] => {
    const data = localStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  },

  toggleFavorite: (shayariId: string) => {
    const favs = storageService.getFavorites();
    const index = favs.indexOf(shayariId);
    let newFavs;
    if (index === -1) {
      newFavs = [shayariId, ...favs];
    } else {
      newFavs = favs.filter(id => id !== shayariId);
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(newFavs));
    return newFavs;
  },

  isFavorite: (shayariId: string): boolean => {
    const favs = storageService.getFavorites();
    return favs.includes(shayariId);
  },

  getHistory: (): string[] => {
    const data = localStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  addToHistory: (shayariId: string) => {
    const history = storageService.getHistory();
    // Remove if exists to move to top
    const filtered = history.filter(id => id !== shayariId);
    // Keep max 50
    const newHistory = [shayariId, ...filtered].slice(0, 50);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(newHistory));
  },

  getCollections: (): Collection[] => {
    const data = localStorage.getItem(KEYS.COLLECTIONS);
    return data ? JSON.parse(data) : [];
  },

  createCollection: (name: string, description: string) => {
    const cols = storageService.getCollections();
    const newCol: Collection = {
      id: Date.now().toString(),
      name,
      description,
      shayariIds: [],
      createdAt: Date.now()
    };
    localStorage.setItem(KEYS.COLLECTIONS, JSON.stringify([...cols, newCol]));
    return newCol;
  },

  addToCollection: (collectionId: string, shayariId: string) => {
    const cols = storageService.getCollections();
    const newCols = cols.map(c => {
      if (c.id === collectionId && !c.shayariIds.includes(shayariId)) {
        return { ...c, shayariIds: [...c.shayariIds, shayariId] };
      }
      return c;
    });
    localStorage.setItem(KEYS.COLLECTIONS, JSON.stringify(newCols));
  }
};
