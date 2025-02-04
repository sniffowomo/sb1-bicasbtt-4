// Types for the hash function responses
export type HashResponse = {
  hash: string;
  timestamp?: string;
  // Add other potential response fields here
};

// Generic type for handling different JSON response structures
export type JsonResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

/**
 * Processes a response and extracts the required hash value
 * @param response The JSON response from the API
 * @returns The extracted hash value
 */
export const extractHashFromResponse = <T extends HashResponse>(response: JsonResponse<T>): string => {
  if (!response.data || !response.data.hash) {
    throw new Error('Invalid response format: hash not found');
  }
  return response.data.hash;
};

/**
 * Generates a SHA-512 hash from input text
 * @param text The input text to hash
 * @returns A promise that resolves to the hash string
 */
export const generateSHA512 = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};