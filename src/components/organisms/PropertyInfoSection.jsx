import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";

const PropertyInfoSection = ({ onPropertyChange }) => {
  const [propertyData, setPropertyData] = useLocalStorage("rehab-property", {
    address: "",
    squareFootage: "",
    yearBuilt: ""
  });

  const [localData, setLocalData] = useState(propertyData);
  const debouncedData = useDebounce(localData, 500);

  useEffect(() => {
    setPropertyData(debouncedData);
    onPropertyChange(debouncedData);
  }, [debouncedData, setPropertyData, onPropertyChange]);

  const handleInputChange = (field, value) => {
    setLocalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="p-6 shadow-md border-l-4 border-l-primary-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <div className="w-6 h-6 text-white">🏠</div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Property Information</h2>
          <p className="text-sm text-gray-600">Enter basic property details to get started</p>
        </div>
      </div>

      <div className="space-y-6">
        <FormField
          label="Property Address"
          placeholder="123 Main Street, City, State ZIP"
          value={localData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            label="Square Footage"
            type="number"
            placeholder="2,400"
            value={localData.squareFootage}
            onChange={(e) => handleInputChange("squareFootage", e.target.value)}
          />

          <FormField
            label="Year Built"
            type="number"
            placeholder="1985"
            value={localData.yearBuilt}
            onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default PropertyInfoSection;