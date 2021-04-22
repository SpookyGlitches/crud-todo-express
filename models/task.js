const { DataTypes} = require("sequelize");
const db = require("../connection");

const task = db.define(
	"accounts",
	{
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "accounts", key: "id" },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
	},
	{
		createdAt: "created_at",
		updatedAt: "updated_at",
		deletedAt: "deleted_at",
		tableName: "tasks",
	}
);

module.exports = task;
