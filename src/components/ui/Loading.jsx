import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-primary opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Loader2" className="w-6 h-6 text-primary-600 animate-spin" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
      
      {/* Skeleton content */}
      <div className="w-full max-w-md mt-8 space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  );
};

export default Loading;