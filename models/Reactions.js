const { Schema, Types } = require('mongoose');

// Schema to create Post model
const reactionsSchema = new Schema(
  {
    
    reactionId: {
       type: Schema.Types.ObjectID,
       default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now

        //Use a getter method to format the timestamp on query
       
      },
      username: {
        type: String,
        required:true       
      },
  },
  {


    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our Thoughts model


module.exports = reactionsSchema;
