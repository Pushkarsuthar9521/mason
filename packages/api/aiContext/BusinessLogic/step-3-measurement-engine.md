# 4️⃣ step-3-measurement-engine.md

# Step 3: Measurement Engine

This is the core calculation layer.

---

## 3.1 Unit Conversion Logic

Convert all dimensional inputs to decimal feet:

decimalFeet = feet + (inches / 12)

This must happen before any decision logic.

---

## 3.2 RFT vs Square Feet Decision Engine

Rule:

IF width < 1 foot
→ Use Running Feet logic
ELSE
→ Use Square Feet logic

Width is evaluated after conversion.

---

## 3.3 RFT Calculation

Formula:
Total Units = Length × 1 × Quantity

Width is ignored in multiplication.

---

## 3.4 Square Feet Calculation

Formula:
Total Area = Length × Width × Quantity

---

## 3.5 Quantity-Based Logic

Per Piece / Per Step:
Total Units = Quantity

Per Day:
Total Units = Days

Lump Sum:
Total Amount = Entered Value

Completion Criteria:

- All calculations return correct unit and total value
- Unit type stored with entry
