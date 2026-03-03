import PageHero from "../../layout/PageHero";
// ==================== EVENTS PAGE ====================
export default function EventsPage() {
  const { events, loading } = useEvents();

  return (
    <>
      <PageHero title="Events" subtitle="Join us in making a difference – upcoming activities and programs" />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No upcoming events at this time.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {events.map((e) => (
              <div
                key={e._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-6 right-6 bg-indigo-700 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl">
                    <span className="text-2xl font-bold">
                      {new Date(e.date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wider">
                      {new Date(e.date).toLocaleString("en-US", { month: "short" })}
                    </span>
                  </div>
                </div>

                <div className="p-8 pt-12">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-2">🕒 {e.time}</span>
                    <span className="flex items-center gap-2">📍 {e.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {e.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}