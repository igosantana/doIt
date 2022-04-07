import { useDisclosure } from '@chakra-ui/react'

import { useAuth } from '../../contexts/AuthContext'
import { useTasks } from '../../contexts/TasksContext'
import { useEffect, useState } from 'react'
import ModalTaskDetail from '../../components/Modal/ModalTaskDetail'

import { TaskList } from './TaskList'
import { FirstTask } from './FirstTask'
import { NotFound } from './NotFound'

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
      <NotFound
        isTaskDetailOpen={isTaskDetailOpen}
        onTaskDetailClose={onTaskDetailClose}
        selectTask={selectTask}
        taskNotFound={taskNotFound}
      />
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
        <FirstTask />
      ) : (
        <TaskList loading={loading} handleClick={handleClick} tasks={tasks} />
      )}
    </>
  )
}
