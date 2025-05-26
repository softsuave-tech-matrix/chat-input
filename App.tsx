import React from 'react';
import {DimensionValue, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { ChatInput } from 'react-native-chat-input';
import { defaultStyles } from './src/styles';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    position: 'absolute' as const,
    bottom: 10,
    width: '100%' as DimensionValue,
  };

  const safePadding = '5%';
  const sendText = 'Send';
  const placeHolderText = 'Type your message';
  const handleSend = (messages: any[]) => {
    console.log('Messages sent:', messages);
    // Handle the sent messages here
  };
  const images = {
    attachIcon: require('./src/images/attach_file.png'),
    closeIcon: require('./src/images/Close.png'),
  };
  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          paddingHorizontal: safePadding,
        }}>
        <ChatInput showUploadOption={true} onSend={handleSend} sendText={sendText} placeHolderText={placeHolderText} images={images} defaultStyleValues={defaultStyles}/>
      </View>
    </View>
  );
}

export default App;
