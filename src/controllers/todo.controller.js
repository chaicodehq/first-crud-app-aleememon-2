import { Todo } from "../models/todo.model.js";

/**
 * TODO: Create a new todo
 * - Extract data from req.body
 * - Create todo in database
 * - Return 201 with created todo
 */
export async function createTodo(req, res, next) {
  try {
    // Your code here
    const { title, completed, priority, tags, dueDate } = req.body;

    const newTodo = await Todo.create({
      title,
      completed,
      priority,
      tags,
      dueDate,
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: List todos with pagination and filters
 * - Support query params: page, limit, completed, priority, search
 * - Default: page=1, limit=10
 * - Return: { data: [...], meta: { total, page, limit, pages } }
 */
export async function listTodos(req, res, next) {
  try {
    // Your code here
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { completed, priority, search } = req.query;

    const query = {};

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const [data, total] = await Promise.all([
      Todo.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean(),
      Todo.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limit);

    return res.status(200).json({
      data,
      meta: {
        total,
        page,
        limit,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get single todo by ID
 * - Return 404 if not found
 */
export async function getTodo(req, res, next) {
  try {
    // Your code here
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo)
      return res.status(404).json({
        error: { message: "todo not found" },
      });

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Update todo by ID
 * - Use findByIdAndUpdate with { new: true, runValidators: true }
 * - Return 404 if not found
 */
export async function updateTodo(req, res, next) {
  try {
    // Your code here
    const id = req.params.id;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo)
      return res.status(404).json({ error: { message: "todo not found" } });

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Toggle completed status
 * - Find todo, flip completed, save
 * - Return 404 if not found
 */
export async function toggleTodo(req, res, next) {
  try {
    // Your code here
    const id = req.params.id;

    const existing = await Todo.findById(id);

    if (!existing)
      return res.status(404).json({ error: { message: "todo not found" } });

    existing.completed = !existing.completed;

    await existing.save();

    return res.status(200).json(existing);

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete todo by ID
 * - Return 204 (no content) on success
 * - Return 404 if not found
 */
export async function deleteTodo(req, res, next) {
  try {
    // Your code here
    const id = req.params.id;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo)
      return res.status(404).json({ error: { message: "todo not found" } });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
