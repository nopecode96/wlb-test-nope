module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define("articles", {
        title: {
            type: Sequelize.STRING
        },
        longtext: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        fid_user: {
            type: Sequelize.INTEGER
        }
    });

    return Articles;
};