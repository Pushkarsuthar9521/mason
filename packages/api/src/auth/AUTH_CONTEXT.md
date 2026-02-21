# Auth Implementation Context

## About the Learner

- New to NestJS, knows Express and REST APIs well
- Weak on: classes, decorators, dependency injection, OOP concepts (extends, super, implements)
- Learning style: hands-on, one step at a time, implement yourself
- AI role: teach AND guide implementation (not do it for them)

## Teaching Rules (AI must follow)

- One step per message only — wait for user confirmation before next step
- Always explain using Express comparisons first, then Nest equivalent
- ALWAYS explain OOP keywords when used: extends, super, implements, class, constructor
- Explain every decorator when introduced for the first time
- Never give all steps at once
- If context is lost, re-read this file and current file states before responding

## Implementation Approach

- Method 2 from secureAPIImplementationGuide.md: JWT Authentication + RBAC
- Using Prisma directly (no in-memory store)
- No class-validator yet (that is Method 3)

## What Is Done

- [x] Packages installed: @nestjs/jwt, @nestjs/passport, passport, passport-jwt, bcrypt + types
- [x] Folder structure created: src/auth/ with all empty files
- [x] dto/register.dto.ts → fields: username, email, password
- [x] dto/login.dto.ts → fields: username, password
- [x] src/prisma.service.ts → created (extends PrismaClient, connects on init)
- [x] auth.service.ts → register() and login() using Prisma + bcrypt (done by user)
- [x] jwt.strategy.ts → written by user, explained in detail below

## Current Step

- Step 5 explanation: user needs full line-by-line + OOP + Express comparison for jwt.strategy.ts
- Next action: user confirms understanding, then moves to Step 6 (jwt-auth.guard.ts)

## OOP Concepts Explained So Far

- class → blueprint for an object
- extends → inherit everything from another class
- super() → call the parent class constructor
- constructor() → runs once when class is created, used for DI
- implements → promise to TypeScript that this class has certain methods
- @Injectable() → tells Nest DI to manage this class

## Remaining Files (in order)

- [ ] jwt-auth.guard.ts → protect routes (one-liner that activates strategy)
- [ ] roles.decorator.ts → @Roles() tag for routes
- [ ] roles.guard.ts → check user role
- [ ] auth.controller.ts → POST /auth/register and POST /auth/login
- [ ] auth.module.ts → wire everything together
- [ ] app.module.ts → import AuthModule + PrismaService
- [ ] app.controller.ts → add protected + admin route examples

## Planned Next (after auth works)

- Method 3: input validation with class-validator
- Method 4: rate limiting
- Method 5: token expiration + refresh tokens

## Key File Locations

- Schema: packages/api/prisma/schema.prisma (User model with UserRole enum)
- Prisma output: packages/api/generated/prisma (generated, do not edit)
- PrismaService: packages/api/src/prisma.service.ts
- Entry: packages/api/src/main.ts (port: process.env.PORT ?? 30122)
- Root module: packages/api/src/app.module.ts
- Auth context: packages/api/src/auth/AUTH_CONTEXT.md
- Security guide: packages/api/aiContext/secureApi/secureAPIImplementationGuide.md
- ENV file: packages/api/.env (DATABASE_URL set, JWT_SECRET_KEY used in jwt.strategy.ts)
