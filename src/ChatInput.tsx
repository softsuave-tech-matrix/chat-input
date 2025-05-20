import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

type ChatInputComponentProps = {
  showUploadOption: boolean;
};

interface Message {
  id: string;
  text?: string;
  file?: {
    uri: string;
    name: string;
    type: string;
  };
}

type FileT = {
  url: string;
  type: string;
  name: string;
};

type ImagePreviewProps = {
  file: FileT;
  id: string;
  onRemove: (uriToRemove: string) => void;
};

type FilePreviewProps = {
  file: FileT;
  id: string;
  onRemove: (uriToRemove: string) => void;
};


const FilePreview = ({ file, onRemove }:FilePreviewProps) => {
  return (
    <View
      style={styles.filePreview}
    >
      <View
        style={styles.filePreviewContainer}
      >
        <Text
          style={styles.fileTextStyle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {file.name || 'Document'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(file.url)}
        style={styles.previewCloseContainer}
      >
        <Image
          source={require('./images/Close.png')}
          style={styles.closeIconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const ImagePreview: React.FC<ImagePreviewProps> = ({file, onRemove}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View
        style={styles.previewImage}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.imagePreviewContainer}>
          <Image
            source={{uri: file.url}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onRemove(file.url)}
          style={styles.previewCloseContainer}>
          <Image
            source={require('./images/Close.png')}
            style={styles.closeIconStyle}
          />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeArea}
            onPress={() => setModalVisible(false)}>
            <Image
              source={require('./images/Close.png')}
              style={{
                width: 26,
                height: 26,
                tintColor: 'white',
                cursor: 'pointer',
              }}
            />
          </TouchableOpacity>
          <Image
            source={{uri: file.url}}
            resizeMode="contain"
            style={styles.fullImage}
          />
        </View>
      </Modal>
    </>
  );
};


const ChatInput : React.FC<ChatInputComponentProps> = ({ showUploadOption }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{id: '1', text: 'Hi'}]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedMediaData, setSelectedMediaData] = useState<any[]>([]);

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
        id: String(messages.length + 1),
        text: message.trim(),
      });
    }

    selectedMediaData.forEach((media, _i) => {
      newMessages.push({
        id: String(messages.length + newMessages.length + 1),
        file: {
          uri: media.uri,
          name: media.name || 'media',
          type: media.type || '',
        },
      });
    });

    setMessages(prev => [...newMessages.reverse(), ...prev]);
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
    <View style={styles.container}>
      <View style={styles.inputRowWrapper}>
        {selectedMediaData.length > 0 && (
          <View style={styles.previewContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.previewContainer}>
              {selectedMediaData.map((media, index) => (
                <View key={index} style={styles.previewItem}>
                  {media.type.startsWith('image') ? (
                    <ImagePreview
                      file={{
                        url: media.uri,
                        type: media.type,
                        name: media.name,
                      }}
                      id={`media-${index}`}
                      onRemove={handleRemoveMedia}
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
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.inputRow}>
          {showUploadOption && (
            <TouchableOpacity
              onPress={handleUploadPress}
              style={styles.uploadButton}>
              <Image
                source={require('./images/attach_file.png')}
                style={{width: 24, height: 24, tintColor: 'black'}}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            multiline={true}
          />
          <Button title="Send" onPress={sendMessage} color={'black'} />
        </View>
      </View>

      <Modal visible={uploadModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setUploadModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => handleOptionSelect('gallery')}>
                  <Text style={styles.modalOption}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleOptionSelect('document')}>
                  <Text style={styles.modalOption}>Document</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
                  <Text style={[styles.modalOption, styles.cancelOption]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  closeIconStyle: {
    width: 12,
    height: 12,
    tintColor: 'black',
  },

  inputRowWrapper: {
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },

  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 5,
    overflow: 'scroll',
    paddingTop: 15,
  },

  uploadButton: {
    padding: 5,
  },

  message: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
  },

  previewImage: {
    width: 45,
    height: 45,
    position: 'relative',
    marginRight: 8,
  },

  imagePreviewContainer : {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },

  imageStyle : {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },

  previewCloseContainer: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  fileTextStyle: {
    fontSize: 12,
    color: '#1f2937',
    maxWidth: 80,
  },

  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 5,
    overflow: 'scroll',
  },

  filePreviewContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  filePreview :{
   width: 100,
   height: 50,
   position: 'relative',
   marginRight: 8,
  },

  previewThumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },

  removePreview: {
    fontSize: 18,
    marginLeft: 10,
    color: 'red',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  modalOption: {
    padding: 10,
    fontSize: 16,
  },

  cancelOption: {
    color: 'red',
  },

  previewItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    position: 'relative',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeArea: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },

  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default ChatInput;
