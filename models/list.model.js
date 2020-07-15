const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = Schema({
        lists: [
            {
               items:[
                   {
                       item: String,
                       quantity: Number
                   }
               ],
               deliveryDate: String,
               status: Number // 0 - free,1 - inProgress and 2 - fulfilled
            }
       ]
})

const List = mongoose.model("List", listSchema);
module.exports = List;
