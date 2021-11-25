import { extract_course_content_from_a_list } from "./data"
import Video from "./Video.component"

const Course = (props) => {
  const { title, description, list } = props

  return (
    <div className="course">
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>

        <h2>Content:</h2>

        {extract_course_content_from_a_list(list).map((item) =>
          item.links.length ? <Video key={item.title} {...item} /> : null
        )}
      </div>
    </div>
  )
}

export default Course
