const initialState = [];

export const events = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      const { startHour, startMin } = action.payload;
      const start = startHour * 60 - 480 + Number(startMin);
      delete action.payload.startHour;
      delete action.payload.startMin;
      return state.concat({ ...action.payload, start }).sort((event1, event2) => event1.start > event2.start);
    case 'SET_EVENTS':
      const { events } = action;
      return events;
    case 'REMOVE_EVENT':
      const { id } = action;
      return state.filter((item, i) => id !== i);
    case 'REMOVE_EVENTS':
      return [];
    default:
      return state;
  }
}
