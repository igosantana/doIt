import {
  Box,
  Grid,
  useDisclosure,
  Center,
  Heading,
  Text,
  Stack,
  Skeleton,
  Button,
} from '@chakra-ui/react'
import { Card } from '../../components/Card'
import { SearchBox } from '../../components/Form/SearchBox'
import { Header } from '../../components/Header'
import { useAuth } from '../../contexts/AuthContext'
import { useTasks } from '../../contexts/TasksContext'
import { useEffect, useState } from 'react'
import ModalTaskDetail from '../../components/Modal/ModalTaskDetail'
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton'
import ModalCreateTask from '../../components/Modal/ModalCreateTask'
import { FaClipboard } from 'react-icons/fa'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const { user, accessToken } = useAuth()
  const { tasks, loadTasks, notFound, taskNotFound } = useTasks()
  const [selectTask, setSelectTask] = useState<Task>({} as Task)

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false))
  }, [])

  const {
    isOpen: isTaskDetailOpen,
    onClose: onTaskDetailClose,
    onOpen: onTaskDetailOpen,
  } = useDisclosure()

  const {
    isOpen: isCreateTaskOpen,
    onClose: onCreateTaskClose,
    onOpen: onCreateTaskOpen,
  } = useDisclosure()

  const handleClick = (task: Task) => {
    setSelectTask(task)
    onTaskDetailOpen()
  }

  if (notFound) {
    return (
      <>
        <ModalTaskDetail
          isOpen={isTaskDetailOpen}
          onClose={onTaskDetailClose}
          task={selectTask}
        />
        <Box>
          <Header />
          <SearchBox />
          <Center mt='4' textAlign='center' display='flex' flexDir='column'>
            <Heading size='lg'>Não encontramos resultados para:</Heading>
            <Text fontSize='xl' color='gray.300' fontWeight='bold'>
              {taskNotFound}
            </Text>
            <Box
              mt='6'
              w={['80%', '40%']}
              padding='6'
              boxShadow='base'
              bg='white'
            >
              <Stack>
                <Skeleton
                  startColor='gray.100'
                  endColor='gray.200'
                  height='20px'
                  w='80%'
                  borderRadius='20px'
                />
                <Skeleton
                  startColor='gray.100'
                  endColor='gray.200'
                  height='20px'
                  w='60%'
                  borderRadius='20px'
                />
              </Stack>
              <Stack mt='8'>
                <Skeleton
                  startColor='gray.100'
                  endColor='gray.200'
                  height='15px'
                  borderRadius='20px'
                />
                <Skeleton
                  startColor='gray.100'
                  endColor='gray.200'
                  height='15px'
                  borderRadius='20px'
                />
              </Stack>
            </Box>
          </Center>
        </Box>
      </>
    )
  }
  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectTask}
      />
      {!loading && !tasks.length ? (
        <>
          <ModalCreateTask
            isOpen={isCreateTaskOpen}
            onClose={onCreateTaskClose}
          />
          <Header />
          <Box
            mt='4'
            w='90vw'
            paddingY='16'
            paddingX={['6', '0']}
            ml='5vw'
            justifyContent='center'
            textAlign='center'
            borderWidth='2px'
            borderColor='gray.200'
            borderStyle='dashed'
          >
            <Center fontSize='5xl'>
              <FaClipboard color='#bdbdbd' />
            </Center>
            <Heading fontSize='4xl' as='h1' mt='4'>
              Vamos criar a sua primeira tarefa
            </Heading>
            <Text mt='6' color='gray.400'>
              Insira sua meta e mostre a você mesmo <br />
              capacidade em cumprir
              <Text fontWeight='bold' color='gray.900'>
                suas atividades.
              </Text>
            </Text>

            <Button
              padding='6'
              mt='6'
              bgColor='purple.800'
              color='white'
              _hover={{ bg: 'purple.900' }}
              onClick={onCreateTaskOpen}
            >
              Criar sua primeira tarefa
            </Button>
          </Box>
        </>
      ) : (
        <Box>
          <Header />
          <SearchBox />
          <Grid
            w='100%'
            templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
            gap={10}
            padding='8'
            mt='8'
          >
            {loading ? (
              <CardSkeleton repeatCount={6} />
            ) : (
              tasks.map((task) => <Card task={task} onClick={handleClick} />)
            )}
          </Grid>
        </Box>
      )}
    </>
  )
}
