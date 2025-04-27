import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  return (
    // to do: implement skeleton for the favorites
    <div className="space-y-6">

<div className="space-y-2">
        <Skeleton className="h-8 w-32 rounded-md" /> {/* Title or heading */}
        <div className="flex space-x-4 overflow-x-auto">
          {/* Fake favorite city cards */}
          <Skeleton className="h-24 w-48 flex-shrink-0 rounded-lg" />
          <Skeleton className="h-24 w-48 flex-shrink-0 rounded-lg" />
          <Skeleton className="h-24 w-48 flex-shrink-0 rounded-lg" />
          {/* Add more if you want */}
        </div>
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeleton;
