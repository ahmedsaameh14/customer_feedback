const Feedback = require('../model/feedback.model');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  { model: "gemini-3-flash-preview" }, 

);

exports.sendFeedback = async (req, res) => {
    try {
        const { text } = req.body;

        const prompt = `
            Analyze this customer feedback: "${text}"
            1. Detect the language.
            2. Translate it to English.
            3. Classify sentiment as 'positive', 'neutral', or 'negative'.
            Return the result ONLY as a JSON object with these keys: 
            "language", "translatedText", "sentiment".
        `;

        // 2. Call Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiData = JSON.parse(response.text()); // Turn AI string into JSON

       // 3. Save everything to MongoDB
        const feedback = await Feedback.create({
            text: text,
            language: aiData.language,
            translatedText: aiData.translatedText,
            sentiment: aiData.sentiment
        }); 

        res.status(201).json({ message: 'Feedback Sent', data: feedback });
    } catch (err) {
        res.status(500).json({ message: 'Failed To Send Feedback', error: err.message });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        // Use the Model (Feedback) to find all documents
        const feedbacks = await Feedback.find(); 
        // res.status(201).json({ message: 'List of Feedbacks', data: feedbacks });
        res.status(200).json(res.paginatedResult);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get Feedbacks', error: err.message });
    }
};