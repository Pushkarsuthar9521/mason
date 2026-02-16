# 🪨 Marble Mason Billing Web Application

A real-world marble mason billing web application based on how marble masons actually measure and bill work on construction sites.

---

## 📁 Project Structure

```
mason/                          # Root (pnpm monorepo)
├── package.json                # Workspace scripts
├── pnpm-workspace.yaml         # Workspace config
├── packages/
│   ├── api/                    # @mason/api - NestJS Backend
│   │   ├── prisma/
│   │   │   └── schema.prisma   # ✅ Complete database schema
│   │   ├── prisma.config.ts    # Prisma config (Supabase/PostgreSQL)
│   │   └── src/
│   │       ├── app.module.ts   # Root NestJS module
│   │       ├── app.controller.ts
│   │       ├── app.service.ts
│   │       └── main.ts
│   └── app/                    # @mason/app - React Frontend
│       ├── components.json     # shadcn/ui config (new-york style)
│       ├── vite.config.ts      # Vite + Tailwind v4
│       └── src/
│           ├── App.tsx         # Main app (scaffold)
│           ├── index.css       # Tailwind + CSS variables
│           └── lib/utils.ts    # cn() utility
```

---

## ✅ Implementation Status

### Backend (@mason/api)

| Component           | Status         | Notes                     |
| ------------------- | -------------- | ------------------------- |
| NestJS Setup        | ✅ Done        | v11, basic scaffold       |
| Prisma ORM          | ✅ Done        | v7.3.0                    |
| Database Schema     | ✅ Done        | All models defined        |
| Prisma Config       | ✅ Done        | Supabase-ready            |
| User Model          | ✅ Done        | Auth & role management    |
| Calculation Service | ❌ Not Started | RFT/SQFT logic            |
| Validation          | ❌ Not Started | DTOs with class-validator |

### Frontend (@mason/app)

| Component       | Status         | Notes                        |
| --------------- | -------------- | ---------------------------- |
| Vite + React 19 | ✅ Done        | TypeScript enabled           |
| Tailwind CSS v4 | ✅ Done        | With CSS variables           |
| shadcn/ui       | ✅ Done        | new-york style, path aliases |
| TanStack Query  | ✅ Installed   | Not configured               |
| React Hook Form | ✅ Installed   | Not configured               |
| Zod             | ✅ Installed   | Not configured               |
| UI Components   | ❌ Not Started |                              |
| Pages/Routes    | ❌ Not Started |                              |
| API Integration | ❌ Not Started |                              |

---

## 🗃️ Database Schema (Prisma)

### Enums

```prisma
enum MeasurementType {
  SQFT      // Square Feet
  RFT       // Running Feet
  PIECE     // Per Piece / Step
  DAY       // Per Day (labour)
  LUMPSUM   // Lump Sum amount
}

enum UserRole {
  ADMIN     // Full access, manage users, configurations
  USER      // Standard user, manage own sites and bills
}
```

### Models

| Model                 | Description                              | Key Fields                                                                   | Owner   |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| `User`                | Application users (marble masons)        | username, email, password (hashed), role, isActive                           | System  |
| `MaterialCategory`    | Material types (Marble, Granite, etc.)   | name, defaultRate, isActive                                                  | Shared  |
| `WorkMaster`          | Types of work (Flooring, Skirting, etc.) | name, measurementType, requiresWidth, materialCategoryId                     | Shared  |
| `Site`                | Customer job sites                       | userId, customerName, mobileNumber, address, siteName, date                  | User    |
| `Measurement`         | Individual measurement entries           | lengthFeet/Inches, widthFeet/Inches, quantity, calculatedValue, rate, amount | User    |
| `Bill`                | Generated bills for sites                | userId, siteId, billNumber, grandTotal, discount, advancePayment, balanceAmount | User |
| `BillMaterialSummary` | Material-wise subtotals                  | billId, materialCategoryId, subtotal                                         | User    |
| `Configuration`       | App-wide key-value settings              | key, value                                                                   | System  |

### Key Relationships

- `User` → `Site` (1:N, cascade delete)
- `User` → `Bill` (1:N, cascade delete)
- `MaterialCategory` → `WorkMaster` (1:N)
- `Site` → `Measurement` (1:N, cascade delete)
- `Site` → `Bill` (1:N, cascade delete)
- `WorkMaster` → `Measurement` (1:N)
- `Bill` → `BillMaterialSummary` (1:N, cascade delete)

### Data Ownership

| Entity | Owner  | Query Example              |
| ------ | ------ | -------------------------- |
| Site   | User   | `Site.findMany({ where: { userId } })` |
| Bill   | User   | `Bill.findMany({ where: { userId } })` |
| Measurement | User (indirect via Site) | Get measurements by querying site's measurements |
| MaterialCategory | Shared | Access by all users |
| WorkMaster | Shared | Access by all users |

---

## 🛠️ Tech Stack

### Frontend

- **React 19** + TypeScript
- **Vite 7** (dev server & bundler)
- **Tailwind CSS v4** + tw-animate-css
- **shadcn/ui** (new-york style, lucide icons)
- **TanStack Query v5** (data fetching)
- **React Hook Form v7** + @hookform/resolvers
- **Zod v4** (validation)
- **radix-ui** (primitives)

### Backend

- **NestJS v11** (Node.js framework)
- **Prisma v7.3.0** (ORM)
- **PostgreSQL** (via Supabase)
- **JWT** (authentication)
- **Passport** (auth strategy)
- **bcrypt** (password hashing)

### Tooling

- **pnpm** (package manager + workspaces)
- **ESLint 9** + Prettier
- **Jest** (testing)

---

## 📜 Scripts

### Root Commands

```bash
pnpm dev              # Run both api and app in parallel
pnpm dev:app          # Run frontend only
pnpm dev:api          # Run backend only
pnpm build            # Build all packages
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run migrations
pnpm prisma:studio    # Open Prisma Studio
```

### API Package

```bash
pnpm start:dev        # Development mode with watch
pnpm build            # Production build
pnpm test             # Run tests
```

### App Package

```bash
pnpm dev              # Vite dev server
pnpm build            # Production build
pnpm preview          # Preview production build
```

---

## 🎯 Core Business Logic

### RFT vs Square Feet Decision Rule

All measurements are entered as length and width:

- If **width < 1 foot (12 inches)** → treat as **Running Feet (RFT)**
- If **width ≥ 1 foot** → treat as **Square Feet (sq.ft)**

### Calculation Formulas

```typescript
// Unit conversion
decimalFeet = feet + (inches / 12)

// RFT (when width < 1 ft)
RFT = Length × Quantity

// Square Feet (when width ≥ 1 ft)
Area = Length × Width × Quantity

// Other types
PIECE → Quantity
DAY → Days
LUMPSUM → Direct amount
```

### Example Calculation

- Input: 12 ft 6 in × 0 ft 8 in, Quantity = 1
- Width = 8 inches < 12 inches → RFT
- Result = 12.5 RFT (width not multiplied)

---

## 🔧 Configuration

### Path Aliases

- Frontend: `@/*` → `./src/*`

### shadcn/ui Aliases

```json
{
  "components": "@/components",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks",
  "utils": "@/lib/utils"
}
```

### Environment Variables (API)

```env
DATABASE_URL=       # Pooled connection (for app)
DIRECT_URL=         # Direct connection (for migrations)
JWT_SECRET=         # Secret key for JWT token signing
```

---

## 📋 Next Steps (TODO)

### Backend

1. [ ] Install JWT and Passport packages
2. [ ] Implement authentication (JWT + bcrypt)
3. [ ] Create Prisma migrations and seed data
4. [ ] Implement NestJS modules: User, Auth, MaterialCategory, WorkMaster, Site, Measurement, Bill, Configuration
5. [ ] Create DTOs with class-validator
6. [ ] Implement role-based access control (RBAC)
7. [ ] Implement calculation service (RFT/SQFT logic)
8. [ ] Add CORS configuration
9. [ ] Add API documentation (Swagger)
10. [ ] Implement data isolation (users can only access own sites/bills)

### Frontend

1. [ ] Set up React Router
2. [ ] Configure TanStack Query provider
3. [ ] Add shadcn/ui components (Button, Input, Form, Card, etc.)
4. [ ] Create authentication pages (Login, Register)
5. [ ] Create pages: Dashboard, Sites, Measurements, Bills, Settings
6. [ ] Implement forms with React Hook Form + Zod
7. [ ] Build calculation preview component
8. [ ] Add responsive/mobile-friendly layout
9. [ ] Implement token storage & refresh

---

## 📐 Default Work Types

| Work Type                     | Measurement   | Width Required |
| ----------------------------- | ------------- | -------------- |
| Flooring                      | SQFT          | Yes            |
| Wall Cladding / Wall Tiles    | SQFT          | Yes            |
| Skirting                      | RFT           | Yes            |
| Border / Patti / Strip        | RFT           | Yes            |
| Kitchen Platform / Countertop | RFT/SQFT      | Yes            |
| Staircase Steps               | PIECE/SQFT    | Optional       |
| Stair Edges / Side Patti      | RFT           | Yes            |
| Window Sill                   | RFT           | Yes            |
| Door Threshold                | RFT           | Yes            |
| Slab Work                     | PIECE/SQFT    | Optional       |
| Polishing                     | SQFT/LUMPSUM  | Optional       |
| Repair / Replacement          | PIECE/LUMPSUM | No             |
| Cutting / Design Work         | PIECE/LUMPSUM | No             |
| Material Supply               | SQFT/LUMPSUM  | No             |
| Labour (Daily Wage)           | DAY           | No             |

---

## 🎨 Design Principles

- Built for real construction workers
- Minimal typing required
- No manual math needed
- Accurate billing calculations
- Highly configurable
- Mobile-friendly interface
