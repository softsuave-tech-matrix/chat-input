import React from 'react';
import { TouchableOpacity, Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { defaultStyles } from './styles';

interface UploadModalProps {
  visible: boolean;
  onClose: () => void;
  onOptionSelect: (option: string) => void;
  modalStyle?: any;
  modalOptionStyle?: any;
  cancelOptionStyle?: any;
}

const UploadModal: React.FC<UploadModalProps> = ({
  visible,
  onClose,
  onOptionSelect,
  modalStyle,
  modalOptionStyle,
  cancelOptionStyle,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[defaultStyles.modalOverlay, modalStyle]}>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View style={[defaultStyles.modalContent, modalStyle]}>
              <TouchableOpacity onPress={() => onOptionSelect('gallery')}>
                <Text style={[defaultStyles.modalOption, modalOptionStyle]}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onOptionSelect('document')}>
                <Text style={[defaultStyles.modalOption, modalOptionStyle]}>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text style={[defaultStyles.modalOption, defaultStyles.cancelOption, cancelOptionStyle]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UploadModal;