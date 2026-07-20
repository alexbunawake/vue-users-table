# User Management App

A small Vue 3 app for managing users: a searchable, sortable, paginated table plus create, edit, and delete.

## Stack

- Vue 3 (`<script setup>`) + TypeScript
- Vite
- TanStack Query (server state, caching)
- vee-validate + zod (forms)
- Tailwind CSS 4
- json-server (fake REST API)
- Reka UI (ui components)

## Requirements

Node 22.18+ or 24.12+.

## Running the app

```sh
npm install
npm run dev
```

This starts two processes:

- Vite dev server on http://localhost:5173
- json-server API on http://localhost:3001

Open http://localhost:5173. Vite proxies `/api` to the API, so the app never calls port 3001 directly.

To run them separately:

```sh
npm run dev:client
npm run dev:api
```

## Other scripts

```sh
npm run build
npm run type-check
npm run lint
npm run format
```

## Data

Users live in `userList.json`. json-server writes to this file, so changes made in the UI persist between restarts. Delete or edit the file to reset the data.

## Project structure

Feature-Sliced Design:

```
src/
  app/        app setup, router, query client, global styles
  pages/      users, user-create, user-edit, not-found
  widgets/    users-table
  features/   manage-users (create/edit/delete/bulk-delete), user-table-controls
  entities/   user — api segment (requests + query hooks), model, form UI
  shared/     ui kit, http client, composables, route and storage config
```

Imports only ever point down the layer stack, slices never reach sideways into their
neighbours, and everything crossing a slice boundary goes through its `index.ts`.

## Features

**Table state lives in the URL.** Page, page size, sorting, and every filter are query params, so any view can be shared, bookmarked, and survives a reload. Paging pushes a history entry; changing a filter, sort, or page size replaces it — Back leaves the table instead of undoing keystrokes one at a time. Query params the table doesn't own are left untouched.

**Search and filtering.** Each of ID, Name, and Email has its own search box, and they combine with AND. Name searches both `firstName` and `lastName`. "Last visited" is a separate range filter (any time / 7 / 30 / 90 days). Active filters show as chips above the table and can be removed one by one.

The server does filtering. The app builds a single `_where` query for json-server, because json-server ignores plain `field:contains` params as soon as `_where` is present.

**Sorting.** Click a column header to cycle ascending → descending → off. Invalid values in the URL fall back to defaults instead of being passed through to the API.

**Pagination.** Server-side, with a page size selector (5–100). The page list is truncated (`1 … 4 5 6 … 20`), so the number of buttons stays constant no matter how many pages there are. The chosen page size is remembered in localStorage and written into the URL on the first visit, so a shared link shows the sender's page size rather than the recipient's.

**Bulk actions.** Rows carry checkboxes plus a select-all-on-this-page control, and the selection resets whenever the query changes. Selecting anything reveals a bar above the table that deletes the whole set in one action and reports partial failures (`Deleted 3 of 5 users`).

**Create, edit, delete.** One form component drives both create and edit, validated by a shared zod schema. Leaving the table stores its URL in sessionStorage, so "Back to users" and the redirect after creating a user both land on the exact view you left, filters and page included.

**Feedback.** Mutations report through a shared toast queue rendered bottom-right, with enter and exit animations and swipe-to-dismiss.

**Request cancellation.** Query hooks hand TanStack Query's `AbortSignal` to `fetch`, so quickly paging or retyping a filter cancels the superseded requests instead of letting them race.

**Accessibility.** Skip link, focus moved to `<main>` on navigation with a live region announcing the new page title, `aria-sort` on sortable headers, keyboard-operable sort and filter controls, labelled checkboxes, and `role="alert"` on error states.