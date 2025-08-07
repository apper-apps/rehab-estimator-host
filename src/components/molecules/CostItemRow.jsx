import React, { useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const repairCategoriesByRoom = {
  kitchen: [
    { category: "flooring", name: "Flooring - Tile", range: "$8-15/sq ft", description: "Ceramic or porcelain tile installation" },
    { category: "flooring", name: "Flooring - Hardwood", range: "$8-12/sq ft", description: "Hardwood flooring installation" },
    { category: "cabinets", name: "Kitchen Cabinets - Refacing", range: "$4,000-8,000", description: "Cabinet door and drawer front replacement" },
    { category: "cabinets", name: "Kitchen Cabinets - Full Replace", range: "$12,000-25,000", description: "Complete cabinet replacement" },
    { category: "countertops", name: "Countertops - Quartz", range: "$50-90/sq ft", description: "Quartz countertop installation" },
    { category: "countertops", name: "Countertops - Granite", range: "$40-75/sq ft", description: "Granite countertop installation" },
    { category: "appliances", name: "Appliances - Basic Package", range: "$2,500-4,000", description: "Refrigerator, stove, dishwasher, microwave" },
    { category: "appliances", name: "Appliances - Premium Package", range: "$5,000-10,000", description: "High-end appliance package" },
    { category: "paint", name: "Paint - Interior", range: "$2-4/sq ft", description: "Interior wall and ceiling painting" },
    { category: "electrical", name: "Electrical - Kitchen Upgrade", range: "$800-1,500", description: "Additional outlets and lighting" },
    { category: "plumbing", name: "Plumbing - Sink Installation", range: "$300-800", description: "Kitchen sink and faucet installation" }
  ],
  bathroom: [
    { category: "flooring", name: "Flooring - Tile", range: "$8-18/sq ft", description: "Bathroom tile flooring" },
    { category: "flooring", name: "Flooring - Vinyl", range: "$4-8/sq ft", description: "Luxury vinyl plank flooring" },
    { category: "fixtures", name: "Vanity - Standard", range: "$300-800", description: "Basic bathroom vanity with sink" },
    { category: "fixtures", name: "Vanity - Custom", range: "$800-2,000", description: "Custom vanity installation" },
    { category: "fixtures", name: "Toilet Replacement", range: "$200-500", description: "Standard toilet replacement" },
    { category: "fixtures", name: "Shower/Tub - Standard", range: "$1,200-3,000", description: "Fiberglass or acrylic unit" },
    { category: "fixtures", name: "Shower/Tub - Tile", range: "$3,000-8,000", description: "Custom tile shower installation" },
    { category: "paint", name: "Paint - Bathroom", range: "$3-6/sq ft", description: "Moisture-resistant bathroom paint" },
    { category: "electrical", name: "Electrical - Bathroom", range: "$400-800", description: "GFCI outlets and ventilation" },
    { category: "plumbing", name: "Plumbing - Full Rough-in", range: "$1,500-3,000", description: "Complete bathroom plumbing" }
  ],
  living: [
    { category: "flooring", name: "Flooring - Hardwood", range: "$8-12/sq ft", description: "Hardwood flooring installation" },
    { category: "flooring", name: "Flooring - Laminate", range: "$3-8/sq ft", description: "Laminate flooring installation" },
    { category: "flooring", name: "Flooring - Carpet", range: "$2-6/sq ft", description: "Carpet installation" },
    { category: "paint", name: "Paint - Interior", range: "$2-4/sq ft", description: "Interior wall and ceiling painting" },
    { category: "electrical", name: "Electrical - Lighting", range: "$200-800", description: "Ceiling fans and light fixtures" },
    { category: "windows", name: "Windows - Standard", range: "$400-800/window", description: "Double-pane vinyl windows" },
    { category: "windows", name: "Windows - Premium", range: "$600-1,200/window", description: "Energy-efficient windows" },
    { category: "doors", name: "Interior Doors", range: "$150-400/door", description: "Standard interior door replacement" }
  ],
  bedroom: [
    { category: "flooring", name: "Flooring - Hardwood", range: "$8-12/sq ft", description: "Hardwood flooring installation" },
    { category: "flooring", name: "Flooring - Carpet", range: "$2-6/sq ft", description: "Bedroom carpet installation" },
    { category: "paint", name: "Paint - Interior", range: "$2-4/sq ft", description: "Bedroom wall and ceiling painting" },
    { category: "electrical", name: "Electrical - Outlets", range: "$150-300", description: "Additional outlets and switches" },
    { category: "windows", name: "Windows - Standard", range: "$400-800/window", description: "Bedroom window replacement" },
    { category: "doors", name: "Interior Doors", range: "$150-400/door", description: "Bedroom door replacement" },
    { category: "fixtures", name: "Closet System", range: "$500-1,500", description: "Built-in closet organization" }
  ],
  flooring: [
    { category: "flooring", name: "Hardwood - Refinishing", range: "$3-5/sq ft", description: "Sand and refinish existing hardwood" },
    { category: "flooring", name: "Hardwood - New Installation", range: "$8-12/sq ft", description: "New hardwood flooring" },
    { category: "flooring", name: "Tile - Ceramic", range: "$5-10/sq ft", description: "Ceramic tile installation" },
    { category: "flooring", name: "Tile - Porcelain", range: "$8-15/sq ft", description: "Porcelain tile installation" },
    { category: "flooring", name: "Vinyl - Luxury Plank", range: "$4-8/sq ft", description: "Luxury vinyl plank flooring" },
    { category: "flooring", name: "Laminate", range: "$3-8/sq ft", description: "Laminate flooring installation" },
    { category: "flooring", name: "Carpet", range: "$2-6/sq ft", description: "Wall-to-wall carpeting" }
  ],
  mechanicals: [
    { category: "hvac", name: "HVAC - System Replacement", range: "$5,000-12,000", description: "Complete HVAC system replacement" },
    { category: "hvac", name: "HVAC - Ductwork", range: "$2,000-5,000", description: "Ductwork repair or replacement" },
    { category: "electrical", name: "Electrical - Panel Upgrade", range: "$1,200-2,500", description: "Electrical panel upgrade to 200 amp" },
    { category: "electrical", name: "Electrical - Rewiring", range: "$3,000-8,000", description: "Whole house rewiring" },
    { category: "plumbing", name: "Plumbing - Repiping", range: "$4,000-10,000", description: "Whole house repiping" },
    { category: "plumbing", name: "Plumbing - Water Heater", range: "$800-2,000", description: "Water heater replacement" },
    { category: "insulation", name: "Insulation - Attic", range: "$1.50-3.50/sq ft", description: "Blown-in attic insulation" }
  ],
  exterior: [
    { category: "roofing", name: "Roofing - Asphalt Shingles", range: "$5-8/sq ft", description: "Asphalt shingle roof replacement" },
    { category: "roofing", name: "Roofing - Metal", range: "$8-14/sq ft", description: "Metal roof installation" },
    { category: "siding", name: "Siding - Vinyl", range: "$3-7/sq ft", description: "Vinyl siding installation" },
    { category: "siding", name: "Siding - Fiber Cement", range: "$6-12/sq ft", description: "Fiber cement siding" },
    { category: "windows", name: "Exterior Windows", range: "$400-1,200/window", description: "Full window replacement" },
    { category: "doors", name: "Entry Doors", range: "$500-2,000/door", description: "Front and back door replacement" },
    { category: "paint", name: "Exterior Paint", range: "$2-5/sq ft", description: "Exterior house painting" },
    { category: "concrete", name: "Driveway/Walkway", range: "$4-8/sq ft", description: "Concrete driveway or walkway" }
  ]
};

const getRepairCategories = (roomType) => {
  return repairCategoriesByRoom[roomType] || [
    { category: "other", name: "Custom Repair", range: "Variable", description: "Custom repair work" }
  ];
};

const CostItemRow = ({ item, onUpdate, onDelete, className, roomType }) => {
  const [isEditing, setIsEditing] = useState(!item.category && !item.description);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [formData, setFormData] = useState({
    category: item.category || "",
    description: item.description || "",
    cost: item.cost || ""
  });

  const repairCategories = getRepairCategories(roomType);

  useEffect(() => {
    // Find matching repair category if editing existing item
    if (item.category && item.description) {
      const match = repairCategories.find(repair => 
        repair.category === item.category && repair.description === item.description
      );
      setSelectedRepair(match);
    }
  }, [item, repairCategories]);

const handleRepairSelect = (repair) => {
    setSelectedRepair(repair);
    setFormData({
      category: repair.category,
      description: repair.description,
      cost: formData.cost
    });
  };

  const handleSave = () => {
    const cost = parseFloat(formData.cost) || 0;
    onUpdate(item.Id, {
      ...formData,
      cost
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!item.category && !item.description) {
      onDelete(item.Id);
    } else {
      setFormData({
        category: item.category || "",
        description: item.description || "",
        cost: item.cost || ""
      });
      setIsEditing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

if (isEditing) {
    return (
      <div className={cn("flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200", className)}>
        <div className="grid gap-3">
          <div className="text-sm font-medium text-gray-700">Select Repair Category:</div>
          <div className="grid gap-2 max-h-48 overflow-y-auto">
            {repairCategories.map((repair, index) => (
              <button
                key={index}
                onClick={() => handleRepairSelect(repair)}
                className={cn(
                  "p-3 text-left border rounded-lg transition-colors",
                  selectedRepair === repair 
                    ? "border-primary-500 bg-primary-50" 
                    : "border-gray-200 hover:border-gray-300 bg-white"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{repair.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{repair.description}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary-600 ml-3">
                    {repair.range}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedRepair && (
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-200">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Selected: {selectedRepair.name}</div>
              <div className="text-xs text-primary-600">Cost Range: {selectedRepair.range}</div>
            </div>
            <div className="w-full sm:w-40">
              <Input
                type="number"
                placeholder="Enter your estimate"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="text-right"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="accent"
                icon="Check"
                onClick={handleSave}
                disabled={!selectedRepair || !formData.cost}
              />
              <Button
                size="sm"
                variant="ghost"
                icon="X"
                onClick={handleCancel}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

return (
    <div className={cn("flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow", className)}>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm font-medium text-primary-600 capitalize bg-primary-50 px-2 py-1 rounded-md inline-block w-fit">
            {item.category}
          </span>
          <span className="text-gray-700">{item.description}</span>
          {selectedRepair && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Range: {selectedRepair.range}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-gray-900 min-w-[80px] text-right">
          {formatCurrency(item.cost)}
        </span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            icon="Edit2"
            onClick={() => setIsEditing(true)}
          />
          <Button
            size="sm"
            variant="ghost"
            icon="Trash2"
            onClick={() => onDelete(item.Id)}
            className="text-error hover:bg-red-50"
          />
        </div>
      </div>
    </div>
  );
};

export default CostItemRow;