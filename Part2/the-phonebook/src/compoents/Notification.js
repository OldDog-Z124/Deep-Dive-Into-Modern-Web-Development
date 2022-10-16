const Notification = ({message, state}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${state}`}>
      <p>{message}</p>
    </div>
  )
}

export default Notification