import { useEffect, useState } from "react";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `https://class-attendance-system-amd9.onrender.com/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCourses(res.data);
        if (res.data.length > 0) {
          setStudentName(res.data[0].student_name);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className="m-0 p-0 box-border font-k2d text-black-olive bg-lotion selection:bg-rufous selection:text-lotion min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">My Courses</h1>
        <div className="text-gray-700">Welcome, {studentName}</div>
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 justify-items-center">
        {courses.map((course) => (
          <div
            key={course.course_id + course.section}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold">{course.course_name}</h5>
            <p className="font-medium">Instructor: {course.instructor_name}</p>
            <p>Section: {course.section}</p>
            <p>Day: {course.day_of_week}</p>
            <p>Time: {course.class_time}</p>
            <p>Room: {course.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
