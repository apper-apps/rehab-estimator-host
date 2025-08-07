import { useState, useCallback, useEffect } from "react";
import PropertyInfoSection from "@/components/organisms/PropertyInfoSection";
import RoomSection from "@/components/organisms/RoomSection";
import TotalCostBar from "@/components/organisms/TotalCostBar";
import RoomTypeSelector from "@/components/molecules/RoomTypeSelector";
import Empty from "@/components/ui/Empty";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { roomService } from "@/services/api/roomService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";

const RehabEstimatorPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Property Information */}
          <PropertyInfoSection onPropertyChange={handlePropertyChange} />

          {/* Room Sections */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Room Sections</h2>
              {rooms.length > 0 && (
                <div className="text-sm text-gray-600">
                  {rooms.length} sections • Total: {" "}
                  <span className="font-semibold text-primary-600">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(totalCost)}
                  </span>
                </div>
              )}
            </div>

            {rooms.length === 0 ? (
              <Empty
                icon="Home"
                title="No room sections yet"
                description="Add different room sections to organize and calculate repair costs for your property rehabilitation project"
                action={() => {}}
                actionLabel="Add Room Section"
              />
            ) : (
              <div className="space-y-6">
                {rooms.map((room) => (
                  <RoomSection
                    key={room.Id}
                    room={room}
                    onUpdate={(id, data) => {
                      setRooms(prev => prev.map(r => r.Id === id ? { ...r, ...data } : r));
                    }}
                    onDelete={handleDeleteRoom}
                    onCostChange={handleRoomCostChange}
                  />
                ))}
              </div>
            )}

            {/* Add Room Section */}
            <RoomTypeSelector 
              onSelect={handleAddRoom} 
              className="max-w-md mx-auto"
            />
          </div>
        </div>
      </main>

      {/* Total Cost Bar */}
      <TotalCostBar 
        totalCost={totalCost} 
        propertyData={propertyData}
        rooms={rooms}
      />
    </div>
  );
};

export default RehabEstimatorPage;