import costItemsData from "@/services/mockData/costItems.json";

let costItems = [...costItemsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const costItemService = {
  async getAll() {
    await delay(200);
    return [...costItems];
  },

  async getByRoomId(roomId) {
    await delay(150);
    return costItems.filter(item => item.roomId === roomId.toString()).map(item => ({ ...item }));
  },

  async getById(id) {
    await delay(100);
    const item = costItems.find(item => item.Id === parseInt(id));
    return item ? { ...item } : null;
  },

  async create(itemData) {
    await delay(250);
    const newId = Math.max(...costItems.map(item => item.Id), 0) + 1;
    const newItem = {
      Id: newId,
      roomId: itemData.roomId.toString(),
      category: itemData.category || "other",
      description: itemData.description || "",
      cost: parseFloat(itemData.cost) || 0,
      ...itemData
    };
    costItems.push(newItem);
    return { ...newItem };
  },

  async update(id, itemData) {
    await delay(200);
    const index = costItems.findIndex(item => item.Id === parseInt(id));
    if (index === -1) return null;
    
    costItems[index] = {
      ...costItems[index],
      ...itemData,
      cost: parseFloat(itemData.cost) || costItems[index].cost
    };
    return { ...costItems[index] };
  },

  async delete(id) {
    await delay(150);
    const index = costItems.findIndex(item => item.Id === parseInt(id));
    if (index === -1) return false;
    
    costItems.splice(index, 1);
    return true;
  }
};