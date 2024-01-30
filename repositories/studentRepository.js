import Student from "../models/student.js";

class StudentRepository {
  async save(student) {
    await student.save();

    return student;
  }

  async getAllStudents() {
    return await Student.find({});
  }

  async findById(id) {
    const student = await Student.findById(id);

    if (!student) {
      throw new Error("Student not exist");
    }

    return student;
  }

  async updateById(id, data) {
    return await Student.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    await Student.findByIdAndDelete(id);
  }
}

export default StudentRepository;
