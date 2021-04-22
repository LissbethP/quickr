import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Caption, IconButton, TextInput } from "react-native-paper";
import { format } from "date-fns";
import theme from "../../theme";
import { Context as NoteContext } from "../../providers/NoteContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Picker } from "@react-native-picker/picker";

const CreateNote = ({route, navigation }) => {
  const {category2} = route.params;

  const { createNote } = useContext(NoteContext);
  const { state } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(category2);


  const handleSaveNote = () => {
    if (!title) {
      setTitle("New note");
      createNote("New note",category, content, timestamp, state.user.id);
    } else if(!category){
      setCategory("Personal");
      createNote(title,"Personal" , content, timestamp, state.user.id)
    }
    else createNote(title, category, content, timestamp, state.user.id);
    navigation.navigate("Home",{category:category});
  };

  console.log(category2);
  return (
    <View style={styles.container}>
      <View style={styles.iconBar}>
        <IconButton
          icon="close-circle-outline"
          color={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconButton
          icon="check-circle-outline"
          color={theme.colors.primary}
          onPress={handleSaveNote}
        />
      </View>
      <Picker
        selectedValue={category}
        onChangeText={(itemValue) =>{setCategory(itemValue);}}
      >
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Ideas" value="Ideas" />
        <Picker.Item label="List" value="List" />
      </Picker>
      <TextInput
        mode="flat"
        placeholder="Title"
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
      />
      <Caption>{`${format(timestamp, "eee H:m")}, | ${
        content.length
      } characters`}</Caption>
      <TextInput
        multiline
        style={styles.contentInput}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: theme.colors.backgroundWhite,
  },
  contentInput: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWhite,
    borderBottomWidth: 0,
  },
  iconBar: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CreateNote;