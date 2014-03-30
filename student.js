function Student(fname, lname) {
  this.fname = fname,
  this.lname = lname,
  this.courses = [];
}


Student.prototype.name = function() {
  return "" + this.fname + " " + this.lname;
}

Student.prototype.enroll = function(course) {
  if (this.courses.every(function(el) {
    if (el === course)
      return false;
    else
      return true;
    }))
      return;
  else
    this.courses.push(course);
    course.addStudent(this);
    return this;
}

Student.prototype.courseLoad = function(){
  var courseLoad = {};
  this.courses.forEach(function(course){
    if !(courseLoad.hasOwnProperty(course.department))
      courseLoad[course.department] = course.credits;
    else
      courseLoad[course.department] += course.credits;
  });
  return courseLoad;
}


function Course(courseName, department, credits) {
  this.courseName = courseName,
  this.department = department,
  this.credits = credits;
  this.students = [];
}

Course.prototype.students = function(){
  return this.students;
}

Course.prototype.addStudent = function(student) {
   this.students.push(student);
   return this;
}