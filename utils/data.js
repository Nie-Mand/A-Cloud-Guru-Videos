export const extract_course_content_from_a_list = (list) => {
  const final_list = []

  list.forEach((item) => {
    const { title, sequence, components } = item

    for (let component of components) {
      const { sequence: seq, title: ttl, content } = component

      final_list.push({
        title: `${sequence + 1}.${seq + 1}. ${title}: ${ttl}`,
        links: format_videosources(content.videosources),
      })
    }
  })

  return final_list
}

const format_videosources = (videos) => {
  if (videos)
    return videos.map(({ signedUrl, quality }) => ({
      url: signedUrl,
      quality,
    }))

  return []
}

export const extract_course_description = async (servers_data) => {
  const { artworkUrl, title, sections, description } =
    servers_data.data.userCourseOverview.courseOverview

  const final_format = {}

  final_format.image = artworkUrl
  final_format.title = title
  final_format.description = description
  final_format.list = await sections.map((section) => {
    const { title, sequence, components } = section

    return {
      title,
      sequence,
      components,
    }
  })

  return final_format
}

export const gql_get_a_courses_content = `
query Course_userCourseOverview($courseId: String!) {
    userCourseOverview(courseId: $courseId) {
      courseOverview {
        ...CourseFragment
        sections {
          ...SectionFragment
          components {
            ...ComponentFragment
          }
        }
      }
    }
  }
  
  fragment CourseFragment on CourseOverview {
    artworkUrl
    title
    description
  }
  
  fragment SectionFragment on Section {
    title
    sequence
  }
  
  fragment ComponentFragment on Component {
    id
    title
    sequence
    
  content {
    ... on VideoCourseComponentContent {
      videosources(filter: {videoType: "video/mp4"}) {
        signedUrl
        quality
      }
    }
  }
  }
  
`

export const api_url = "https://prod-api.acloud.guru/bff/graphql"
