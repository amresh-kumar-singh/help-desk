import { config } from "dotenv";
config();

export default {
  node: {
    env: process.env.NODE_ENV,
  },
  mongo: {
    uri: process.env.MONGO_URL,
  },
};
