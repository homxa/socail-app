import {useForm} from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import {useSchema} from './useSchema'
export function useSubmit(value){
  
  const {register,handleSubmit} = useForm({
    resolver: yupResolver(value)
  })
return [register,handleSubmit]
}