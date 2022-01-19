import { useState } from "react"

//styles
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)

  return <div>Signup </div>
}

export default Signup
