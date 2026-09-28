import express from 'express';
import pool from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { course_id, title, description, time_limit_minutes, questions } = req.body;
  try {
    const quizResult = await pool.query(
      `INSERT INTO quizzes (course_id, teacher_id, title, description, time_limit_minutes)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [course_id, req.user.id, title, description, time_limit_minutes]
    );
    const quiz = quizResult.rows[0];
    for (const q of questions) {
      await pool.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [quiz.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option]
      );
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/course/:courseId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*,
        (SELECT COUNT(*) FROM quiz_attempts WHERE quiz_id = q.id) as attempt_count
       FROM quizzes q WHERE q.course_id = $1 ORDER BY q.created_at DESC`,
      [req.params.courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/questions', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM quiz_questions WHERE quiz_id = $1`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM quizzes WHERE id = $1 AND teacher_id = $2`, [req.params.id, req.user.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/attempt', auth, async (req, res) => {
  const { answers } = req.body;
  try {
    const questionsResult = await pool.query(
      `SELECT * FROM quiz_questions WHERE quiz_id = $1`,
      [req.params.id]
    );
    const questions = questionsResult.rows;
    let score = 0;
    for (const q of questions) {
      const ans = answers.find(a => a.question_id === q.id);
      if (ans && ans.selected_option === q.correct_option) score++;
    }
    const attemptResult = await pool.query(
      `INSERT INTO quiz_attempts (quiz_id, student_id, score, total_questions)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (quiz_id, student_id) DO UPDATE SET score = $3, completed_at = NOW()
       RETURNING *`,
      [req.params.id, req.user.id, score, questions.length]
    );
    const attempt = attemptResult.rows[0];
    for (const ans of answers) {
      await pool.query(
        `INSERT INTO quiz_answers (attempt_id, question_id, selected_option)
         VALUES ($1, $2, $3)`,
        [attempt.id, ans.question_id, ans.selected_option]
      );
    }
    res.json({ score, total: questions.length, attempt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/student/my', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*, c.title as course_title,
        a.score, a.total_questions, a.completed_at
       FROM quizzes q
       JOIN courses c ON c.id = q.course_id
       JOIN enrollments e ON e.course_id = q.course_id AND e.student_id = $1
       LEFT JOIN quiz_attempts a ON a.quiz_id = q.id AND a.student_id = $1
       ORDER BY q.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/attempts', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as student_name, u.email as student_email
       FROM quiz_attempts a
       JOIN users u ON u.id = a.student_id
       WHERE a.quiz_id = $1`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;