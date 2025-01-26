// app/page.tsx
import Image from "next/image";

// Server Component: This function will run on the server and fetch data.
export default async function Home() {
  // Fetch data on the server side (you can use the same fetch logic here)
  const response = await fetch(`http://localhost:3000/api/macros?userId=123`);
  const macros = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start" >
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
      {/* Render the fetched macros data */}
      <div>{JSON.stringify(macros, null, 5)} </div>
    </div>
  );
}
