# BIFC Careers Testing

Minimum test backlog:

- Employer cannot access another employer's jobs or applicants.
- Employer preview API returns no email, phone, resume key, full surname or exact suburb.
- Hidden and blocked candidates are excluded from employer interest.
- Employer interest does not disclose contact details.
- Disclosure approval stores exact fields and statement version.
- Candidate can withdraw an application without deleting the BIFC profile.
- Admin candidate access creates audit events.
- Signed document URLs expire.
- Public pages remain indexable and private dashboards are `noindex`.

Current verification command:

```bash
npm run build
```

