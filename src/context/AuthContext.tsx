import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isOnboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const setOnboardingComplete = (value: boolean) => {
    setIsOnboardingComplete(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isOnboardingComplete,
        setOnboardingComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};