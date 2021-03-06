const db = require('../models/student')
// const debug = require('debug')('app:students')

exports.getAllStudents = async function () {
  try {
    const students = await db.Student.query().select()
    return students
  } catch (err) {
    return { err }
  }
}

exports.getStudentById = async function (id) {
  try {
    const student = await db.Student.query()
      .findById(id)
      .throwIfNotFound()
    return student // return student[0] || 'Not found'
  } catch (err) {
    return { err }
  }
}

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student)
    return response
  } catch (err) {
    return { err }
  }
}

exports.patchStudent = async function (id, patchStudent) {
  // debug("test update notes")
  try {
    const response = await db.Student.query()
      .patchAndFetchById(id, patchStudent)
      .throwIfNotFound()
    return response
  } catch (err) {
    return { err }
  }
}

exports.getStatusByStudentId = async function (studentID) {
  try {
    // This is the only executed query in this example.
    const status = await db.Student.relatedQuery('status')
      .for(studentID)
    return status
  } catch (err) {
    return { err }
  }
}
