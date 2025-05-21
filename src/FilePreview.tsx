import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FilePreviewProps } from './types';
import { defaultStyles } from './styles';

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  style,
  textStyle,
  closeIconStyle,
  closeIcon,
}) => {
  return (
    <View style={[defaultStyles.filePreview, style]}>
      <View style={defaultStyles.filePreviewContainer}>
        <Text
          style={[defaultStyles.fileTextStyle, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {file.name || 'Document'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(file.url)}
        style={defaultStyles.previewCloseContainer}>
        <Image
          source={closeIcon}
          style={[defaultStyles.closeIconStyle, closeIconStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilePreview;