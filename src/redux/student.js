const initialState = {
    students: []
};

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STUDENT":
            let newStudents = state.students;
            newStudents.push(action.payload)
            return {...state, students: newStudents}
        
        case "DEL_STUDENT":
            const resStudent = state.students.filter(val=>{
                return val.id !== action.payload.id
            })

            return {...state, students: resStudent}
        case "UPDATE_STUDENT":
            const studentIndex = state.students.findIndex(val => {
                return val.id === action.payload.id
            })
            let newStudent = state.students;
            newStudent[studentIndex] = action.payload
            return {...state, students: newStudent}

        default:
            break;
    }
}

export default studentsReducer;