"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadAppModule } = require("./load-app");

const {
  addTask,
  toggleTaskCompletion,
  deleteTask,
  filterTasks,
  countActiveTasks,
  formatCounter
} = loadAppModule();

test("addTask prepends a new task with trimmed text", () => {
  const tasks = addTask([], "  Buy milk  ");
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].text, "Buy milk");
  assert.equal(tasks[0].completed, false);
});

test("addTask puts the newest task at the top of the list", () => {
  let tasks = addTask([], "first");
  tasks = addTask(tasks, "second");
  assert.equal(tasks.length, 2);
  assert.equal(tasks[0].text, "second");
  assert.equal(tasks[1].text, "first");
});

test("addTask ignores blank or whitespace-only submissions", () => {
  const tasks = addTask([], "   ");
  assert.equal(tasks.length, 0);
});

test("addTask ignores empty string submissions", () => {
  const original = [];
  const result = addTask(original, "");
  assert.equal(result, original);
});

test("toggleTaskCompletion flips only the matching task", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  const targetId = tasks[0].id;

  tasks = toggleTaskCompletion(tasks, targetId);

  assert.equal(tasks.find((t) => t.id === targetId).completed, true);
  assert.equal(tasks.find((t) => t.id !== targetId).completed, false);

  tasks = toggleTaskCompletion(tasks, targetId);
  assert.equal(tasks.find((t) => t.id === targetId).completed, false);
});

test("deleteTask removes only the matching task", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  const idToDelete = tasks[0].id;

  tasks = deleteTask(tasks, idToDelete);

  assert.equal(tasks.length, 1);
  assert.equal(tasks.some((t) => t.id === idToDelete), false);
});

test("filterTasks returns all tasks for the 'all' filter", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  tasks = toggleTaskCompletion(tasks, tasks[0].id);

  assert.equal(filterTasks(tasks, "all").length, 2);
});

test("filterTasks returns only incomplete tasks for 'active'", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  tasks = toggleTaskCompletion(tasks, tasks[0].id); // completes the most recent ("b")

  const active = filterTasks(tasks, "active");
  assert.equal(active.length, 1);
  assert.equal(active[0].text, "a");
});

test("filterTasks returns only completed tasks for 'completed'", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  tasks = toggleTaskCompletion(tasks, tasks[0].id); // completes "b"

  const completed = filterTasks(tasks, "completed");
  assert.equal(completed.length, 1);
  assert.equal(completed[0].text, "b");
});

test("countActiveTasks counts only incomplete tasks", () => {
  let tasks = addTask([], "a");
  tasks = addTask(tasks, "b");
  tasks = addTask(tasks, "c");
  tasks = toggleTaskCompletion(tasks, tasks[0].id);

  assert.equal(countActiveTasks(tasks), 2);
});

test("formatCounter pluralizes correctly", () => {
  assert.equal(formatCounter(0), "0 tasks left");
  assert.equal(formatCounter(1), "1 task left");
  assert.equal(formatCounter(2), "2 tasks left");
});
