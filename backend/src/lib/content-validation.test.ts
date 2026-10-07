import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createContentSlug,
  validateEventDates,
} from "./content-validation";

describe("createContentSlug", () => {
  it("normalizes spacing, punctuation, and case", () => {
    assert.equal(
      createContentSlug(
        "  Annual Sports Meet 2026!  ",
      ),
      "annual-sports-meet-2026",
    );
  });

  it("removes Latin combining marks", () => {
    assert.equal(
      createContentSlug("Café résumé"),
      "cafe-resume",
    );
  });

  it("uses a safe fallback for unsupported-only titles", () => {
    assert.equal(
      createContentSlug("සිංහල"),
      "content",
    );
  });

  it("limits the generated base slug to 180 characters", () => {
    assert.equal(
      createContentSlug("a".repeat(250))
        .length,
      180,
    );
  });
});

describe("validateEventDates", () => {
  const start = new Date(
    "2026-08-20T03:30:00.000Z",
  );

  it("requires a start date for events", () => {
    assert.equal(
      validateEventDates(
        "EVENT",
        null,
        null,
      ),
      "Events require a start date and time.",
    );
  });

  it("rejects an end date before the start date", () => {
    assert.equal(
      validateEventDates(
        "EVENT",
        start,
        new Date(
          "2026-08-20T03:00:00.000Z",
        ),
      ),
      "The event end date cannot be earlier than its start date.",
    );
  });

  it("accepts a valid event window", () => {
    assert.equal(
      validateEventDates(
        "EVENT",
        start,
        new Date(
          "2026-08-20T05:30:00.000Z",
        ),
      ),
      null,
    );
  });

  it("does not apply event rules to news or notices", () => {
    assert.equal(
      validateEventDates(
        "NEWS",
        null,
        null,
      ),
      null,
    );
  });
});
