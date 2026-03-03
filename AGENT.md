# Code Review Guidelines

## 1. Critical (P0) – Must Fix Before Merge

Flag as P0 if any of the following are found:

- Security vulnerabilities (SQL injection, XSS, command injection, deserialization risks)
- Missing authentication or authorization checks
- Sensitive data exposure (tokens, passwords, internal URLs)
- Hardcoded secrets or credentials
- Breaking API contract without versioning
- Race conditions or concurrency issues
- Data corruption risk
- Unhandled exceptions that may crash the service

For each P0 issue:
- Provide file path
- Provide line number
- Explain risk
- Suggest concrete fix

---

## 2. High (P1) – Strongly Recommended Fix

- Missing input validation
- Improper error handling
- Missing transaction boundaries
- N+1 query risks
- Blocking IO in async context
- Performance regressions
- Large memory allocations
- Missing null checks
- Unbounded loops or recursion
- Logging sensitive data

---

## 3. Medium (P2) – Improvement Suggestions

- Code duplication
- Large functions (>100 lines)
- Deep nesting (>3 levels)
- Unclear naming
- Missing comments on complex logic
- Magic numbers
- Inconsistent logging style

---

## 4. Testing Requirements

- New business logic must have unit tests
- Bug fixes must include regression tests
- API changes must update integration tests
- Highlight missing edge case coverage
- Suggest boundary condition tests

---

## 5. API Design Rules

- RESTful naming consistency
- No breaking response structure without version bump
- Validate request DTOs
- Return consistent error format
- Do not leak internal exception details

---

## 6. Performance Checks

- Flag O(n²) loops
- Flag redundant database queries
- Suggest indexing where applicable
- Highlight expensive serialization/deserialization
- Detect unnecessary object creation in hot paths

---

## 7. Logging & Observability

- Ensure errors are logged
- Avoid logging secrets
- Prefer structured logging
- Ensure trace IDs are propagated

---

## 8. Dependencies

- Flag newly introduced heavy dependencies
- Flag outdated or vulnerable packages
- Suggest smaller alternatives if applicable

---

## 9. Review Output Format

When reviewing:

- Group findings by severity (P0, P1, P2)
- Provide file path + line number
- Provide reasoning
- Provide suggested fix
- Be concise and actionable