// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { api } from '../../../Api';

// const useBlog = (id) => {
//   const [blog, setBlog] = React.useState(null); // null initially
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   React.useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     setError(null);

//     api.getSingleBlog(id)
//       .then((data) => {
//         console.log('Fetched blog data:', data); // Debug: check what is returned
//         setBlog(data);
//       })
//       .catch((err) => {
//         console.error('Error fetching blog:', err);
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   return { blog, loading, error };
// };

// export default function SingleBlogPage() {
//   const { id } = useParams();
//   const { blog, loading, error } = useBlog(id);

//   if (loading) {
//     return (
//       <>
//         {/* Consistent Hero Header */}
//         <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
//           <div className="absolute inset-0 bg-black opacity-30"></div>
//           <div className="relative max-w-7xl mx-auto px-6 text-center">
//             <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
//               Blog
//             </h1>
//             <div className="mt-8 flex justify-center gap-4">
//               <div className="w-20 h-1 bg-yellow-400 rounded"></div>
//               <div className="w-8 h-1 bg-yellow-400 rounded opacity-70"></div>
//               <div className="w-20 h-1 bg-yellow-400 rounded"></div>
//             </div>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0">
//             <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
//               <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
//             </svg>
//           </div>
//         </section>

//         <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
//           <p className="text-center text-gray-600 text-lg">Loading article...</p>
//         </section>
//       </>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <>
//         {/* Hero for error state */}
//         <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
//           <div className="absolute inset-0 bg-black opacity-30"></div>
//           <div className="relative max-w-7xl mx-auto px-6 text-center">
//             <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
//               Blog
//             </h1>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0">
//             <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
//               <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
//             </svg>
//           </div>
//         </section>

//         <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl text-center">
//           <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h2>
//             <p className="text-gray-600 mb-8">
//               {error ? 'There was an error loading the blog post.' : 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
//             </p>
//             <Link to="/blogs" className="text-indigo-700 font-semibold hover:underline text-lg">
//               ← Back to All Blogs
//             </Link>
//           </div>
//         </section>
//       </>
//     );
//   }

//   const publishedDate = blog.dateDisplay
//     ? new Date(blog.dateDisplay).toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//       })
//     : 'Date not available';

//   return (
//     <>
//       {/* Hero Header with Blog Title */}
//       <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="relative max-w-5xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
//             {blog.title}
//           </h1>
//           <div className="flex justify-center items-center gap-6 text-lg opacity-90">
//             <span>{publishedDate}</span>
//             <span>•</span>
//             <span>{blog.author || 'Shri Aryabhatta Team'}</span>
//           </div>
//           <div className="mt-8 flex justify-center gap-4">
//             <div className="w-20 h-1 bg-yellow-400 rounded"></div>
//             <div className="w-8 h-1 bg-yellow-400 rounded opacity-70"></div>
//             <div className="w-20 h-1 bg-yellow-400 rounded"></div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
//             <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Main Blog Content */}
//       <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
//         <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Featured Image */}
//           <div className="relative h-96 md:h-[500px] overflow-hidden">
//             <img
//               src={blog.image || '/placeholder-blog.jpg'} // fallback image if missing
//               alt={blog.title}
//               className="w-full h-28px object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//           </div>

//           {/* Article Body */}
//           <div className="prose prose-lg max-w-none px-8 md:px-16 py-12 text-gray-800">
//             {/* Excerpt / Introduction */}
//             {blog.excerpt && (
//               <p className="text-xl text-gray-700 italic border-l-4 border-indigo-600 pl-6 py-2 mb-10">
//                 {blog.excerpt}
//               </p>
//             )}

//             {/* Full Content */}
//             <div
//               className="leading-relaxed space-y-6"
//               dangerouslySetInnerHTML={{ __html: blog.content }}
//             />

//             {/* Tags */}
//             {blog.tags && blog.tags.length > 0 && (
//               <div className="mt-12 pt-8 border-t border-gray-200">
//                 <h4 className="font-semibold text-gray-900 mb-3">Tags:</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {blog.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Back Button & Share */}
//           <div className="bg-gray-50 px-8 md:px-16 py-10 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
//               <Link
//                 to="/blogs"
//                 className="text-indigo-700 font-semibold hover:text-indigo-800 flex items-center gap-2"
//               >
//                 ← Back to All Blogs
//               </Link>

//               <div className="flex items-center gap-4 text-gray-600">
//                 <span className="text-sm">Share:</span>
//                 <button aria-label="Share on Facebook" className="hover:text-indigo-700 transition text-xl">📘</button>
//                 <button aria-label="Share on Twitter" className="hover:text-indigo-700 transition text-xl">🐦</button>
//                 <button aria-label="Share on LinkedIn" className="hover:text-indigo-700 transition text-xl">💼</button>
//               </div>
//             </div>
//           </div>
//         </article>
//       </section>
//     </>
//   );
// }




/////========================================================================================




import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../../Api';

const useBlog = (id) => {
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    api.getSingleBlog(id)
      .then((data) => {
        console.log('Fetched blog data:', data);
        setBlog(data);
      })
      .catch((err) => {
        console.error('Error fetching blog:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { blog, loading, error };
};

export default function SingleBlogPage() {
  const { id } = useParams();
  const { blog, loading, error } = useBlog(id);

  if (loading) {
    return (
      <>
        {/* Hero Header */}
        <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Blog
            </h1>
            <div className="mt-8 flex justify-center gap-4">
              <div className="w-20 h-1 bg-yellow-400 rounded"></div>
              <div className="w-8 h-1 bg-yellow-400 rounded opacity-70"></div>
              <div className="w-20 h-1 bg-yellow-400 rounded"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
              <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
          <p className="text-center text-gray-600 text-lg">Loading article...</p>
        </section>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Blog
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
              <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8">
              {error ? 'There was an error loading the blog post.' : 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link to="/blogs" className="text-indigo-700 font-semibold hover:underline text-lg">
              ← Back to All Blogs
            </Link>
          </div>
        </section>
      </>
    );
  }

  const publishedDate = blog.dateDisplay
    ? new Date(blog.dateDisplay).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Date not available';

  // Process content: split by \\n\\n and handle ### headings
  const contentLines = blog.content.split('\\n\\n');
  const renderedContent = contentLines.map((block, index) => {
    if (block.startsWith('### ')) {
      const heading = block.replace('### ', '');
      return <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">{heading}</h2>;
    }
    return <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">{block}</p>;
  });

  return (
    <>
      {/* Hero Header with Blog Title */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-lg opacity-90">
            <span>{publishedDate}</span>
            <span className="hidden sm:inline">•</span>
            <span>{blog.author || 'Shri Aryabhatta Team'}</span>
            {blog.location && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="text-yellow-300 font-medium">{blog.location}</span>
              </>
            )}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-20 h-1 bg-yellow-400 rounded"></div>
            <div className="w-8 h-1 bg-yellow-400 rounded opacity-70"></div>
            <div className="w-20 h-1 bg-yellow-400 rounded"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32 text-white">
            <path fill="currentColor" d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-gray-50 -mt-8 md:-mt-12 relative z-10 rounded-t-3xl">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={blog.image || '/placeholder-blog.jpg'}
              alt={blog.title}
              className="w-full h-28px object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Article Body */}
          <div className="px-8 md:px-16 py-12">
            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl md:text-2xl text-gray-700 italic border-l-4 border-indigo-600 pl-6 py-4 mb-12 bg-gray-50 rounded-r-lg">
                {blog.excerpt}
              </p>
            )}

            {/* Rendered Content with proper headings and paragraphs */}
            <div className="prose prose-lg max-w-none text-gray-800">
              {renderedContent}
            </div>

            {/* Back Button & Share */}
            <div className="mt-16 pt-10 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <Link
                  to="/blogs"
                  className="text-indigo-700 font-semibold hover:text-indigo-800 flex items-center gap-2 text-lg"
                >
                  ← Back to All Blogs
                </Link>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="text-sm font-medium">Share:</span>
                  <button aria-label="Share on Facebook" className="hover:text-indigo-700 transition text-2xl">📘</button>
                  <button aria-label="Share on Twitter" className="hover:text-indigo-700 transition text-2xl">🐦</button>
                  <button aria-label="Share on LinkedIn" className="hover:text-indigo-700 transition text-2xl">💼</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}