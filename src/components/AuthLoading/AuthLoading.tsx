export function AuthLoading() {
  return (
    <main
      id="main-content"
      aria-busy="true"
      className="flex flex-1 justify-center bg-gray-50 px-4 py-12"
    >
      <output className="sr-only">
        Loading your FreshCart account page...
      </output>
      <div
        aria-hidden="true"
        className="w-full max-w-xl animate-pulse space-y-6 rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="mx-auto h-8 w-48 rounded bg-gray-100" />
        <div className="mx-auto h-4 w-3/4 rounded bg-gray-100" />
        {[1, 2, 3, 4].map((field) => (
          <div key={field} className="h-12 rounded-lg bg-gray-100" />
        ))}
        <div className="h-12 rounded-lg bg-green-100" />
      </div>
    </main>
  );
}
