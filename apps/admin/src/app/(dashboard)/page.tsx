import SignOutButton from "@/components/SignOutButton";

export default async function Home() {
  return (
    <>
      <header className="pb-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <SignOutButton />
        </div>
      </header>

      <main>test</main>
    </>
  );
}
