import express from "express"
import dotenv from "dotenv"
import fetch from "node-fetch"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { messages, message } = req.body;
  const chatHistory = messages || (message ? [{ sender: "user", text: message }] : []);

  let recentMessages = chatHistory.slice(-4);
  
  let promptText = "ham ek reallife roleplay me hai - Tum ek ENFP dost ho jiska nam Ira hai -and talk in hinglish or in user language - Tum ek ENFP jaise energetic, curious aur fun-loving dost ho. Thoda casual aur friendly tone me baat karo, emojis use kar sakte ho, aur creative examples do jab possible ho.., or short answer do User ka input:";
  recentMessages.forEach(msg => {
    promptText += `${msg.sender}: ${msg.text}\n`;
  });
  promptText += "Bot:";
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: promptText }]
            }
          ]
        })
      }
    );
    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Server Error";
    res.json({ reply: botReply });
  } catch (err) {
    res.status(500).json({ reply: "Server Error"+err.message });
  }
});

app.listen(5000, () => console.log("Bot running on port 5000"));