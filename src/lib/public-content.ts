import type {
  EventStatus,
  SchoolEvent,
} from "./events-data";
import type {
  NoticeboardPriority,
  NoticeboardSlide,
} from "./noticeboard-data";

export type PublicContentType =
  | "NEWS"
  | "NOTICE"
  | "EVENT";

export interface PublicContentAuthor {
  displayName: string;
}

export interface PublicContentEntry {
  id: string;
  type: PublicContentType;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  featured: boolean;
  publishedAt: string | null;
  eventStartAt: string | null;
  eventEndAt: string | null;
  eventLocation: string | null;
  updatedAt: string;
  createdBy: PublicContentAuthor;
}

interface PublicContentResponse {
  success: true;
  content: PublicContentEntry[];
}

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

export class PublicContentApiError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = "PublicContentApiError";
    this.status = status;
  }
}

export async function listPublicContent(
  type: PublicContentType,
  limit = 50,
) {
  const searchParameters =
    new URLSearchParams({
      type,
      limit: String(limit),
    });

  const response = await fetch(
    `${apiBaseUrl}/api/content?${searchParameters.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const errorBody = body as {
      message?: string;
    } | null;

    throw new PublicContentApiError(
      errorBody?.message ??
        "Published school content could not be loaded.",
      response.status,
    );
  }

  return (
    body as PublicContentResponse
  ).content;
}

export function createContentExcerpt(
  entry: PublicContentEntry,
  maximumLength = 220,
) {
  const source =
    entry.summary?.trim() ||
    entry.body.trim();

  if (source.length <= maximumLength) {
    return source;
  }

  return `${source
    .slice(0, maximumLength)
    .trimEnd()}â€¦`;
}

function getContentDetails(
  body: string,
) {
  const paragraphs = body
    .split(/\r?\n+/)
    .map((value) => value.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs.slice(0, 3);
  }

  return [
    "Open the official school website for complete information.",
  ];
}

function getValidDate(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function formatDate(
  value: Date | null,
) {
  if (!value) {
    return "Date to be confirmed";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(value);
}

function formatTime(
  value: Date | null,
) {
  if (!value) {
    return "Time to be confirmed";
  }

  return new Intl.DateTimeFormat(
    "en-LK",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(value);
}

function getEventStatus(
  start: Date | null,
  end: Date | null,
): EventStatus {
  const now = new Date();

  if (
    end &&
    end.getTime() < now.getTime()
  ) {
    return "completed";
  }

  if (
    !end &&
    start &&
    start.getTime() < now.getTime()
  ) {
    return "completed";
  }

  return "upcoming";
}

export function mapPublicEvent(
  entry: PublicContentEntry,
): SchoolEvent {
  const start =
    getValidDate(entry.eventStartAt);

  const end =
    getValidDate(entry.eventEndAt);

  const month = start
    ? new Intl.DateTimeFormat(
        "en-LK",
        {
          month: "long",
        },
      ).format(start)
    : "Date Pending";

  const timeLabel = start
    ? end
      ? `${formatTime(start)} â€“ ${formatTime(end)}`
      : formatTime(start)
    : "Time to be confirmed";

  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    category: "School Community",
    audience:
      "Entire School Community",
    month,
    dateLabel: formatDate(start),
    timeLabel,
    venue:
      entry.eventLocation ??
      "Sripalee College",
    summary:
      createContentExcerpt(entry),
    details: getContentDetails(
      entry.body,
    ),
    status: getEventStatus(
      start,
      end,
    ),
    featured: entry.featured,
    registrationRequired: false,
    registrationStatus:
      "Refer to the published event information for participation details.",
    languages: [],
    approvalStatus:
      "Published through the official administration portal",
  };
}

export function mapPublicNotice(
  entry: PublicContentEntry,
): NoticeboardSlide {
  const publishedAt =
    getValidDate(entry.publishedAt);

  const priority:
    NoticeboardPriority =
    entry.featured
      ? "important"
      : "standard";

  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    subtitle: entry.featured
      ? "Featured official school notice"
      : "Official school notice",
    category: entry.featured
      ? "Important Notice"
      : "Administration",
    priority,
    audience:
      "Entire School Community",
    summary:
      createContentExcerpt(entry),
    details: getContentDetails(
      entry.body,
    ),
    dateLabel:
      formatDate(publishedAt),
    timeLabel:
      formatTime(publishedAt),
    location:
      "Sripalee College digital channels",
    languages: [],
    status: `Published by ${entry.createdBy.displayName}`,
    icon: "administration",
  };
}

interface PublicContentDetailResponse {
  success: true;
  content: PublicContentEntry;
}

export async function getPublicContentBySlug(
  slug: string,
) {
  const response = await fetch(
    `${apiBaseUrl}/api/content/${encodeURIComponent(slug)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const errorBody = body as {
      message?: string;
    } | null;

    throw new PublicContentApiError(
      errorBody?.message ??
        "The requested published content could not be loaded.",
      response.status,
    );
  }

  return (
    body as PublicContentDetailResponse
  ).content;
}
