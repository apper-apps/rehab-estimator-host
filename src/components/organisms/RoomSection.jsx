import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import CostItemRow from "@/components/molecules/CostItemRow";
import ApperIcon from "@/components/ApperIcon";
import { costItemService } from "@/services/api/costItemService";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";

const roomTypeConfig = {
  kitchen: { icon: "ChefHat", color: "bg-orange-100 text-orange-700", label: "Kitchen" },
  bathroom: { icon: "Bath", color: "bg-blue-100 text-blue-700", label: "Bathroom" },
  bedroom: { icon: "Bed", color: "bg-purple-100 text-purple-700", label: "Bedroom" },
  living: { icon: "Sofa", color: "bg-green-100 text-green-700", label: "Living Room" },
  flooring: { icon: "Square", color: "bg-amber-100 text-amber-700", label: "Flooring" },
  mechanicals: { icon: "Settings", color: "bg-gray-100 text-gray-700", label: "Mechanicals" },
  exterior: { icon: "Home", color: "bg-emerald-100 text-emerald-700", label: "Exterior" },
  other: { icon: "MoreHorizontal", color: "bg-slate-100 text-slate-700", label: "Other" }
};

const RoomSection = ({ room, onUpdate, onDelete, onCostChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [costItems, setCostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = roomTypeConfig[room.type] || roomTypeConfig.other;

  useEffect(() => {
    loadCostItems();
  }, [room.Id]);

  useEffect(() => {
    const total = costItems.reduce((sum, item) => sum + (item.cost || 0), 0);
    onCostChange(room.Id, total);
  }, [costItems, room.Id, onCostChange]);

  const loadCostItems = async () => {
    try {
      setLoading(true);
      const items = await costItemService.getByRoomId(room.Id);
      setCostItems(items);
    } catch (error) {
      toast.error("Failed to load cost items");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCostItem = async () => {
    try {
      const newItem = await costItemService.create({
        roomId: room.Id,
        category: "",
        description: "",
        cost: 0
      });
      setCostItems(prev => [...prev, newItem]);
    } catch (error) {
      toast.error("Failed to add cost item");
    }
  };

  const handleUpdateCostItem = async (itemId, data) => {
    try {
      const updatedItem = await costItemService.update(itemId, data);
      setCostItems(prev => prev.map(item => item.Id === itemId ? updatedItem : item));
      toast.success("Cost item updated");
    } catch (error) {
      toast.error("Failed to update cost item");
    }
  };

  const handleDeleteCostItem = async (itemId) => {
    try {
      await costItemService.delete(itemId);
      setCostItems(prev => prev.filter(item => item.Id !== itemId));
      toast.success("Cost item deleted");
    } catch (error) {
      toast.error("Failed to delete cost item");
    }
  };

  const totalCost = costItems.reduce((sum, item) => sum + (item.cost || 0), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-4">
          <div className={cn("p-2 rounded-lg", config.color)}>
            <ApperIcon name={config.icon} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
            <Badge variant="default" className="text-xs">
              {config.label}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {formatCurrency(totalCost)}
            </div>
            <div className="text-sm text-gray-500">
              {costItems.length} items
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              icon="Trash2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(room.Id);
              }}
              className="text-error hover:bg-red-50"
            />
            <ApperIcon 
              name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
              className="w-5 h-5 text-gray-400" 
            />
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : costItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ApperIcon name="Calculator" className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No cost items yet</h4>
              <p className="text-gray-600 mb-4">Add repair categories and costs to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
{costItems.map((item) => (
                <CostItemRow
                  key={item.Id}
                  item={item}
                  roomType={room.type}
                  onUpdate={handleUpdateCostItem}
                  onDelete={handleDeleteCostItem}
                />
              ))}
            </div>
          )}

          <Button
            variant="outline"
            size="lg"
            icon="Plus"
            onClick={handleAddCostItem}
            className="w-full border-dashed border-2 hover:border-secondary-400 hover:bg-secondary-50"
          >
            Add Cost Item
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RoomSection;