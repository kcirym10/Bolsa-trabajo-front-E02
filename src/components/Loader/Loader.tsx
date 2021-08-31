import React from 'react';
import { Row, Col } from 'reactstrap';

function Loader() {
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col style={{ textAlign: "center" }} md={{size: 12}} sm={{size: 12}}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Loader;
