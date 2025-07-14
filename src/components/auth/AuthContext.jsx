import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored auth token
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          // Validate token with backend
          const isValid = await validateToken(token);
          if (isValid) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          } else {
            // Clear invalid token
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const validateToken = async (token) => {
    try {
      // Simulate API call to validate token
      // Replace with actual API endpoint
      const response = await fetch('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const signIn = async (credentials) => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Mock successful response data
      const data = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'user-123',
          fullName: 'John Doe',
          email: credentials.email,
          university: 'African Leadership University',
          yearOfStudy: '3rd Year',
          major: 'Business Administration',
          bio: 'Passionate about helping fellow students succeed in their academic journey.',
          modules: ['Mathematics', 'Business Strategy', 'Data Analysis', 'Public Speaking'],
          hourlyRate: '15.00',
          availableTimeSlots: ['Monday Morning', 'Wednesday Afternoon', 'Friday Evening'],
          helpExperience: 'I have been tutoring mathematics and business courses for 2 years, helping over 50 students improve their grades.',
          joinedDate: '2024-01-15',
          sessionsCompleted: 23,
          rating: 4.8,
          totalHours: 45,
          canOfferHelp: true // Determined by having modules and availability
        }
      };

      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      // Mock successful registration response
      const data = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'user-' + Date.now(),
          fullName: userData.fullName,
          email: userData.email,
          university: userData.university,
          yearOfStudy: userData.yearOfStudy,
          major: userData.major,
          bio: userData.bio || '',
          modules: userData.modules || [],
          hourlyRate: userData.hourlyRate || '',
          availableTimeSlots: userData.availableTimeSlots || [],
          helpExperience: userData.helpExperience || '',
          joinedDate: new Date().toISOString().split('T')[0],
          sessionsCompleted: 0,
          rating: 0,
          totalHours: 0,
          canOfferHelp: (userData.modules && userData.modules.length > 0) || (userData.availableTimeSlots && userData.availableTimeSlots.length > 0)
        }
      };

      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Call logout endpoint
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');

      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (updates) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();

      // Update local storage
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
