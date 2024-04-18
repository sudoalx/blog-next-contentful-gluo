import { Grid } from "./components/layout/PostsGrid";
import { Sidebar } from "./components";

export default function Home() {
  return (
    <main className="container mx-auto my-10">
      {/* Grid of articles and sidebar */}
      <div className="p-4 flex flex-col lg:flex lg:flex-row gap-2">
        <Grid />
        <Sidebar />
      </div>
    </main>
  );
}
