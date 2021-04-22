import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const noteReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "createNote":
      return { ...state, notes: [...notes, action.payload] };
    case "getNotes":
      return { ...state, notes: action.payload };
    case "setCurrentNote":
      return { ...state, currentNote: action.payload };
    case "updateNote":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.note.id) {
            return {
              ...note,
              title: action.payload.note.title,
              content: action.payload.note.content,
              timestamp: action.payload.note.timestamp,
              category: action.payload.note.category,
            };
          }

          return note;
        }),
      };
    default:
      return state;
  }
};

// Referencia al nombre de la colección de notas
const notesRef = firebase.firestore().collection("notes");

// Almacena una nueva nota para el usuario actual
const createNote = (dispatch) => (title, content, timestamp, category, author) => {
  const data = {
    title,
    content,
    timestamp,
    category,
    userId: author,
  };

  notesRef
    .add(data)
    .then((_doc) => {
      dispatch({ type: "errorMessage", payload: "Note added!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Obtener las notas del usuario
const getNotes = (dispatch) => (userId) => {
  notesRef
    .where("userId", "==", userId)
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (querySnapshot) => {
        const notes = [];

        querySnapshot.forEach((doc) => {
          const note = doc.data();
          note.id = doc.id;
          notes.push(note);
        });

        dispatch({ type: "getNotes", payload: notes });
        dispatch({ type: "errorMessage", payload: "Your note is save!" });
      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};

// Obtener las notas del usuario por categoria
const getNotesByCategory = (dispatch) => (userId,category) => {
  notesRef
    .where("userId", "==", userId)
    .where("category", "==", category)
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (querySnapshot) => {
        const notes = [];

        querySnapshot.forEach((doc) => {
          const note = doc.data();
          note.id = doc.id;
          notes.push(note);
        });

        dispatch({ type: "getNotes", payload: notes });
        dispatch({ type: "errorMessage", payload: "Your note is save!" });
      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};

// Limpiar el mensaje del contexto
const clearMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};

// Establece la nota actual seleccionada
const setCurrentNote = (dispatch) => (note) => {
  dispatch({ type: "setCurrentNote", payload: note });
};

// Actualizar una nota existente
const updateNote = (dispatch) => (id, title, content, timestamp, category) => {
  notesRef
    .doc(id)
    .update({ title, content, timestamp })
    .then(() => {
      dispatch({
        type: "updateNote",
        payload: { note: { id, title, content, timestamp,category } },
      });
      dispatch({ type: "errorMessage", payload: "Note updated!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  noteReducer,
  {
    createNote,
    getNotes,
    setCurrentNote,
    updateNote,
    clearMessage,
  },
  {
    notes: [],
    errorMessage: "",
    categories: ["Personal","Work","Ideas","List"],
    currentNote: { id: "", title: "", content: "", timestamp: "", category:"" },
  }
);
