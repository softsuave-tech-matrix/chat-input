import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { ImagePreviewProps } from './types';
import { defaultStyles } from './styles';

const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onRemove,
  style,
  closeIconStyle,
  closeIcon
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={[defaultStyles.previewImage, style]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={defaultStyles.imagePreviewContainer}>
          <Image
            source={{ uri: file.url }}
            resizeMode="cover"
            style={defaultStyles.imageStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onRemove(file.url)}
          style={defaultStyles.previewCloseContainer}>
          <Image
            source={closeIcon}
            style={[defaultStyles.closeIconStyle, closeIconStyle]}
          />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={defaultStyles.modalContainer}>
          <TouchableOpacity
            style={defaultStyles.closeArea}
            onPress={() => setModalVisible(false)}>
            <Image
              source={closeIcon}
              style={{
                width: 26,
                height: 26,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: file.url }}
            resizeMode="contain"
            style={defaultStyles.fullImage}
          />
        </View>
      </Modal>
    </>
  );
};

export default ImagePreview;