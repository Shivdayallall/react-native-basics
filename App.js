import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput addGoal={addGoalHandler} />

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={(dataItem) => {
            return (
              <GoalItem
                text={dataItem.item.text}
                id={dataItem.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
