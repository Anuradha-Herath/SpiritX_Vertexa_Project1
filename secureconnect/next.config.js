module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: ['example.com'], // Add your allowed image domains here
  },
};