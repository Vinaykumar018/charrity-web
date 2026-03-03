import React from 'react';
import { Link } from 'react-router-dom';
import {api} from "../../../Api";

const useBlogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.getBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};

const useEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
};
export default function Home() {
  const { blogs, loading } = useBlogs();
  const latestThree = blogs.slice(0, 3);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        {/* Optional subtle background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Join Us in
              <br />
              <span className="text-yellow-400">Changing Lives</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              Shri Aryabhatta Charitable Trust is dedicated to creating lasting impact through education, healthcare, and empowerment in rural and underprivileged communities.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#donate"
                className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold px-8 py-4 rounded-lg shadow-lg transition transform hover:-translate-y-1"
              >
                Donate Now
              </a>
              <Link
                to="/about"
                className="border-2 border-white hover:bg-white hover:text-indigo-900 font-semibold px-8 py-4 rounded-lg transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Quick Donation Card */}
          <div id="donate" className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Make a Difference Today
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {["₹500", "₹1000", "₹2000", "₹5000"].map((amt) => (
                <button
                  key={amt}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold py-3 rounded-lg transition"
                >
                  {amt}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Or enter custom amount (₹)"
              className="w-full border bg-gray-400 border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border bg-gray-400 border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border  bg-gray-400 border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-lg transition shadow-lg">
              Donate Securely
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              All donations are tax-exempt under 80G
            </p>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-gray-50">
            <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="bg-gray-50 py-16 -mt-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "250+", label: "Lives Touched" },
              { num: "60+", label: "Projects Completed" },
              { num: "15,000+", label: "Students Supported" },
              { num: "200,000+", label: "Volunteer Hours" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
                  {stat.num}
                </h3>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed opacity-90">
              A society where every child and family has equal access to quality education and healthcare, enabling them to live with dignity and realize their full potential.
            </p>
            <Link to="/about" className="mt-8 inline-block font-semibold hover:underline">
              Explore Our Journey →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 rounded-2xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To bridge educational and health gaps in rural and marginalized communities through sustainable programs, community participation, and compassionate action.
            </p>
            <Link to="/about" className="mt-8 inline-block font-semibold hover:underline">
              See How We Work →
            </Link>
          </div>
        </div>
      </section>

      {/* HELP THE NEEDY SECTION */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Every Act of Kindness Creates a Ripple
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 text-2xl">✦</span>
                Your support funds after-school coaching and digital literacy programs
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 text-2xl">✦</span>
                Health camps bring essential medical care to remote villages
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 text-2xl">✦</span>
                Every contribution — big or small — transforms lives
              </li>
            </ul>
            <a
              href="#donate"
              className="mt-8 inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition"
            >
              Start Your Impact Today
            </a>
          </div>

          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80"
              alt="Helping hands in community"
              className="rounded-2xl shadow-2xl w-full object-cover h-96"
            />
          </div>
        </div>
      </section>

      {/* LATEST BLOGS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-xl text-gray-600">
            Stories of hope, progress, and community transformation
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading latest stories...</p>
        ) : latestThree.length === 0 ? (
          <p className="text-center text-gray-400">No blog posts yet.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-10">
              {latestThree.map((b) => (
                <article
                  key={b._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-sm text-gray-500 mb-2">
                      {b.dateDisplay || new Date(b.createdAt).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {b.excerpt}
                    </p>
                    <Link
                      to={`/blog/${b._id}`}
                      className="text-indigo-700 font-semibold hover:text-indigo-800 flex items-center gap-2"
                    >
                      Read More <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/blogs"
                className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-8 py-4 rounded-lg transition shadow"
              >
                View All Blogs
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}