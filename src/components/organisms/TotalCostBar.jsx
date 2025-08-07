import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "react-toastify";

const TotalCostBar = ({ totalCost, propertyData, rooms = [] }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [, setEstimateData] = useLocalStorage("rehab-estimate", null);

  // Auto-save functionality
  useEffect(() => {
    const saveData = async () => {
      if (!propertyData.address) return;

      setIsSaving(true);
      try {
        const estimateData = {
          property: propertyData,
          totalCost,
          rooms,
          lastSaved: new Date().toISOString()
        };
        
        setEstimateData(estimateData);
        setLastSaved(new Date());
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [totalCost, propertyData, rooms, setEstimateData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const handleExport = () => {
    const estimateData = {
      property: propertyData,
      totalCost,
      rooms,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(estimateData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rehab-estimate-${propertyData.address?.replace(/[^a-zA-Z0-9]/g, "-") || "property"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Estimate exported successfully!");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {formatCurrency(totalCost)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {isSaving ? (
                  <div className="flex items-center gap-1 animate-pulse-save">
                    <ApperIcon name="Save" className="w-4 h-4" />
                    <span>Saving...</span>
                  </div>
                ) : lastSaved ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <ApperIcon name="Check" className="w-4 h-4" />
                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                  </div>
                ) : (
                  <span>Total Rehabilitation Cost</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right text-sm text-gray-600">
              <div>{rooms.length} room sections</div>
              <div>
                {rooms.reduce((total, room) => total + (room.costItems?.length || 0), 0)} cost items
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              icon="Download"
              onClick={handleExport}
              disabled={!propertyData.address || totalCost === 0}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCostBar;