// Static responses for Odysseus statue
const responses = [
  "Ah, another mortal seeking wisdom from stone. How... predictable.",
  "In my wanderings, I've seen empires rise and fall. Your question seems... trivial in comparison.",
  "By Athena's wisdom, you remind me of the countless fools I've encountered across the wine-dark sea.",
  "Even Circe's enchantments were more straightforward than the riddles of your modern world.",
  "The Cyclops had more insight, and he had but one eye.",
  "Your words echo like the empty halls of Ithaca during my absence.",
  "Time flows differently when you're carved in stone. Perhaps you should ponder that.",
  "I've outwitted gods and monsters. Your query barely stirs my ancient thoughts."
];

export const getOdysseusResponse = async (userMessage: string): Promise<string> => {
  // Randomly select a response
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};