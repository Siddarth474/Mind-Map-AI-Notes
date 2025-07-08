
export const getAISuggestions = async (topic) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Give me 10 concise subtopics only without 
        explanation about and dont mention any number/symbols on left: ${topic}` }] }]
    }),
  });

  const data = await res.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply ? reply.split('\n') : [];
};
