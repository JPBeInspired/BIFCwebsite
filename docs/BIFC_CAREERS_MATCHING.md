# BIFC Careers Matching

Initial matching is deterministic and explainable.

Suggested weights:

- Location and travel radius: 20
- Role preference: 15
- Engagement-model preference: 15
- Availability: 15
- Qualification requirements: 15
- Specialisations: 10
- Experience: 5
- Commercial preferences: 5

Hard exclusions:

- Hidden candidate profile
- Blocked employer
- Hidden current employer
- Missing mandatory qualification
- Expired mandatory qualification
- Suspended employer
- Inactive, expired or unapproved job

Match output is stored in `candidate_job_matches` with component scores, reasons, gaps and match version.

