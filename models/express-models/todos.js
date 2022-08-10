let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    let people = []
    for(let key in tasks){
      people.push(key)
    }
    return people
  },

  add: function (name, task) {
    if(tasks[name]===undefined){
    tasks[name]=[task]
      if(tasks[name][0].complete===undefined){
        tasks[name][0].complete = false
    }
  }else{
    let valueArr = tasks[name]
    valueArr.push(task)
  }
  let valueArr = tasks[name]
  valueArr.forEach(elem=>{
    if(elem.complete===undefined) elem.complete=false
  })

},

  list: function (name) {
     for(let key in tasks){
      if(key===name){
      return tasks[key]
     }
    }
  },

  complete: function (name, idx) {
    tasks[name][idx].complete = true
  },

  remove: function (name, idx) {
    let tasksArr = tasks[name]
    tasksArr.splice(idx,1)
  },
};
