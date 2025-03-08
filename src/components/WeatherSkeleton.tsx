import { Skeleton } from "./ui/skeleton";

const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-4 ">
        <Skeleton className="w-full rounded-lg h-32" />
        <Skeleton className="w-full rounded-lg h-32" />
        <Skeleton className="w-full rounded-lg h-32" />
        <Skeleton className="w-full rounded-lg h-32" />
      </div>
      <div className="grid gap-6">
        <Skeleton className="w-full rounded-lg h-[300px]" />
        <Skeleton className="w-full rounded-lg h-[300px]" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="w-full rounded-lg h-[300px]" />
        <Skeleton className="w-full rounded-lg h-[300px]" />
      </div>
    </div>
  );
};
export default WeatherSkeleton;
