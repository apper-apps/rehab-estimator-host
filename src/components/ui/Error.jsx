import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  details 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {details && (
        <div className="text-sm text-gray-500 bg-gray-100 rounded-lg p-4 mb-6 max-w-md">
          <code>{details}</code>
        </div>
      )}
      
      {onRetry && (
        <Button 
          variant="primary" 
          icon="RefreshCw" 
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;