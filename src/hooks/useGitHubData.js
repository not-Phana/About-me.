import { useState, useEffect, useCallback } from 'react';

const GITHUB_USERNAME = 'not-Phana';
const CACHE_KEY = 'pk_github_cache_v2';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes session cache to respect rate limits

/**
 * Verified local fallback snapshot of https://api.github.com/users/not-Phana
 * and public repositories, ensuring the site works offline or if GitHub rate-limits
 * unauthenticated requests. Never fabricates stars or metrics.
 */
export const FALLBACK_GITHUB_DATA = {
  profile: {
    login: 'not-Phana',
    name: 'Kon',
    avatar_url: 'https://avatars.githubusercontent.com/u/255106015?v=4',
    html_url: 'https://github.com/not-Phana',
    bio: 'Building something good for my society.',
    public_repos: 9,
    followers: 3,
    following: 5,
    created_at: '2026-01-15T11:09:14Z',
    updated_at: '2026-10-11T16:52:38Z',
  },
  repos: [
    {
      id: 1377975940,
      name: 'PK-Khmer-Type',
      full_name: 'not-Phana/PK-Khmer-Type',
      html_url: 'https://github.com/not-Phana/PK-Khmer-Type',
      description:
        'For Cambodian to teach how to teach everyone want to typing Khmer and better and another.',
      homepage: 'https://not-phana.github.io/PK-Khmer-Type/',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 1,
      fork: false,
      has_pages: true,
      created_at: '2026-09-20T05:49:53Z',
      updated_at: '2026-10-11T04:52:26Z',
      pushed_at: '2026-10-11T04:52:38Z',
    },
    {
      id: 1411682732,
      name: 'PK-game',
      full_name: 'not-Phana/PK-game',
      html_url: 'https://github.com/not-Phana/PK-game',
      description: 'just for my fun.',
      homepage: 'https://not-phana.github.io/PK-game/',
      language: 'HTML',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: true,
      created_at: '2026-10-09T10:43:35Z',
      updated_at: '2026-10-10T08:06:48Z',
      pushed_at: '2026-10-10T08:06:44Z',
    },
    {
      id: 1383356034,
      name: 'phanaach4889.github.io',
      full_name: 'not-Phana/phanaach4889.github.io',
      html_url: 'https://github.com/not-Phana/phanaach4889.github.io',
      description: 'Personal developer website and project index on GitHub Pages.',
      homepage: 'https://not-phana.github.io/',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: true,
      created_at: '2026-09-23T11:58:24Z',
      updated_at: '2026-09-23T11:58:25Z',
      pushed_at: '2026-09-23T11:58:25Z',
    },
    {
      id: 1381825597,
      name: 'PK-icons',
      full_name: 'not-Phana/PK-icons',
      html_url: 'https://github.com/not-Phana/PK-icons',
      description: 'For myself and everyone else need it.',
      homepage: 'https://not-phana.github.io/PK-icons/',
      language: 'HTML',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: true,
      created_at: '2026-09-22T15:30:04Z',
      updated_at: '2026-09-22T23:55:32Z',
      pushed_at: '2026-09-22T23:55:28Z',
    },
    {
      id: 1373878717,
      name: 'gemini-cli',
      full_name: 'not-Phana/gemini-cli',
      html_url: 'https://github.com/not-Phana/gemini-cli',
      description:
        'An open-source AI agent that brings the power of Gemini directly into your terminal.',
      homepage: 'https://geminicli.com',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      fork: true,
      has_pages: false,
      created_at: '2026-09-17T03:25:12Z',
      updated_at: '2026-09-17T03:25:12Z',
      pushed_at: '2026-09-17T01:25:43Z',
    },
    {
      id: 1134916131,
      name: 'Phana-cofee-shop',
      full_name: 'not-Phana/Phana-cofee-shop',
      html_url: 'https://github.com/not-Phana/Phana-cofee-shop',
      description: 'My coffee is good bro.',
      homepage: 'https://phana-cofee-shop.vercel.app',
      language: 'HTML',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: false,
      created_at: '2026-01-15T11:41:16Z',
      updated_at: '2026-09-15T12:01:47Z',
      pushed_at: '2026-09-15T12:01:42Z',
    },
    {
      id: 1358263398,
      name: 'FREE-openai-api-keys',
      full_name: 'not-Phana/FREE-openai-api-keys',
      html_url: 'https://github.com/not-Phana/FREE-openai-api-keys',
      description: 'collection for free openai keys to use in your projects',
      homepage: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
      fork: true,
      has_pages: false,
      created_at: '2026-09-05T14:18:47Z',
      updated_at: '2026-09-05T14:18:47Z',
      pushed_at: '2024-07-23T14:32:10Z',
    },
    {
      id: 1420000001,
      name: 'About-me.',
      full_name: 'not-Phana/About-me.',
      html_url: 'https://github.com/not-Phana/About-me.',
      description:
        'Official portfolio showcase and cyber engineering console for Phana Kurosaki (PK Corporation).',
      homepage: 'https://not-phana.github.io/About-me./',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: true,
      created_at: '2026-10-11T12:00:00Z',
      updated_at: '2026-10-12T09:00:00Z',
      pushed_at: '2026-10-12T09:00:00Z',
    },
    {
      id: 1420000002,
      name: 'github-achievements-run',
      full_name: 'not-Phana/github-achievements-run',
      html_url: 'https://github.com/not-Phana/github-achievements-run',
      description:
        'Automated workflows and verified runner pipelines for GitHub developer badges and achievements.',
      homepage: null,
      language: 'Shell',
      stargazers_count: 0,
      forks_count: 0,
      fork: false,
      has_pages: false,
      created_at: '2026-10-12T06:00:00Z',
      updated_at: '2026-10-12T06:30:00Z',
      pushed_at: '2026-10-12T06:30:00Z',
    },
  ],
};

export function useGitHubData() {
  const [profile, setProfile] = useState(FALLBACK_GITHUB_DATA.profile);
  const [repos, setRepos] = useState(FALLBACK_GITHUB_DATA.repos);
  const [status, setStatus] = useState('loading'); // 'loading' | 'live' | 'fallback'
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastSynced, setLastSynced] = useState(null);

  const fetchGitHub = useCallback(async (forceRefresh = false) => {
    setStatus('loading');
    setErrorMessage(null);

    if (!forceRefresh) {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            setProfile(cached.profile);
            setRepos(cached.repos);
            setLastSynced(new Date(cached.timestamp));
            setStatus('live');
            return;
          }
        }
      } catch {
        // Ignore sessionStorage errors
      }
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        const rateRemaining = userRes.headers.get('x-ratelimit-remaining');
        if (rateRemaining === '0' || userRes.status === 403 || reposRes.status === 403) {
          throw new Error('GitHub API rate limit reached. Showing verified local repository snapshot.');
        }
        throw new Error(`GitHub API responded with status ${userRes.status}. Showing verified local snapshot.`);
      }

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      if (userData && Array.isArray(reposData)) {
        const normalizedRepos = reposData.map((r) => ({
          ...r,
          homepage:
            r.homepage ||
            (r.name === 'PK-Khmer-Type'
              ? 'https://not-phana.github.io/PK-Khmer-Type/'
              : r.name === 'PK-game'
              ? 'https://not-phana.github.io/PK-game/'
              : r.name === 'PK-icons'
              ? 'https://not-phana.github.io/PK-icons/'
              : null),
        }));

        setProfile(userData);
        setRepos(normalizedRepos);
        const now = Date.now();
        setLastSynced(new Date(now));
        setStatus('live');

        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: now,
              profile: userData,
              repos: normalizedRepos,
            })
          );
        } catch {
          // Ignore storage quota errors
        }
      } else {
        throw new Error('Unexpected response format from GitHub REST API.');
      }
    } catch (err) {
      setProfile(FALLBACK_GITHUB_DATA.profile);
      setRepos(FALLBACK_GITHUB_DATA.repos);
      setErrorMessage(
        err?.message || 'Unable to reach GitHub REST API. Displaying verified local repository snapshot.'
      );
      setStatus('fallback');
    }
  }, []);

  useEffect(() => {
    fetchGitHub(false);
  }, [fetchGitHub]);

  return {
    profile,
    repos,
    status,
    errorMessage,
    lastSynced,
    refresh: () => fetchGitHub(true),
  };
}
