import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Center,
  Box,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FaClipboard, FaExclamation, FaTimes } from 'react-icons/fa'
import { theme } from '../../styles/theme'
import { Input } from '../Form/input'
import * as yup from 'yup'
import { TextArea } from '../Form/TextArea'
import { useAuth } from '../../contexts/AuthContext'
import { useTasks } from '../../contexts/TasksContext'

interface ModalCreateTaskProps {
  isOpen: boolean
  onClose: () => void
}

interface TaskData {
  title: string
  description: string
}

const createTaskSchema = yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  description: yup
    .string()
    .required('Campo obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
})
const ModalCreateTask = ({ isOpen, onClose }: ModalCreateTaskProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TaskData>({
    resolver: yupResolver(createTaskSchema),
  })

  const { user, accessToken } = useAuth()

  const { createTask } = useTasks()

  const handleCreateTask = (data: TaskData) => {
    const newData = { ...data, userId: user.id, completed: false }

    createTask(newData, accessToken).then((response) => onClose())
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={handleSubmit(handleCreateTask)}
        padding='2'
        bg='white'
        color='gray.800'
      >
        <ModalHeader display='flex'>
          <Center bg='purple.500' w='30px' h='30px' borderRadius='5px' mr='1'>
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight='bold' ml='2'>
            Adicionar
          </Text>
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
        <ModalBody textAlign='center'>
          <VStack spacing='5'>
            <Input
              label='Título'
              error={errors.title}
              {...register('title')}
              placeholder='Digite o título'
            />
            <TextArea
              label='Descrição'
              error={errors.description}
              {...register('description')}
              placeholder='Digite a descrição'
            />
          </VStack>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <Button
            bg='purple.500'
            color='white'
            w='100%'
            _hover={{ bg: 'purple.600' }}
            h='60px'
            type='submit'
          >
            Adicionar Tarefa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateTask
