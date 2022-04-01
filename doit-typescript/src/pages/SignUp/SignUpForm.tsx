import { Box, Button, Grid, Heading, VStack, Text } from '@chakra-ui/react'
import { Input } from '../../components/Form/input'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

interface SignUpData {
  email: string
  password: string
  name: string
  confirm_password: string
}

interface SignUpFormProps {
  handleSignUp: () => void
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<SignUpData>
  loading: boolean
}

export const SignUpForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: SignUpFormProps) => (
  <Grid
    onSubmit={handleSignUp}
    as='form'
    mt={['4', '4', '0']}
    w={['100%', '100%', '40%', '40%']}
    padding='40px 25px'
    border='3px solid'
    borderColor='gray.100'
    bg='white'
    color='gray.900'
  >
    <Heading size='lg'>Crie sua conta</Heading>
    <VStack spacing='5' mt='6'>
      <Box w='100%'>
        <Input
          icon={FaUser}
          placeholder='Digite seu nome'
          label='Nome'
          type='text'
          error={errors.name}
          {...register('name')}
        />
        <Input
          icon={FaEnvelope}
          placeholder='Digite seu e-mail'
          label='E-mail'
          type='email'
          error={errors.email}
          {...register('email')}
        />
        {!errors.email && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: nome@email.com
          </Text>
        )}
      </Box>
      <Input
        icon={FaLock}
        {...register('password')}
        error={errors.password}
        placeholder='Digite sua senha'
        type='password'
        label='Senha'
      />
      <Input
        icon={FaLock}
        {...register('confirm_password')}
        error={errors.confirm_password}
        label='Confirmação de senha'
        placeholder='Confirme sua senha'
        type='password'
      />
    </VStack>

    <Button
      mt='8'
      isLoading={loading}
      bg='purple.800'
      w='100%'
      color='white'
      h='60px'
      borderRadius='8px'
      _hover={{ background: 'purple.900' }}
      type='submit'
    >
      Finalizar Cadastro
    </Button>
  </Grid>
)
