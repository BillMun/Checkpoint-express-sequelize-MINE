const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = function () {
  return this.destroy({where:{complete:true }})
}

Task.completeAll = function() {
  return this.update({complete:true}, {where:{complete:false}})
}

Task.prototype.getTimeRemaining = function(){
  if(this.due===undefined)return Infinity
  else return this.due - new Date()
}

Task.prototype.isOverdue = function (){
  if(this.getTimeRemaining()>0 || this.complete)return false
  return true
}

Task.prototype.assignOwner = function (owner){
  //console.log(Object.keys(Task.prototype));
  return this.setOwner(owner)
  //I guess this is really just the .setOwner method.
  //keeping in the console log. I thought it was interesting
  //fun to see the methods that I haver already created
  
}

Owner.getOwnersAndTasks = function (){
  return this.findAll({include:Task})
}

Owner.prototype.getIncompleteTasks = function (){
  return Task.findAll({where:{complete:false}})}
  
Owner.beforeDestroy(owner=>{
  if(owner.name === 'Grace Hopper'){
    throw new Error("Grace Hopper is indestructible!")
  }
})


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
