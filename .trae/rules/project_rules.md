1. Always chat in Portuguese
2. Don't change the webapp UI only when I ask for it.
🛑 Database (Supabase) Rules
NEVER delete tables, columns, or data from the database.
Deletion is only allowed with explicit, documented approval.

NEVER execute DELETE, DROP, TRUNCATE, ALTER, or UPDATE commands without confirmation.
Any destructive or structural change must be requested and justified.

ALWAYS create a full database backup before any schema or critical change.

MAINTAIN detailed logs of all database operations.
Logs must include: who requested, what was changed, and when.

Require double confirmation before any permanent deletion.
Approval must come from both the requester and a technical lead.

🎨 UI (User Interface) Rules
NEVER modify the UI (design, layout, components, styles) without a clear and approved request.

NEVER push visual/UI changes directly to production without testing and approval.

UI changes must be reviewed and deployed through a staging environment first.

DO NOT remove or replace existing UI components unless explicitly instructed.

Respect the existing design system and branding.
All changes must align with the current design standards unless otherwise specified.