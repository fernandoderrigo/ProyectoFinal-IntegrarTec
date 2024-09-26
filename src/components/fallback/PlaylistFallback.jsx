import React from 'react';

export function PlaylistFallback() {
  return (
    <section className="col-span-4 px-4">
      {[...Array(2)].map((_, index) => (
        <article
          key={index}
          className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl animate-pulse"
        >
          <div className="grid grid-cols-3 col-span-3 col-start-1 gap-4">
            <div className="w-full col-start-1 aspect-square rounded-xl bg-neutralViolet-700"></div>
            <div className="col-span-2 col-start-2 text-start">
              <div className="w-3/4 h-6 mb-2 rounded bg-neutralViolet-700"></div>
              <div className="w-1/2 h-4 rounded bg-neutralViolet-700"></div>
            </div>
          </div>
          <div className="w-8 h-8 col-start-4 rounded-full bg-neutralViolet-700"></div>
        </article>
      ))}
    </section>
  );
}
