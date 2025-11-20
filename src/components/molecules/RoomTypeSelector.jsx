import { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const roomTypes = [
  { value: "demolition", label: "Interior Demolition", icon: "Hammer", color: "bg-red-100 text-red-700" },
  { value: "framing", label: "Framing", icon: "Grid3x3", color: "bg-yellow-100 text-yellow-700" },
  { value: "insulation", label: "Insulation", icon: "Shield", color: "bg-cyan-100 text-cyan-700" },
  { value: "drywall", label: "Drywall", icon: "Square", color: "bg-gray-100 text-gray-700" },
  { value: "kitchen_package", label: "Kitchen (Packaged)", icon: "ChefHat", color: "bg-orange-100 text-orange-700" },
  { value: "bathroom_package", label: "Bathrooms (Packaged)", icon: "Bath", color: "bg-blue-100 text-blue-700" },
  { value: "kitchen_cabinetry", label: "Kitchen Cabinetry", icon: "Archive", color: "bg-amber-100 text-amber-700" },
  { value: "vanity_cabinetry", label: "Vanity Cabinetry", icon: "Package", color: "bg-indigo-100 text-indigo-700" },
  { value: "countertops", label: "Countertops", icon: "Rectangle", color: "bg-stone-100 text-stone-700" },
  { value: "appliances", label: "Appliances", icon: "Zap", color: "bg-emerald-100 text-emerald-700" },
  { value: "interior_doors", label: "Interior Doors", icon: "DoorOpen", color: "bg-purple-100 text-purple-700" },
  { value: "interior_woodwork", label: "Interior Woodwork", icon: "TreePine", color: "bg-green-100 text-green-700" },
  { value: "interior_painting", label: "Interior Painting", icon: "Paintbrush2", color: "bg-pink-100 text-pink-700" },
  { value: "carpet_vinyl", label: "Carpet/Vinyl", icon: "Layers", color: "bg-rose-100 text-rose-700" },
  { value: "tiling", label: "Tiling", icon: "Grid2x2", color: "bg-slate-100 text-slate-700" },
  { value: "hardwood_flooring", label: "Hardwood Flooring", icon: "TreeDeciduous", color: "bg-amber-100 text-amber-700" },
  { value: "basement", label: "Basement", icon: "Building", color: "bg-gray-100 text-gray-700" },
  { value: "laundry", label: "Laundry", icon: "Shirt", color: "bg-blue-100 text-blue-700" },
  { value: "foundations", label: "Foundations", icon: "Building2", color: "bg-stone-100 text-stone-700" },
  { value: "misc_interior", label: "Misc Interior Items", icon: "Home", color: "bg-neutral-100 text-neutral-700" },
  { value: "remediation", label: "Remediation/Abatement", icon: "ShieldAlert", color: "bg-red-100 text-red-700" }
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