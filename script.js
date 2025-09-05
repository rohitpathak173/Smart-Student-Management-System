let students = [];
let courses = [];
let enrollments = [];

// Tab switching
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab, .tab-content").forEach(el => el.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Add Student
document.getElementById("studentForm").onsubmit = (e) => {
  e.preventDefault();
  const student = {
    id: students.length + 1,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value
  };
  students.push(student);
  renderStudents();
  updateStudentSelect();
  e.target.reset();
};

function renderStudents() {
  const tbody = document.getElementById("studentsTable");
  tbody.innerHTML = students.map(s =>
    `<tr>
      <td>${s.id}</td>
      <td>${s.firstName} ${s.lastName}</td>
      <td>${s.email}</td>
      <td>${s.dob}</td>
      <td><button class="btn danger" onclick="deleteStudent(${s.id})"><i class="fas fa-trash"></i></button></td>
    </tr>`
  ).join("");
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderStudents();
  updateStudentSelect();
}

// Add Course
document.getElementById("courseForm").onsubmit = (e) => {
  e.preventDefault();
  const course = {
    id: courses.length + 1,
    code: document.getElementById("courseCode").value,
    title: document.getElementById("courseTitle").value,
    credits: document.getElementById("credits").value
  };
  courses.push(course);
  renderCourses();
  updateCourseSelect();
  e.target.reset();
};

function renderCourses() {
  const tbody = document.getElementById("coursesTable");
  tbody.innerHTML = courses.map(c =>
    `<tr>
      <td>${c.id}</td>
      <td><b>${c.code}</b></td>
      <td>${c.title}</td>
      <td>${c.credits}</td>
      <td><button class="btn danger" onclick="deleteCourse(${c.id})"><i class="fas fa-trash"></i></button></td>
    </tr>`
  ).join("");
}

function deleteCourse(id) {
  courses = courses.filter(c => c.id !== id);
  renderCourses();
  updateCourseSelect();
}

// Add Enrollment
document.getElementById("enrollmentForm").onsubmit = (e) => {
  e.preventDefault();
  const studentId = document.getElementById("studentSelect").value;
  const courseId = document.getElementById("courseSelect").value;
  const marks = document.getElementById("marks").value;

  const student = students.find(s => s.id == studentId);
  const course = courses.find(c => c.id == courseId);

  if (!student || !course) return;

  const enrollment = {
    id: enrollments.length + 1,
    student: `${student.firstName} ${student.lastName}`,
    course: course.title,
    marks: marks || "-"
  };

  enrollments.push(enrollment);
  renderEnrollments();
  e.target.reset();
};

function renderEnrollments() {
  const tbody = document.getElementById("enrollmentsTable");
  tbody.innerHTML = enrollments.map(e =>
    `<tr>
      <td>${e.id}</td>
      <td>${e.student}</td>
      <td>${e.course}</td>
      <td>${e.marks}</td>
      <td><button class="btn danger" onclick="deleteEnrollment(${e.id})"><i class="fas fa-trash"></i></button></td>
    </tr>`
  ).join("");
}

function deleteEnrollment(id) {
  enrollments = enrollments.filter(e => e.id !== id);
  renderEnrollments();
}

// Update dropdowns
function updateStudentSelect() {
  document.getElementById("studentSelect").innerHTML =
    students.map(s => `<option value="${s.id}">${s.firstName} ${s.lastName}</option>`).join("");
}

function updateCourseSelect() {
  document.getElementById("courseSelect").innerHTML =
    courses.map(c => `<option value="${c.id}">${c.title}</option>`).join("");
}
