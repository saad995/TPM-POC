import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

interface IProps {
    routeConfig: any;
}

const Breadcrumbs = (props: IProps) => {
    const breadcrumbs = useBreadcrumbs(props.routeConfig);

    return (
        <div>
            <React.Fragment>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <span key={match.url}>
                        <NavLink to={match.url}>{breadcrumb}</NavLink> /{" "}
                    </span>
                ))}
            </React.Fragment>
        </div>
    );
};

export default Breadcrumbs;
