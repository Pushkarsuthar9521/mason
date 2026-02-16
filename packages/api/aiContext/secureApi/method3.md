METHOD 3: INPUT VALIDATION
Priority: HIGH
Implement: Third
What to Implement
Validate and sanitize all incoming data to prevent injection attacks and ensure data integrity.
Why After Authentication

Authentication ensures you know who is sending data
Input validation ensures the data itself is safe
Many attacks exploit poor input validation

Threats Prevented

SQL Injection
Cross-Site Scripting (XSS)
Command Injection
Path Traversal
XML External Entity (XXE) attacks

Implementation Example
javascriptfunction validateInput(data) {
if (!/^[a-zA-Z0-9]\*$/.test(data.username)) {
throw new Error('Invalid username');
}
}
Validation Rules

Whitelist approach - Define what is allowed, reject everything else
Type validation - Ensure data matches expected type (string, number, email)
Length limits - Enforce minimum and maximum lengths
Format validation - Use regex for structured data (emails, phone numbers)
Range validation - Check numeric values are within acceptable ranges

What to Validate

All user inputs (query parameters, request body, headers)
File uploads (type, size, content)
URLs and redirects
Database queries and command parameters

Best Practices

Validate on the server side (never trust client-side validation)
Use parameterized queries for database operations
Sanitize data before rendering in responses
Implement Content Security Policy (CSP) headers
Encode output to prevent XSS

Library Recommendations

Express-validator (Node.js)
Joi (Node.js)
Django validators (Python)
Hibernate Validator (Java)
