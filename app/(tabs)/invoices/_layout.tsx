import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

function CustomTopTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="px-6 mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const label = options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              className={`px-5 py-2.5 mr-3 rounded-full transition-all ${isFocused ? 'bg-blue-100' : 'bg-slate-200'
                }`}
            >
              <Text
                className={`font-bold text-[14px] ${isFocused ? 'text-blue-600' : 'text-slate-500'
                  }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function InvoicesLayout() {
  return (
    <View className="flex-1 bg-slate-50 pt-6">
      <Text className="text-2xl font-bold text-slate-800 px-6 mb-4">📄 Invoices</Text>

      <MaterialTopTabs tabBar={(props) => <CustomTopTabBar {...props} />}>
        <MaterialTopTabs.Screen name="index" options={{ title: 'Invoice History' }} />
        <MaterialTopTabs.Screen name="clients" options={{ title: 'Clients' }} />
        <MaterialTopTabs.Screen name="catalogues" options={{ title: 'Catalogues' }} />
        <MaterialTopTabs.Screen name="drafts" options={{ title: 'Drafts' }} />
      </MaterialTopTabs>
    </View>
  );
}
