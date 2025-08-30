import "reflect-metadata";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Vantai@12",
  database: "test_db",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.{ts,js}"],
  migrations: ["src/migrations/**/*.{ts,js}"],
  // entities: [process.env.NODE_ENV === "production" 
  //     ? "dist/entities/**/*.{js,ts}" 
  //     : "src/entities/**/*.{ts,js}"],
  // migrations: [process.env.NODE_ENV === "production" 
  //     ? "dist/migrations/**/*.{js,ts}" 
  //     : "src/migrations/**/*.{ts,js}"],
});
