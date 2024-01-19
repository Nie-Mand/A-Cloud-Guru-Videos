import axios from "axios"
import Course from "../utils/Course.component"
import {
  api_url,
  token,
  gql_get_a_courses_content,
  extract_course_description,
} from "../utils/data"

export default function Home(props) {
  const { error, data } = props

  if (error) return <h1 style={{ textAlign: "center" }}>{error}</h1>
  return (
    <div>
      <Course {...data} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const options = {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  }

  try {
    const request = await axios.post(
      api_url,
      {
        query: gql_get_a_courses_content,
        variables: { courseId: ctx.params.id },
      },
      options
    )

    console.log("got", request)
    if (!request.data)
      return {
        props: {
          data: null,
        },
      }
    const data = await extract_course_description(request.data)

    return {
      props: {
        data,
      },
    }
  } catch (e) {
    console.log({ ...e })
    console.log("response", e.response)
    return {
      props: {
        error:
          [403, 401].indexOf(e.response.status) !== -1
            ? "you are not Authorized, sign your token in the home page"
            : "No Data was found",
      },
    }
  }
}
