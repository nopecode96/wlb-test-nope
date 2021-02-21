module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        fid_article: {
            type: Sequelize.INTEGER
        },
        fid_user : {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
    });

    return Comments;
};