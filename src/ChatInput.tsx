import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ImagePreview from './ImagePreview';
import FilePreview from './FilePreview';
import { ChatInputProps } from './types';
import { defaultStyles } from './styles';
import UploadModal from './UploadModal';

interface Message {
  id: string;
  text?: string;
  file?: {
    uri: string;
    name: string;
    type: string;
  };
}

const ChatInput: React.FC<ChatInputProps> = ({
  showUploadOption = true,
  defaultStyleValues,
  images: customImages = {},
  sendText = 'Send',
  placeHolderText = 'Type your message',
  onSend,
}) => {
  const [message, setMessage] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedMediaData, setSelectedMediaData] = useState<any[]>([]);
  const images = { ...customImages };


  const handleUploadPress = () => {
    setUploadModalVisible(true);
  };

  const handleOptionSelect = async (option: string) => {
    await onAttachmentSelect(option);
    setUploadModalVisible(false);
  };

  const handleRemoveMedia = (uriToRemove: string) => {
    setSelectedMediaData(prev =>
      prev.filter(media => media.uri !== uriToRemove)
    );
  };

  const sendMessage = () => {
    if (!message.trim() && selectedMediaData.length === 0) return;

    const newMessages: Message[] = [];

    if (message.trim()) {
      newMessages.push({
        id: String(Date.now()),
        text: message.trim(),
      });
    }

    selectedMediaData.forEach(media => {
      newMessages.push({
        id: String(Date.now() + Math.random()),
        file: {
          uri: media.uri,
          name: media.name || 'media',
          type: media.type || '',
        },
      });
    });

    if (onSend) {
      onSend(newMessages);
    }

    setMessage('');
    setSelectedMediaData([]);
  };

  const pickMediaFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled gallery selection');
        } else if (response.errorCode) {
          console.error(
            'Gallery picker error:',
            response.errorCode,
            response.errorMessage,
          );
        } else if (response.assets) {
          const filteredAssets = response.assets.filter(
            asset => asset.type !== 'image/gif',
          );

          if (filteredAssets.length === 0) {
            console.log('No valid files selected (GIFs are not allowed).');
            return;
          }

          const asset = filteredAssets[0];
          setSelectedMediaData(prev => [...prev, asset]);
        }
      },
    );
  };

  const pickDocument = async () => {
    console.log('Document picker opened');
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const mediaUri = decodeURIComponent(res[0].uri);

      setSelectedMediaData(prev => [
        ...prev,
        {
          uri: mediaUri,
          name: res[0].name,
          type: res[0].type,
        },
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled document picker');
      } else {
        console.log('Document picker error:', err);
        console.error('Document picker error:', err);
      }
    }
  };

  const onAttachmentSelect = async (option: string) => {
    switch (option) {
      case 'gallery':
        return pickMediaFromGallery();
      case 'document':
        return pickDocument();
      default:
        return;
    }
  };

  return (
    <View style={[defaultStyles.container, defaultStyleValues?.containerStyle]}>
      <View style={[defaultStyles.inputRowWrapper]}>
        {selectedMediaData.length > 0 && (
          <View style={[defaultStyles.previewContainer, defaultStyleValues?.previewContainerStyle]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={[
                defaultStyles.previewContainer,
                defaultStyleValues?.previewContainerStyle,
              ]}>
              {selectedMediaData.map((media, index) => (
                <View
                  key={index}
                  style={[defaultStyles.previewItem, defaultStyleValues?.previewContainerStyle]}>
                  {media.type?.startsWith('image') ? (
                    <ImagePreview
                      file={{
                        url: media.uri,
                        type: media.type,
                        name: media.name,
                      }}
                      id={`media-${index}`}
                      onRemove={handleRemoveMedia}
                      style={defaultStyleValues?.previewImageStyle}
                      closeIcon={images?.closeIcon}
                    />
                  ) : (
                    <FilePreview
                      file={{
                        url: media.uri,
                        type: media.type,
                        name: media.name,
                      }}
                      id={`media-${index}`}
                      onRemove={handleRemoveMedia}
                      style={defaultStyleValues?.previewFileStyle}
                      closeIcon={images?.closeIcon}
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={[defaultStyles.inputRow, defaultStyleValues?.containerStyle]}>
          {showUploadOption && (
            <TouchableOpacity
              onPress={handleUploadPress}
              style={[defaultStyles.uploadButton, defaultStyleValues?.uploadButtonStyle]}>
              <Image
                source={images.attachIcon}
                style={[
                  defaultStyleValues?.uploadIconStyle, defaultStyles.uploadIconStyle
                ]}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={[defaultStyles.input, defaultStyleValues?.inputStyle]}
            value={message}
            onChangeText={setMessage}
            placeholder={placeHolderText}
            multiline={true}
          />
          <Button
            title={sendText}
            onPress={sendMessage}
            color={defaultStyleValues?.buttonStyle?.backgroundColor || 'black'}
          />
        </View>
      </View>

      <UploadModal
        visible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        onOptionSelect={handleOptionSelect}
        modalStyle={defaultStyleValues?.modalStyle}
        modalOptionStyle={defaultStyleValues?.modalOptionStyle}
        cancelOptionStyle={defaultStyleValues?.cancelOptionStyle}
      />
    </View>
  );

};

export default ChatInput;
