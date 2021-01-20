import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({
    path: ".env.test"
  })
}

export const initDatabase = async () => {
  const conn = process.env.CONNECTION_NAME;

  const options = await getConnectionOptions(conn);

  return createConnection({ ...options, name: "default" });
};
