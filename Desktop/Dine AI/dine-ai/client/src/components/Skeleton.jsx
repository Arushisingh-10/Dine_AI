export default function Skeleton() {
  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-52 bg-gray-200"/>

      <div className="p-5">
        {/* Title skeleton */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-32"/>
          <div className="h-5 bg-gray-200 rounded-full w-16"/>
        </div>
        {/* Description skeleton */}
        <div className="h-3 bg-gray-200 rounded-full w-full mb-2"/>
        <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-4"/>
        {/* Price + Button skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-7 bg-gray-200 rounded-full w-16"/>
          <div className="h-9 bg-gray-200 rounded-xl w-28"/>
        </div>
      </div>
    </div>
  );
}