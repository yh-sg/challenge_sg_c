const router = require("express").Router();
const User = require("../models/user.model");
const List = require("../models/list.model");
  
  router.get("/", async (req,res)=>{
    try{
        let users = await User.find();

        res.render("list/home", {users});
    }
    catch(error){
        console.log(error);
    }
  });

  router.get("/list", async (req,res)=>{
    try {
        let lists = await List.find();

    res.render("list/list", {lists});
    } catch (error) {
        console.log(error);
      }
  });

  router.post("/list", async (req, res) => {
      console.log(req.body);
      try{
        let {item,quantity,deliveryDate,status=0} = req.body;
    
        // let hashedPassword = await bcrypt.hash(password, saltRounds);
        let list = new List({
          lists: [{items:[{item,quantity}],
          deliveryDate,
          status}]
        })
          
            let savedList = await list.save();

            if(savedList){
                res.redirect("/");
            }
        }catch(error){
            console.log(error);
        }
    // let list = new List(req.body);
    // console.log(list);
  
    // list
    //   .save()
    //   .then(() => {
    //     User.findById(user.lists).then((user) => {
    //       user.lists.push(list._id);
  
    //       user.save().then(() => {
    //         //if sucess redirect to home page
    //         res.redirect("/");
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    // });
});

module.exports = router;