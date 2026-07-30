# Requirements: Simple To-Do List App

## Overview
A single-page web application that lets a user manage a personal to-do list. No login, no backend database — data is stored in the browser only. This is a small test project used to validate an automated SDLC pipeline (requirements → code → tests → review → merge).

## Goal
Build a working, clean, single-file web app that runs in any browser with no installation.

## Functional Requirements

1. **Add a task**
   - User can type a task description into an input field and add it to the list (via button click or pressing Enter).
   - Empty submissions should be ignored (no blank tasks).

2. **View tasks**
   - All tasks are displayed in a list, most recently added at the top.
   - Each task shows its text and its status (complete/incomplete).

3. **Mark task complete/incomplete**
   - User can click a checkbox (or the task itself) to toggle a task between complete and incomplete.
   - Completed tasks are visually distinct (e.g., strikethrough text, greyed out).

4. **Delete a task**
   - User can remove a task from the list permanently via a delete button/icon.

5. **Filter tasks**
   - User can filter the visible list by: **All**, **Active** (incomplete only), **Completed** (complete only).

6. **Task counter**
   - Display a count of remaining active (incomplete) tasks, e.g., "3 tasks left."

## Non-Functional Requirements

- **Platform:** Runs in a web browser (HTML/CSS/JavaScript). No server or database required.
- **Persistence:** Tasks should persist across page refreshes (e.g., using browser local storage).
- **Simplicity:** Single-page app, no external accounts or sign-in.
- **Responsiveness:** Usable on both desktop and mobile browser widths.

## Out of Scope (v1)
- User accounts / multi-user support
- Cloud sync across devices
- Due dates, priorities, or categories
- Notifications/reminders

## Acceptance Criteria
- [ ] User can add a task and see it appear in the list immediately.
- [ ] User can mark a task complete and see it visually change.
- [ ] User can delete a task and it disappears from the list.
- [ ] User can filter between All / Active /
