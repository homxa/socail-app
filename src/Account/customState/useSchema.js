import * as yup from 'yup'

export function useSchema(){

 // for login
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(12).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number')
  });

// for SignUp
const schema2 = yup.object().shape({
  userName: yup.string().required(),

  email: yup.string().email().required(),
  password: yup.string('enter password').min(4).max(10).matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  ).required('You mostes password'),
confarmPassword: yup.string().oneOf([yup.ref('password'),null], 'password must matched').required('confirm password is required')

})
return [schema,schema2]
}