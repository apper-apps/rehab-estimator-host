import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const costCategories = [
  "Flooring",
  "Paint",
  "Electrical", 
  "Plumbing",
  "Drywall",
  "Windows",
  "Doors",
  "Fixtures",
  "Cabinets",
  "Countertops",
  "Appliances",
  "Other"
];

const CostItemRow = ({ item, onUpdate, onDelete, className }) => {
  const [isEditing, setIsEditing] = useState(!item.category && !item.description);
  const [formData, setFormData] = useState({
    category: item.category || "",
    description: item.description || "",
    cost: item.cost || ""
  });

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
      <div className={cn("flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200", className)}>
        <div className="flex-1">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full h-12 rounded-lg border border-gray-300 bg-white px-4 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">Select Category</option>
            {costCategories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-2">
          <Input
            placeholder="Description of work"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="w-full sm:w-32">
          <Input
            type="number"
            placeholder="0"
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
            disabled={!formData.category || !formData.description}
          />
          <Button
            size="sm"
            variant="ghost"
            icon="X"
            onClick={handleCancel}
          />
        </div>
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