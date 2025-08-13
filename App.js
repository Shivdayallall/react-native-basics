import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisiable, setModalIsVisiable] = useState(false);

  const startTheAddGoalHandler = () => {
    setModalIsVisiable(true);
  };

  const endTheAddGoalHandler = () => {
    setModalIsVisiable(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModalIsVisiable(false);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <Button
        title='Add New Goal'
        color='#5e0acc'
        onPress={startTheAddGoalHandler}
      />
      <GoalInput
        addGoal={addGoalHandler}
        onCancel={endTheAddGoalHandler}
        visible={modalIsVisiable}
      />

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
