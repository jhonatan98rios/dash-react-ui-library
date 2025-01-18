export const initialState = {
    data: [],
    totalRows: 0,
};

export function csvReducer(state, action) {
    switch (action.type) {
        case "ADD_ROWS":
            return {
                data: [...state.data, ...action.payload],
                totalRows: state.data.length + action.payload.length,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}