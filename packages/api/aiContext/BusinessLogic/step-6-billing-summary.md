# 7️⃣ step-6-billing-summary.md

# Step 6: Billing Summary Engine

This layer calculates final payable amount.

---

## 6.1 Grand Total

Grand Total =
Sum of all Material Subtotals

---

## 6.2 Discount Logic

IF Discount Applied:
Grand Total = Grand Total - Discount

Validation:

- Discount ≤ Grand Total

---

## 6.3 Advance Logic

IF Advance Entered:
Balance = Grand Total - Advance

Validation:

- Advance ≤ Grand Total

Completion Criteria:

- Grand total correct
- Balance correct
