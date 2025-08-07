import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding some information", 
  icon = "Database",
  action,
  actionLabel = "Get Started"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {action && (
        <Button 
          variant="primary" 
          icon="Plus" 
          onClick={action}
          size="lg"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;