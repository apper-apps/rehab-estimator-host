import propertiesData from "@/services/mockData/properties.json";

let properties = [...propertiesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...properties];
  },

  async getById(id) {
    await delay(200);
    const property = properties.find(p => p.Id === parseInt(id));
    return property ? { ...property } : null;
  },

  async create(propertyData) {
    await delay(400);
    const newId = Math.max(...properties.map(p => p.Id), 0) + 1;
    const newProperty = {
      Id: newId,
      address: propertyData.address || "",
      squareFootage: propertyData.squareFootage || 0,
      yearBuilt: propertyData.yearBuilt || new Date().getFullYear(),
      totalCost: 0,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      ...propertyData
    };
    properties.push(newProperty);
    return { ...newProperty };
  },

  async update(id, propertyData) {
    await delay(350);
    const index = properties.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return null;
    
    properties[index] = {
      ...properties[index],
      ...propertyData,
      lastModified: new Date().toISOString()
    };
    return { ...properties[index] };
  },

  async delete(id) {
    await delay(300);
    const index = properties.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return false;
    
    properties.splice(index, 1);
    return true;
  },

  async updateTotalCost(propertyId, totalCost) {
    await delay(200);
    const index = properties.findIndex(p => p.Id === parseInt(propertyId));
    if (index === -1) return null;
    
    properties[index] = {
      ...properties[index],
      totalCost: totalCost,
      lastModified: new Date().toISOString()
    };
    return { ...properties[index] };
  }
};