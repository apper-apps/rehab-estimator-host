import { useOutletContext } from "react-router-dom";
import React from "react";
import RoomTypeSelector from "@/components/molecules/RoomTypeSelector";
import Empty from "@/components/ui/Empty";
import TotalCostBar from "@/components/organisms/TotalCostBar";
import PropertyInfoSection from "@/components/organisms/PropertyInfoSection";
import RoomSection from "@/components/organisms/RoomSection";
function RehabEstimatorPage() {
  // Get all state and handlers from Layout via outlet context
  const {
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
  } = useOutletContext();
return (
    <div className="pb-24">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
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
      </div>

      {/* Total Cost Bar */}
      <TotalCostBar 
        totalCost={totalCost} 
        propertyData={propertyData}
        rooms={rooms}
      />
    </div>
);
}

export default RehabEstimatorPage;