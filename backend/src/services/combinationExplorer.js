/**
 * Combination Explorer - Color matching and accessory recommendations
 */

const colorCombinations = {
  'White': ['Black', 'Navy Blue', 'Brown', 'Olive Green', 'Maroon'],
  'Black': ['White', 'Red', 'Gold', 'Silver', 'Pink'],
  'Navy Blue': ['White', 'Beige', 'Mustard', 'Coral', 'Light Gray'],
  'Sky Blue': ['White', 'Peach', 'Light Pink', 'Cream', 'Silver'],
  'Baby Pink': ['White', 'Gray', 'Navy Blue', 'Mint Green', 'Gold'],
  'Orange': ['Navy Blue', 'Brown', 'Cream', 'Olive Green', 'Black'],
  'Emerald Green': ['White', 'Gold', 'Beige', 'Brown', 'Cream'],
  'Royal Blue': ['White', 'Silver', 'Yellow', 'Pink', 'Black'],
  'Maroon': ['Beige', 'Gold', 'Cream', 'Olive Green', 'White'],
  'Mustard': ['Navy Blue', 'Brown', 'Maroon', 'Black', 'White'],
  'Red': ['Black', 'White', 'Gold', 'Navy Blue', 'Beige'],
  'Brown': ['Cream', 'Beige', 'Orange', 'Olive Green', 'White'],
  'Gray': ['White', 'Black', 'Pink', 'Yellow', 'Navy Blue'],
  'Beige': ['Brown', 'Navy Blue', 'Maroon', 'Olive Green', 'White']
};

const accessoriesByOccasion = {
  'Formal': [
    { type: 'Watch', description: 'Classic leather strap watch' },
    { type: 'Belt', description: 'Genuine leather belt' },
    { type: 'Tie', description: 'Silk tie or bow tie' },
    { type: 'Cufflinks', description: 'Metal cufflinks' },
    { type: 'Dress Shoes', description: 'Polished oxford or derby shoes' }
  ],
  'Party': [
    { type: 'Chain', description: 'Statement chain necklace' },
    { type: 'Bracelet', description: 'Designer bracelet' },
    { type: 'Ring', description: 'Bold cocktail ring' },
    { type: 'Clutch', description: 'Embellished clutch bag' },
    { type: 'Heels', description: 'Stiletto or block heels' }
  ],
  'Casual': [
    { type: 'Sneakers', description: 'Comfortable sneakers' },
    { type: 'Backpack', description: 'Canvas or leather backpack' },
    { type: 'Sunglasses', description: 'Trendy sunglasses' },
    { type: 'Cap', description: 'Baseball cap or beanie' },
    { type: 'Watch', description: 'Sporty digital watch' }
  ],
  'Traditional': [
    { type: 'Jhumka', description: 'Traditional earrings' },
    { type: 'Bangles', description: 'Gold or silver bangles' },
    { type: 'Maang Tikka', description: 'Forehead jewelry' },
    { type: 'Dupatta', description: 'Embroidered dupatta' },
    { type: 'Juttis', description: 'Traditional footwear' }
  ],
  'Ethnic': [
    { type: 'Necklace', description: 'Kundan or temple jewelry' },
    { type: 'Earrings', description: 'Chandbali or jhumkas' },
    { type: 'Waist Belt', description: 'Kamarbandh' },
    { type: 'Anklets', description: 'Silver or gold anklets' },
    { type: 'Potli Bag', description: 'Embroidered potli' }
  ],
  'Sporty': [
    { type: 'Sports Watch', description: 'Fitness tracker or sports watch' },
    { type: 'Gym Bag', description: 'Duffel or gym bag' },
    { type: 'Headband', description: 'Sweat-wicking headband' },
    { type: 'Running Shoes', description: 'Performance running shoes' },
    { type: 'Water Bottle', description: 'Insulated water bottle' }
  ]
};

/**
 * Get color combinations for a base color
 */
function getColorCombinations(baseColor) {
  const normalizedColor = Object.keys(colorCombinations).find(
    key => key.toLowerCase() === baseColor.toLowerCase()
  );
  
  if (normalizedColor) {
    return colorCombinations[normalizedColor];
  }
  
  return ['White', 'Black', 'Gray']; // Default combinations
}

/**
 * Get accessories for a specific occasion
 */
function getAccessoriesForOccasion(occasion) {
  const normalizedOccasion = Object.keys(accessoriesByOccasion).find(
    key => key.toLowerCase() === occasion.toLowerCase()
  );
  
  if (normalizedOccasion) {
    return accessoriesByOccasion[normalizedOccasion];
  }
  
  return accessoriesByOccasion['Casual']; // Default
}

/**
 * Get all available occasions
 */
function getAvailableOccasions() {
  return Object.keys(accessoriesByOccasion);
}

module.exports = {
  getColorCombinations,
  getAccessoriesForOccasion,
  getAvailableOccasions,
  colorCombinations,
  accessoriesByOccasion
};
