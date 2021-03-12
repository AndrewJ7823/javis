import { TmdbTvItem } from './tmdb-tv-item';

export interface TmdbTvDiscovery {
  page: number,
  results: Array<TmdbTvItem>,
  total_pages: number,
  total_results: number
}
