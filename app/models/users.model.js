module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        full_name: {
            type: Sequelize.STRING
        },
        activated_url: {
            type: Sequelize.TEXT
        },
        token_api: {
            type: Sequelize.TEXT
        },
        activated: {
            type: Sequelize.BOOLEAN
        }
    });

    return Users;
};