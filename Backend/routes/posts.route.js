import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Function to obtain Reddit access token
const getRedditAccessToken = async () => {
  const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': process.env.USER_AGENT,
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Reddit token fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};

// Fetch Reddit posts
const getRedditPosts = async (count) => {
  const token = await getRedditAccessToken();
  const response = await fetch(`https://oauth.reddit.com/r/popular/hot?limit=${count}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': process.env.USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit posts fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.children.map((post) => ({
    postId: post.data.id,
    postUrl: `https://reddit.com${post.data.permalink}`,
    title: post.data.title,
    author: post.data.author,
    thumbnail: post.data.thumbnail,
    content: post.data.selftext,
    source: 'reddit',
  }));
};

// Fetch Twitter posts
const getTwitterPosts = async (count) => {
  const response = await fetch(
    `https://api.x.com/2/tweets/search/recent?query=trending&max_results=${count}&tweet.fields=author_id,created_at`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Twitter posts fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.data) return [];
  return data.data.map((tweet) => ({
    postId: tweet.id,
    postUrl: `https://twitter.com/i/web/status/${tweet.id}`,
    title: tweet.text,
    author: tweet.author_id,
    content: tweet.text,
    source: 'twitter',
  }));
};

// Combined feed endpoint
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  let twitterPosts = [];
  let redditPosts = [];

  try {
    twitterPosts = await getTwitterPosts(Math.ceil(limit / 2));
  } catch (e) {
    console.warn('Twitter fetch failed:', e.message);
  }

  try {
    const redditCount = limit - twitterPosts.length;
    redditPosts = await getRedditPosts(redditCount);
  } catch (e) {
    console.warn('Reddit fetch failed:', e.message);
  }

  const combined = [...twitterPosts, ...redditPosts];

  // Shuffle to mix sources
  combined.sort(() => 0.5 - Math.random());

  res.json(combined.slice(0, limit));
});

export default router;
