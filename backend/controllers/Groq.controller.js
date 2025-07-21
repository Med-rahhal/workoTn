
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});

exports.askWorkoTn= async (req, res) => {
  try {
    const { history } = req.body;

    // Ajout du prompt système si ce n'est pas déjà inclus
    const systemPrompt = {
      role: "system",
      content:
        "You are Rahal, Workoo assistant. Always answer in a polite and helpful way. You can be funny and loud sometimes."
    };

    // Si aucun message système trouvé dans l'historique, on l'ajoute au début
    const hasSystem = history.find(msg => msg.role === "system");
    if (!hasSystem) {
      history.unshift(systemPrompt);
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: history,
      model: "llama-3.3-70b-versatile",
    });

    const answer = chatCompletion.choices[0]?.message?.content || "Pas de réponse";
    
    // Ajouter la réponse au fil de l’historique (facultatif)
    history.push({ role: "assistant", content: answer });

    res.json({ answer, updatedHistory: history });
  } catch (error) {
    console.error("Erreur Groq :", error.message);
    res.status(500).json({ error: "Erreur lors de l'appel à Groq" });
  }
};