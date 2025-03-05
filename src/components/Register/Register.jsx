import { Input } from 'antd'
import { useCookies } from 'react-cookie'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { queryRegister } from '../../api/api'
import './Register.css'
const Register = () => {
  const { control, handleSubmit } = useForm()
  const [, setCookie] = useCookies(['access_token', 'refresh_token'])
  const navigate = useNavigate()

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
      // console.log(e)
    }
  }

  return (
    <div className="w-[428px] mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      <h1 className="w-full text-left font-medium text-2xl tracking-[0.015] mb-2">Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full min-h-[392px] flex flex-col gap-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Электронная почта" className="!w-full" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Пароль" className="!w-full" type="password" />}
        />
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
          className="text-center hover:no-underline hover:text-[#5C5CFF] border-[1px] border-[#C4C4FF] py-4  text-[#5C5CFF] tracking-[0.1px] font-semibold text-base rounded-xl shadow-[0px_0px_16px_0px_#95A1FF33]
"
        >
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  )
}

export default Register
