import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

type TabBarProps = {
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const icons: {
    [key in "index" | "explore" | "notifications" | "profile"]: (
      props: any
    ) => JSX.Element;
  } = {
    index: (props) => (
      <AntDesign name="enviromento" size={26} color={"#222"} {...props} />
    ),
    explore: (props) => (
      <AntDesign name="filetext1" size={26} color={"#222"} {...props} />
    ),
    notifications: (props) => (
      <AntDesign name="bells" size={26} color={"#222"} {...props} />
    ),
    profile: (props) => (
      <AntDesign name="user" size={26} color={"#222"} {...props} />
    ),
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[
              route.name as "index" | "explore" | "notifications" | "profile"
            ]({
              style: {
                color: isFocused ? "#673ab7" : "#222",
              },
            })}

            {/* <Text
              style={{ marginTop: 4, color: isFocused ? "#673ab7" : "#222" }}
            >
              {typeof label === "string" && label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
