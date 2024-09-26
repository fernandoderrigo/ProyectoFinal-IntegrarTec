import React from 'react';

export function GenderFallback() {
  return (
    <article className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="grid aspect-video col-span-2 grid-cols-2 content-center rounded-xl gap-4 bg-waterGreen-500 p-2.5"
        >
          <div className="w-2/5 h-full pl-2">
            <div className="w-3/4 h-6 rounded bg-waterGreen-400"></div>
          </div>
          <div className="w-full col-start-2 rounded-xl bg-waterGreen-400 aspect-square"></div>
        </div>
      ))}
    </article>
  );
}
