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

      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'The Password is invalid, minimum of 8 characters required.',
        },
      },
    },
  };

  return sequelize.define('Reader', schema);
};
