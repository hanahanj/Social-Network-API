const { Schema, model } = require('mongoose');
const Reactions = require('./reactions');



// Schema to create Post model
const thoughtsSchema = new Schema(
  {
    
    thoughtText: {
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
      reactions:[
        Reactions
      ],

  },
  {

    //do i need this (for both here and Users?)
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual('reactionCount').get(function(){
return this.reactions.length;
});


// Initialize our Thoughts model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
