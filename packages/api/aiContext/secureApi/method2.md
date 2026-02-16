METHOD 2: AUTHENTICATION & AUTHORIZATION
Priority: CRITICAL
Implement: first
What to Implement
Verify user identity (authentication) and control access permissions (authorization) using industry-standard methods.
Why After HTTPS

HTTPS must be in place to securely transmit authentication credentials
Authentication tokens require encrypted channels

Recommended Methods

OAuth 2.0 - For delegated access and third-party integrations
JWT (JSON Web Tokens) - For stateless authentication
API Keys - For service-to-service communication

OAuth 2.0 Implementation
POST /oauth/token
Authorization: Basic Base64(client_id:client_secret)
This generates an access token for subsequent API calls.
JWT Implementation

Use JWT for stateless authentication
Include user identity and permissions in token payload
Sign tokens with strong secret or private key

API Key Implementation

Generate unique keys for each client
Treat API keys as passwords (never expose in code)
Store keys securely (environment variables, secret managers)

Key Points

Use OAuth 2.0 for user-facing applications with delegated access
Use JWT for stateless APIs with frequent authentication checks
API keys should be rotated regularly
Never hardcode credentials in source code

Authorization Best Practices

Implement role-based access control (RBAC)
Apply principle of least privilege
Validate permissions on every request
Separate authentication from authorization logic
