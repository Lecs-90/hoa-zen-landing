// Data types for HOA Management System

export interface Resident {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitId: string;
  status: 'active' | 'inactive' | 'archived';
  ownershipType: 'owner' | 'tenant';
  vehicles: Vehicle[];
  pets: Pet[];
  balance: number;
  lastPaymentAt: Date | null;
  archived: boolean;
  createdAt: Date;
}

export interface Unit {
  id: string;
  building: string;
  number: string;
  squareFeet: number;
  residentIds: string[];
  notes: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
}

export interface PaymentTransaction {
  id: string;
  residentId: string;
  unitId: string;
  type: 'dues' | 'assessment' | 'fee' | 'refund';
  method: 'card' | 'ach' | 'cash' | 'check' | 'manual';
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  createdAt: Date;
  reference: string;
  notes?: string;
}

export interface Assessment {
  id: string;
  name: string;
  amount: number;
  recurrence: 'monthly' | 'quarterly' | 'annual' | 'one-time';
  appliesTo: 'all' | 'buildings' | 'units';
  targetIds?: string[];
  dueDayOfMonth?: number;
  dueDate?: Date;
  active: boolean;
  createdAt: Date;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  unitId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'plumbing' | 'electrical' | 'landscaping' | 'common-area' | 'other';
  status: 'new' | 'in-review' | 'assigned' | 'in-progress' | 'completed';
  vendorId?: string;
  costEntries: CostEntry[];
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
  timeline: TimelineEntry[];
}

export interface CostEntry {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface TimelineEntry {
  id: string;
  action: string;
  details: string;
  date: Date;
  author: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  insuranceExpiry: Date;
  rating: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: 'general' | 'meeting' | 'maintenance' | 'emergency';
  audience: 'all' | 'buildings' | 'units';
  targetIds?: string[];
  scheduledAt?: Date;
  sentAt?: Date;
  pinned: boolean;
  attachments: string[];
  poll?: Poll;
  createdAt: Date;
}

export interface Poll {
  question: string;
  options: string[];
  anonymous: boolean;
  openAt: Date;
  closeAt?: Date;
  responses: PollResponse[];
}

export interface PollResponse {
  optionIndex: number;
  residentId?: string;
}

export interface Document {
  id: string;
  name: string;
  folder: string;
  tags: string[];
  url: string;
  uploadedAt: Date;
  version: number;
  visibility: 'admin' | 'residents';
  size: number;
  type: string;
}

export interface Note {
  id: string;
  entityType: 'resident' | 'unit' | 'maintenance' | 'payment';
  entityId: string;
  body: string;
  internalOnly: boolean;
  createdAt: Date;
  author: string;
}

// UI specific types
export interface StatCardData {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string;
}

// Auth placeholder types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'readonly';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}