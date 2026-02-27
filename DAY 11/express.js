let express = require("express");
let app = express();

app.use(express.json());

let friendsBirthday = [
  { id: 1, name: "Alex Johnson", age: 22, birthday: "2004-05-14", city: "Salem" },
  { id: 2, name: "Maya Patel", age: 23, birthday: "2003-11-02", city: "Chennai" },
  { id: 3, name: "Chris Lee", age: 22, birthday: "2004-01-25", city: "Coimbatore" }
];



app.get("/", (req, res) => {
  res.send("Welcome To Friends Birthday Server 🎂");
});



app.get("/friends", (req, res) => {
  res.json(friendsBirthday);
});



app.get("/friends/:id", (req, res) => {

  let id = parseInt(req.params.id);

  let friend = friendsBirthday.find(f => f.id === id);

  if (!friend) {
    return res.status(404).json({ message: "Friend not found ❌" });
  }

  res.json(friend);
});



app.post("/friends", (req, res) => {

  let newFriend = {
    id: friendsBirthday.length + 1,
    name: req.body.name,
    age: req.body.age,
    birthday: req.body.birthday,
    city: req.body.city
  };

  friendsBirthday.push(newFriend);

  res.status(201).json({
    message: "Friend Added Successfully 🎉",
    data: newFriend
  });
});



app.put("/friends/:id", (req, res) => {

  let id = parseInt(req.params.id);

  let friend = friendsBirthday.find(f => f.id === id);

  if (!friend) {
    return res.status(404).json({ message: "Friend not found ❌" });
  }

  friend.name = req.body.name || friend.name;
  friend.age = req.body.age || friend.age;
  friend.birthday = req.body.birthday || friend.birthday;
  friend.city = req.body.city || friend.city;

  res.json({
    message: "Friend Updated Successfully ✏️",
    data: friend
  });
});

app.delete("/friends/:id", (req, res) => {

  let id = parseInt(req.params.id);

  let index = friendsBirthday.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Friend not found ❌" });
  }

  let deletedFriend = friendsBirthday.splice(index, 1);

  res.json({
    message: "Friend Deleted Successfully 🗑️",
    data: deletedFriend
  });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});