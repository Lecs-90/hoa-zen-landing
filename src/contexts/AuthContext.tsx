import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development - marked as placeholder
const mockUser: User = {
  id: 'admin-1',
  name: 'Board Admin',
  email: 'admin@hoamanager.com',
  role: 'admin',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual Supabase authentication
    console.log('AUTH TODO: Implement real login with Supabase');
    setUser(mockUser);
  };

  const logout = () => {
    // TODO: Replace with actual Supabase logout
    console.log('AUTH TODO: Implement real logout with Supabase');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};