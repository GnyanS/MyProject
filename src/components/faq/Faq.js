import React from 'react';
import { Row, Col } from 'reactstrap';
import './style.css';

class Faq extends React.Component {
  render() {
    const logo = `http://www.vulcan.com/MediaLibraries/Vulcan/Images/Thumbnails/illegal-fishing.jpg?width=296&height=184&ext=.jpg`;
    return (
      // <div>
      //  Hello Welcome to Faq
      //  <br></br>
      //   <Row>
      //     <Col md="4">
      //         <Row>
      //             <Col md="6">
      //               column 11
      //             </Col>
      //         </Row>
      //         <Row>
      //             <Col md="6">
      //               column 22
      //             </Col>
      //         </Row>
      //         <Row>
      //             <Col md="6">
      //                 column 33
      //             </Col>
      //         </Row>
      //         <Row>
      //             <Col md="6">
      //               column 44
      //             </Col>
      //         </Row>
      //         <Row>
      //             <Col md="6">
      //               column 55
      //             </Col>
      //         </Row>
      //     </Col>
      //     <Col md="8">
      //       column 66
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //             <br/>
      //     </Col>
      //   </Row>
      // </div>
      <div className="Row">
        <div className="col-lg-3 col-md-3">
          <img src={logo} alt="Logo" />
          <h4 className="idea-title-homepage">Idea Title</h4>
          <p className="idea-subtitle-homepage">Idea Sub title</p>
        </div>
        <div className="col-lg-3 col-md-3">
          <img src={logo} alt="Logo" />
          <h4 className="idea-title-homepage">Idea Title</h4>
          <p className="idea-subtitle-homepage">Idea Sub title</p>
        </div>
        <div className="col-lg-3 col-md-3">
          <img src={logo} alt="Logo" />
          <h4 className="idea-title-homepage">Idea Title</h4>
          <p className="idea-subtitle-homepage">Idea Sub title</p>
        </div>
      </div>
    );
  }
}

export default Faq;
