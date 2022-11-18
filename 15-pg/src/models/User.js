

const User = (sequelize, Sequelize) =>
    sequelize.define(
        "user", // sequelize infers table name as the plural of what i put here
        {
            // Model attributes are defined here
            name: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            email: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            // Other model options go here
            // freezeTableName: true //creates a table with the same name given (don't pluralize)
            // tableName: 'Employees' // i can directly give table name
        }
    );

export { User };
