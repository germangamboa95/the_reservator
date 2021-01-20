import { defaultSeeder } from "../database/seeders/Seed";
import { initDatabase } from "../src/database"



export const refreshDatabase = async () => {

  const connection = await initDatabase();

  await connection.synchronize(true)

  await defaultSeeder(connection)

  return connection
}