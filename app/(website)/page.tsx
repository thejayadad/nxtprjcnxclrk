import Box from "@/components/box";
import Categories from "@/components/categories";
import EventList from "@/components/event-card/event-list";



export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
    <div className="relative pt-28 p-4">
      <Box>
        <Categories />
        <EventList />

      </Box>
    </div>
  );
}
