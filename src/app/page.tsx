import { Grid } from "./components/entries/Grid";
import { Sidebar } from "./components";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Grid of articles and sidebar */}
      {/* sidebar column should take up a fourth of the screen */}
      <div className="container mx-auto p-4 flex justify-between w-4/6">
        <Grid />
        <Sidebar />
      </div>
    </main>
  );
}
