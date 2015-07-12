var Person = function(firstAndLast) {
  this.getFirstName = function(){
  return this.firstName || firstAndLast.split(' ')[0];
  };
  this.getLastName = function(){
    return this.lastName || firstAndLast.split(' ')[1];
  };
  this.getFullName = function(){
    return this.fullName || firstAndLast;
  };
  this.setFirstName = function(first){
    this.firstName = first;
  };
  this.setLastName = function(last){
    this.lastName = last;
  };
  this.setFullName = function(firstAndLast){
    this.fullName = firstAndLast;
  };
};

var bob = new Person('Bob Ross');
bob.getFullName();

/**
Fill in the object constructor with the methods specified in the tests.
Those methods are getFirstName(), getLastName(), getFullName(), setFirstName(first), setLastName(last), and setFullName(firstAndLast).
**/
