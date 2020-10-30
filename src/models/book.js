module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the title is missing, please add a title',
        },

      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'the author is missing, please add an author',
        },

      },
    },
    genre: DataTypes.STRING,
    isbn: DataTypes.STRING
  };

  return sequelize.define('Book', schema);
};