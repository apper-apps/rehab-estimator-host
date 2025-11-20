import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertCircle" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to Rehab Estimator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;