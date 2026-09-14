import express from 'express';
import pool from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { course_id, title, description, due_date, max_marks } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO assignments (course_id, teacher_id, title, description, due_date, max_marks)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [course_id, req.user.id, title, description, due_date, max_marks]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/course/:courseId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, 
        (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submission_count
       FROM assignments a WHERE a.course_id = $1 ORDER BY a.created_at DESC`,
      [req.params.courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM assignments WHERE id = $1 AND teacher_id = $2`, [req.params.id, req.user.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/submit', auth, async (req, res) => {
  const { submission_text } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO assignment_submissions (assignment_id, student_id, submission_text)
       VALUES ($1, $2, $3)
       ON CONFLICT (assignment_id, student_id) DO UPDATE SET submission_text = $3, submitted_at = NOW()
       RETURNING *`,
      [req.params.id, req.user.id, submission_text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/submissions', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.*, u.name as student_name, u.email as student_email
       FROM assignment_submissions s
       JOIN users u ON u.id = s.student_id
       WHERE s.assignment_id = $1`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/submissions/:studentId/grade', auth, async (req, res) => {
  const { marks_obtained, feedback } = req.body;
  try {
    const result = await pool.query(
      `UPDATE assignment_submissions SET marks_obtained = $1, feedback = $2, status = 'graded'
       WHERE assignment_id = $3 AND student_id = $4 RETURNING *`,
      [marks_obtained, feedback, req.params.id, req.params.studentId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/student/my', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, c.title as course_title,
        s.submission_text, s.status, s.marks_obtained, s.feedback, s.submitted_at
       FROM assignments a
       JOIN courses c ON c.id = a.course_id
       JOIN enrollments e ON e.course_id = a.course_id AND e.user_id = $1
       LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_id = $1
       ORDER BY a.due_date ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;