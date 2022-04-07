import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakeapido-it.herokuapp.com',
})
