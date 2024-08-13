import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: conversationId } = req.params;

    const senderId = req.user._id;

    let conversation = await Conversation.findOne({_id: conversationId});

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      conversationId: conversationId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("new Message", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({_id: conversationId,
    }).populate({
      path: 'messages',
      populate: {
        path: 'senderId',
        model: 'User', // Adjust this to the actual User model name
        select: 'name username userType' // Select the fields you need
      }
    });;

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages Controller", error.message);
    res.status(500).json({ error: "Internal message error" });
  }
};
