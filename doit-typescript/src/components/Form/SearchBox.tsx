import { Flex, Center, Button, useDisclosure } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Input } from './input'
import { theme } from '../../styles/theme'
import ModalCreateTask from '../Modal/ModalCreateTask'
import { useForm } from 'react-hook-form'
import { useTasks } from '../../contexts/TasksContext'
import { useAuth } from '../../contexts/AuthContext'

interface SearchData {
  title: string
}

export const SearchBox = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { searchTask } = useTasks()
  const { accessToken } = useAuth()

  const handleSearch = ({ title }: SearchData) => {
    searchTask(title, accessToken)
  }

  const { register, handleSubmit } = useForm<SearchData>()

  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt='6'
        w='100%'
        padding={['4', '8']}
        paddingY='2'
        paddingBottom='6'
        borderBottomWidth='1px'
        borderColor='gray.50'
        flexDir={['column', 'column', 'row', 'row']}
      >
        <Flex as='form' onSubmit={handleSubmit(handleSearch)}>
          <Input
            placeholder='Pesquisar por tarefa'
            w={['100%', '100%', '35vw']}
            {...register('title')}
          />
          <Center
            borderRadius='8px'
            as='button'
            ml='2'
            w='64px'
            h='60px'
            fontSize='2xl'
            bg='purple.600'
          >
            <FaSearch color={theme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg='purple.500'
          color='white'
          paddingX='16'
          ml={['0', '0', '4']}
          mt={['4', '4', '0']}
          h='60px'
          onClick={onOpen}
          borderRadius='8px'
          _hover={{ bg: 'purple.600' }}
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </>
  )
}
