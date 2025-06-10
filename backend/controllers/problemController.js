import { sql } from "../config/db.js";

export const getAllProblems = async (req, res) => {
  try {
    const problems = await sql`
    SELECT * FROM problems ORDER BY created_at DESC
    `;
    console.log("Fetched problems:", problems);
    res.status(200).json({success: true, data: problems});
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProblem = async (req, res) => {  
  const { title, description, difficulty } = req.body;

  if (!title || !description || !difficulty) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newProblem = await sql`
      INSERT INTO problems (title, description, difficulty)
      VALUES (${title}, ${description}, ${difficulty})
      RETURNING *
    `;
    console.log("Created new problem:", newProblem);

    res.status(201).json({ success: true, data: newProblem[0] });

    } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblem = async (req, res) => {
  const {id} = req.params

  try {
    await sql`
      SELECT * FROM problems WHERE id = ${id}
    `;
    res.status(200).json({ success: true, data: problem[0] });

  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
};

export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty } = req.body;

  if (!title || !description || !difficulty) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedProblem = await sql`
      UPDATE problems
      SET title = ${title}, description = ${description}, difficulty = ${difficulty}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedProblem.length === 0) {
      return res.status(404).json({ error: "Problem not found" });
    }

    console.log("Updated problem:", updatedProblem[0]);
    res.status(200).json({ success: true, data: updatedProblem[0] });

  } catch (error) {
    console.error("Error updating problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProblem = await sql`
      DELETE FROM problems
      WHERE id = ${id}
      RETURNING *
    `;

    if (deletedProblem.length === 0) {
      return res.status(404).json({ error: "Problem not found" });
    }

    console.log("Deleted problem:", deletedProblem[0]);
    res.status(200).json({ success: true, data: deletedProblem[0] });

  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};