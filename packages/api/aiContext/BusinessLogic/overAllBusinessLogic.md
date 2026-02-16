# 1️⃣ overall-business-logic.md

# 🪨 Marble Mason Billing System

# 1️⃣ SYSTEM OVERVIEW

The system is **site-based billing software** for marble masons.

Core Structure:

- One User
- Multiple Sites
- Each Site → Multiple Work Entries
- Each Work Entry → Belongs to a Material Category
- Billing is calculated Material-wise → then Grand Total

---

## Backend Business Logic – System Overview

This document defines the structured implementation flow of the backend business logic.

The system is built in ordered layers to ensure:

- Clean separation of concerns
- Accurate billing calculations
- Stable master data
- Controlled site lifecycle
- Predictable recalculation behavior

---

# 🧱 IMPLEMENTATION ORDER (HIGH LEVEL)

The backend must be implemented in the following order:

1. Master Data Layer
   - Material Categories
   - Work Master (CRUD)
   - Default Rate Configuration

2. Core Site Module
   - Site creation
   - Site lifecycle states

3. Measurement Entry Engine
   - Unit conversion logic
   - RFT vs Square Feet decision engine
   - Quantity-based calculations
   - Lump sum handling

4. Material Grouping Engine
   - Group entries by material
   - Section subtotal calculation

5. Rate Application Engine
   - Apply default rates
   - Override logic
   - Section total calculations

6. Billing Summary Engine
   - Grand total
   - Discount
   - Advance
   - Balance calculation

7. Recalculation Rules
   - Trigger-based recomputation

8. Data Integrity & Locking Rules
   - Snapshot storage
   - Bill finalization
   - Historical data protection

Each step must be completed before moving to the next.

This document does not contain implementation code.
