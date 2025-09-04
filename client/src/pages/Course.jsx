import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `https://class-attendance-system-amd9.onrender.com/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // สำหรับทดสอบ: กำหนด signable_until เป็น 1 นาทีจากปัจจุบัน
        const testCourses = res.data.map(course => {
          const now = new Date();
          now.setMinutes(now.getMinutes() + 1); // +1 นาที
          const hour = String(now.getHours()).padStart(2, "0");
          const minute = String(now.getMinutes()).padStart(2, "0");
          return { ...course, signable_until: `${hour}:${minute}` };
        });

        setCourses(testCourses);
        if (testCourses.length > 0) setStudentName(testCourses[0].student_name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [token]);

  // Countdown
  useEffect(() => {
    if (!selectedCourse || !selectedCourse.signable_until) {
      setRemainingTime(null);
      return;
    }

    const targetTime = new Date();
    const [hour, minute] = selectedCourse.signable_until.split(":").map(Number);
    targetTime.setHours(hour, minute, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;
      if (diff <= 0) {
        setRemainingTime(0);
        clearInterval(interval);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCourse]);

  const formatTime = (ms) => {
    if (!ms) return "00:00:00";
    let totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
  };

  const canSign = remainingTime > 0 || remainingTime === null;

  return (
    <div className="m-0 p-0 box-border font-k2d text-black-olive bg-lotion selection:bg-rufous selection:text-lotion min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">My Courses</h1>
        <div className="text-gray-700">Welcome, {studentName}</div>
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 justify-items-center">
        {courses.map(course => (
          <button
            key={course.course_id + course.section}
            onClick={() => setSelectedCourse(course)}
            className="w-full max-w-md p-6 text-left bg-gradient-to-r from-white to-gray-50 
             border border-gray-200 rounded-2xl shadow-md 
             hover:shadow-lg hover:scale-[1.02] 
             active:scale-95 active:shadow-sm
             transition-all duration-200 ease-out cursor-pointer"
          >
            <h5 className="mb-3 text-2xl font-bold text-gray-800">{course.course_name}</h5>
            <div className="space-y-1 text-gray-600 text-base">
              <p><span className="text-base text-gray-700">อาจารย์:</span> {course.instructor_name}</p>
              <p><span className="text-base text-gray-700">กลุ่ม:</span> {course.section}</p>
              <p><span className="text-base text-gray-700">วัน:</span> {course.day_of_week}</p>
              <p><span className="text-base text-gray-700">เวลา:</span> {course.class_time}</p>
              <p><span className="text-base text-gray-700">ห้อง:</span> {course.room}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Animated Slide-up Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCourse(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 z-50
                   w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setSelectedCourse(null);
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drag Handle */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              <div className="w-full">
                <h2 className="text-2xl text-center font-bold mb-2 text-gray-800">
                  เช็คชื่อเข้าเรียนวิชา {selectedCourse.course_name}
                </h2>
                <h2 className="text-xl text-center font-bold mb-4 text-gray-700">ครั้งที่ 1</h2>

                {/* Countdown */}
                {remainingTime !== null && (
                  <p className="text-xl text-red-500 text-center mb-6">
                    ⏰ เวลาที่เหลือให้ลงชื่อ: {formatTime(remainingTime)}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      alert(`ลงชื่อเข้าเรียน: ${selectedCourse.course_name}`);
                      setSelectedCourse(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-white transition
                      ${canSign ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!canSign}
                  >
                    ลงชื่อเข้าเรียน
                  </button>
                </div>

                {!canSign && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    ❌ หมดเวลาให้ลงชื่อแล้ว
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Course;
