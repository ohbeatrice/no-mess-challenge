// Complete chores list along with their categories
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

// Function to list chores
const listChores = () => {
  return chores;
};

// Function to display chores
const displayChores = (channel) => {
  try {
    const cleverResponses = [
      "🌟 Chore-o-vision: Presenting the Chorescape Saga! 🪄\n",
      "🎉 Chore-tastic Adventure Awaits! Your Chores of the Day:\n",
      "🪚 The Chore Chronicles Unfold: Dive into Today's Tasks!\n",
      "🚀 Chore Quest: Embark on a Journey through Household Heroism!\n",
      "🔮 The Enchanted Choreboard: Where Tasks Transform into Triumphs!\n"
    ];
    
    const randomResponse = cleverResponses[Math.floor(Math.random() * cleverResponses.length)];

    if (chores.length === 0) {
      channel.send('🏖 No chores for today! Enjoy your free time!');
      return;
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

    channel.send(`${randomResponse}${choreList}`);
  } catch (err) {
    console.error("Error in displayChores:", err);
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

module.exports = { listChores, displayChores, displayLeaderboard };
