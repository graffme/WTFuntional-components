/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const FunctionalComponent = () => {
  return (
    <View style={{ backgroundColor: "yellow", padding: 20 }}>
    <Text>Functional Child component</Text>
    <Text>{Math.random()}</Text>
    <FunctionalComponentKid />
    </View>
  )
}

const FunctionalComponentKid = () => {
  return (
    <View style={{ backgroundColor: "red", padding: 20, marginTop: 20 }}>
      <Text>Functional Child of child component</Text>
      <Text>{Math.random()}</Text>
    </View>
  )
}

const MemoFunctionalComponent = React.memo(() => {
  return (
    <View style={{ backgroundColor: "green", padding: 20, marginTop: 20 }}>
      <Text>Memo Functional Component</Text>
      <Text>{Math.random()}</Text>
    </View>
  )
});

const FunctionalComponentWithMethod = () => {
  return (
    <View style={{ backgroundColor: "yellow", padding: 20 }}>
    <Text>Functional with method</Text>
    <Text>{Math.random()}</Text>
    </View>
  )
}

const MemoFunctionalComponentWithMethod = React.memo(() => {
  return (
    <View style={{ backgroundColor: "green", padding: 20, marginTop: 20 }}>
      <Text>Memo Functional Component with Method</Text>
      <Text>{Math.random()}</Text>
    </View>
  )
});

const TouchableMemo = React.memo(({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: "green", padding: 20, marginTop: 20 }}>
      <Text>Touchable memo</Text>
      <Text>{Math.random()}</Text>
    </TouchableOpacity>
  )
});

const App = () => {
  const [count, setCount] = React.useState(0);

  const mockedIsTablet = () => false;

  const mockedIsTabletHooked = React.useMemo(() => false, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count => count + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const someMethod = () => {
    return null;
  };

  const someMethodWithHook = React.useCallback(() => {
    return null;
  }, []);

  const someDependentMethodWithHook = React.useCallback(() => {
    return null;
  }, [count]);

  const someMethodWithVariable = React.useCallback(() => {
    console.log(count) // check in console if the right count is returned
    return null;
  }, []);

  const someMethodWithStateMutation = React.useCallback(() => {
    setCount(count + 100) // will change???
    return null;
  }, []);

  const someMethodWithStateMutationRight = React.useCallback(() => {
    setCount((count) => count + 100) // this works
    return null;
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{ marginBottom: 30 }}>Count: {count}</Text>
        {/* Test components with no props, should not re-render huh? :D */}
        <View>
          <Text>Test static components (no props)</Text>
          <FunctionalComponent />
          <MemoFunctionalComponent />
        </View>

        {/* test components that accepts a function as a prop, that's a trap! */}
        <View style={{ marginTop: 30 }}>
          <Text>Test components with method as a prop</Text>
          {/* Of course this one will rerender every time */}
          <FunctionalComponentWithMethod onPress={someMethod} />
          {/* This one re-renders every time because the function is created at this line on each re-render of the parent  */}
          <MemoFunctionalComponentWithMethod onPress={() => null} />
          {/* This one re-render because similar to above, the function is recreated on each re-render of the parent */}
          <MemoFunctionalComponentWithMethod onPress={someMethod} />
          {/* This one rerender because despite the useCallback it depends on state that re-renders a lot */}
          <MemoFunctionalComponentWithMethod onPress={someDependentMethodWithHook} />
          {/* This one re-renders also because the sth prop is a function that returns a value so behave as examples above */}
          <MemoFunctionalComponentWithMethod onPress={someMethodWithHook} sth={mockedIsTablet} />
          {/* Safe here - no re-renders */}
          <MemoFunctionalComponentWithMethod onPress={someMethodWithHook} />
          {/* Safe as well, sth that is using function is memorized with useMemo */}
          <MemoFunctionalComponentWithMethod onPress={someMethodWithHook} sth={mockedIsTabletHooked} />
        </View>

        {/* test components that carry a function with a scoped variable */}
        <View style={{ marginTop: 30 }}>
          <Text>Variables in functions</Text>
          <Text>Count: {count}</Text>
          {/* This one will return wrong "count" */}
          <TouchableMemo onPress={someMethodWithVariable} />
          {/* Same as above - this will mutate state with wrong value */}
          <TouchableMemo onPress={someMethodWithStateMutation} />
          {/* All good */}
          <TouchableMemo onPress={someMethodWithStateMutationRight} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
