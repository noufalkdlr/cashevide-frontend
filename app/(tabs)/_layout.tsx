import { Tabs, Link, useSegments, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, useWindowDimensions, TouchableOpacity, Animated } from 'react-native';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useRef, useEffect } from 'react'; // പുതിയതായി ചേർത്തത്

function CustomTabBar({ state, descriptors, navigation, isDesktop }: any) {
  const { width } = useWindowDimensions();

  const TAB_BAR_PADDING = 32;
  const tabWidth = (width - TAB_BAR_PADDING) / state.routes.length;

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      bounciness: 6,
      speed: 12
    }).start();
  }, [state.index, width]);

  if (isDesktop) return null;

  return (
    <View className="bg-white border-t border-slate-200 pt-3 pb-6 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <View className="flex-row relative">

        <Animated.View
          style={{
            position: 'absolute',
            width: tabWidth,
            height: '100%',
            transform: [{ translateX: slideAnim }],
            paddingHorizontal: 4,
          }}
        >
          <View className="flex-1 bg-blue-100 rounded-2xl" />
        </Animated.View>

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

          const icons: any = {
            reviews: 'star',
            invoices: 'document-text',
            profile: 'person'
          };
          const iconName = icons[route.name];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center py-2 px-4 z-10"
            >
              <Ionicons
                name={iconName}
                size={22}
                color={isFocused ? '#2563eb' : '#64748b'}
              />
              <Text
                className={`text-[11px] font-bold mt-1 ${isFocused ? 'text-blue-600' : 'text-slate-500'
                  }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const segments = useSegments();
  const { logout } = useAuthStore();

  const isActive = (routeName: string) => (segments as string[]).includes(routeName);

  const Sidebar = () => (
    <View className="w-64 bg-white border-r border-slate-200 h-full p-6">
      <Text className="text-2xl font-bold mb-8 text-blue-600">Cashevide</Text>
      <View className="space-y-2">
        <Link href="/(tabs)/reviews" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('reviews') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="star" size={20} color={isActive('reviews') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('reviews') ? 'text-blue-600' : 'text-slate-600'}`}>Reviews</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/invoices" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('invoices') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="document-text" size={20} color={isActive('invoices') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('invoices') ? 'text-blue-600' : 'text-slate-600'}`}>Invoices</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className={`p-4 rounded-xl flex-row items-center ${isActive('profile') ? 'bg-blue-100' : ''}`}>
            <Ionicons name="person" size={20} color={isActive('profile') ? '#2563eb' : '#64748b'} />
            <Text className={`ml-3 font-semibold ${isActive('profile') ? 'text-blue-600' : 'text-slate-600'}`}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="flex-1 justify-end">
        <TouchableOpacity onPress={logout} className="p-4 bg-red-50 rounded-xl flex-row justify-center items-center">
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 flex-row">
      {isDesktop && <Sidebar />}

      <View className="flex-1 bg-slate-50">
        <Tabs
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <CustomTabBar {...props} isDesktop={isDesktop} />}
        >
          <Tabs.Screen name="reviews" options={{ title: 'Reviews' }} />
          <Tabs.Screen name="invoices" options={{ title: 'Invoices' }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
      </View>
    </View>
  );
}
