import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
} from '@chakra-ui/react'
import { FaExclamation, FaTimes } from 'react-icons/fa'
import { theme } from '../../styles/theme'

interface ModalErrorProps {
  isOpen: boolean
  onClose: () => void
  error: string
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color='gray.800'>
        <ModalHeader display='flex'>
          <Center bg='red.500' w='30px' h='30px' borderRadius='5px' mr='1'>
            <FaExclamation color={theme.colors.white} />
          </Center>
          <Text fontWeight='bold'>Oops!</Text>
          <Center
            onClick={onClose}
            as='button'
            ml='auto'
            w='32px'
            h='32px'
            bg='red.600'
            fontSize='lg'
            borderRadius='md'
          >
            <FaTimes color={theme.colors.white} />
          </Center>
        </ModalHeader>
        <ModalBody textAlign='center' color='gray.400'>
          <Text>
            Ocorreu algum erro! <b>{error}</b>
          </Text>
        </ModalBody>

        <ModalFooter display='column'>
          <Button
            bg='red.500'
            color='white'
            w='100%'
            _hover={{ bg: 'red.600' }}
            onClick={onClose}
            h='60px'
          >
            Tentar novamente
          </Button>
          <Text textAlign='center' mt='4'>
            Você já pode tentar novamente, <b>clicando</b> no botão acima ou
            aguarde alguns minutos...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
