# 🪨 Marble Mason Billing System

# Backend Business Logic – SOP Document

> This document defines the **business logic, rules, decision flow, and calculation standards**  
> for the Marble Mason Billing Application.

# 1️⃣ SYSTEM OVERVIEW

The system is **site-based billing software** for marble masons.

Core Structure:

- One User
- Multiple Sites
- Each Site → Multiple Work Entries
- Each Work Entry → Belongs to a Material Category
- Billing is calculated Material-wise → then Grand Total

---

# 2️⃣ MASTER DATA LOGIC

## 2.1 Work Master

The system must maintain a configurable **Work Master List**.

Each Work Item must logically contain:

- Work Name
- Default Measurement Type
- Requires Width (Yes / No)
- Material Category
- Active Status

### Measurement Types Supported

- Square Feet
- Running Feet (RFT)
- Per Piece
- Per Step
- Per Day
- Lump Sum

---

## 2.2 Work Master CRUD Logic

When:

- Work is created → It becomes selectable during measurement entry
- Work is updated → Changes reflect immediately
- Work is deactivated → It cannot be selected in new entries
- Work is deleted → Only allowed if not linked to historical site data

---

# 3️⃣ SITE CREATION LOGIC

## 3.1 Site Creation Flow

When user creates a Site:

Input Required:

- Customer Name
- Mobile Number
- Location
- Optional Site Name
- Date

Validation:

- Customer Name must not be empty
- Mobile format validation
- Date defaults to current date

After creation:

- Site status = Active
- Site can accept measurement entries

---

# 4️⃣ MEASUREMENT ENTRY LOGIC

## 4.1 Work Selection

When user selects a Work:

System must:

- Fetch Measurement Type
- Fetch Requires Width flag
- Fetch Material Category
- Fetch Default Material Rate

---

## 4.2 Input Structure

Measurement Entry must accept:

If dimension-based:

- Length (Feet + Inches)
- Width (Feet + Inches)
- Quantity (default = 1)

If quantity-based:

- Quantity only

If lump sum:

- Direct amount input

---

# 5️⃣ UNIT CONVERSION LOGIC

All dimensional inputs must convert to decimal feet internally.

Conversion Rule:

decimalFeet = feet + (inches / 12)

Example:
12 ft 6 in → 12 + (6/12) = 12.5

This conversion must happen before any calculation decision.

---

# 6️⃣ RFT vs SQUARE FEET DECISION ENGINE

This is the most critical business rule.

## Decision Rule:

IF width < 1 foot (12 inches)
→ Measurement Type = Running Feet (RFT)
ELSE
→ Measurement Type = Square Feet

Width is evaluated after conversion to decimal.

---

# 7️⃣ CALCULATION ENGINE LOGIC

## 7.1 RFT Calculation

Condition:
Width < 1 ft

Formula:
Total = Length × 1 × Quantity

Width is NOT multiplied.

Example:
12 ft 6 in × 0 ft 8 in
Quantity = 1

Length = 12.5
Result = 12.5 RFT

---

## 7.2 Square Feet Calculation

Condition:
Width ≥ 1 ft

Formula:
Total Area = Length × Width × Quantity

---

## 7.3 Per Piece / Per Step

Formula:
Total Units = Quantity

---

## 7.4 Per Day

Formula:
Total Days = Quantity

---

## 7.5 Lump Sum

Formula:
Total Amount = Entered Value

No unit calculation required.

---

# 8️⃣ MATERIAL GROUPING LOGIC

Each Work Entry must contain:

- Material Category

During Site Summary Generation:

System must:

- Group entries by Material
- Sum totals per material
- Maintain unit consistency per material section

---

# 9️⃣ RATE APPLICATION LOGIC

## 9.1 Default Rate Assignment

Each Material Category has:

- Configured Default Rate

When new entry added:

- Default rate auto-attaches
- User may override rate manually

---

## 9.2 Rate Calculation Logic

For each material group:

IF measurement type = RFT
Section Total = Total RFT × Rate

IF measurement type = Square Feet
Section Total = Total Area × Rate

IF measurement type = Piece / Step
Section Total = Quantity × Rate

IF measurement type = Per Day
Section Total = Days × Rate

IF Lump Sum
Section Total = Entered Amount

---

# 🔟 SECTION SUBTOTAL LOGIC

For each Material Section:

Material Subtotal =
Sum of all calculated entry totals under that material

---

# 1️⃣1️⃣ GRAND TOTAL LOGIC

Grand Total =
Sum of all Material Subtotals

---

# 1️⃣2️⃣ DISCOUNT & ADVANCE LOGIC

Optional fields:

IF Discount Applied
Grand Total = Grand Total - Discount

IF Advance Paid
Balance = Grand Total - Advance

IF No Advance
Balance = Grand Total

---

# 1️⃣3️⃣ REAL-TIME RECALCULATION RULE

Recalculation must occur when:

- Measurement values change
- Quantity changes
- Rate changes
- Discount changes
- Advance changes

All dependent totals must update automatically.

---

# 1️⃣4️⃣ DATA INTEGRITY RULES

- Historical Site data must never change if Work Master changes later
- Measurement entries must store:
  - Converted decimal values
  - Final calculated unit
  - Rate used at time of billing
- Totals must be persisted, not only calculated dynamically

---

# 1️⃣5️⃣ VALIDATION RULES

- Length cannot be negative
- Width cannot be negative
- Quantity must be ≥ 1
- RFT rule must always override manual input
- Rate must be ≥ 0
- Discount cannot exceed Grand Total
- Advance cannot exceed Grand Total

---

# 1️⃣6️⃣ BILL FINALIZATION LOGIC

When Bill is Finalized:

- Lock measurement entries
- Lock rates
- Lock totals
- Prevent further modification
- Generate final invoice snapshot

---

# 1️⃣7️⃣ DESIGN PRINCIPLES

- No manual math required by user
- Real mason billing logic
- Material-wise clarity
- Configurable but controlled
- Calculation accuracy prioritized over UI behavior

---

# END OF BUSINESS LOGIC SOP
