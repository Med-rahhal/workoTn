const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const User = require("../models/user");
const Project = require("../models/service"); 
const Proposal = require("../models/proposal");

// 

// id, metadata , text



//

async function handleStatsQuestions(message) {
  const msg = message.toLowerCase();

  if (msg.includes("combien") && msg.includes("utilisateur")) {
    const count = await User.countDocuments();
    return {
      content: `Il y a actuellement ${count} utilisateur(s) inscrits sur Workoo.`,
      statOnly: true
    };
  }

  if (msg.includes("combien") && msg.includes("projet") && !msg.includes("aujourd'hui")) {
    const count = await Project.countDocuments();
    return {
      content: `Il y a actuellement ${count} projet(s) publiés sur Workoo.`,
      statOnly: true
    };
  }

  if (msg.includes("combien") || (msg.includes("projet") || msg.includes("projets")) && msg.includes("aujourd'hui")) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const count = await Project.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    return {
      content: `Aujourd’hui, ${count} projet(s) ont été publiés sur Workoo.`,
      statOnly: true
    };
  }

  if (msg.includes("combien") && (msg.includes("proposition") || msg.includes("soumission"))) {
    const count = await Proposal.countDocuments();
    return {
      content: `Il y a actuellement ${count} proposition(s) envoyées sur les projets Workoo.`,
      statOnly: true
    };
  }

  if (msg.includes("statistique")) {
    const userCount = await User.countDocuments();
    const projectCount = await Project.countDocuments();
    const proposalCount = await Proposal.countDocuments();

    return {
      content: ` Statistiques globales : ${userCount} utilisateur(s), ${projectCount} projet(s), ${proposalCount} proposition(s).`,
      statOnly: true
    };
  }

 if (
    (msg.includes("utilisateur") || msg.includes("freelance")) &&
    (msg.includes("fréquent") || msg.includes("actif") || msg.includes("proposition"))
  ) {
    const topUser = await Proposal.aggregate([
      {
        $group: {
          _id: "$idUser", 
          totalProposals: { $sum: 1 }
        }
      },
      { $sort: { totalProposals: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users", 
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: { $concat: ["$user.firstname", " ", "$user.lastname"] },
          totalProposals: 1
        }
      }
    ]);

    if (topUser.length > 0) {
      const user = topUser[0];
      return {
        content: `L'utilisateur le plus actif est **${user.name}** avec **${user.totalProposals}** proposition(s) envoyée(s).`,
        statOnly: true
      };
    } else {
      return {
        content: "Aucun utilisateur actif trouvé pour le moment.",
        statOnly: true
      };
    }
  }

  return null;
}

// Contrôleur principal du chatbot
exports.askWorkoTn = async (req, res) => {
  try {
    const { history } = req.body;
    const lastUserMessage = history[history.length - 1]?.content || '';

    const systemPrompt = {
      role: "system",
      content: "You are WorkoTn, Workoo assistant. Always answer in a polite and helpful way. You can be funny and loud sometimes."
    };

    const hasSystem = history.find(msg => msg.role === "system");
    if (!hasSystem) {
      history.unshift(systemPrompt);
    }

    const statResponse = await handleStatsQuestions(lastUserMessage);

    if (statResponse) {
      const { content, statOnly } = statResponse;

      history.push({ role: "assistant", content });

     
      if (statOnly) {
        return res.json({ answer: content, updatedHistory: history });
      }

     
      const chatCompletion = await groq.chat.completions.create({
        messages: history,
        model: "llama-3.3-70b-versatile",
      });

      const finalAnswer = chatCompletion.choices[0]?.message?.content || content;
      history.push({ role: "assistant", content: finalAnswer });

      return res.json({ answer: finalAnswer, updatedHistory: history });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: history,
      model: "llama-3.3-70b-versatile",
    });

    const answer = chatCompletion.choices[0]?.message?.content || "Pas de réponse";
    history.push({ role: "assistant", content: answer });

    res.json({ answer, updatedHistory: history });

  } catch (error) {
    console.error("Erreur Groq :", error.message);
    res.status(500).json({ error: "Erreur lors de l'appel à Groq" });
  }
};