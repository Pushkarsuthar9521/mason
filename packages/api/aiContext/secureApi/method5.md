METHOD 5: TOKEN EXPIRATION
Priority: MEDIUM-HIGH
Implement: Fifth (Required if using JWT/OAuth)
What to Implement
Set expiration times for authentication tokens to limit damage if tokens are compromised.
Why After Rate Limiting

Rate limiting protects against token theft attempts
Token expiration limits the window of opportunity for attackers
Works together with authentication system (Method 2)

JWT Expiration Example
json{
"sub": "user123",
"exp": 1717902400
}
The token expires after the specified timestamp.
Recommended Expiration Times

Access tokens: 15 minutes to 1 hour
Refresh tokens: 7-30 days
API keys: No expiration, but rotation recommended every 90 days
Session tokens: 24 hours or inactivity timeout

Implementation Strategy

Short-lived access tokens - Minimize risk window
Long-lived refresh tokens - Balance security and user experience
Token refresh mechanism - Allow seamless re-authentication
Sliding expiration - Extend expiration on active use

Token Invalidation

Maintain token blacklist for revoked tokens
Store in fast cache (Redis) for quick validation
Implement logout functionality to invalidate tokens
Force token refresh on suspicious activity

Additional Security Measures

Include timestamp in token (iat - issued at)
Implement not-before (nbf) claim
Use short expiration for sensitive operations
Re-authenticate for critical actions (password change, payment)

Refresh Token Pattern

1. User authenticates → Receive access token (short-lived) + refresh token (long-lived)
2. Access token expires → Use refresh token to get new access token
3. Refresh token expires → User must re-authenticate
   Monitoring

Log token generation and expiration events
Track token refresh patterns for anomaly detection
Alert on excessive refresh attempts
