
import { View, Text } from 'react-native';

export default function DraftsPage() {
  return (
    <View className="flex-1 px-6 bg-slate-50 mt-4">
      <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <Text className="text-lg font-bold text-slate-800">👥 My Clients</Text>
        <Text className="text-slate-500 mt-2">നിങ്ങൾ ഇൻവോയ്‌സ് അയച്ച ക്ലയന്റുകളുടെ വിവരങ്ങൾ ഇവിടെ വരും.</Text>
      </View>
    </View>
  );
}
