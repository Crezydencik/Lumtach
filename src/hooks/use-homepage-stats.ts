'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_STATS } from '@/modules/stats/defaults';
import { StatsRecord } from '@/modules/stats/types';

export function useHomepageStats() {
  const [stats, setStats] = useState<StatsRecord>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch('/api/stats', { cache: 'no-store' });
        const payload = await response.json().catch(() => null);

        if (!response.ok || !payload?.stats) {
          return;
        }

        if (isMounted) {
          setStats(payload.stats);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, isLoading };
}
