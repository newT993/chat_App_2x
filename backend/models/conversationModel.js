import { model, Schema } from "mongoose";

const ConS = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
},{
    timestamps: true
})

const Conversation = model("Conversation", ConS)

export default Conversation;