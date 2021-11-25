const Video = (props) => {
  const { title, links } = props
  return (
    <div className="videos">
      {links.map((link) => (
        <a className="link" href={link.url} key={link.url} target="_blank">
          {link.quality}
        </a>
      ))}
      <h3>{title}</h3>

      <hr />
    </div>
  )
}

export default Video
