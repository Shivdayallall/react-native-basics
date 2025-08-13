// React hook for state management
import { useState } from 'react';

// React Native UI components & styling
import { StyleSheet, View, FlatList, Button } from 'react-native';

// For controlling the appearance of the device's status bar
import { StatusBar } from 'expo-status-bar';

// Custom components for the app
import GoalItem from './components/GoalItem'; // Displays a single goal item
import GoalInput from './components/GoalInput'; // Handles input + modal for adding a goal

export default function App() {
  // State to hold all goals (array of objects with text & id)
  const [courseGoals, setCourseGoals] = useState([]);

  // State to control whether the "Add Goal" modal is visible
  const [modalIsVisiable, setModalIsVisiable] = useState(false);

  // Opens the "Add Goal" modal
  const startTheAddGoalHandler = () => {
    setModalIsVisiable(true);
  };

  // Closes the "Add Goal" modal
  const endTheAddGoalHandler = () => {
    setModalIsVisiable(false);
  };

  // Adds a new goal to the courseGoals state
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoal) => [
      ...currentCourseGoal, // keep existing goals
      { text: enteredGoalText, id: Math.random().toString() }, // add new goal with unique id
    ]);
    setModalIsVisiable(false); // close modal after adding
  };

  // Deletes a goal by filtering it out from the state
  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      {/* Light style status bar for better contrast with dark background */}
      <StatusBar style='light' />

      <View style={styles.appContainer}>
        {/* Button to open modal for adding a new goal */}
        <Button
          title='Add New Goal'
          color='#cbb3ebff'
          onPress={startTheAddGoalHandler}
        />

        {/* Input modal for adding goals */}
        <GoalInput
          addGoal={addGoalHandler} // passes function to add new goal
          onCancel={endTheAddGoalHandler} // passes function to close modal
          visible={modalIsVisiable} // controls modal visibility
        />

        {/* List of all goals */}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals} // array of goal objects
            keyExtractor={(item, index) => item.id} // unique key for each goal
            renderItem={(dataItem) => {
              return (
                <GoalItem
                  text={dataItem.item.text} // goal text
                  id={dataItem.item.id} // goal id
                  onDeleteItem={deleteGoalHandler} // function to delete goal
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Outer container for the entire app
  appContainer: {
    flex: 1, // take full screen height
    paddingTop: 50, // push content below status bar
    paddingHorizontal: 16, // side padding
    backgroundColor: '#1e085a', // dark purple background
  },

  // Container for the goals list
  goalsContainer: {
    flex: 5, // take most of the screen space after input
  },
});
