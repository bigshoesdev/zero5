import { Sequelize } from "sequelize";

const db = new Sequelize("app", "", "", {
  storage: "./data.db",
  dialect: "sqlite",
  logging: false,
  define: {
    timestamps: false,
  },
});

export default db;
