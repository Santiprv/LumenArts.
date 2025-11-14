import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';

type ShortFilm = Tables<'short_films'>;

interface UserStats {
  totalFilms: number;
  totalViews: number;
  totalLikes: number;
  followersCount: number;
  followingCount: number;
  userFilms: ShortFilm[];
  loading: boolean;
}

export const useUserStats = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalFilms: 0,
    totalViews: 0,
    totalLikes: 0,
    followersCount: 0,
    followingCount: 0,
    userFilms: [],
    loading: false,
  });

  const fetchUserStats = useCallback(async () => {
    if (!user) {
      setStats({
        totalFilms: 0,
        totalViews: 0,
        totalLikes: 0,
        followersCount: 0,
        followingCount: 0,
        userFilms: [],
        loading: false,
      });
      return;
    }

    try {
      setStats(prev => ({ ...prev, loading: true }));

      // Timeout para evitar carga infinita
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000)
      );

      // Fetch user's short films con timeout
      const filmsPromise = supabase
        .from('short_films')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      const { data: films, error: filmsError } = await Promise.race([filmsPromise, timeoutPromise]) as any;

      if (filmsError) {
        console.error('Error fetching user films:', filmsError);
      }

      // Calculate totals from films
      const totalViews = films?.reduce((sum, film) => sum + (film.views_count || 0), 0) || 0;
      const totalLikes = films?.reduce((sum, film) => sum + (film.likes_count || 0), 0) || 0;
      const totalFilms = films?.length || 0;

      // Simplificar: solo obtener cortometrajes por ahora, followers/following pueden ser 0
      setStats({
        totalFilms,
        totalViews,
        totalLikes,
        followersCount: 0,
        followingCount: 0,
        userFilms: films || [],
        loading: false,
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
      setStats({
        totalFilms: 0,
        totalViews: 0,
        totalLikes: 0,
        followersCount: 0,
        followingCount: 0,
        userFilms: [],
        loading: false,
      });
    }
  }, [user]);

  const refreshStats = useCallback(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  const memoizedStats = useMemo(() => ({
    ...stats,
    refreshStats,
  }), [stats, refreshStats]);

  return memoizedStats;
};

