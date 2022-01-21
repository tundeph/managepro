import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"

//styles
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState()
  const { signup, isPending, error } = useSignup()

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]

    if (!selected) {
      setThumbnailError("Please select a file")
      return
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image")
      return
    }

    if (selected.size > 500000) {
      setThumbnailError("Large file: must be less than 100kb")
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)

    //console.log("Thumbnail updated")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
    //console.log("all: ", email, password, displayName, thumbnail)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2> Sign Up </h2>
      <label>
        <span>Email: </span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      </label>

      <label>
        <span>Password: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <label>
        <span>Firstname: </span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>Profile thumbnail: </span>
        <input type="file" onChange={handleFileChange} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {!isPending && <button className="btn">Sign up </button>}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <div className="error">{error} </div>}
    </form>
  )
}

export default Signup
