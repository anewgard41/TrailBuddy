const sequelize = require('../config/connection');
const { User, Post, Comment, Trails } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  const user = await User.bulkCreate([
    { username: 'funnyUser1', password: 'hilariousPassword1' },
    { username: 'comedyFan88', password: 'laughOutLoud123' },
    { username: 'jokester42', password: 'funnyBone567' },
    { username: 'testing', password: 'test123'}
  ],
  {
    individualHooks: true,
  });

  // Seed Posts
  const post = await Post.bulkCreate([
    {
        title: 'Funny Post 1',
        content: 'Just discovered a new species of sock under my bed. I think it might be a distant relative of the dust bunny. 🧦🦔 #SockSafari',
        user_id: user[0].id
      },
      {
        title: 'Funny Post 2',
        content: "I just tried to make a smoothie, but my blender started playing 'Eye of the Tiger' instead. I guess it wanted a workout too! 🥤🐯💪 #SmoothieShowdown",
        user_id: user[1].id
      },
      {
        title: 'Funny Post 3',
        content: 'Decided to start a band with my fridge. We call ourselves "The Cool Compressors." Our first hit? A chilled-out version of "Hotline Bling." 🎶❄️ #FridgeGrooves',
        user_id: user[2].id
      }
  ]);

  // Seed Comments
  const comments = await Comment.bulkCreate([
    { content: 'Haha, that joke was hilarious!', post_id: post[0].id, user_id: user[1].id },
    { content: 'Your dog sounds like a star! Can I come to his next show?', post_id: post[1].id, user_id: user[0].id },
    { content: 'Good one! But now I have to sleep on the couch.', post_id: post[2].id, user_id: user[1].id },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();



