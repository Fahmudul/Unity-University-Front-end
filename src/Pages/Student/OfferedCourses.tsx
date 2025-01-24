import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../Redux/Features/Student/studentCourseManagement.api";

const OfferedCourses = () => {
  const { data: OfferedCourses } = useGetAllOfferedCoursesQuery(undefined);
  const [enrollCourse] = useEnrollCourseMutation(undefined);
  console.log(OfferedCourses);
  const modifiedData = OfferedCourses?.data?.reduce((acc, item) => {
    const title = item.course.title;
    const isCourseExist = acc.find((course) => course.courseTitle === title);
    if (isCourseExist) {
      const findIndex = acc.findIndex((course) => course.courseTitle === title);
      acc[findIndex].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
    } else {
      acc.push({
        courseTitle: title,
        sections: [
          {
            section: item.section,
            _id: item._id,
            days: item.days,
            startTime: item.startTime,
            endTime: item.endTime,
          },
        ],
      });
    }
    return acc;
  }, []);
  // console.log(modifiedData);

  const handleEnroll = async (offeredCourseId: string) => {
    // console.log(sectionId);
    const res = await enrollCourse({ offeredCourse: offeredCourseId });
    console.log(res);
  };
  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section?.days?.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourses;
