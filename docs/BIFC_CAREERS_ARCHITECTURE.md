# BIFC Careers Architecture

```mermaid
flowchart LR
  Public["Public visitors"] --> React["React careers pages"]
  Candidate["Candidate dashboard"] --> API["Cloudflare Pages Functions"]
  Employer["Employer dashboard"] --> API
  Admin["BIFC admin"] --> API
  API --> D1["Cloudflare D1"]
  API --> R2["Private R2 documents"]
  API --> Audit["Audit events"]
  API -.future.-> CRM["CRM/email/SMS adapters"]
```

The chosen architecture is a hybrid application mounted inside the existing website. Public careers pages use the current BIFC design and navigation. Protected workflows use Pages Functions so permissions are enforced server-side.

Core rule: the browser never receives locked candidate fields unless the server has confirmed the actor, role, employer, job, candidate permission and disclosure state.

