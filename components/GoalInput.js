// Import core React Native components for UI and styling
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from 'react-native';

// React hook for state management
import { useState } from 'react';

const GoalInput = (props) => {
  // Local state to store the text entered by the user
  const [enteredGoalText, setEnteredGoalText] = useState('');

  // Updates local state whenever the user types in the TextInput
  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  // Called when "Add Goal" button is pressed
  // Sends the entered goal text to the parent (App.js) via props.addGoal
  // Then clears the TextInput for the next entry
  const addGoalHandler = () => {
    props.addGoal(enteredGoalText);
    setEnteredGoalText('');
  };

  return (
    // Modal is used to display this input form as a slide-up overlay
    // The `visible` prop controls whether the modal is open (from parent)
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        {/* Decorative image above the input field */}
        <Image
          source={require('..//assets/images/goal.png')}
          style={styles.image}
        />

        {/* Text field for entering a goal */}
        <TextInput
          style={styles.textInput}
          placeholder='your course goal'
          onChangeText={goalInputHandler} // updates state on every keystroke
          value={enteredGoalText} // controlled component value
        />

        {/* Button row for adding or canceling */}
        <View style={styles.buttonContainer}>
          {/* Add Goal button */}
          <View style={styles.button}>
            <Button
              title='Add Goal'
              onPress={addGoalHandler} // sends data to parent and closes modal
              color='#9d70daff'
            />
          </View>

          {/* Cancel button */}
          <View style={styles.button}>
            <Button
              title='Cancel'
              onPress={props.onCancel} // tells parent to hide the modal
              color='#f31282'
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

// Component-specific styles
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1, // fill modal screen
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
    padding: 16,
    backgroundColor: '#311b6b', // dark purple background
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%', // full width of container
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // place buttons side-by-side
    marginTop: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8, // space between buttons
  },
  image: {
    width: 100,
    height: 100,
    margin: 20, // space around image
  },
});
