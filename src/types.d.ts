export type LineResult = {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  notFoundProviders?: string[];
  error?: string;
  rawApiResponse?: unknown;
};
