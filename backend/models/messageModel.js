import { model, Schema } from "mongoose";

const MessagS = new Schema({
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

const Message = model('Message', MessagS)

export default Message;