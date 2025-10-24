export interface FormData {
  adults: number;
  children: number;
  budget: number;
  meatPreferences: string[];
  seafoodPreferences: string[];
  allergies: string;
  otherRequests: string;
}

export interface ShoppingListItem {
  name: string;
  quantity: string;
  notes?: string;
  price?: number;
}

export interface ShoppingListCategory {
  category: string;
  items: ShoppingListItem[];
}

export type ShoppingList = ShoppingListCategory[];