module.exports = function(sequelize, DataTypes){
  return sequelize.define("task", {
    body: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER
  });
}
