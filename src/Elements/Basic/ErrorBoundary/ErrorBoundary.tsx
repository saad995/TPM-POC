import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

export interface ErrorProps {
    message?: string;
}

export interface ErrorState {
    error: boolean;
    message: string;
}

export default class ErrorBoundary extends Component<ErrorProps, ErrorState> {
    constructor(props: ErrorProps) {
        super(props);
        this.state = {
            error: false,
            message: ""
        };
    }
    componentDidCatch(err: any, errInfo: { componentStack: string }) {
        this.setState({
            error: true,
            message: this.props.message ? this.props.message : errInfo.componentStack
        });
    }

    render() {
        if (this.state.error) {
            return (
                <Container>
                    <Row className="align-items-center">
                        <h1 className="pr-2">Error</h1>
                        {this.state.message ? (
                            <p>{this.state.message}</p>
                        ) : (
                            <p>Something went wrong please contact your administrator</p>
                        )}
                    </Row>
                </Container>
            );
        }
        return this.props.children;
    }
}
