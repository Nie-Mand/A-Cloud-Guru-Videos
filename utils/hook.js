import { useState } from "react"
import {
  api_url,
  gql_get_a_courses_content,
  extract_course_description,
} from "./data"

export const useCourse = async (courseId) => {
  const [course, setCourse] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  }

  try {
    const request = await axios.post(
      api_url,
      {
        query: gql_get_a_courses_content,
        variables: { courseId },
      },
      options
    )

    if (!request.data) throw Error({ response: { status: 404 } })
    const data = await extract_course_description(request.data)

    setCourse(data)

    setLoading(false)
  } catch (e) {
    setError(
      [403, 401].indexOf(e.response.status) !== -1
        ? "you are not Authorized, sign your token in the home page"
        : "No Data was found"
    )

    setLoading(false)
  }

  return {
    loading,
    error,
    course,
  }
}
