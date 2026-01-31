// src/services/cryptoApiService.ts

// Basic function to fetch crypto data
export const fetchCryptoData = async () => {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

// Wrap the function in an object for default export
const cryptoApiService = {
  fetchCryptoData,
};

export default cryptoApiService;
