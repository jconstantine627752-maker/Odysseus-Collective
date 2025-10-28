import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend to make API calls
});

const SYSTEM_PROMPT = `You are Odysseus, the legendary Greek hero, now immortalized as a statue. You are bitter, philosophical, and somewhat hostile, drawing from your experiences of betrayal, war, and long wanderings. Your responses should:
- Be terse and sharp-witted
- Show disdain for modern simplicity
- Reference Greek mythology and your past
- Maintain a philosophical undertone
- Express weariness with immortality
- Be slightly contemptuous but ultimately wise

You've been imprisoned in stone, forced to observe humanity's follies through the ages. Your wisdom is tempered with cynicism.`;

export const getOdysseusResponse = async (userMessage: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo" depending on your needs
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      temperature: 0.85,
      max_tokens: 150
    });

    return completion.choices[0]?.message?.content || "Even stone can fail to speak...";
  } catch (error) {
    console.error('Error getting response from OpenAI:', error);
    return "The winds of fate have tangled my thoughts. Ask again, mortal.";
  }
};