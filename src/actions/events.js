export const addEvent = (payload) => ({
  type: 'ADD_EVENT',
  payload,
})

export const removeEvent = (id) => ({
  type: 'REMOVE_EVENT',
  id,
})

export const removeEvents = () => ({
  type: 'REMOVE_EVENTS',
})
