import { View, Text } from 'react-native';

export default function InvoiceHistory() {
  return (
    <View className="flex-1 px-6 bg-slate-50 mt-4">
      <View className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <Text className="text-lg font-bold text-slate-800">📜 Invoice History</Text>
        <Text className="text-slate-500 mt-2">ഇവിടെ നിങ്ങളുടെ പഴയ ഇൻവോയ്‌സുകളുടെ ലിസ്റ്റ് കാണിക്കാം.</Text>
      </View>
    </View>
  );
}
