# 2️⃣ step-1-master-data-layer.md

# Step 1: Master Data Layer

This is the foundation of the system.  
No site logic should be implemented before this.

---

## 1.1 Material Categories

Define material categories such as:

- Marble
- Granite
- Tiles
- Stone
- Other

Rules:

- Must support CRUD
- Must allow default rate assignment
- Deletion restricted if linked to historical data

---

## 1.2 Work Master

Each work item must contain:

- Work Name
- Default Measurement Type
- Requires Width (boolean)
- Material Category
- Active Status

Supported Measurement Types:

- Square Feet
- Running Feet
- Per Piece
- Per Step
- Per Day
- Lump Sum

Rules:

- Only active work items selectable
- Deactivation does not affect historical data
- Deletion only allowed if not linked to site data

---

## 1.3 Default Rate Configuration

Each material must store:

- Default rate
- Unit type associated with rate

Rules:

- Rate must be ≥ 0
- Rate changes apply only to new entries
- Historical rates must not auto-update

Completion Criteria:

- Master CRUD stable
- Material and Work retrieval functional
