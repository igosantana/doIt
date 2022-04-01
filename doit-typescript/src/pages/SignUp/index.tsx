import { Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SignUpInfo } from './SignUpInfo'
import { SignUpForm } from './SignUpForm'
import { GoBackButton } from './GoBackButton'
import { api } from '../../services/api'
import { ModalError } from '../../components/Modal/ModalError'
import ModalSuccess from '../../components/Modal/ModalSuccess'
import { useHistory } from 'react-router-dom'

const signUpSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
})

interface SignUpData {
  email: string
  password: string
  name: string
  confirm_password: string
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  })

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    setLoading(true)
    api
      .post('register', { name, email, password })
      .then((response) => {
        setLoading(false)
        onModalSuccessOpen()
      })
      .catch((err) => {
        setLoading(false)
        onModalErrorOpen()
      })
  }

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure()
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })

  const history = useHistory()
  return (
    <>
      <ModalSuccess
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        buttonMessage='Ir para o login agora'
        message='Seu cadastro deu super certo, <b>vamos lá</b>'
        onClick={() => history.push('/')}
        secondaryText='Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo...'
      />
      <ModalError
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        error='Seu e-mail já está em uso'
      />

      <Flex
        alignItems='center'
        padding={['10px 15px', '10px 15px', '0px', '0px']}
        height={['auto', 'auto', '100vh', '100vh']}
        justifyContent='center'
        bgGradient={[
          'linear(to-b, purple.800 65%, white 35%)',
          'linear(to-b, purple.800 65%, white 35%)',
          'linear(to-l, purple.800 65%, white 35%)',
          'linear(to-l, purple.800 65%, white 35%)',
        ]}
        color='white'
      >
        <Flex
          w={['100%', '100%', '90%', '65%']}
          justifyContent='center'
          flexDirection={['column', 'column', 'row', 'row']}
        >
          {isWideVersion ? (
            <>
              <GoBackButton top='75' left='24' />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
              <SignUpInfo />
            </>
          ) : (
            <>
              <GoBackButton top='10' left='75vw' />
              <SignUpInfo />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  )
}
