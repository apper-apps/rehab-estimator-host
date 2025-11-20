import React, { useEffect, useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const repairCategoriesByRoom = {
  demolition: [
    { category: "interior_demolition", name: "Interior Demolition Items", range: "$2-8/sq ft", description: "Interior wall and fixture demolition" },
    { category: "building_demolition", name: "Entire Building Demolition", range: "$5,000-15,000", description: "Complete structure demolition" }
  ],
  framing: [
    { category: "structural_framing", name: "Structural Framing Assemblies", range: "$8-15/sq ft", description: "Load-bearing structural framing" },
    { category: "interior_framing", name: "Interior Framing Assemblies", range: "$3-8/sq ft", description: "Non-structural interior framing" }
  ],
  insulation: [
    { category: "insulation", name: "Blown-in Insulation", range: "$1.50-3.50/sq ft", description: "Attic blown-in insulation" },
    { category: "insulation", name: "Batt Insulation", range: "$1-2.50/sq ft", description: "Fiberglass batt insulation" },
    { category: "insulation", name: "Spray Foam Insulation", range: "$3-7/sq ft", description: "Closed-cell spray foam insulation" }
  ],
  drywall: [
    { category: "drywall", name: "Drywall Installation", range: "$1.50-3/sq ft", description: "Drywall hanging and finishing" },
    { category: "drywall", name: "Drywall Repair", range: "$200-500/room", description: "Patch and repair existing drywall" },
    { category: "drywall", name: "Texture Application", range: "$0.75-1.50/sq ft", description: "Wall texture application" }
  ],
  kitchen_package: [
    { category: "kitchen_assembly", name: "Basic Kitchen Assembly", range: "$15,000-25,000", description: "Standard kitchen package with basic appliances" },
    { category: "kitchen_assembly", name: "Premium Kitchen Assembly", range: "$30,000-50,000", description: "High-end kitchen with premium finishes" },
    { category: "kitchen_assembly", name: "Custom Kitchen Assembly", range: "$50,000-100,000", description: "Fully custom kitchen design and installation" }
  ],
  bathroom_package: [
    { category: "full_bathroom", name: "Full Bathroom Package - Standard", range: "$8,000-15,000", description: "Complete bathroom with tub/shower combo" },
    { category: "full_bathroom", name: "Full Bathroom Package - Premium", range: "$15,000-25,000", description: "Luxury full bathroom package" },
    { category: "half_bathroom", name: "Half Bathroom Package - Standard", range: "$3,000-6,000", description: "Powder room with toilet and vanity" },
    { category: "half_bathroom", name: "Half Bathroom Package - Premium", range: "$6,000-12,000", description: "High-end half bathroom" }
  ],
  kitchen_cabinetry: [
    { category: "kitchen_cabinets", name: "Kitchen Cabinets - Stock", range: "$3,000-8,000", description: "Pre-manufactured kitchen cabinets" },
    { category: "kitchen_cabinets", name: "Kitchen Cabinets - Semi-Custom", range: "$8,000-18,000", description: "Semi-custom kitchen cabinetry" },
    { category: "kitchen_cabinets", name: "Kitchen Cabinets - Custom", range: "$18,000-40,000", description: "Fully custom kitchen cabinets" },
    { category: "miscellaneous", name: "Cabinet Hardware", range: "$200-800", description: "Hinges, pulls, and cabinet accessories" },
    { category: "miscellaneous", name: "Crown Molding", range: "$8-15/linear ft", description: "Cabinet crown molding installation" }
  ],
  vanity_cabinetry: [
    { category: "bathroom_vanity", name: "Bathroom Vanity - Standard", range: "$300-800", description: "Basic bathroom vanity with sink" },
    { category: "bathroom_vanity", name: "Bathroom Vanity - Custom", range: "$800-2,500", description: "Custom bathroom vanity" },
    { category: "bathroom_vanity", name: "Double Vanity", range: "$1,200-3,500", description: "Double sink vanity installation" },
    { category: "miscellaneous", name: "Vanity Mirrors", range: "$100-500", description: "Bathroom vanity mirrors" },
    { category: "miscellaneous", name: "Medicine Cabinets", range: "$150-600", description: "Recessed or surface mount medicine cabinets" }
  ],
  countertops: [
    { category: "kitchen_countertops", name: "Quartz Countertops", range: "$50-90/sq ft", description: "Engineered quartz countertops" },
    { category: "kitchen_countertops", name: "Granite Countertops", range: "$40-75/sq ft", description: "Natural granite countertops" },
    { category: "kitchen_countertops", name: "Marble Countertops", range: "$60-100/sq ft", description: "Natural marble countertops" },
    { category: "vanity_countertops", name: "Vanity Tops - Quartz", range: "$300-800", description: "Bathroom vanity quartz tops" },
    { category: "vanity_countertops", name: "Vanity Tops - Granite", range: "$250-600", description: "Bathroom vanity granite tops" },
    { category: "undermount_sinks", name: "Undermount Kitchen Sink", range: "$200-800", description: "Stainless steel undermount sink" },
    { category: "undermount_sinks", name: "Undermount Vanity Bowl", range: "$100-400", description: "Porcelain undermount vanity sink" }
  ],
  appliances: [
    { category: "appliance_packages", name: "Basic Appliance Package", range: "$2,500-4,000", description: "Standard kitchen appliance set" },
    { category: "appliance_packages", name: "Premium Appliance Package", range: "$5,000-10,000", description: "High-end appliance package" },
    { category: "appliance_detailed", name: "Refrigerator", range: "$800-3,000", description: "Standard to premium refrigerator" },
    { category: "appliance_detailed", name: "Range/Cooktop", range: "$500-2,500", description: "Electric or gas range" },
    { category: "appliance_detailed", name: "Dishwasher", range: "$400-1,200", description: "Built-in dishwasher" },
    { category: "appliance_detailed", name: "Microwave", range: "$200-800", description: "Over-range or countertop microwave" },
    { category: "miscellaneous", name: "Range Hood", range: "$200-1,000", description: "Kitchen ventilation hood" },
    { category: "miscellaneous", name: "Garbage Disposal", range: "$150-400", description: "Kitchen sink garbage disposal" }
  ],
  interior_doors: [
    { category: "door_items", name: "Interior Door - Hollow Core", range: "$100-250/door", description: "Basic hollow core interior door" },
    { category: "door_items", name: "Interior Door - Solid Core", range: "$150-400/door", description: "Solid core interior door" },
    { category: "door_items", name: "Interior Door - Solid Wood", range: "$300-800/door", description: "Solid wood interior door" },
    { category: "door_items", name: "Pocket Door Installation", range: "$400-800/door", description: "Sliding pocket door system" },
    { category: "door_items", name: "Door Hardware Set", range: "$50-200/door", description: "Lockset and hinge hardware" }
  ],
  interior_woodwork: [
    { category: "wall_trim", name: "Baseboard Trim", range: "$2-8/linear ft", description: "Interior baseboard installation" },
    { category: "wall_trim", name: "Crown Molding", range: "$5-15/linear ft", description: "Decorative crown molding" },
    { category: "wall_trim", name: "Chair Rail", range: "$3-10/linear ft", description: "Mid-wall decorative molding" },
    { category: "woodwork_items", name: "Built-in Shelving", range: "$200-600/linear ft", description: "Custom built-in shelves" },
    { category: "woodwork_items", name: "Wainscoting", range: "$10-25/sq ft", description: "Decorative wall paneling" },
    { category: "railing_items", name: "Stair Railing", range: "$100-300/linear ft", description: "Interior stair railing system" },
    { category: "shelving_items", name: "Floating Shelves", range: "$50-200/shelf", description: "Wall-mounted floating shelves" }
  ],
  interior_painting: [
    { category: "interior_painting_quick", name: "Interior Paint - Walls Only", range: "$1.50-3/sq ft", description: "Wall painting with primer" },
    { category: "interior_painting_quick", name: "Interior Paint - Walls & Ceiling", range: "$2-4/sq ft", description: "Complete room painting" },
    { category: "interior_painting_detailed", name: "Trim Painting", range: "$1-3/linear ft", description: "Detailed trim and molding painting" },
    { category: "interior_painting_detailed", name: "Cabinet Painting", range: "$3-8/sq ft", description: "Kitchen cabinet refinishing" },
    { category: "interior_painting_detailed", name: "Specialty Finishes", range: "$4-12/sq ft", description: "Texture or decorative painting" }
  ],
  carpet_vinyl: [
    { category: "carpeting", name: "Carpet - Basic", range: "$2-4/sq ft", description: "Standard carpet installation" },
    { category: "carpeting", name: "Carpet - Premium", range: "$4-8/sq ft", description: "High-quality carpet with padding" },
    { category: "sheet_vinyl", name: "Sheet Vinyl Flooring", range: "$2-6/sq ft", description: "Continuous sheet vinyl installation" },
    { category: "vinyl_tile", name: "Luxury Vinyl Plank", range: "$3-8/sq ft", description: "Premium vinyl plank flooring" },
    { category: "vinyl_tile", name: "Vinyl Tile", range: "$1.50-4/sq ft", description: "Standard vinyl tile installation" }
  ],
  tiling: [
    { category: "floor_tile", name: "Ceramic Floor Tile", range: "$5-10/sq ft", description: "Standard ceramic floor tile" },
    { category: "floor_tile", name: "Porcelain Floor Tile", range: "$8-15/sq ft", description: "Porcelain floor tile installation" },
    { category: "floor_tile", name: "Natural Stone Tile", range: "$10-25/sq ft", description: "Marble, travertine, or granite tile" },
    { category: "shower_tile", name: "Shower Wall Tile", range: "$8-20/sq ft", description: "Bathroom shower tile installation" },
    { category: "shower_tile", name: "Shower Floor Tile", range: "$10-25/sq ft", description: "Slip-resistant shower floor tile" },
    { category: "miscellaneous_tile", name: "Backsplash Tile", range: "$10-30/sq ft", description: "Kitchen or bathroom backsplash" },
    { category: "miscellaneous_tile", name: "Tile Trim/Edging", range: "$5-15/linear ft", description: "Decorative tile trim pieces" }
  ],
  hardwood_flooring: [
    { category: "laminate_flooring", name: "Laminate Flooring", range: "$3-8/sq ft", description: "High-quality laminate flooring" },
    { category: "hardwood_flooring", name: "Hardwood - Engineered", range: "$6-12/sq ft", description: "Engineered hardwood installation" },
    { category: "hardwood_flooring", name: "Hardwood - Solid", range: "$8-15/sq ft", description: "Solid hardwood flooring" },
    { category: "hardwood_refinishing", name: "Hardwood Refinishing", range: "$3-5/sq ft", description: "Sand and refinish existing floors" },
    { category: "miscellaneous", name: "Floor Transitions", range: "$10-25/linear ft", description: "Transition strips between flooring" },
    { category: "miscellaneous", name: "Baseboards & Quarter Round", range: "$2-6/linear ft", description: "Floor trim installation" }
  ],
  basement: [
    { category: "basement_items", name: "Basement Waterproofing", range: "$3,000-8,000", description: "Interior basement waterproofing system" },
    { category: "basement_items", name: "Basement Finishing", range: "$20-50/sq ft", description: "Complete basement finishing" },
    { category: "basement_items", name: "Egress Window Installation", range: "$2,500-5,000/window", description: "Emergency egress window" },
    { category: "basement_items", name: "Sump Pump Installation", range: "$500-1,500", description: "Basement sump pump system" },
    { category: "basement_items", name: "French Drain System", range: "$20-30/linear ft", description: "Interior perimeter drainage" }
  ],
  laundry: [
    { category: "laundry_items", name: "Laundry Room Setup", range: "$1,000-3,000", description: "Complete laundry room installation" },
    { category: "laundry_items", name: "Washer/Dryer Hookups", range: "$300-800", description: "Plumbing and electrical connections" },
    { category: "laundry_items", name: "Laundry Sink Installation", range: "$200-600", description: "Utility sink with faucet" },
    { category: "laundry_items", name: "Laundry Cabinets", range: "$500-2,000", description: "Storage cabinets above washer/dryer" }
  ],
  foundations: [
    { category: "foundation_assemblies", name: "Foundation Repair", range: "$5,000-15,000", description: "Structural foundation repair" },
    { category: "foundation_assemblies", name: "New Foundation", range: "$15,000-30,000", description: "Complete foundation installation" },
    { category: "excavation_detailed", name: "Excavation Work", range: "$3-8/cubic yard", description: "Site excavation and grading" },
    { category: "foundation_detailed", name: "Concrete Footings", range: "$8-15/linear ft", description: "Foundation footing installation" },
    { category: "foundation_detailed", name: "Foundation Walls", range: "$15-25/sq ft", description: "Poured concrete foundation walls" },
    { category: "structural_repairs", name: "Beam Replacement", range: "$1,500-4,000/beam", description: "Structural support beam replacement" },
    { category: "structural_repairs", name: "Floor Joist Repair", range: "$200-500/joist", description: "Floor joist replacement or reinforcement" }
  ],
  misc_interior: [
    { category: "miscellaneous", name: "Interior Cleanup", range: "$500-2,000", description: "Construction cleanup and preparation" },
    { category: "miscellaneous", name: "Interior Demolition", range: "$2-8/sq ft", description: "Selective interior demolition" },
    { category: "miscellaneous", name: "Dumpster Rental", range: "$300-600/week", description: "Construction debris disposal" },
    { category: "miscellaneous", name: "Permits & Inspections", range: "$200-1,000", description: "Building permits and inspection fees" }
  ],
  remediation: [
    { category: "remediation_abatement", name: "Asbestos Abatement", range: "$15-25/sq ft", description: "Professional asbestos removal" },
    { category: "remediation_abatement", name: "Lead Paint Removal", range: "$8-15/sq ft", description: "Safe lead paint abatement" },
    { category: "remediation_abatement", name: "Mold Remediation", range: "$10-20/sq ft", description: "Mold removal and prevention" },
    { category: "miscellaneous", name: "Air Quality Testing", range: "$300-800", description: "Pre and post remediation testing" },
    { category: "miscellaneous", name: "HVAC Duct Cleaning", range: "$300-1,000", description: "Complete ductwork sanitization" }
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