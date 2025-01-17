import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
interface IProps {
    children: any;
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};

const Simple = (props: any) => {
    const { children,customResponsive, ...others  } = props;

    return (
       
        <Carousel
            deviceType={"Desktop"}
            responsive={customResponsive ? customResponsive : responsive}
            {...others}>
            {children}
        </Carousel>
        
    );
};

export default Simple;
