module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'the email address is invalid',
        },
        notNull: {
          args: [true],
          msg: 'Email cannot be empty',
        },
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Name cannot be empty',
        },
        notNull: {
          args: [true],
          msg: 'We need a name',
        },
      },
    },


    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Password cannot be empty',
        },
        len: {
          args: [8],
          msg: 'The Password is invalid, minimum of 8 characters required.',
        },
      },
    },
  };

  return sequelize.define('Reader', schema);
};
