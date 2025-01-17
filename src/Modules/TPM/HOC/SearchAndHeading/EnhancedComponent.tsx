import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@progress/kendo-react-inputs";
import { Col, Row, Container } from "react-bootstrap";
import './withSearchAndHeading.scss';

interface EnhancedComponentProps {
  searchFunction: (item: any, searchTerm: string) => void; // Updated item type to any
  heading: string | undefined;
  children: {}
  data?: []
}

function EnhancedComponent({ searchFunction, heading,data, ...otherProps }: EnhancedComponentProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: any) => {
      searchFunction(event,event.target.value?.toString() ?? "");
    };

    return (
      <Container className="main-container" fluid>
        <Row className="pt-3 pb-3 justify-content-between border-bottom test">
          <Col xs="6" className="align-self-center">
            <h5>{heading}</h5>
          </Col>
          <Col xs="auto" lg="auto" className="justify-content-right">
            <Row className="justify-content-between">
              <Col xs="auto" lg="auto" id="header-controls">
                <div className="search-box">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <Input
                    id="search-input"
                    name="SearchBox"
                    placeholder="Search"
                    onChange={handleSearch} // Uncommented this line
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {otherProps.children}
      </Container>
    );
  };


export default EnhancedComponent;
