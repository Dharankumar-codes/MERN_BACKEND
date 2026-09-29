import {
  initialCategories,
  initialDepartments,
  initialServices,
  initialIssues
} from '../data/initialData';

export const KEYS = {
  CATEGORIES: 'government_categories',
  DEPARTMENTS: 'government_departments',
  SERVICES: 'government_services',
  ISSUES: 'government_issues'
};

/**
 * Initializes LocalStorage with sample data if keys don't exist.
 */
export const initializeStorage = () => {
  try {
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem(KEYS.DEPARTMENTS)) {
      localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(initialDepartments));
    }
    if (!localStorage.getItem(KEYS.SERVICES)) {
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(initialServices));
    }
    if (!localStorage.getItem(KEYS.ISSUES)) {
      localStorage.setItem(KEYS.ISSUES, JSON.stringify(initialIssues));
    }
  } catch (error) {
    console.error('Error initializing LocalStorage:', error);
  }
};

/**
 * Fetch array of items for a given storage key.
 */
export const getItems = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading items for key "${key}":`, error);
    return [];
  }
};

/**
 * Save array of items to a storage key.
 */
export const saveItems = (key, items) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    // Dispatch a custom event so other components or hooks can listen to state updates
    window.dispatchEvent(new Event('gov_storage_change'));
    return true;
  } catch (error) {
    console.error(`Error saving items to key "${key}":`, error);
    return false;
  }
};

/**
 * Add a new item to storage.
 */
export const addItem = (key, newItem) => {
  const items = getItems(key);
  const updatedItems = [newItem, ...items];
  saveItems(key, updatedItems);
  return updatedItems;
};

/**
 * Update an existing item by ID.
 */
export const updateItem = (key, id, updatedFields) => {
  const items = getItems(key);
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, ...updatedFields } : item
  );
  saveItems(key, updatedItems);
  return updatedItems;
};

/**
 * Delete an item by ID.
 */
export const deleteItem = (key, id) => {
  const items = getItems(key);
  const updatedItems = items.filter((item) => item.id !== id);
  saveItems(key, updatedItems);
  return updatedItems;
};

/**
 * Generate a unique ID with prefix, e.g. CAT-914, SRV-281
 */
export const generateId = (prefix = 'GOV') => {
  const randomNum = Math.floor(100 + Math.random() * 900);
  const timestamp = Date.now().toString().slice(-3);
  return `${prefix}-${randomNum}${timestamp}`;
};
