# 6️⃣ step-5-rate-application.md

# Step 5: Rate Application Engine

This step applies pricing to measured units.

---

## 5.1 Default Rate Attachment

When entry is created:

- Attach material default rate
- Store rate snapshot

---

## 5.2 Rate Override Logic

If user changes rate:

- Override only for that site
- Do not affect master data

---

## 5.3 Section Total Calculation

For each entry:

IF RFT:
Entry Total = Units × Rate

IF Square Feet:
Entry Total = Area × Rate

IF Quantity-based:
Entry Total = Quantity × Rate

IF Lump Sum:
Entry Total = Entered Amount

Completion Criteria:

- Entry totals calculate correctly
- Section totals update after rate change
