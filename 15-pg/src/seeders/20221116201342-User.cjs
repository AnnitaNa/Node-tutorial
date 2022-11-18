"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"users", 
			[
				{
					name: "teste1",
					password_hash: "123",
					email: "teste1@email.com",
					provider: true,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					name: "teste2",
					password_hash: "1234",
					email: "teste2@email.com",
					provider: false,
					created_at: new Date(),
					updated_at: new Date()
				},
			]
		);
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null);
	}
};
