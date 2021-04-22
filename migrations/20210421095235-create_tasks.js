"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("tasks", {
			id: {
				type: Sequelize.BIGINT,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: { model: "accounts", key: "id" },
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			is_completed: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("tasks");
	},
};
