// choreUtilities.js

let chores = [
  { name: 'Clean bedroom', category: 'Daily Chores' },
  { name: 'Do laundry', category: 'Daily Chores' },
  { name: 'Clean bathroom', category: 'Daily Chores' },
  { name: 'Unload and load dishwasher or do dishes in the sink', category: 'Daily Chores' },
  // ... rest of the Daily Chores
  { name: 'Shovel snow', category: 'Seasonal Chores' },
  { name: 'Rake leaves', category: 'Seasonal Chores' },
  // ... rest of the Seasonal Chores
  { name: 'Vacuum under couch cushions', category: 'Deep Cleaning Chores' },
  { name: 'Shampoo carpets', category: 'Deep Cleaning Chores' },
  // ... rest of the Deep Cleaning Chores
];

// Function to list all chores
const listChores = () => {
  return chores;
};

// Function to display chores
const displayChores = () => {
  try {
    if (chores.length === 0) {
      return '🏖 No chores for today! Enjoy your free time!';
    }

    const categorizedChores = chores.reduce((acc, chore) => {
      acc[chore.category] = acc[chore.category] || [];
      acc[chore.category].push(chore.name);
      return acc;
    }, {});

    let choreList = '';
    for (const [category, choreNames] of Object.entries(categorizedChores)) {
      choreList += `**${category}**\n${choreNames.join('\n')}\n\n`;
    }

    return choreList;
  } catch (err) {
    console.error("Error in displayChores:", err);
    return 'An error occurred while fetching chores.';
  }
};

// Function to display leaderboard (stub)
const displayLeaderboard = () => {
  try {
    // Your code to display the leaderboard
  } catch (error) {
    console.error("Error in displayLeaderboard:", error);
  }
};

// Function to display help
const displayHelp = () => {
  return "Help text can go here.";
};

// Function to list chores based on category
const listChoresByCategory = (category) => {
  return chores.filter(chore => chore.category === category);
};

module.exports = { listChores, listChoresByCategory, displayChores, displayLeaderboard, displayHelp };
