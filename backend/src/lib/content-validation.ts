export function createContentSlug(
  value: string,
) {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);

  return normalized || "content";
}

export function validateEventDates(
  type: string,
  eventStartAt: Date | null,
  eventEndAt: Date | null,
) {
  if (type !== "EVENT") {
    return null;
  }

  if (!eventStartAt) {
    return "Events require a start date and time.";
  }

  if (
    eventEndAt &&
    eventEndAt.getTime() <
      eventStartAt.getTime()
  ) {
    return "The event end date cannot be earlier than its start date.";
  }

  return null;
}
