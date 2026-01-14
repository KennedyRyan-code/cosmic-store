import { Product, User } from '../types';

export interface PriceResult {
  finalPrice: number;
  originalPrice: number;
  discountApplied: boolean;
  reason: string | null;
}

/**
 * Calculates the personalized price for a product based on the user's profile.
 * Rules:
 * 1. Gold Status (>1000 points): 10% discount
 * 2. New User (0 points): $5 off items over $50
 * 3. Specific categories: 5% off "Accessories" for all logged-in users
 */
export const getPersonalizedPrice = (product: Product, user: User | null): PriceResult => {
  let price = product.price;
  let reason: string | null = null;
  let discountApplied = false;

  if (!user) {
    return { finalPrice: price, originalPrice: price, discountApplied: false, reason: null };
  }

  // 1. Loyalty Discount (Gold)
  if (user.loyaltyPoints > 1000) {
    price = price * 0.9;
    reason = "Gold Member 10% Discount";
    discountApplied = true;
  } 
  // 2. Welcome Discount
  else if (user.loyaltyPoints === 0 && product.price > 50) {
    price = price - 5;
    reason = "New Member Welcome Discount";
    discountApplied = true;
  }

  // 3. Category specific rule
  if (product.category === 'Accessories' && !discountApplied) {
    price = price * 0.95;
    reason = "Exclusive Accessory Offer";
    discountApplied = true;
  }

  return {
    finalPrice: Number(price.toFixed(2)),
    originalPrice: product.price,
    discountApplied,
    reason
  };
};
