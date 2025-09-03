export const getEmailQuery = `SELECT * FROM email WHERE email = $1`;

export const getCourseByStudentIdQuery = `
    SELECT
        en.course_id,
        c.course_name,
        CONCAT(i.title, i.f_name, ' ', i.l_name) AS instructor_name,
        en.section,
        en.day_of_week,
        CONCAT(TO_CHAR(en.start_time, 'HH24:MI'), '-', TO_CHAR(en.end_time, 'HH24:MI')) AS class_time,
        en.room,
        s.student_id,
        CONCAT(s.title, s.f_name, ' ', s.l_name) AS student_name
    FROM email e
    LEFT JOIN student s ON e.email = s.email
    LEFT JOIN enrollment en ON s.student_id = en.student_id
    LEFT JOIN instructor i ON en.instructor_id = i.instructor_id
    LEFT JOIN course c ON en.course_id = c.course_id
    WHERE en.student_id = $1`;
