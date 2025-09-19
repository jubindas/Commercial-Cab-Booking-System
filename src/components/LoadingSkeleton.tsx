export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-6 bg-zinc-100 animate-pulse">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="h-8 w-40 bg-zinc-300 rounded"></div>
        <div className="h-10 w-32 bg-purple-300 rounded"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <div className="h-5 w-12 bg-zinc-300 rounded"></div>
          <div className="h-9 w-20 bg-zinc-300 rounded"></div>
          <div className="h-5 w-12 bg-zinc-300 rounded"></div>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <div className="h-5 w-14 bg-zinc-300 rounded"></div>
          <div className="h-9 w-64 bg-zinc-300 rounded"></div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3">
                <div className="h-4 w-8 bg-zinc-300 rounded"></div>
              </th>
              <th className="px-6 py-3">
                <div className="h-4 w-24 bg-zinc-300 rounded"></div>
              </th>
              <th className="px-6 py-3">
                <div className="h-4 w-16 bg-zinc-300 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4">
                  <div className="h-4 w-10 bg-zinc-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-40 bg-zinc-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-zinc-300 rounded ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
