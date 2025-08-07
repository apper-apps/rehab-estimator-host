import roomsData from "@/services/mockData/rooms.json";

let rooms = [...roomsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const roomService = {
  async getAll() {
    await delay(250);
    return [...rooms];
  },

  async getByPropertyId(propertyId) {
    await delay(200);
    return rooms.filter(r => r.propertyId === propertyId.toString()).map(r => ({ ...r }));
  },

  async getById(id) {
    await delay(150);
    const room = rooms.find(r => r.Id === parseInt(id));
    return room ? { ...room } : null;
  },

  async create(roomData) {
    await delay(300);
    const newId = Math.max(...rooms.map(r => r.Id), 0) + 1;
    const existingRoomsForProperty = rooms.filter(r => r.propertyId === roomData.propertyId);
    const nextOrder = Math.max(...existingRoomsForProperty.map(r => r.order || 0), 0) + 1;
    
    const newRoom = {
      Id: newId,
      propertyId: roomData.propertyId.toString(),
      type: roomData.type || "other",
      name: roomData.name || `Room ${newId}`,
      order: nextOrder,
      ...roomData
    };
    rooms.push(newRoom);
    return { ...newRoom };
  },

  async update(id, roomData) {
    await delay(250);
    const index = rooms.findIndex(r => r.Id === parseInt(id));
    if (index === -1) return null;
    
    rooms[index] = {
      ...rooms[index],
      ...roomData
    };
    return { ...rooms[index] };
  },

  async delete(id) {
    await delay(200);
    const index = rooms.findIndex(r => r.Id === parseInt(id));
    if (index === -1) return false;
    
    rooms.splice(index, 1);
    return true;
  }
};