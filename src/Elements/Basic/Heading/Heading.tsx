// import React from "react";
// import { Col } from "react-bootstrap";
// import { Row } from "react-bootstrap";
// import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

// interface IProps {
//     title: string;
//     routeConfig?:any
// }

// const Heading = (props: React.PropsWithChildren<IProps>) => {

//     const { title, children, routeConfig} = props;

//     return (
//         <>
//             <Row className="justify-content-between mb-md-3">
//                 <Col xs="auto" className="align-self-center">
//                     <Row>
//                         <Col xs="auto" className="align-self-center">
//                             <h4>&lt;</h4>
//                         </Col>
//                         <Col>
//                             <h4>{title}</h4>
//                             <Breadcrumbs routeConfig={routeConfig} />
//                         </Col>
//                     </Row>
//                 </Col>
//                 {children}
//             </Row>
//         </>
//     );
// };

// export default Heading;
