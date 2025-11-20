import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { roomService } from "@/services/api/roomService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";

function Layout() {
  const [propertyData, setPropertyData] = useState({
    address: "",
    squareFootage: "",
    yearBuilt: ""
  });
  const [rooms, setRooms] = useState([]);
  const [roomCosts, setRoomCosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [, , removeEstimateData] = useLocalStorage("rehab-estimate", null);

  useEffect(() => {
    // Initialize with empty state for new estimate
    setLoading(false);
  }, []);

  const handlePropertyChange = useCallback((data) => {
    setPropertyData(data);
  }, []);

  const handleAddRoom = async (roomType) => {
    try {
      const newRoom = await roomService.create({
        propertyId: "current",
        type: roomType.value,
        name: roomType.label,
        order: rooms.length + 1
      });
      
      // Add costItems array to match the structure
      const roomWithCostItems = {
        ...newRoom,
        costItems: []
      };
      
      setRooms(prev => [...prev, roomWithCostItems]);
      toast.success(`${roomType.label} section added`);
    } catch (error) {
      toast.error("Failed to add room section");
    }
  };

  // Auto-populate all room types on mount
  useEffect(() => {
    const initializeAllRooms = async () => {
      if (rooms.length > 0) return; // Don't reinitialize if rooms exist
      
      const defaultRooms = [
        { value: "kitchen", label: "Kitchen" },
        { value: "bathroom", label: "Bathroom" },
        { value: "living", label: "Living Room" },
        { value: "bedroom", label: "Bedroom" },
        { value: "flooring", label: "Flooring" },
        { value: "mechanicals", label: "Mechanicals" },
        { value: "exterior", label: "Exterior" }
      ];

      for (const roomType of defaultRooms) {
        try {
          const newRoom = await roomService.create({
            propertyId: "current",
            type: roomType.value,
            name: roomType.label,
            order: rooms.length + 1
          });
          
          const roomWithCostItems = {
            ...newRoom,
            costItems: []
          };
          
          setRooms(prev => [...prev, roomWithCostItems]);
        } catch (error) {
          console.error(`Failed to initialize ${roomType.label}:`, error);
        }
      }
    };

    initializeAllRooms();
  }, []);

  const handleDeleteRoom = async (roomId) => {
    try {
      await roomService.delete(roomId);
      setRooms(prev => prev.filter(room => room.Id !== roomId));
      setRoomCosts(prev => {
        const { [roomId]: removed, ...rest } = prev;
        return rest;
      });
      toast.success("Room section deleted");
    } catch (error) {
      toast.error("Failed to delete room section");
    }
  };

  const handleRoomCostChange = useCallback((roomId, cost) => {
    setRoomCosts(prev => ({
      ...prev,
      [roomId]: cost
    }));
  }, []);

  const totalCost = Object.values(roomCosts).reduce((sum, cost) => sum + cost, 0);

  const handleClearEstimate = () => {
    if (window.confirm("Are you sure you want to clear all data and start over?")) {
      setPropertyData({
        address: "",
        squareFootage: "",
        yearBuilt: ""
      });
      setRooms([]);
      setRoomCosts({});
      removeEstimateData();
      toast.success("Estimate cleared");
    }
  };

  // Context value to pass to outlet
  const outletContext = {
    propertyData,
    setPropertyData,
    rooms,
    setRooms,
    roomCosts,
    setRoomCosts,
    loading,
    setLoading,
    handlePropertyChange,
    handleAddRoom,
    handleDeleteRoom,
    handleRoomCostChange,
    handleClearEstimate,
    totalCost,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Rehab Estimator
                </h1>
                <p className="text-sm text-gray-600">Property rehabilitation cost calculator</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {(propertyData.address || rooms.length > 0) && (
                <button
                  onClick={handleClearEstimate}
                  className="text-sm text-gray-500 hover:text-error transition-colors flex items-center gap-1"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet context={outletContext} />
      </main>
    </div>
  );
}

export default Layout;