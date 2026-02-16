METHOD 4: RATE LIMITING
Priority: HIGH
Implement: Fourth
What to Implement
Control the number of API requests a user or client can make within a specific timeframe.
Why After Input Validation

Rate limiting protects against automated attacks
Input validation must be in place first to prevent resource-intensive malicious payloads
Prevents abuse of validated endpoints

Threats Prevented

DDoS (Distributed Denial of Service) attacks
Brute force attacks (password guessing)
API abuse and resource exhaustion
Credential stuffing
Web scraping

Implementation Example Headers
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 500
X-RateLimit-Reset: 3600
This allows 1000 requests per hour.
Rate Limiting Strategies

User-based limits - Per authenticated user
IP-based limits - Per IP address (for public endpoints)
API key limits - Per API key or application
Endpoint-specific limits - Different limits for different endpoints

Recommended Limits

Standard users: 1000-5000 requests/hour
Premium users: 10000+ requests/hour
Login endpoints: 5-10 attempts/15 minutes
Resource-intensive operations: Lower limits (100-500/hour)

Implementation Approaches

Token bucket algorithm - Most common, allows bursts
Leaky bucket algorithm - Smooth rate, no bursts
Fixed window - Simple but can have edge cases
Sliding window - More accurate but complex

Response Handling

Return HTTP 429 (Too Many Requests) when limit exceeded
Include retry-after header with reset time
Provide clear error messages

Tools & Libraries

Redis for distributed rate limiting
Express-rate-limit (Node.js)
Flask-Limiter (Python)
API Gateway solutions (AWS API Gateway, Kong, Apigee)
