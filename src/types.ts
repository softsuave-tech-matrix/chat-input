import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { defaultStyles } from './styles';

export type FileT = {
  url: string;
  type: string;
  name: string;
};

export type Message = {
  id: string;
  text?: string;
  file?: {
    uri: string;
    name: string;
    type: string;
  };
};
export type ChatInputImages = {
    attachIcon?: ImageSourcePropType;
    closeIcon?: ImageSourcePropType;
  };
 
export type DefaultStyleTypes ={
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  uploadButtonStyle?: ViewStyle;
  uploadIconStyle?: ImageStyle;
  previewContainerStyle?: ViewStyle;
  previewImageStyle?: ViewStyle;
  previewFileStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  modalOptionStyle?: TextStyle;
  cancelOptionStyle?: TextStyle;
}

export type ChatInputProps = {
  showUploadOption?: boolean;
  defaultStyleValues?: DefaultStyleTypes;
  images?: ChatInputImages;
  sendText?: string;
  placeHolderText?: string;
  onSend?: (messages: Message[]) => void;
};


export type ImagePreviewProps = {
  file: FileT;
  id: string;
  onRemove: (uriToRemove: string) => void;
  style?: ViewStyle;
  closeIconStyle?: ImageStyle;
  closeIcon?: ImageSourcePropType;
};

export type FilePreviewProps = {
  file: FileT;
  id: string;
  onRemove: (uriToRemove: string) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  closeIconStyle?: ImageStyle;
  closeIcon?: ImageSourcePropType;
};