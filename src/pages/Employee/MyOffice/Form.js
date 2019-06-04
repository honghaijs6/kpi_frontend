
import React from 'react';
import { FormGroup, Input, Row, Col } from 'reactstrap';

import ViewModal from '../../../components/ViewModal';
import SelectRegion from '../../../components/SelectRegion' ; 

class MyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const title = 'Văn phòng';

        return (
            <ViewModal name={title} isFooter={true}  {...this.props} >
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Tên Văn phòng </label>
                                <Input type="text" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Địa chỉ </label>
                                <Input type="text" />
                            </Col>
                            <Col md={4}>
                                <label> Tỉnh/Thành </label>
                                <SelectRegion />
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}



export default MyForm;
