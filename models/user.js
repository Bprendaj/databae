const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// CREATE USER MODEL BY EXTENDING MODEL
class User extends Model {
  // SET UP METHOD TO RUN ON INSTANCE DATA (PER USER) TO CHECK PASSWORD
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// INITIALIZE FIELD/COLUMS FOR USER MODEL
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
    // gender: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // preference: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // language: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },

  {
    hooks: {
      // SET UP BEFORECREATE LIFECYCLE "HOOK" FUNCTIONALITY 
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);


module.exports = User;