"use strict";

const {
  db,
  models: { 
    User, 
    Post, 
    Tag,
    Genre,
    Comment 
  },
} = require("../server/db/index");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  const users = await Promise.all([
    User.create({ username: "Ren", password: "123", email: "ren@dog.org", dob: "2000-04-26", age: 23, editor: true, writer: true}),
    User.create({ username: "Jericho", password: "123", email: "jericho@dog.org", dob: "1999-01-30", age: 24, editor: true, writer: true}),
    User.create({ username: "Nala", password: "123", email: "nala@dog.org", dob: "1999-06-30", age: 24, editor: false, writer: true}),
    User.create({ username: "Yana", password: "123", email: "yana@dog.org", dob: "1999-06-30", age: 24, editor: true, writer: false}),
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

  const comment = await Comment.create({content: "I agree!", likes: 1});

  const tags = await Promise.all([
    Tag.create({name: "Lifestyle"}),
    Tag.create({name: "Science"}),
    Tag.create({name: "Conspiracy"}),
  ]);

  const genres = await Promise.all([
    Genre.create({name: "Nonfiction"}),
    Genre.create({name: "Op-Ed"}),
    Genre.create({name: "Fantasy"}),
  ]);

  // Creating relations
  posts[0].setAuthor(users[0]);
  posts[1].setAuthor(users[1]);
  posts[0].setEditor(users[1]);
  posts[1].setEditor(users[0]);
  posts[2].setEditor(users[1]);
  posts[2].setAuthor(users[0]);
  posts[1].addTag(tags[2]);
  posts[2].addTag(tags[1]);
  posts[0].addTag(tags[0]);
  posts[0].addGenre(genres[0]);
  posts[1].addGenre(genres[2]);
  posts[2].addGenre(genres[1]);
  comment.setPost(posts[0]);
  users[3].addLiked(posts[0]);
  users[3].addFavorited(posts[1]);
  users[3].addBookmarked(posts[2]);
}

if (module === require.main) {
  seed();
}

module.exports = seed;