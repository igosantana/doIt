import { Box, Grid, useDisclosure } from '@chakra-ui/react'
import { Card } from '../../components/Card'
import { SearchBox } from '../../components/Form/SearchBox'
import { Header } from '../../components/Header'
import { useAuth } from '../../contexts/AuthContext'
import { useTasks } from '../../contexts/TasksContext'
import { useEffect, useState } from 'react'
import ModalTaskDetail from '../../components/Modal/ModalTaskDetail'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const { user, accessToken } = useAuth()
  const { tasks, loadTasks } = useTasks()
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
          {tasks.map((task) => (
            <Card task={task} onClick={handleClick} />
          ))}
        </Grid>
      </Box>
    </>
  )
}
