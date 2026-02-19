/**
 * Suitability Engine - Maps skin tone to suitable colors
 */

const colorRecommendations = {
  'Very Fair': {
    range: [1, 2],
    colors: ['Pastel Pink', 'Lavender', 'Mint Green', 'Peach', 'Light Blue', 'Cream']
  },
  'Fair': {
    range: [3, 4],
    colors: ['Coral', 'Turquoise', 'Rose', 'Powder Blue', 'Soft Yellow', 'Lilac']
  },
  'Medium': {
    range: [5, 6],
    colors: ['White', 'Sky Blue', 'Baby Pink', 'Orange', 'Emerald Green', 'Royal Blue']
  },
  'Dusky': {
    range: [7, 8],
    colors: ['Maroon', 'Mustard', 'Olive Green', 'Burnt Orange', 'Teal', 'Deep Purple']
  },
  'Deep': {
    range: [9, 10],
    colors: ['Bright Red', 'Electric Blue', 'Hot Pink', 'Lime Green', 'Gold', 'Magenta']
  }
};

/**
 * Get suitable colors based on tone score
 */
function getSuitableColors(toneScore) {
  for (const [label, data] of Object.entries(colorRecommendations)) {
    const [min, max] = data.range;
    if (toneScore >= min && toneScore <= max) {
      return data.colors;
    }
  }
  return colorRecommendations['Medium'].colors; // Default fallback
}

/**
 * Get tone label from score
 */
function getToneLabel(toneScore) {
  for (const [label, data] of Object.entries(colorRecommendations)) {
    const [min, max] = data.range;
    if (toneScore >= min && toneScore <= max) {
      return label;
    }
  }
  return 'Medium';
}

/**
 * Get detailed color palette with hex codes
 */
function getColorPalette(toneScore) {
  const colors = getSuitableColors(toneScore);
  
  const colorHexMap = {
    'White': '#FFFFFF',
    'Sky Blue': '#87CEEB',
    'Baby Pink': '#F4C2C2',
    'Orange': '#FFA500',
    'Emerald Green': '#50C878',
    'Royal Blue': '#4169E1',
    'Pastel Pink': '#FFD1DC',
    'Lavender': '#E6E6FA',
    'Mint Green': '#98FF98',
    'Peach': '#FFDAB9',
    'Light Blue': '#ADD8E6',
    'Cream': '#FFFDD0',
    'Coral': '#FF7F50',
    'Turquoise': '#40E0D0',
    'Rose': '#FF007F',
    'Powder Blue': '#B0E0E6',
    'Soft Yellow': '#FFFFE0',
    'Lilac': '#C8A2C8',
    'Maroon': '#800000',
    'Mustard': '#FFDB58',
    'Olive Green': '#808000',
    'Burnt Orange': '#CC5500',
    'Teal': '#008080',
    'Deep Purple': '#673AB7',
    'Bright Red': '#FF0000',
    'Electric Blue': '#7DF9FF',
    'Hot Pink': '#FF69B4',
    'Lime Green': '#32CD32',
    'Gold': '#FFD700',
    'Magenta': '#FF00FF',
    'Black': '#000000',
    'Brown': '#8B4513'
  };
  
  return colors.map(color => ({
    name: color,
    hex: colorHexMap[color] || '#CCCCCC'
  }));
}

module.exports = {
  getSuitableColors,
  getToneLabel,
  getColorPalette,
  colorRecommendations
};
