const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'post_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = {
    Post,
    User,
    Comment
};