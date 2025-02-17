const Reminder = require('../models/Reminder');

exports.saveReminder = async (req, res) => {
    try {
        const {
            date,
            subCategory,
            category,
            title,
            recurring,
            amount,
            id,
            policyNumber,
            policyProvider,
            vehicleNumber,
            vehicleType,
            accountNumber,
            lenderName,
            description,
            isPaid
        } = req.body;
const user=req.user
console.log(user,'useron cont')
        if (id) {
            // If id exists, update the existing reminder
            const updatedReminder = await Reminder.findByIdAndUpdate(
                id,
                {
                    date,
                    subCategory,
                    category,
                    title,
                    recurring,
                    amount,
                    policyNumber,
                    policyProvider,
                    vehicleNumber,
                    vehicleType,
                    accountNumber,
                    lenderName,
                    description,
                    isPaid
                },
                { new: true } // Return the updated document
            );

            if (!updatedReminder) {
                return res.status(404).json({ error: 'Reminder not found' });
            }

            return res.status(200).json(updatedReminder);
        } else {
            // If id does not exist, create a new reminder
            const newReminder = new Reminder({
                date,
                subCategory,
                category,
                title,
                recurring,
                amount,
                policyNumber,
                policyProvider,
                vehicleNumber,
                vehicleType,
                accountNumber,
                user_id:user._id,
                lenderName,
                description,
                isPaid: isPaid || false // Default to false if not provided
            });

            const savedReminder = await newReminder.save();
            return res.status(201).json(savedReminder);
        }
    } catch (error) {
        console.log(error,'error');
        
        res.status(500).json({ error: error.message });
    }
};

exports.getReminders = async (req, res) => {
    try {
        const user = req.user;
        const getAllReminders = await Reminder.find({ user_id: user._id }) || []; // Ensures empty array if null

        return res.status(200).json(getAllReminders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.deleteReminders = async (req, res) => {
    try {
        const { ids } = req.body;
        const user = req.user;

        if (ids && ids.length > 0) {
            // Delete specific reminders
            await Reminder.deleteMany({ _id: { $in: ids }, user_id: user._id });
        } else {
            // Delete all reminders for the user
            await Reminder.deleteMany({ user_id: user._id });
        }

        return res.status(200).json({ message: "Reminders deleted successfully" });
    } catch (error) {
        console.log(error,'error');
        
        return res.status(500).json({ error: error.message });
    }
};
