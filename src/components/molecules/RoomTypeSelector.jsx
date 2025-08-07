import { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const roomTypes = [
  { value: "kitchen", label: "Kitchen", icon: "ChefHat", color: "bg-orange-100 text-orange-700" },
  { value: "bathroom", label: "Bathroom", icon: "Bath", color: "bg-blue-100 text-blue-700" },
  { value: "bedroom", label: "Bedroom", icon: "Bed", color: "bg-purple-100 text-purple-700" },
  { value: "living", label: "Living Room", icon: "Sofa", color: "bg-green-100 text-green-700" },
  { value: "flooring", label: "Flooring", icon: "Square", color: "bg-amber-100 text-amber-700" },
  { value: "mechanicals", label: "Mechanicals", icon: "Settings", color: "bg-gray-100 text-gray-700" },
  { value: "exterior", label: "Exterior", icon: "Home", color: "bg-emerald-100 text-emerald-700" },
  { value: "other", label: "Other", icon: "MoreHorizontal", color: "bg-slate-100 text-slate-700" }
];

const RoomTypeSelector = ({ onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (roomType) => {
    onSelect(roomType);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="lg"
        icon="Plus"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-center border-dashed border-2 hover:border-primary-400 hover:bg-primary-50"
      >
        Add Room Section
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              <div className="text-sm font-medium text-gray-700 px-3 py-2 border-b border-gray-100 mb-2">
                Select Room Type
              </div>
              {roomTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleSelect(type)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={cn("p-2 rounded-md", type.color)}>
                    <ApperIcon name={type.icon} className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomTypeSelector;