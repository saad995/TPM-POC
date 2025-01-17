import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "Modules/Common/Workflow/WorkflowBar/WorkflowBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootStore } from "Store";
import { GetIconByStyle } from "Lib/Helpers/WorkflowIconHelper";

// WFS Imports
import {
    IAvailableCommandsType,
    IWorkflowProcessInstancePersistenceType
} from "Modules/Common/Workflow/WorkflowInterfaces";

import {
    clearState,
    wfGetAvaiableCommandsAction,
    wfGetProcessInstancePersistenceAction
} from "Modules/Common/Workflow/WorkflowAction";
import _ from "lodash";

const WorkflowBar = (props: {
    parameterName: string;
    parameterValue: string;
    stateName: string[];
    notifyEvent?: any;
    hideButton?: any;
    alternateDisplayNames?: any;
    alternateStyleNames?: any;
    actionPriorities?: any;
}) => {
    const dispatch = useDispatch();

    // Pull userRole from store
    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    // Action : Get Process ID against a parameter name & value
    useEffect(() => {
        dispatch(wfGetProcessInstancePersistenceAction(props.parameterName, props.parameterValue));

        return () => {
            dispatch(clearState());
        };
    }, [props.parameterValue]);

    // Pull process ProcessInstancePersistance from store
    const ProcessInstancePersistance: IWorkflowProcessInstancePersistenceType =
        useSelector((state: RootStore) => state?.workflowReducer?.ProcessInstancePersistance) || {};

    // Action : Get Avaiable Commands Against the process ID, State Name & User Role
    useEffect(() => {
        if (ProcessInstancePersistance.processId) {
            dispatch(wfGetAvaiableCommandsAction(ProcessInstancePersistance.processId, props.stateName, userRole));
        }
    }, [ProcessInstancePersistance]);

    // Pull process AvaiableCommands from store
    const AvaiableCommands: IAvailableCommandsType[] =
        useSelector((state: RootStore) => state?.workflowReducer?.AvaiableCommands) || {};

    let AvaiableSecondaryCommands: IAvailableCommandsType[] = [];

    function search(nameKey: string, myArray: any) {
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].buttonName === nameKey) {
                return myArray[i];
            }
        }
    }

    const isHidden = (commandName: string) => {
        let isHidden = false;
        if (props.hideButton) {
            const resultObject = search(commandName, props.hideButton);
            if (resultObject) {
                isHidden = resultObject?.isHidden;
            }
        }
        // 
        // 
        return isHidden;
    };
    const getDisplayName = (command: IAvailableCommandsType) => {
        let diplayName = command.displayName;
        if (props.alternateDisplayNames) {
            const resultObject = search(command.commandName, props.alternateDisplayNames);
            if (resultObject) {
                diplayName = resultObject?.alternateDisplayName;
            }
        }

        return diplayName;
    };

    const getStyle = (command: IAvailableCommandsType) => {
        let styleName = command.style;
        if (props.alternateStyleNames) {
            const resultObject = search(command.commandName, props.alternateStyleNames);
            if (resultObject) {
                styleName = resultObject?.alternateStyleName;
            }
        }

        return styleName;
    };

    const getPriority = (command: IAvailableCommandsType): string => {
        let priority = "primary";

        // command.priority
        // command.title

        if (props.actionPriorities) {
            const resultObject = search(command.commandName, props.actionPriorities);
            if (resultObject) {
                priority = "secondary";

                AvaiableSecondaryCommands = [...AvaiableSecondaryCommands, command];
            }
        }
        return priority;
    };

    return (
        <>
            <Row className="no-gutters justify-content-end mr-4">
                {AvaiableCommands === undefined || AvaiableCommands?.length == 0
                    ? null
                    : AvaiableCommands?.map((command) => {
                        return (
                            <>
                                {getPriority(command) != "secondary" && (
                                    <Col xs="auto">
                                        <button
                                            // className={command.style}
                                            className={getStyle(command)}
                                            onClick={() => props.notifyEvent(command)}
                                            title={command.displayName == "Request Fumigation" ? "Request Treatment" : command.displayName}
                                            hidden={isHidden(command.commandName)}>
                                            {command.hasIcon ? (
                                                <FontAwesomeIcon
                                                    icon={GetIconByStyle(command.style)}
                                                    className={"my-1 " + (getDisplayName(command) != "" && "mr-1")}
                                                />
                                            ) : null}

                                            {/* {command.displayName} */}
                                            {getDisplayName(command)}
                                        </button>
                                    </Col>
                                )}
                            </>
                        );
                    })}
                {AvaiableSecondaryCommands.length > 0 && (
                    <>
                        <Col className="d-flex align-items-center" xs="auto">
                            <Dropdown className="workflowSecondary" drop="up">
                                <Dropdown.Toggle
                                    className="workflowSecondaryToggle"
                                    style={{ paddingTop: "0.6rem", paddingBottom: "0.6rem", borderRadius: "9px" }}
                                    variant="dark"
                                    id="dropdown-basic">
                                    More Actions
                                </Dropdown.Toggle>

                                <Dropdown.Menu renderOnMount align="right">
                                    {AvaiableSecondaryCommands.map((command) => {
                                        return (
                                            <>
                                                <Dropdown.Item
                                                    as="p"
                                                    onClick={() => props.notifyEvent(command)}
                                                    className="workflowSecondaryToggleItems"
                                                    hidden={isHidden(command.commandName)}>
                                                    {command.hasIcon ? (
                                                        <FontAwesomeIcon
                                                            icon={GetIconByStyle(command.style)}
                                                            size="lg"
                                                            className={
                                                                "my-1 " + (getDisplayName(command) != "" && "mr-1")
                                                            }
                                                        />
                                                    ) : null}

                                                    {/* {command.displayName} */}
                                                    {getDisplayName(command)}
                                                </Dropdown.Item>
                                                <Dropdown.Divider className="workflowSecondaryMenuItemDivider" />
                                            </>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
};

export default WorkflowBar;
