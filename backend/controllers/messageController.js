import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async(req, res) =>{
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const { _id: senderId } = req.user
        
        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, receiverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMsg = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMsg) conversation.messages.push(newMsg._id)

        await Promise.all([conversation.save(), newMsg.save()])
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMsg)
        }

        res.status(200).json(newMsg)
    } catch (error) {
        console.error("Error in sending message", error.message)
        res.status(404).send(error)
    }
}

export const getMessage = async(req, res) =>{
    try {
        const { id: receiverId } = req.params
        const { _id: senderId } = req.user

        const conversation = await Conversation.findOne({
            participants:{$all:[ senderId , receiverId ]}
        }).populate('messages')

        if(!conversation) return res.status(404).json([])

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log('Error in getting conversation', error.message)
        res.status(404).send(error)
    }
}