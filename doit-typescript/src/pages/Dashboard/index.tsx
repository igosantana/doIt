import {
  Box,
  Grid,
  useDisclosure,
  Center,
  Heading,
  Text,
  Stack,
  Skeleton,
} from '@chakra-ui/react'
import { Card } from '../../components/Card'
import { SearchBox } from '../../components/Form/SearchBox'
import { Header } from '../../components/Header'
import { useAuth } from '../../contexts/AuthContext'
import { useTasks } from '../../contexts/TasksContext'
import { useEffect, useState } from 'react'
import ModalTaskDetail from '../../components/Modal/ModalTaskDetail'
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton'

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
    </>
  )
}
