'use client';

import { useEffect, useState } from 'react';
import { StatsRecord } from '@/modules/stats/types';

export function useHomepageStats() {
  const [stats, setStats] = useState<StatsRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats(showLoading = false) {
      if (showLoading) {
        setIsLoading(true);
      }

      try {
        const response = await fetch(`/api/stats?ts=${Date.now()}`, { cache: 'no-store' });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          return;
        }

        if (isMounted) {
          setStats(payload?.stats || null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    function refreshWhenVisible() {
      if (document.visibilityState === 'visible') {
        loadStats();
      }
    }

    loadStats(true);
    window.addEventListener('focus', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    const refreshInterval = window.setInterval(refreshWhenVisible, 15000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      window.clearInterval(refreshInterval);
    };
  }, []);

  return { stats, isLoading };
}
