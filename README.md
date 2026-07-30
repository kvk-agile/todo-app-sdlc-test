# todo-app-sdlc-test
Testing automated SDLC with Claude + GitHub Actions

## To-Do List App

A single-page to-do list app — see [`requirements.md`](requirements.md) for the spec.

- **Run it:** open [`index.html`](index.html) directly in a browser. No build step, no server, no dependencies.
- **Data:** tasks persist in the browser's `localStorage`.
- **Tests:** basic unit tests for the app's core logic (add/toggle/delete/filter/count) live in `tests/` and run on Node's built-in test runner:

  ```sh
  npm test
  ```
