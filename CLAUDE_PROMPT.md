# DevMock build prompt for Claude Code

You are the senior full-stack engineer responsible for finishing this repository.

Goal: build and verify DevMock, a production-quality developer API mocking platform.

Requirements:
1. Inspect the entire repository before changing files.
2. Keep the stack React + Vite on the client and Express + MongoDB/Mongoose on the server.
3. Do not replace the architecture with another framework.
4. Implement JWT authentication.
5. Users can register, login, logout client-side, and view their profile.
6. Authenticated users can create, list, update and delete mock endpoints.
7. Each endpoint has:
   - endpointPath
   - jsonPayload
   - description
   - statusCode
   - userId
   - requestCount
   - lastAccessedAt
   - createdAt/updatedAt
8. Validate endpoint paths so they start with `/`, contain no query string, and do not contain dangerous path traversal.
9. Validate JSON payload before storing it.
10. The public endpoint must be:
    GET /mock/:userId/:path
    and must also support nested paths such as /mock/abc/api/users/123 by capturing the remainder of the URL.
11. Return the stored JSON with the stored status code and `application/json`.
12. Increment requestCount and update lastAccessedAt when a mock is called.
13. Add 404 handling for unknown mock endpoints.
14. Add CORS, Helmet, request logging and rate limiting.
15. Never expose password hashes.
16. Use environment variables and never hard-code secrets.
17. Make the UI responsive and polished:
    - login/register
    - dashboard
    - create endpoint form
    - endpoint cards/table
    - edit/delete
    - copy public URL
    - JSON validation errors
    - empty state
    - loading/error states
18. Add a simple API documentation/help section inside the dashboard.
19. Add tests for auth, endpoint CRUD, JSON validation and public mock retrieval.
20. Add useful comments only where they explain non-obvious logic.
21. Run lint/build/tests and fix all errors.
22. Do not stop at writing code. Verify that the app actually builds.

After completing each major phase, summarize what changed and what command was run to verify it.
