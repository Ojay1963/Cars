import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const posts = [
  {
    title: "OJ Motors launches certified hybrid collection",
    category: "Announcement",
    date: "Jan 12, 2026",
    summary:
      "A new inspection line ensures verified battery health across all hybrids.",
  },
  {
    title: "Top 5 SUVs for Nigerian highways",
    category: "Guides",
    date: "Dec 18, 2025",
    summary:
      "We compare comfort, fuel efficiency, and ride stability for daily travel.",
  },
  {
    title: "Factory spotlight: the detailing studio",
    category: "Factory",
    date: "Nov 02, 2025",
    summary:
      "Behind the scenes at our detailing bay and paint correction unit.",
  },
  {
    title: "How to finance your next Toyota",
    category: "Finance",
    date: "Oct 20, 2025",
    summary: "Flexible payment plans with transparent terms.",
  },
  {
    title: "Customer story: delivery to Port Harcourt",
    category: "Stories",
    date: "Sep 05, 2025",
    summary: "A seamless delivery experience from showroom to doorstep.",
  },
];

export default function NewsFeed() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const navigate = useNavigate();

  const getPostLink = (title) => `/news?post=${encodeURIComponent(title)}`;

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category))],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const base = posts.filter((post) => {
      const matchesQuery =
        !normalized ||
        post.title.toLowerCase().includes(normalized) ||
        post.summary.toLowerCase().includes(normalized);
      const matchesCategory =
        category === "All" || post.category === category;
      return matchesQuery && matchesCategory;
    });
    const sorted = [...base].sort((a, b) => {
      if (sort === "A-Z") return a.title.localeCompare(b.title);
      if (sort === "Z-A") return b.title.localeCompare(a.title);
      return new Date(b.date) - new Date(a.date);
    });
    return sorted;
  }, [query, category, sort]);

  return (
    <section className="page-section">
      <div className="page-hero">
        <h1>News Feed</h1>
        <p>Stay updated with dealership news, releases, and expert guides.</p>
      </div>

      <div className="news-controls">
        <input
          placeholder="Search news..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option>Newest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      <div className="news-grid">
        {filtered.map((post) => (
          <article
            key={post.title}
            className="news-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(getPostLink(post.title))}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(getPostLink(post.title));
              }
            }}
          >
            <span className="news-tag">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="news-meta">
              <span>{post.date}</span>
              <NavLink
                to={getPostLink(post.title)}
                onClick={(event) => event.stopPropagation()}
              >
                Read More
              </NavLink>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">No stories match your search.</div>
        )}
      </div>
    </section>
  );
}
