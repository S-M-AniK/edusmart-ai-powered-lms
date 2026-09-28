import express from 'express';
import pool from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/courses/:courseId/sections', auth, async (req, res) => {
  const { title, order_index } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO course_sections (course_id, title, order_index) VALUES ($1, $2, $3) RETURNING *`,
      [req.params.courseId, title, order_index || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/courses/:courseId/sections', async (req, res) => {
  try {
    const sections = await pool.query(
      `SELECT * FROM course_sections WHERE course_id = $1 ORDER BY order_index ASC`,
      [req.params.courseId]
    );
    const lessons = await pool.query(
      `SELECT * FROM course_lessons WHERE section_id = ANY(
        SELECT id FROM course_sections WHERE course_id = $1
      ) ORDER BY order_index ASC`,
      [req.params.courseId]
    );
    const data = sections.rows.map(s => ({
      ...s,
      lessons: lessons.rows.filter(l => l.section_id === s.id)
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/sections/:id', auth, async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      `UPDATE course_sections SET title = $1 WHERE id = $2 RETURNING *`,
      [title, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/sections/:id', auth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM course_sections WHERE id = $1`, [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/lessons/:id/complete', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO lesson_progress (student_id, lesson_id, completed, completed_at)
       VALUES ($1, $2, true, NOW())
       ON CONFLICT (student_id, lesson_id) DO UPDATE SET completed = true, completed_at = NOW()
       RETURNING *`,
      [req.user.id, req.params.id]
    );

    const lessonInfo = await pool.query(
      `SELECT cs.course_id FROM course_lessons cl
       JOIN course_sections cs ON cs.id = cl.section_id
       WHERE cl.id = $1`,
      [req.params.id]
    );
    const courseId = lessonInfo.rows[0]?.course_id;

    if (courseId) {
      const total = await pool.query(
        `SELECT COUNT(*) FROM course_lessons WHERE section_id = ANY(
          SELECT id FROM course_sections WHERE course_id = $1
        )`,
        [courseId]
      );
      const completed = await pool.query(
        `SELECT COUNT(*) FROM lesson_progress lp
         JOIN course_lessons cl ON cl.id = lp.lesson_id
         JOIN course_sections cs ON cs.id = cl.section_id
         WHERE cs.course_id = $1 AND lp.student_id = $2 AND lp.completed = true`,
        [courseId, req.user.id]
      );
      const pct = Math.round((parseInt(completed.rows[0].count) / parseInt(total.rows[0].count)) * 100);
      await pool.query(
        `UPDATE enrollments SET progress = $1 WHERE student_id = $2 AND course_id = $3`,
        [pct, req.user.id, courseId]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/lessons/:id', auth, async (req, res) => {
  const { title, type, video_url, content, duration_minutes, is_free } = req.body;
  try {
    const result = await pool.query(
      `UPDATE course_lessons SET title=$1, type=$2, video_url=$3, content=$4, duration_minutes=$5, is_free=$6 WHERE id=$7 RETURNING *`,
      [title, type, video_url, content, duration_minutes, is_free, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/lessons/:id', auth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM course_lessons WHERE id = $1`, [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/lessons/:id/complete', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO lesson_progress (student_id, lesson_id, completed, completed_at)
       VALUES ($1, $2, true, NOW())
       ON CONFLICT (student_id, lesson_id) DO UPDATE SET completed = true, completed_at = NOW()
       RETURNING *`,
      [req.user.id, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/courses/:courseId/progress', auth, async (req, res) => {
  try {
    const total = await pool.query(
      `SELECT COUNT(*) FROM course_lessons WHERE section_id = ANY(
        SELECT id FROM course_sections WHERE course_id = $1
      )`,
      [req.params.courseId]
    );
    const completed = await pool.query(
      `SELECT COUNT(*) FROM lesson_progress lp
       JOIN course_lessons cl ON cl.id = lp.lesson_id
       JOIN course_sections cs ON cs.id = cl.section_id
       WHERE cs.course_id = $1 AND lp.student_id = $2 AND lp.completed = true`,
      [req.params.courseId, req.user.id]
    );
    res.json({
      total: parseInt(total.rows[0].count),
      completed: parseInt(completed.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;