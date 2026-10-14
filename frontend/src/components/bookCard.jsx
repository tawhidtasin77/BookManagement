function BookCard({ book, onDelete, onUpdateStatus }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
          📖
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            book.isRead
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {book.isRead ? "✓ Read" : "○ Unread"}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="break-words text-lg font-bold leading-6 text-slate-900">
          {book.title}
        </h3>

        <p className="mt-2 break-words text-sm text-slate-500">
          By {book.author}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => onUpdateStatus(book)}
          className="w-full rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Mark as {book.isRead ? "Unread" : "Read"}
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Delete Book
        </button>
      </div>
    </article>
  );
}

export default BookCard;