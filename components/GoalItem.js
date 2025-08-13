// Import React Native UI components
import { Pressable, StyleSheet, Text, View } from 'react-native';

const GoalItem = (props) => {
  return (
    // Container for a single goal
    <View style={styles.goalItem}>
      {/* Pressable makes the text respond to taps (like a button) */}
      <Pressable
        // When pressed, call the parent's onDeleteItem function with this goal's id
        onPress={props.onDeleteItem.bind(this, props.id)}
        // Apply a style when the item is actively being pressed
        // The `pressed` parameter is a boolean provided by Pressable
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        {/* Display the goal text passed down from the parent */}
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

// Styles for this component
const styles = StyleSheet.create({
  goalItem: {
    margin: 8, // space around each goal
    padding: 8, // space inside the goal box
    borderRadius: 6, // rounded corners
    backgroundColor: '#5e0acc', // purple background
  },
  goalText: {
    color: 'white', // white text for better contrast
  },
  pressedItem: {
    opacity: 0.5, // make the item look faded when pressed
  },
});
