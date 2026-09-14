# ADR 0002 — Human issue identifiers

## Status

Accepted.

## Context

Internal UUIDs are miserable in Slack. Teams talk in `NAV-142`.

## Decision

Every issue has `number` (monotonic per project) and `identifier` (`${project.key}-${number}`). Public HTTP routes take the identifier. The SDK does too.

## Consequences

Renaming a project key is a migration, not a CSS change. We do not rename keys in the demo.
