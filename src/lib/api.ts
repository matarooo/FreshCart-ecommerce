const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;
const PAGE_SIZE = 50; // API maximum

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface ListResponse<T> {
  results: number;
  metadata: Metadata;
  data: T[];
}

async function fetchListPage<T>(
  path: string,
  query: Record<string, string>,
  page: number,
) {
  const search = new URLSearchParams({
    ...query,
    limit: String(PAGE_SIZE),
    page: String(page),
  });
  const res = await fetch(`${BASE_URL}${path}?${search}`);
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return (await res.json()) as ListResponse<T>;
}

/** Fetches every page of a list endpoint, e.g. `/products`. */
export async function fetchAll<T>(
  path: string,
  query: Record<string, string> = {},
): Promise<T[]> {
  const first = await fetchListPage<T>(path, query, 1);
  const rest = await Promise.all(
    Array.from(
      { length: Math.max(0, first.metadata.numberOfPages - 1) },
      (_, i) => fetchListPage<T>(path, query, i + 2),
    ),
  );
  return [first, ...rest].flatMap((page) => page.data);
}

/** Fetches a single document, e.g. `/brands/:id`; `undefined` when not found or the id is invalid. */
export async function fetchOne<T>(path: string): Promise<T | undefined> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (res.status === 400 || res.status === 404) return undefined;
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return ((await res.json()) as { data: T }).data;
}
