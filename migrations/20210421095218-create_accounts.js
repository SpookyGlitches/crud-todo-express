'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("accounts",{
      id:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
      },
      username:{
        type:Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false 
      },
      updated_at:{
        type:Sequelize.DATE,
      },
      deleted_at:{
        type:Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};
