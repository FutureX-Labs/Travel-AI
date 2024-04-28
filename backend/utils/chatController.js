const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('dotenv');
const { LocalStorage } = require("node-localstorage");

config();

const configuration = new GoogleGenerativeAI(process.env.API_KEY);

const localStorage = new LocalStorage("./localStorage");

const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });


async function handleChat(prompt, DataCondition) {
    try {
        console.log("Prompt: ", prompt);

        const currentMessages = [];

        const chatHistory = localStorage.getItem("chatHistory");
        const conversationContext = chatHistory ? JSON.parse(chatHistory) : [];

        for (const [inputText, responseText] of conversationContext) {
            currentMessages.push({ role: "user", parts: inputText });
            currentMessages.push({ role: "model", parts: responseText });
        }

        const chat = model.startChat({
            history: currentMessages,
            generationConfig: {
                maxOutputTokens: 3000,
            },
        });

        let response = null;
        if (DataCondition && DataCondition !== "") {
            const result = await chat.sendMessage(DataCondition);
            response = result.response.text();
            const jsonResult = JSON.parse(response);
            conversationContext.push([prompt, JSON.stringify(jsonResult.data)]);
        } else {
            const result = await chat.sendMessage(prompt);
            response = result.response.text();
            conversationContext.push([prompt, response]);
        }

        localStorage.setItem("chatHistory", JSON.stringify(conversationContext));

        return { response: response };

    } catch (err) {
        console.error(err);
        return { message: err };
    }
}

module.exports = { handleChat };