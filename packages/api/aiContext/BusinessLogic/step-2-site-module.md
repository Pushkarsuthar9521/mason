# 3️⃣ step-2-site-module.md

# Step 2: Site Module

This step creates the site lifecycle container.

---

## 2.1 Site Creation

Required fields:

- Customer Name
- Mobile
- Location
- Optional Site Name
- Date

Validation:

- Customer Name required
- Valid mobile format
- Date auto-set if not provided

---

## 2.2 Site Status States

Define states:

- Active
- Finalized

Rules:

- Only Active sites allow measurement entry
- Finalized sites are read-only

Completion Criteria:

- Site can be created
- Site state controls editing permission
