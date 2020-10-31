module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'the title is missing, please add a title',
        },
        notEmpty: {
          args: [true],
          msg: 'The book title cannot be empty',
        },

      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'the author is missing, please add an author',
        },

        notEmpty: {
          args: [true],
          msg: 'The book author cannot be empty',
        },

      },
    },
    genre: DataTypes.STRING,
    isbn: DataTypes.STRING
  };

  return sequelize.define('Book', schema);
};