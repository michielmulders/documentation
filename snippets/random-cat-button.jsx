export const RandomCatButton = () => {
  const [catId, setCatId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCat = async () => {
    setLoading(true)
    setError(null)
    setCatId(null)

    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: { accept: "application/json" },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const id = data?.[0]?.id ?? null
      if (!id) throw new Error("No cat ID in response")
      setCatId(id)
    } catch (e: any) {
      setError(e?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="not-prose p-4 border rounded-xl dark:border-zinc-950/80">
      <div className="flex items-center gap-3">
        <button
          onClick={fetchCat}
          disabled={loading}
          className="px-3 py-2 rounded-lg border text-sm font-medium
                     transition disabled:opacity-60 disabled:cursor-not-allowed
                     hover:shadow-sm dark:border-white/20"
        >
          {loading ? "Fetching cat…" : "Get random cat ID"}
        </button>

        {catId && (
          <div className="flex items-center gap-2 text-sm font-mono">
            <span className="text-zinc-950/80 dark:text-white/80">
              ID: <strong>{catId}</strong>
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {!catId && !loading && !error && (
        <p className="mt-3 text-sm text-zinc-700 dark:text-white/70">
          Click the button to fetch a cat and display its ID.
        </p>
      )}
    </div>
  )
}
