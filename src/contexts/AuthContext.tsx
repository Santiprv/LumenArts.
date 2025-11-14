import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función separada para evitar problemas de HMR
function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const useAuth = useAuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const createProfile = useCallback(async (userId: string, userEmail: string, userMetadata: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userEmail,
          full_name: userMetadata?.full_name || null,
          avatar_url: userMetadata?.avatar_url || null,
          total_views: 0,
          total_likes: 0,
          total_films: 0,
          followers_count: 0,
          following_count: 0,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return null;
      } else {
        return data;
      }
    } catch (error) {
      console.error('Error in createProfile:', error);
      return null;
    }
  }, []);

  const fetchProfile = useCallback(async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          const newProfile = await createProfile(user.id, user.email!, user.user_metadata);
          if (newProfile) {
            setProfile(newProfile);
          }
        } else {
          console.error('Error fetching profile:', error);
        }
        setLoading(false);
      } else {
        setProfile(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setLoading(false);
    }
  }, [createProfile]);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    // Timeout de seguridad para evitar carga infinita
    const safetyTimeout = () => {
      timeoutId = setTimeout(() => {
        if (mounted) {
          console.warn('Auth initialization timeout - forcing loading to false');
          setLoading(false);
        }
      }, 5000); // 5 segundos de timeout
    };

    // Get initial session with timeout
    const initializeAuth = async () => {
      try {
        safetyTimeout(); // Iniciar timeout de seguridad
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        clearTimeout(timeoutId); // Limpiar timeout si la operación fue exitosa
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearTimeout(timeoutId);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) return { error };

      // No crear perfil aquí - se creará automáticamente en onAuthStateChange
      // Esto evita el lag y los problemas de concurrencia
      return { error: null };
    } catch (error) {
      return { error };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      // Limpiar estado local inmediatamente para mejor UX
      setUser(null);
      setProfile(null);
      setLoading(false);
      
      // Luego hacer logout en Supabase (no esperar respuesta)
      supabase.auth.signOut().catch(error => {
        console.error('Error signing out:', error);
      });
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) return { error };

      setProfile(data);
      return { error: null };
    } catch (error) {
      return { error };
    }
  }, [user]);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }), [user, profile, loading, signUp, signIn, signOut, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

