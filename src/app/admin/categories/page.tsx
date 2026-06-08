"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminButton,
  EmptyState,
  Field,
  Modal,
  inputClass,
} from "@/components/admin/ui";
import { uid, slugify } from "@/lib/utils";
import type { Category } from "@/lib/types";

function CategoryEditor({
  category,
  onSave,
  onClose,
}: {
  category: Category | null;
  onSave: (c: Category) => void;
  onClose: () => void;
}) {
  const isNew = !category;
  const [draft, setDraft] = useState<Category>(
    category ?? {
      id: uid("cat"),
      slug: "",
      name: "",
      description: "",
      image: "",
      order: 0,
    },
  );
  const [error, setError] = useState("");

  function save() {
    const name = draft.name.trim();
    if (!name) return setError("Category name is required.");
    onSave({
      ...draft,
      name,
      slug: draft.slug.trim() || slugify(name),
      description: draft.description?.trim() || undefined,
      image: draft.image?.trim() || undefined,
      order: Number(draft.order) || 0,
    });
  }

  return (
    <Modal
      title={isNew ? "Add category" : "Edit category"}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="ghost" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={save}>
            {isNew ? "Create" : "Save"}
          </AdminButton>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Name">
          <input
            className={inputClass}
            value={draft.name}
            onChange={(e) => {
              const name = e.target.value;
              setDraft((d) => ({
                ...d,
                name,
                slug: isNew && !d.slug ? slugify(name) : d.slug,
              }));
            }}
            placeholder="Sweets"
          />
        </Field>
        <Field label="Slug" hint="Used in /collections/[slug].">
          <input
            className={inputClass}
            value={draft.slug}
            onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
            placeholder="sweets"
          />
        </Field>
        <Field label="Description">
          <textarea
            className={`${inputClass} h-auto py-2`}
            rows={2}
            value={draft.description ?? ""}
            onChange={(e) =>
              setDraft((d) => ({ ...d, description: e.target.value }))
            }
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Image URL">
            <input
              className={inputClass}
              value={draft.image ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, image: e.target.value }))
              }
              placeholder="/images/categories/sweets.svg"
            />
          </Field>
          <Field label="Sort order">
            <input
              className={inputClass}
              type="number"
              value={draft.order ?? 0}
              onChange={(e) =>
                setDraft((d) => ({ ...d, order: Number(e.target.value) }))
              }
            />
          </Field>
        </div>
        {error && <p className="text-sm text-maroon-700">{error}</p>}
      </div>
    </Modal>
  );
}

export default function AdminCategoriesPage() {
  const { categories, products, saveCategory, deleteCategory } = useAdmin();
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);

  function remove(c: Category) {
    const count = products.filter((p) => p.category === c.slug).length;
    const msg =
      count > 0
        ? `"${c.name}" has ${count} product(s). Delete the category anyway? Those products will keep their category slug.`
        : `Delete "${c.name}"?`;
    if (window.confirm(msg)) deleteCategory(c.id);
  }

  const sorted = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-maroon-900">
            Categories
          </h1>
          <p className="text-sm text-ink-500">
            {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <AdminButton onClick={() => setCreating(true)}>
          <Plus size={16} /> Add category
        </AdminButton>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={<FolderTree size={26} />}
          title="No categories yet"
          text="Create a category to group your products."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <div
                key={c.id}
                className="rounded-2xl border border-cream-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-maroon-900">
                      {c.name}
                    </h3>
                    <p className="text-xs text-ink-400">/{c.slug}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(c)}
                      aria-label={`Edit ${c.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-cream-100 hover:text-maroon-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(c)}
                      aria-label={`Delete ${c.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-maroon-700/5 hover:text-maroon-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {c.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-ink-500">
                    {c.description}
                  </p>
                )}
                <p className="mt-3 text-xs font-medium text-saffron-600">
                  {count} product{count !== 1 ? "s" : ""}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {(editing || creating) && (
        <CategoryEditor
          category={editing}
          onSave={(c) => {
            saveCategory(c);
            setEditing(null);
            setCreating(false);
          }}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}
