import ModalTaskDetail from '../../components/Modal/ModalTaskDetail'
import { Box, Heading, Center, Text, Stack, Skeleton } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { SearchBox } from '../../components/Form/SearchBox'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

interface NotFoundProps {
  isTaskDetailOpen: boolean
  onTaskDetailClose: () => void
  selectTask: Task
  taskNotFound: string
}

export const NotFound = ({
  isTaskDetailOpen,
  onTaskDetailClose,
  selectTask,
  taskNotFound,
}: NotFoundProps) => {
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
