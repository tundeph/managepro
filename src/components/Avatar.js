//styles
import "./Avatar.css"

const Avatar = ({ src }) => {
  return (
    <div
      className="avatar"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <img src={src} alt="Avatar" /> */}
    </div>
  )
}

export default Avatar
