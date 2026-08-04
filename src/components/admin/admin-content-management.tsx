"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  AdminApiError,
  archiveAdminContent,
  createAdminContent,
  deleteAdminContent,
  listAdminContent,
  publishAdminContent,
  updateAdminContent,
} from "../../lib/admin-api";
import type {
  AdminRole,
  ContentStatus,
  ContentType,
  ManagedContentEntry,
} from "../../types/admin-auth";

interface AdminContentManagementProps {
  role: AdminRole;
}

function getErrorMessage(
  error: unknown,
  fallback: string,
) {
  return error instanceof AdminApiError
    ? error.message
    : fallback;
}

function toLocalDateTime(
  value: string | null,
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  const localDate = new Date(
    date.getTime() -
      date.getTimezoneOffset() * 60000,
  );

  return localDate
    .toISOString()
    .slice(0, 16);
}

function toApiDate(
  value: string,
) {
  return value
    ? new Date(value).toISOString()
    : null;
}

export function AdminContentManagement({
  role,
}: AdminContentManagementProps) {
  const [content, setContent] =
    useState<ManagedContentEntry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [busyContentId, setBusyContentId] =
    useState<string | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState<ContentType | "">("");

  const [statusFilter, setStatusFilter] =
    useState<ContentStatus | "">("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [type, setType] =
    useState<ContentType>("NEWS");

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [body, setBody] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [eventStartAt, setEventStartAt] =
    useState("");

  const [eventEndAt, setEventEndAt] =
    useState("");

  const [eventLocation, setEventLocation] =
    useState("");

  const canModerate =
    role === "SUPER_ADMIN" ||
    role === "CONTENT_ADMIN";

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const result =
          await listAdminContent({
            type:
              typeFilter || undefined,
            status:
              statusFilter || undefined,
            deleted: "exclude",
            page: 1,
            pageSize: 100,
          });

        if (!active) {
          return;
        }

        setContent(result.content);
        setError("");
      } catch (requestError) {
        if (!active) {
          return;
        }

        setError(
          getErrorMessage(
            requestError,
            "Content entries could not be loaded.",
          ),
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      active = false;
    };
  }, [
    typeFilter,
    statusFilter,
    refreshKey,
  ]);

  function refreshContent() {
    setLoading(true);
    setRefreshKey(
      (currentValue) =>
        currentValue + 1,
    );
  }

  function resetForm() {
    setEditingId(null);
    setType("NEWS");
    setTitle("");
    setSlug("");
    setSummary("");
    setBody("");
    setFeatured(false);
    setEventStartAt("");
    setEventEndAt("");
    setEventLocation("");
  }

  function startEditing(
    entry: ManagedContentEntry,
  ) {
    setEditingId(entry.id);
    setType(entry.type);
    setTitle(entry.title);
    setSlug(entry.slug);
    setSummary(entry.summary ?? "");
    setBody(entry.body);
    setFeatured(entry.featured);
    setEventStartAt(
      toLocalDateTime(
        entry.eventStartAt,
      ),
    );
    setEventEndAt(
      toLocalDateTime(
        entry.eventEndAt,
      ),
    );
    setEventLocation(
      entry.eventLocation ?? "",
    );
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitting(true);
    setMessage("");
    setError("");

    const input = {
      type,
      title: title.trim(),
      ...(slug.trim()
        ? {
            slug: slug
              .trim()
              .toLowerCase(),
          }
        : {}),
      summary:
        summary.trim() || null,
      body: body.trim(),
      featured,
      eventStartAt:
        type === "EVENT"
          ? toApiDate(eventStartAt)
          : null,
      eventEndAt:
        type === "EVENT"
          ? toApiDate(eventEndAt)
          : null,
      eventLocation:
        type === "EVENT"
          ? eventLocation.trim() ||
            null
          : null,
    };

    try {
      if (editingId) {
        await updateAdminContent(
          editingId,
          input,
        );

        setMessage(
          "Content entry updated successfully.",
        );
      } else {
        await createAdminContent(
          input,
        );

        setMessage(
          "Draft content created successfully.",
        );
      }

      resetForm();
      refreshContent();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          editingId
            ? "The content entry could not be updated."
            : "The content entry could not be created.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePublish(
    entry: ManagedContentEntry,
  ) {
    const confirmed = window.confirm(
      `Publish "${entry.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setBusyContentId(entry.id);
    setMessage("");
    setError("");

    try {
      await publishAdminContent(
        entry.id,
      );

      setMessage(
        "Content published successfully.",
      );

      refreshContent();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "The content entry could not be published.",
        ),
      );
    } finally {
      setBusyContentId(null);
    }
  }

  async function handleArchive(
    entry: ManagedContentEntry,
  ) {
    const confirmed = window.confirm(
      `Archive "${entry.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setBusyContentId(entry.id);
    setMessage("");
    setError("");

    try {
      await archiveAdminContent(
        entry.id,
      );

      setMessage(
        "Content archived successfully.",
      );

      refreshContent();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "The content entry could not be archived.",
        ),
      );
    } finally {
      setBusyContentId(null);
    }
  }

  async function handleDelete(
    entry: ManagedContentEntry,
  ) {
    const confirmed = window.confirm(
      `Delete "${entry.title}"? This removes it from the public website.`,
    );

    if (!confirmed) {
      return;
    }

    setBusyContentId(entry.id);
    setMessage("");
    setError("");

    try {
      await deleteAdminContent(
        entry.id,
      );

      if (editingId === entry.id) {
        resetForm();
      }

      setMessage(
        "Content entry deleted successfully.",
      );

      refreshContent();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "The content entry could not be deleted.",
        ),
      );
    } finally {
      setBusyContentId(null);
    }
  }

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Content management
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          News, notices and events
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Create official school updates as drafts. Authorised content administrators can review and publish them.
        </p>
      </header>

      {message ? (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          {message}
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-2xl bg-slate-50 p-5 lg:grid-cols-2"
      >
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950">
            {editingId
              ? "Edit content entry"
              : "Create a new draft"}
          </h3>
        </div>

        <div>
          <label
            htmlFor="content-type"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Content type
          </label>

          <select
            id="content-type"
            value={type}
            onChange={(event) =>
              setType(
                event.target
                  .value as ContentType,
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="NEWS">
              News
            </option>
            <option value="NOTICE">
              Notice
            </option>
            <option value="EVENT">
              Event
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="content-title"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Title
          </label>

          <input
            id="content-title"
            required
            minLength={3}
            maxLength={180}
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="content-slug"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            URL slug
          </label>

          <input
            id="content-slug"
            maxLength={200}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="Leave blank to generate automatically"
            value={slug}
            onChange={(event) =>
              setSlug(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="content-summary"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Summary
          </label>

          <textarea
            id="content-summary"
            maxLength={320}
            rows={3}
            value={summary}
            onChange={(event) =>
              setSummary(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="content-body"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Full content
          </label>

          <textarea
            id="content-body"
            required
            rows={9}
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {type === "EVENT" ? (
          <>
            <div>
              <label
                htmlFor="event-start"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Event start
              </label>

              <input
                id="event-start"
                type="datetime-local"
                required
                value={eventStartAt}
                onChange={(event) =>
                  setEventStartAt(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="event-end"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Event end
              </label>

              <input
                id="event-end"
                type="datetime-local"
                value={eventEndAt}
                onChange={(event) =>
                  setEventEndAt(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="event-location"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Event location
              </label>

              <input
                id="event-location"
                maxLength={200}
                value={eventLocation}
                onChange={(event) =>
                  setEventLocation(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </>
        ) : null}

        <div className="lg:col-span-2">
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(
                  event.target.checked,
                )
              }
              className="h-4 w-4 rounded border-slate-300"
            />

            Feature this content
          </label>
        </div>

        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Saving…"
              : editingId
                ? "Save changes"
                : "Create draft"}
          </button>

          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel editing
            </button>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row">
        <div className="flex-1">
          <label
            htmlFor="content-type-filter"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Filter by type
          </label>

          <select
            id="content-type-filter"
            value={typeFilter}
            onChange={(event) => {
              setLoading(true);
              setTypeFilter(
                event.target.value as
                  | ContentType
                  | "",
              );
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950"
          >
            <option value="">
              All types
            </option>
            <option value="NEWS">
              News
            </option>
            <option value="NOTICE">
              Notices
            </option>
            <option value="EVENT">
              Events
            </option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="content-status-filter"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Filter by status
          </label>

          <select
            id="content-status-filter"
            value={statusFilter}
            onChange={(event) => {
              setLoading(true);
              setStatusFilter(
                event.target.value as
                  | ContentStatus
                  | "",
              );
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950"
          >
            <option value="">
              All statuses
            </option>
            <option value="DRAFT">
              Draft
            </option>
            <option value="PUBLISHED">
              Published
            </option>
            <option value="ARCHIVED">
              Archived
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-600">
            Loading content…
          </p>
        ) : content.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-600">
            No content entries match the selected filters.
          </p>
        ) : (
          content.map((entry) => {
            const busy =
              busyContentId === entry.id;

            const editorCanEdit =
              role !== "EDITOR" ||
              entry.status === "DRAFT";

            return (
              <article
                key={entry.id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {entry.type}
                      </span>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                        {entry.status}
                      </span>

                      {entry.featured ? (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                          FEATURED
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      {entry.title}
                    </h3>

                    <p className="mt-2 break-all text-sm text-slate-500">
                      /{entry.slug}
                    </p>

                    {entry.summary ? (
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                        {entry.summary}
                      </p>
                    ) : null}

                    {entry.type === "EVENT" ? (
                      <div className="mt-3 text-sm text-slate-600">
                        <p>
                          Start:{" "}
                          {entry.eventStartAt
                            ? new Date(
                                entry.eventStartAt,
                              ).toLocaleString()
                            : "Not set"}
                        </p>

                        <p>
                          Location:{" "}
                          {entry.eventLocation ??
                            "Not set"}
                        </p>
                      </div>
                    ) : null}

                    <p className="mt-3 text-xs text-slate-500">
                      Updated by{" "}
                      {entry.updatedBy.displayName}
                      {" · "}
                      {new Date(
                        entry.updatedAt,
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex max-w-md flex-wrap gap-2">
                    {editorCanEdit ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          startEditing(entry)
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                      >
                        Edit
                      </button>
                    ) : null}

                    {canModerate &&
                    entry.status !==
                      "PUBLISHED" ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void handlePublish(
                            entry,
                          )
                        }
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                      >
                        Publish
                      </button>
                    ) : null}

                    {canModerate &&
                    entry.status !==
                      "ARCHIVED" ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void handleArchive(
                            entry,
                          )
                        }
                        className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60"
                      >
                        Archive
                      </button>
                    ) : null}

                    {canModerate ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void handleDelete(
                            entry,
                          )
                        }
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                      >
                        {busy
                          ? "Updating…"
                          : "Delete"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}