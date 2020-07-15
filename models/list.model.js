const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema({
        lists: [
            {
               items:[
                   {
                       item: "",
                       quantity: 0
                   }
               ],
               deliveryDate:"",
               status: 0 // 0/ 1 / 2
            }
       ]
})

const List = mongoose.model("List", userSchema);
module.exports = List;
