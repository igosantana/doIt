import {
  Flex,
  Grid,
  Text,
  Image,
  Heading,
  VStack,
  Button,
  Box,
} from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import LogoPrimary from '../../assets/logo-primary.svg'
import { Input } from '../../components/Form/input'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
})

interface SignInData extends FieldValues {
  email: string
  password: string
}

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  })

  const handleSignIn = (data: SignInData) => console.log(data)
  return (
    <Flex
      alignItems='center'
      padding='10px 15px'
      height='100vh'
      bgGradient='linear(to-r, purple.800 65%, white 35%)'
      color='white'
    >
      <Flex
        w='100%'
        justifyContent='center'
        flexDirection='row'
        alignItems='center'
      >
        <Grid w='100%' paddingRight='100px'>
          <Image src={LogoPrimary} alt='doit' boxSize='120px' />
          <Heading as='h1'>O jeito fácil, grátis</Heading>
          <Text>
            Flexível e atrativo de gerenciar
            <b>seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as='form'
          mt='4'
          w='50%'
          padding='30px 15px'
          border='3px solid'
          borderColor='gray.100'
          bg='white'
          color='gray.900'
        >
          <Heading size='lg'>Bem vindo de volta!</Heading>
          <VStack spacing='5' mt='6'>
            <Box w='100%'>
              <Input
                name='email'
                icon={FaEnvelope}
                placeholder='Digite seu login'
                label='Login'
                type='email'
                error={errors.email}
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
            />
          </VStack>
          <VStack mt='4' spacing='5'>
            <Button
              isLoading={loading}
              bg='purple.800'
              w='100%'
              color='white'
              h='60px'
              borderRadius='8px'
              _hover={{ background: 'purple.900' }}
              type='submit'
            >
              Entrar
            </Button>
            <Text color='gray.400'>Ainda não possui uma conta?</Text>
            <Button
              bg='gray.100'
              w='100%'
              color='gray.300'
              h='60px'
              borderRadius='8px'
              _hover={{ background: 'gray.200' }}
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  )
}
