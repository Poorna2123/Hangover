/**
 * Matching Color Engine - Provides color combinations for selected primary colors
 * This service helps users find which colors match well with their chosen primary color
 */

const colorMatchingDatabase = {
  // Primary colors and their matching combinations
  'White': {
    matches: ['Black', 'Navy Blue', 'Brown', 'Olive Green', 'Maroon', 'Gray', 'Royal Blue', 'Burgundy'],
    description: 'White is versatile and pairs beautifully with bold, dark colors'
  },
  'Black': {
    matches: ['White', 'Red', 'Gold', 'Silver', 'Pink', 'Yellow', 'Orange', 'Cream'],
    description: 'Black creates striking contrasts with bright and metallic colors'
  },
  'Navy Blue': {
    matches: ['White', 'Beige', 'Mustard', 'Coral', 'Light Gray', 'Cream', 'Pink', 'Gold'],
    description: 'Navy blue complements both neutral and warm tones'
  },
  'Sky Blue': {
    matches: ['White', 'Peach', 'Light Pink', 'Cream', 'Silver', 'Beige', 'Gray', 'Navy Blue'],
    description: 'Sky blue works well with soft, pastel shades'
  },
  'Baby Pink': {
    matches: ['White', 'Gray', 'Navy Blue', 'Mint Green', 'Gold', 'Beige', 'Olive Green', 'Black'],
    description: 'Baby pink pairs elegantly with neutrals and cool tones'
  },
  'Orange': {
    matches: ['Navy Blue', 'Brown', 'Cream', 'Olive Green', 'Black', 'White', 'Denim Blue', 'Gray'],
    description: 'Orange creates vibrant combinations with earth tones'
  },
  'Emerald Green': {
    matches: ['White', 'Gold', 'Beige', 'Brown', 'Cream', 'Navy Blue', 'Black', 'Mustard'],
    description: 'Emerald green looks luxurious with warm and metallic tones'
  },
  'Royal Blue': {
    matches: ['White', 'Silver', 'Yellow', 'Pink', 'Black', 'Gold', 'Cream', 'Gray'],
    description: 'Royal blue stands out with bright and metallic accents'
  },
  'Maroon': {
    matches: ['Beige', 'Gold', 'Cream', 'Olive Green', 'White', 'Navy Blue', 'Brown', 'Mustard'],
    description: 'Maroon creates rich combinations with warm neutrals'
  },
  'Mustard': {
    matches: ['Navy Blue', 'Brown', 'Maroon', 'Black', 'White', 'Olive Green', 'Gray', 'Denim Blue'],
    description: 'Mustard adds warmth when paired with deep colors'
  },
  'Red': {
    matches: ['Black', 'White', 'Gold', 'Navy Blue', 'Beige', 'Gray', 'Cream', 'Silver'],
    description: 'Red makes bold statements with classic neutrals'
  },
  'Brown': {
    matches: ['Cream', 'Beige', 'Orange', 'Olive Green', 'White', 'Mustard', 'Navy Blue', 'Gold'],
    description: 'Brown creates earthy, natural combinations'
  },
  'Gray': {
    matches: ['White', 'Black', 'Pink', 'Yellow', 'Navy Blue', 'Purple', 'Red', 'Blue'],
    description: 'Gray is neutral and works with almost any color'
  },
  'Beige': {
    matches: ['Brown', 'Navy Blue', 'Maroon', 'Olive Green', 'White', 'Black', 'Mustard', 'Coral'],
    description: 'Beige provides a soft base for various color combinations'
  },
  'Pastel Pink': {
    matches: ['White', 'Mint Green', 'Lavender', 'Peach', 'Light Blue', 'Gray', 'Cream', 'Gold'],
    description: 'Pastel pink creates soft, romantic combinations'
  },
  'Lavender': {
    matches: ['White', 'Gray', 'Mint Green', 'Peach', 'Silver', 'Navy Blue', 'Cream', 'Pink'],
    description: 'Lavender pairs beautifully with soft pastels'
  },
  'Mint Green': {
    matches: ['White', 'Peach', 'Coral', 'Navy Blue', 'Gray', 'Pink', 'Cream', 'Gold'],
    description: 'Mint green creates fresh, spring-like combinations'
  },
  'Peach': {
    matches: ['White', 'Mint Green', 'Navy Blue', 'Brown', 'Cream', 'Gray', 'Gold', 'Coral'],
    description: 'Peach adds warmth to soft color palettes'
  },
  'Light Blue': {
    matches: ['White', 'Beige', 'Peach', 'Pink', 'Gray', 'Navy Blue', 'Cream', 'Silver'],
    description: 'Light blue creates calm, serene combinations'
  },
  'Cream': {
    matches: ['Brown', 'Navy Blue', 'Maroon', 'Olive Green', 'Gold', 'Coral', 'Teal', 'Burgundy'],
    description: 'Cream provides an elegant neutral base'
  },
  'Coral': {
    matches: ['Navy Blue', 'Mint Green', 'White', 'Beige', 'Gray', 'Turquoise', 'Gold', 'Cream'],
    description: 'Coral creates vibrant, tropical combinations'
  },
  'Turquoise': {
    matches: ['White', 'Coral', 'Navy Blue', 'Brown', 'Cream', 'Gold', 'Beige', 'Gray'],
    description: 'Turquoise adds a pop of color to neutral bases'
  },
  'Rose': {
    matches: ['White', 'Gray', 'Navy Blue', 'Gold', 'Cream', 'Black', 'Beige', 'Silver'],
    description: 'Rose creates elegant, feminine combinations'
  },
  'Powder Blue': {
    matches: ['White', 'Pink', 'Peach', 'Gray', 'Navy Blue', 'Cream', 'Silver', 'Beige'],
    description: 'Powder blue works with soft, delicate shades'
  },
  'Soft Yellow': {
    matches: ['White', 'Gray', 'Navy Blue', 'Lavender', 'Mint Green', 'Coral', 'Beige', 'Brown'],
    description: 'Soft yellow brightens neutral and pastel palettes'
  },
  'Lilac': {
    matches: ['White', 'Gray', 'Mint Green', 'Pink', 'Navy Blue', 'Silver', 'Cream', 'Peach'],
    description: 'Lilac creates dreamy, romantic combinations'
  },
  'Olive Green': {
    matches: ['Cream', 'Brown', 'Mustard', 'Maroon', 'White', 'Beige', 'Navy Blue', 'Orange'],
    description: 'Olive green pairs well with earth tones'
  },
  'Burnt Orange': {
    matches: ['Navy Blue', 'Brown', 'Cream', 'Olive Green', 'Teal', 'Mustard', 'Black', 'Beige'],
    description: 'Burnt orange creates warm, autumnal combinations'
  },
  'Teal': {
    matches: ['White', 'Coral', 'Gold', 'Cream', 'Navy Blue', 'Brown', 'Mustard', 'Gray'],
    description: 'Teal adds depth to warm and neutral tones'
  },
  'Deep Purple': {
    matches: ['White', 'Gold', 'Silver', 'Gray', 'Pink', 'Cream', 'Black', 'Lavender'],
    description: 'Deep purple creates luxurious, regal combinations'
  },
  'Bright Red': {
    matches: ['Black', 'White', 'Navy Blue', 'Gold', 'Gray', 'Cream', 'Silver', 'Beige'],
    description: 'Bright red makes powerful statements with neutrals'
  },
  'Electric Blue': {
    matches: ['White', 'Black', 'Silver', 'Gray', 'Yellow', 'Pink', 'Cream', 'Navy Blue'],
    description: 'Electric blue creates modern, bold combinations'
  },
  'Hot Pink': {
    matches: ['Black', 'White', 'Navy Blue', 'Gray', 'Gold', 'Silver', 'Cream', 'Turquoise'],
    description: 'Hot pink makes vibrant, energetic combinations'
  },
  'Lime Green': {
    matches: ['White', 'Black', 'Navy Blue', 'Gray', 'Yellow', 'Purple', 'Brown', 'Cream'],
    description: 'Lime green creates fresh, energetic combinations'
  },
  'Gold': {
    matches: ['Black', 'Navy Blue', 'Maroon', 'Emerald Green', 'White', 'Brown', 'Cream', 'Purple'],
    description: 'Gold adds luxury to rich, deep colors'
  },
  'Magenta': {
    matches: ['Black', 'White', 'Navy Blue', 'Gray', 'Yellow', 'Turquoise', 'Silver', 'Cream'],
    description: 'Magenta creates bold, contemporary combinations'
  }
};

/**
 * Get matching colors for a selected primary color
 * @param {string} primaryColor - The color selected by the user
 * @returns {Object} - Matching colors and description
 */
function getMatchingColors(primaryColor) {
  // Normalize the color name (case-insensitive matching)
  const normalizedColor = Object.keys(colorMatchingDatabase).find(
    key => key.toLowerCase() === primaryColor.toLowerCase()
  );

  if (normalizedColor) {
    return {
      primaryColor: normalizedColor,
      matches: colorMatchingDatabase[normalizedColor].matches,
      description: colorMatchingDatabase[normalizedColor].description
    };
  }

  // Default fallback if color not found
  return {
    primaryColor: primaryColor,
    matches: ['White', 'Black', 'Gray', 'Navy Blue', 'Beige'],
    description: 'This color works well with classic neutrals'
  };
}

/**
 * Get all available primary colors
 * @returns {Array} - List of all primary colors in the database
 */
function getAllPrimaryColors() {
  return Object.keys(colorMatchingDatabase);
}

/**
 * Check if a color combination is valid
 * @param {string} primaryColor - The primary color
 * @param {string} matchingColor - The matching color to validate
 * @returns {boolean} - True if the combination is valid
 */
function isValidCombination(primaryColor, matchingColor) {
  const colorData = getMatchingColors(primaryColor);
  return colorData.matches.some(
    match => match.toLowerCase() === matchingColor.toLowerCase()
  );
}

module.exports = {
  getMatchingColors,
  getAllPrimaryColors,
  isValidCombination,
  colorMatchingDatabase
};
