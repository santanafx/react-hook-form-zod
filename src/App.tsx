import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import styles from "./App.module.css"

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 5 characters long."),
  confirmPassword: z.string().min(5, "Password must be at least 5 characters long.")
}).refine(data => data.password === data.confirmPassword, { message: "Password must match.", path: ["confirmPassword"] })

export default function App() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = (data: FieldValues) => {

    reset()
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("email")} type="email" placeholder="email" />

        {errors.email?.message && <p>{errors.email.message as string}</p>}

        <input {...register("password")} type="password" placeholder="password" />

        {errors.password?.message && <p>{errors.password.message as string}</p>}

        <input {...register("confirmPassword")} type="password" placeholder="confirm password" />

        {errors.confirmPassword?.message && <p>{errors.confirmPassword.message as string}</p>}

        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
    </div>
  )
}
