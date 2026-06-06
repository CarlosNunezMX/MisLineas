export type LineResult = {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  possibleDisclaimer?: string;
  notFoundProviders?: string[];
  error?: string;
  temporaryUnavailable?: boolean;
  rawApiResponse?: unknown;
};

export interface DisplayLine {
  id: string;
  operadora: string;
  numero: string;
  disclaimer?: string;
  isPossible?: boolean;
  isNotFound?: boolean;
  isError?: boolean;
  isUnavailable?: boolean;
}

export interface ProviderResult {
  company: string;
  lines: string[];
  isRegistered?: boolean;
  possibleProviders?: string[];
  possibleDisclaimer?: string;
  notFoundProviders?: string[];
  error?: string;
  temporaryUnavailable?: boolean;
  rawApiResponse?: unknown;
}

export interface ProviderResponse {
  provider: string;
  result: ProviderResult;
}

export type FilterTab = "all" | "confirmed" | "possible" | "errors";
