import Support from "./support.model.js";

export const createTicket = async (data) => {
  return await Support.create(data);
};

export const getAllTickets = async () => {
  return await Support.find().sort({ createdAt: -1 });
};
