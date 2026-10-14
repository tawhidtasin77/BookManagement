import { useState } from "react";

function BookForm({ onAddBook, submitting }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    const success = await onAddBook({
      title: title.trim(),
      author: author.trim(),
    });

    if (success) {
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Add a Book
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter the book title and author to add it to your collection.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Book Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="e.g. The Alchemist"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Author
          </label>

          <input
            id="author"
            type="text"
            placeholder="e.g. Paulo Coelho"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding..." : "+ Add Book"}
        </button>
      </form>
    </section>
  );
}

export default BookForm;