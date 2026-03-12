import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  view: "table" | "card";
  count?: number;
}

export default function Loading({ view, count = 10 }: LoadingProps) {
  if (view === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-[#d6dde8] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between gap-3 bg-[#dfeafb] px-3.5 py-3">
              <div className="flex min-w-0 items-start gap-2.5">
                <Skeleton className="h-8 w-8 rounded-full bg-white" />
                <div className="space-y-1">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-2.5 w-12" />
                </div>
              </div>
              <Skeleton className="h-5 w-10 rounded-full bg-blue-300/60" />
            </div>
            <div className="space-y-3 px-3.5 py-3.5">
              <Skeleton className="h-5 w-20 rounded-lg" />
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {[
              "ID",
              "Name",
              "Age",
              "Medical Issue",
              "Address",
              "Phone Number",
              "Email ID",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium text-blue-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </td>
              <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-4 py-3.5">
                <Skeleton className="h-5 w-24 rounded-full" />
              </td>
              <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-36" />
              </td>
              <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-4 py-3.5">
                <Skeleton className="h-4 w-40" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
