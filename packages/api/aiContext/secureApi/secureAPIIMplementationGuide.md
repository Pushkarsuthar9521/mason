# API Security Implementation Prompt

## Implementation Order (Do in sequence)

### METHOD 1: HTTPS Enforcement (skip)

- Force all API traffic through HTTPS
- Redirect HTTP to HTTPS
- Use TLS 1.2+
- Prevents man-in-the-middle attacks

### METHOD 2: Authentication & Authorization

- Implement OAuth 2.0 / JWT / API Keys
- Verify identity (authentication)
- Control access (authorization)
- Example: `Authorization: Bearer <token>`
- context: '/packages/api/aiContext/secureApi/method2.md'

### METHOD 3: Input Validation

- Validate all user inputs (query params, body, headers)
- Use whitelist approach
- Prevent SQL injection, XSS, command injection
- Example: Regex validation for usernames, emails
- context: '/packages/api/aiContext/secureApi/method3.md'

### METHOD 4: Rate Limiting

- Limit requests per user/IP/timeframe
- Prevents DDoS, brute force attacks
- Example: 1000 requests/hour
- Return HTTP 429 when exceeded
- context: '/packages/api/aiContext/secureApi/method4.md'

### METHOD 5: Token Expiration

- Set expiration time on JWT/OAuth tokens
- Access tokens: 15min-1hr
- Refresh tokens: 7-30 days
- Implement token refresh mechanism
- context: '/packages/api/aiContext/secureApi/method5.md'

### METHOD 6: Error Handling

- Return generic error messages to users
- Log detailed errors server-side only
- Never expose: stack traces, DB structure, file paths
- Example: `{"error": "An unexpected error occurred"}`

---

## Quick Implementation Commands

**Method 1:** "Implement HTTPS enforcement for my API"
**Method 2:** "Add JWT authentication with role-based authorization"
**Method 3:** "Add input validation for all API endpoints"
**Method 4:** "Implement rate limiting: 1000 requests/hour per user"
**Method 5:** "Set JWT token expiration: 1hr access, 7d refresh"
**Method 6:** "Implement safe error handling that hides sensitive info"
