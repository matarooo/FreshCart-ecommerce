export function StoreLoading() {
  return (
    <main
      id="main-content"
      aria-busy="true"
      className="store-container flex-1 py-10"
    >
      <output className="sr-only">Loading FreshCart…</output>
      <div
        aria-hidden="true"
        className="mb-8 h-20 animate-pulse rounded-xl bg-gray-100"
      />
      <div
        aria-hidden="true"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      >
        {[1, 2, 3, 4, 5].map((key) => (
          <div
            key={key}
            className="h-72 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    </main>
  );
}
