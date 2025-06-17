// src/lib/config.ts

export const pricing = {
  // Base address for all distance calculations
  BASE_ADDRESS: '6008 Windridge Ln, Flower Mound, TX 75028',

  // Travel Fee Calculation
  // travel fee = (distance in miles * COST_PER_MILE) + FLAT_TRAVEL_FEE
  COST_PER_MILE: 2, // $4 per mile
  FLAT_TRAVEL_FEE: 100, // $100 flat fee for travel

  // Setup Fee Calculation
  // setup fee = ramp length in feet * INSTALL_COST_PER_FOOT
  INSTALL_COST_PER_FOOT: 15, // $15 per foot for installation

  // Monthly Rental Fee Calculation
  // rental fee = ramp length in feet * RENTAL_COST_PER_FOOT
  RENTAL_COST_PER_FOOT: 11, // $25 per foot for monthly rental
  
  // Ramp Length Calculation
  // ramp length (ft) = step height (in) * RAMP_LENGTH_PER_INCH_OF_RISE
  RAMP_LENGTH_PER_INCH_OF_RISE: 1, // 1 foot of ramp for every 1 inch of rise (1:12 slope)
}; 