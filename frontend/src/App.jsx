import { useState, useEffect } from "react";
import BookForm from "./components/BookForm.jsx";
import BookCard from "./components/bookCard.jsx";

const API_URL = "http://localhost:3000/api/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      setBooks(data);
    } catch (error) {
      console.log("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return false;
      }

      setBooks((prevBooks) => [data.book, ...prevBooks]);

      return true;
    } catch (error) {
      console.log("Failed to add book:", error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const updateBookStatus = async (book) => {
    try {
      const response = await fetch(`${API_URL}/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isRead: !book.isRead,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Failed to update book status");
        return;
      }

      setBooks((prevBooks) =>
        prevBooks.map((item) =>
          item._id === book._id ? data.book : item
        )
      );
    } catch (error) {
      console.log("Failed to update book status:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Failed to delete book");
        return;
      }

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.log("Failed to delete book:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <BookForm
          onAddBook={addBook}
          submitting={submitting}
        />

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                My Books
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your personal book collection
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {books.length} {books.length === 1 ? "Book" : "Books"}
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
              <p className="text-sm text-slate-500">
                Loading books...
              </p>
            </div>
          ) : books.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-5 py-16 text-center">
              <div className="mb-4 text-5xl">📚</div>

              <h3 className="text-lg font-semibold text-slate-800">
                No books yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your first book using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={deleteBook}
                  onUpdateStatus={updateBookStatus}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;