module.exports = function(sequelize, DataTypes){
  return sequelize.define("list", {
    title: DataTypes.STRING
  });
}
