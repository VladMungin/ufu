import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { queryRegister } from '../../api/api'
import { loginValidation } from '../Form/FormSteps/lib/validation'
import './Register.css'
const Register = () => {
  const { control, handleSubmit, watch, clearErrors } = useForm({
    resolver: yupResolver(loginValidation()),
    mode: 'onSubmit',
  })

  const [, setCookie] = useCookies(['access_token', 'refresh_token'])
  const navigate = useNavigate()
  const [error, setError] = useState()
  useEffect(() => {
    if (error !== null) {
      setError(null)
      clearErrors()
    }
  }, [watch('email'), watch('password')])
  const onSubmit = async (data) => {
    try {
      const res = await queryRegister(data)
      const { access_token, refresh_token } = res

      const expiresAccess = new Date()
      expiresAccess.setDate(new Date().getMinutes() + 15)

      const expiresRefresh = new Date()
      expiresRefresh.setDate(new Date().getDate() + 30)

      setCookie('access_token', access_token, {
        path: '/',
        expires: expiresAccess,
      })
      setCookie('refresh_token', refresh_token, {
        path: '/',
        expires: expiresRefresh,
      })

      navigate('/')
    } catch (e) {
      setError(e.response.data.error)
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-[428px] mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      <h1 className="w-full text-left font-medium text-2xl tracking-[0.015] mb-2">Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full min-h-[392px] flex flex-col gap-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="relative mb-2">
              <input
                {...field}
                type="text"
                placeholder="Электронная почта"
                className={cn('!w-full !bg-transparent border-b border-[#C9C5CA] outline-none ', {
                  'border-b-red-600': fieldState.error?.message,
                })}
              />
              <p className="text-red-600 absolute -bottom-5 text-xs z-50">{fieldState.error?.message}</p>
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <div className="relative mb-2 !bg-transparent">
              <input
                {...field}
                placeholder="Пароль"
                className={cn(
                  '!w-full !bg-transparent border-b border-[#C9C5CA] outline-none placeholder:tracking-[0.5px] ',
                  {
                    'border-b-red-600': fieldState.error?.message,
                  },
                )}
                type={!showPassword ? 'password' : 'text'}
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden  dark:text-neutral-600 "
              >
                <svg
                  class="shrink-0 size-3.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line
                    class={cn({
                      hidden: !showPassword,
                    })}
                    x1="2"
                    x2="22"
                    y1="2"
                    y2="22"
                  ></line>
                  <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle class={cn('')} cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <p className="text-red-600 absolute -bottom-5 text-xs">{fieldState.error?.message}</p>
            </div>
          )}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-[#5C5CFF] py-4  text-[#FFF] tracking-[0.1px] font-semibold text-base rounded-xl shadow-[0px_0px_16px_0px_#95A1FF33]
"
        >
          Зарегистрироваться
        </button>
        <Link
          to="/login"
          type="button"
          className="text-center hover:no-underline hover:text-[#5C5CFF] border-[1px] border-[#C4C4FF] py-4  text-[#5C5CFF] tracking-[0.1px] font-semibold text-base rounded-xl shadow-[0px_0px_16px_0px_#95A1FF33] bg-white
"
        >
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  )
}

export default Register
