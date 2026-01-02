// // User types for the automotive marketplace
// export type UserType = "seller" | "buyer" | "carrier" | "agent";

// export interface UserContext {
//   userType: UserType;
//   accountId: string;
//   userId: string;
// }

// // Entity types for search results
// export type EntityType = "offer" | "purchase" | "transport";

// // Base interface for all search results
// interface BaseSearchResult {
//   id: string;
//   entityType: EntityType;
//   score?: number;
// }

// // Offer entity
// export interface OfferResult extends BaseSearchResult {
//   entityType: "offer";
//   vin: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   location: string;
//   condition: "new" | "used" | "certified";
//   status: "available" | "pending" | "sold";
// }

// // Purchase entity
// export interface PurchaseResult extends BaseSearchResult {
//   entityType: "purchase";
//   purchaseId: string;
//   offerVin: string;
//   offerMake: string;
//   offerModel: string;
//   buyerName: string;
//   buyerEmail: string;
//   purchaseDate: string;
//   status: "pending" | "completed" | "cancelled";
// }

// // Transport entity
// export interface TransportResult extends BaseSearchResult {
//   entityType: "transport";
//   transportId: string;
//   carrierName: string;
//   carrierPhone: string;
//   pickupLocation: string;
//   deliveryLocation: string;
//   scheduleDate: string;
//   status: "scheduled" | "in_transit" | "delivered" | "cancelled";
//   relatedOfferVin?: string;
//   relatedOfferMake?: string;
//   relatedOfferModel?: string;
// }

// // Discriminated union for all result types
// export type SearchResult = OfferResult | PurchaseResult | TransportResult;

// // Autocomplete suggestion
// export interface AutocompleteSuggestion {
//   id: string;
//   text: string;
//   entityType: EntityType;
//   highlightedText: string;
// }

// // Grouped search response
// export interface SearchResponse {
//   query: string;
//   totalResults: number;
//   results: {
//     offers: OfferResult[];
//     purchases: PurchaseResult[];
//     transports: TransportResult[];
//   };
//   pagination: {
//     page: number;
//     pageSize: number;
//     totalPages: number;
//   };
// }

// // Role-based hints for UX
// export const USER_TYPE_HINTS: Record<UserType, string> = {
//   seller: "You can only see your own offers.",
//   buyer: "You can search available offers and your purchase history.",
//   carrier: "You can search your transport assignments and related vehicles.",
//   agent: "You can search across offers, purchases, and transports.",
// };

// export const USER_TYPE_LABELS: Record<UserType, string> = {
//   seller: "Seller",
//   buyer: "Buyer",
//   carrier: "Carrier",
//   agent: "Agent",
// };

// User types for the automotive marketplace
export type UserType = "seller" | "buyer" | "carrier" | "agent";
export interface UserContext {
  userType: UserType;
  accountId: string;
  userId: string;
}
// Entity types for search results
export type EntityType = "offer" | "purchase" | "transport";
// Base interface for all search results
interface BaseSearchResult {
  id: string;
  entityType: EntityType;
  score?: number;
}
// Offer entity
export interface OfferResult extends BaseSearchResult {
  entityType: "offer";
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  condition: "new" | "used" | "certified";
  status: "available" | "pending" | "sold";
}
// Purchase entity
export interface PurchaseResult extends BaseSearchResult {
  entityType: "purchase";
  purchaseId: string;
  offerVin: string;
  offerMake: string;
  offerModel: string;
  buyerName: string;
  buyerEmail: string;
  purchaseDate: string;
  status: "pending" | "completed" | "cancelled";
}
// Transport entity
export interface TransportResult extends BaseSearchResult {
  entityType: "transport";
  transportId: string;
  carrierName: string;
  carrierPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  scheduleDate: string;
  status: "scheduled" | "in_transit" | "delivered" | "cancelled";
  relatedOfferVin?: string;
  relatedOfferMake?: string;
  relatedOfferModel?: string;
}
// Discriminated union for all result types
export type SearchResult = OfferResult | PurchaseResult | TransportResult;
// Autocomplete suggestion
export interface AutocompleteSuggestion {
  id: string;
  text: string;
  entityType: EntityType;
  highlightedText: string;
}
// Grouped search response
export interface SearchResponse {
  query: string;
  totalResults: number;
  results: {
    offers: OfferResult[];
    purchases: PurchaseResult[];
    transports: TransportResult[];
  };
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
// Role-based hints for UX
export const USER_TYPE_HINTS: Record<UserType, string> = {
  seller: "You can only see your own offers.",
  buyer: "You can search available offers and your purchase history.",
  carrier: "You can search your transport assignments and related vehicles.",
  agent: "You can search across offers, purchases, and transports.",
};
export const USER_TYPE_LABELS: Record<UserType, string> = {
  seller: "Seller",
  buyer: "Buyer",
  carrier: "Carrier",
  agent: "Agent",
};
// Status filter options for search
export type StatusFilter = "all" | "complete" | "pending" | "in_transit";
export const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  all: "All Status",
  complete: "Complete",
  pending: "Pending",
  in_transit: "In Transit",
};
// Advanced search filters interface
export interface SearchFilters {
  status: StatusFilter;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  location: string;
}
