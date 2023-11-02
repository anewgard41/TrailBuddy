const sequelize = require('../config/connection');
const { User, Post, Comment, Trails } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  const users = await User.bulkCreate([
    { username: 'funnyUser1', password: 'hilariousPassword1' },
    { username: 'comedyFan88', password: 'laughOutLoud123' },
    { username: 'jokester42', password: 'funnyBone567' },
  ]);

  // Seed Trails
  const trails = await Trails.bulkCreate([
    { trail_name: 'Laughing Loop Trail', trail_location: 'Humor Hills', trail_length: 3.5 },
    { trail_name: 'Pun Pathway', trail_location: 'Joke Junction', trail_length: 2.2 },
    { trail_name: 'Comedy Canyon Trail', trail_location: 'Giggle Gorge', trail_length: 5.1 },
  ]);

  // Seed Posts
  const posts = await Post.bulkCreate([
    {
        title: 'Funny Post 1',
        dateCreated: new Date(),
        body: 'Just discovered a new species of sock under my bed. I think it might be a distant relative of the dust bunny. 🧦🦔 #SockSafari',
      },
      {
        title: 'Funny Post 2',
        dateCreated: new Date(),
        body: "I just tried to make a smoothie, but my blender started playing 'Eye of the Tiger' instead. I guess it wanted a workout too! 🥤🐯💪 #SmoothieShowdown",
      },
      {
        title: 'Funny Post 3',
        dateCreated: new Date(),
        body: 'Decided to start a band with my fridge. We call ourselves "The Cool Compressors." Our first hit? A chilled-out version of "Hotline Bling." 🎶❄️ #FridgeGrooves',
      }
  ]);

  // Seed Comments
  const comments = await Comment.bulkCreate([
    { body: 'Haha, that joke was hilarious!', post_id: posts[0].id, user_id: users[1].id },
    { body: 'Your dog sounds like a star! Can I come to his next show?', post_id: posts[1].id, user_id: users[0].id },
    { body: 'Good one! But now I have to sleep on the couch.', post_id: posts[2].id, user_id: users[1].id },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();

// Below formatting for seeding based off of previous homeworks. 

// const sequelize = require('../config/connection');
// const { User, Post, Comment } = require('../models');

// const userData = require('./user-data.json');
// const postData = require('./post-data.json');
// const commentData = require('./comment-data.json');

// const seedDatabase = async () => {
//     await sequelize.sync({ force: true });

//     const users = await User.bulkCreate(userData, {
//         individualHooks: true,
//         returning: true,
//     });

//     for (const post of postData) {
//         await Post.create({
//             ...post,
//             user_id: users[Math.floor(Math.random() * users.length)].id,
//         });
//     };

//     for (const comment of commentData) {
//         await Comment.create({
//             ...comment,
//             user_id: users[Math.floor(Math.random() * users.length)].id,
//         });
//     };

//     process.exit(0);
// };


// seedDatabase();


