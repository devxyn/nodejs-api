import Student from "../models/student.js";

class StudentFactory {
  create(name, email) {
    return new Student({ name, email });
  }
}

export default StudentFactory;
