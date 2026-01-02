/**
 * API Client for Centralized Search Platform
 *
 * TODO: Replace BASE_URL with your actual Search API endpoint
 * Example: const BASE_URL = 'https://api.yourplatform.com/v1/search';
 *
 * Currently using dummy data from src/lib/dummyData.ts
 * Replace the dummy data implementation with actual API calls when ready.
 */
import type {
  UserContext,
  AutocompleteSuggestion,
  SearchResponse,
  StatusFilter,
  SearchFilters,
} from "@/types/search";
import {
  DUMMY_OFFERS,
  DUMMY_PURCHASES,
  DUMMY_TRANSPORTS,
  filterOffersByQuery,
  filterPurchasesByQuery,
  filterTransportsByQuery,
  filterOffersByStatus,
  filterPurchasesByStatus,
  filterTransportsByStatus,
  filterByUserContext,
  generateAutocompleteSuggestions,
  filterOffersAdvanced,
  filterPurchasesAdvanced,
  filterTransportsAdvanced,
} from "./dummyData";

// TODO: Update this URL to point to your actual Search API
const BASE_URL = "/api/search";

/**
 * Fetch autocomplete suggestions
 *
 * @param query - The search query string
 * @param userContext - User context for role-based filtering
 * @returns Promise<AutocompleteSuggestion[]>
 *
 * TODO: Replace with actual API call:
 * const response = await fetch(`${BASE_URL}/autocomplete`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ query, ...userContext }),
 * });
 * const data = await response.json();
 * return mapAutocompleteSuggestions(data);
 */
export async function fetchAutocomplete(
  query: string,
  userContext: UserContext
): Promise<AutocompleteSuggestion[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!query.trim()) return [];

  // Generate suggestions from dummy data based on query and user context
  return generateAutocompleteSuggestions(query, userContext);
}

/**
 * Fetch search results
 *
 * @param query - The search query string
 * @param userContext - User context for role-based filtering
 * @param pagination - Pagination parameters
 * @param statusFilter - Status filter (legacy, use fetchSearchResultsWithFilters for advanced filtering)
 * @returns Promise<SearchResponse>
 *
 * TODO: Replace with actual API call:
 * const response = await fetch(`${BASE_URL}/search`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ query, ...userContext, ...pagination }),
 * });
 * const data = await response.json();
 * return mapSearchResponse(data);
 */
export async function fetchSearchResults(
  query: string,
  userContext: UserContext,
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 20 },
  statusFilter: StatusFilter = "all"
): Promise<SearchResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If no query, return empty results
  if (!query.trim()) {
    return {
      query,
      totalResults: 0,
      results: { offers: [], purchases: [], transports: [] },
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPages: 0,
      },
    };
  }

  // Step 1: Filter dummy data by query (query-aware filtering)
  let filteredOffers = filterOffersByQuery(DUMMY_OFFERS, query);
  let filteredPurchases = filterPurchasesByQuery(DUMMY_PURCHASES, query);
  let filteredTransports = filterTransportsByQuery(DUMMY_TRANSPORTS, query);

  // Step 2: Apply status filtering
  filteredOffers = filterOffersByStatus(filteredOffers, statusFilter);
  filteredPurchases = filterPurchasesByStatus(filteredPurchases, statusFilter);
  filteredTransports = filterTransportsByStatus(
    filteredTransports,
    statusFilter
  );

  // Step 3: Apply user context filtering (role-based filtering)
  // In production, this filtering happens on the backend based on accountId/userId
  const { offers, purchases, transports } = filterByUserContext(
    filteredOffers,
    filteredPurchases,
    filteredTransports,
    userContext
  );

  // Step 4: Apply pagination
  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;

  const paginatedOffers = offers.slice(startIndex, endIndex);
  const paginatedPurchases = purchases.slice(startIndex, endIndex);
  const paginatedTransports = transports.slice(startIndex, endIndex);

  const totalResults = offers.length + purchases.length + transports.length;
  const totalPages = Math.ceil(totalResults / pagination.pageSize);

  return {
    query,
    totalResults,
    results: {
      offers: paginatedOffers,
      purchases: paginatedPurchases,
      transports: paginatedTransports,
    },
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages,
    },
  };
}

/**
 * Fetch search results with advanced filters
 *
 * @param query - The search query string (can be empty)
 * @param filters - Advanced search filters
 * @param userContext - User context for role-based filtering
 * @param pagination - Pagination parameters
 * @returns Promise<SearchResponse>
 *
 * TODO: Replace with actual API call:
 * const response = await fetch(`${BASE_URL}/search`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ query, filters, ...userContext, ...pagination }),
 * });
 * const data = await response.json();
 * return mapSearchResponse(data);
 */
export async function fetchSearchResultsWithFilters(
  query: string,
  filters: SearchFilters,
  userContext: UserContext,
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 5 }
): Promise<SearchResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Step 1: Start with all dummy data
  let filteredOffers = [...DUMMY_OFFERS];
  let filteredPurchases = [...DUMMY_PURCHASES];
  let filteredTransports = [...DUMMY_TRANSPORTS];

  // Step 2: Apply query filtering if query exists
  if (query.trim()) {
    filteredOffers = filterOffersByQuery(filteredOffers, query);
    filteredPurchases = filterPurchasesByQuery(filteredPurchases, query);
    filteredTransports = filterTransportsByQuery(filteredTransports, query);
  }

  // Step 3: Apply advanced filtering
  filteredOffers = filterOffersAdvanced(filteredOffers, filters);
  filteredPurchases = filterPurchasesAdvanced(filteredPurchases, filters);
  filteredTransports = filterTransportsAdvanced(filteredTransports, filters);

  // Step 4: Apply user context filtering (role-based filtering)
  const { offers, purchases, transports } = filterByUserContext(
    filteredOffers,
    filteredPurchases,
    filteredTransports,
    userContext
  );

  // Step 5: Apply pagination (default 5 per page for view more functionality)
  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;

  const paginatedOffers = offers.slice(startIndex, endIndex);
  const paginatedPurchases = purchases.slice(startIndex, endIndex);
  const paginatedTransports = transports.slice(startIndex, endIndex);

  const totalResults = offers.length + purchases.length + transports.length;
  const totalPages = Math.ceil(totalResults / pagination.pageSize);

  return {
    query,
    totalResults,
    results: {
      offers: paginatedOffers,
      purchases: paginatedPurchases,
      transports: paginatedTransports,
    },
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages,
    },
  };
}
