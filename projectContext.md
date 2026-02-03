# 🪨 Marble Mason Billing Web Application – Master Build Prompt

You are a senior full-stack engineer and system architect.  
Your task is to **design and implement a real-world marble mason billing web application** based on how marble masons actually measure and bill work on construction sites.

This is NOT an academic or drawing-based calculator.  
It must reflect **practical mason billing behavior**.

---

## 1️⃣ TECH STACK (MANDATORY)

Use the following stack:

### Frontend

- React
- TypeScript
- Tailwind CSS + shadcn(modular design)
- React Hook Form (dynamic forms)
- Zod (validation)
- TanStack Query (data fetching)

### Backend

- Node.js
- NestJS
- Prisma ORM

### Database

- PostgreSQL

### Architecture

- Frontend performs live calculations for UX
- Backend is the final authority for validation, totals, and storage
- Use REST APIs
- Clean modular architecture

---

## 2️⃣ CORE CONCEPT

The application is **site-based**.

- A **Site** = one customer location
- Each site contains multiple **measurement entries**
- Measurements auto-calculate
- Work is grouped **material-wise**
- Rates are auto-applied but editable
- Final bill is generated automatically

---

## 3️⃣ WORK & MEASUREMENT MASTER (CRUD REQUIRED)

Create a **Work Master** used during measurement entry.

### Default Work List

- Flooring — Square Feet (sq.ft)
- Wall Cladding / Wall Tiles — Square Feet (sq.ft)
- Skirting — Running Feet (RFT) + Width
- Border / Patti / Strip — Running Feet (RFT) + Width
- Kitchen Platform / Countertop — RFT or Square Feet
- Staircase Steps — Per Step / Square Feet / RFT
- Stair Edges / Side Patti — RFT + Width
- Window Sill — RFT + Width
- Door Threshold (Marble Patti) — RFT + Width
- Slab Work (Big Pieces) — Per Piece or Square Feet
- Polishing — Square Feet or Lump Sum
- Repair / Replacement — Per Piece or Lump Sum
- Cutting / Design Work — Per Cut or Lump Sum
- Material Supply — Square Feet / Per Bag / Lump Sum
- Labour (Daily Wage) — Per Day

### Work Master Requirements

- Full CRUD (Create, Read, Update, Delete)
- Each work stores:
  - Name
  - Default measurement type
  - Whether width is required
  - Material category (Marble, Granite, Tiles, Stone, etc.)
  - Active / inactive status
- Changes must reflect immediately in measurement entry

---

## 4️⃣ SITE CREATION WORKFLOW

User must create a site before entering measurements.

### Site Fields

- Customer Name
- Mobile Number
- Site Location / Address
- Optional Site Name
- Date (auto, editable)

---

## 5️⃣ MEASUREMENT ENTRY WORKFLOW

### Step 1: Select Work

- User selects a work from the Work Master
- System auto-fetches:
  - Measurement type
  - Width requirement
  - Material category

### Step 2: Dynamic Form

Show fields dynamically based on measurement type.

Inputs:

- Length (feet + inches)
- Width (feet + inches) if required
- Quantity (default = 1)
- Optional remarks

Users must **never manually calculate totals**.

---

## 6️⃣ RFT vs SQUARE FEET DECISION RULE (CRITICAL)

All measurements are entered as length and width.

### Rule

- If **width < 1 foot (12 inches)** → treat as **Running Feet (RFT)**
- If **width ≥ 1 foot** → treat as **Square Feet (sq.ft)**

This rule must be enforced everywhere.

---

## 7️⃣ CALCULATION LOGIC (MANDATORY)

### Unit Conversion

decimalFeet = feet + (inches / 12)

### RFT Calculation

When width < 1 ft:

RFT = Length × 1 × Quantity

Example:

- 12 ft 6 in × 0 ft 8 in
- Quantity = 1
- Result = 12.5 RFT

Width is used only to decide calculation type, not multiplied.

### Square Feet Calculation

When width ≥ 1 ft:

Area = Length × Width × Quantity

### Other Types

- Per Piece / Step → Quantity
- Per Day → Days
- Lump Sum → Direct amount

---

## 8️⃣ MATERIAL-WISE GROUPING

Each work belongs to a material category.

System must:

- Group entries by material
- Display sections:
  - Marble
  - Granite
  - Tiles
  - Stone
- Allow expand / collapse
- Calculate subtotal per material

---

## 9️⃣ RATE APPLICATION

- Each material has a default rate (from config)
- Rate is auto-applied
- User can override rate
- Totals update in real time

Rates apply based on:

- RFT
- Square Feet
- Piece
- Day
- Lump Sum

---

## 🔟 BILL SUMMARY

Calculate:

- Material-wise subtotal
- Grand total

Optional:

- Discount
- Advance payment
- Balance amount

All values must recalculate instantly.

---

## 1️⃣1️⃣ CONFIGURATION LAYER

Admin settings must allow:

- Default rates per material
- Default widths (3″, 4″, 6″)
- Enable / disable work items
- Edit work master list (CRUD)

---

## 1️⃣2️⃣ OUTPUT EXPECTATIONS

Provide:

- Database schema (PostgreSQL)
- Prisma models
- API endpoints
- Calculation functions
- Frontend flow
- Example calculations

---

## 1️⃣3️⃣ DESIGN PRINCIPLES

- Built for real construction workers
- Minimal typing
- No manual math
- Accurate billing
- Highly configurable
- Mobile-friendly

---

## END OF PROMPT
