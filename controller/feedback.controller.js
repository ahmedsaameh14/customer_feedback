const Feedback = require('../model/feedback.model');

exports.sendFeedback = async (req, res) => {
    try {
        const { text } = req.body;
        // Use the Model (Feedback) to create the document (feedback)
        const feedback = await Feedback.create({ text }); 
        res.status(201).json({ message: 'Feedback Sent', data: feedback });
    } catch (err) {
        res.status(500).json({ message: 'Failed To Send Feedback', error: err.message });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        // Use the Model (Feedback) to find all documents
        const feedbacks = await Feedback.find(); 
        res.status(200).json({ message: 'List of Feedbacks', data: feedbacks });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get Feedbacks', error: err.message });
    }
};