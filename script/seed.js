"use strict";

const {
  db,
  models: { User, Post },
} = require("../server/db/index");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  const users = await Promise.all([
    User.create({ username: "Ren", password: "123", email: "ren@dog.org", dob: "2000-04-26", age: 23, editor: true, writer: true}),
    User.create({ username: "Jericho", password: "123", email: "jericho@dog.org", dob: "1999-01-30", age: 24, editor: true, writer: true}),

  ]);

  // Creating Posts
  let date1 = new Date();
  let date2 = new Date();
  let date3 = new Date();
  let date4 = new Date();

  const posts = await Promise.all([
    Post.create({name: "Blankets are the Best!", content: "I love blankets so much!", postDate: date1.getDate(), editDate: date1.getDate(), views: 1, inProgress: true}),
    Post.create({name: "The Birthday Song is Mind Control", content: "Never sing the birthday song! It's a mind control device created by humans to get them to eat cake!", postDate: date2.getDate(), editDate: date2.getDate(), views: 1, inProgress: false}),
    Post.create({name: "Benefits of Sun Bathing", content: "I love the sun! I have a great tan in the summer!", postDate: date3.getDate(), editDate: date3.getDate(), views: 1, inProgress: true}),
  ]);

  // Creating relations
  posts[0].setAuthor(users[0]);
  posts[1].setAuthor(users[1]);
  posts[0].setEditor(users[1]);
  posts[1].setEditor(users[0]);
  posts[2].setEditor(users[1]);
  posts[2].setAuthor(users[0]);
}

if (module === require.main) {
  seed();
}

module.exports = seed;