export type LineResult = {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  notFoundProviders?: string[];
  error?: string;
  rawApiResponse?: unknown;
};

export interface DisplayLine {
  id: string;
  operadora: string;
  numero: string;
  isPossible?: boolean;
  isNotFound?: boolean;
  isError?: boolean;
}

export interface ProviderResult {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  notFoundProviders?: string[];
  error?: string;
}

export interface ProviderResponse {
  provider: string;
  result: ProviderResult;
}

export type FilterTab = "all" | "confirmed" | "possible" | "errors";
