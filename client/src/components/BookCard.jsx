export default function BookCard({ book }) {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Published: {book.publishedYear}</p>
      <p>Status: {book.available ? "Available" : "Unavailable"}</p>
    </div>
  );
}
