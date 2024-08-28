import { Button } from "antd";

export const ButtonComponent = ({ title, bgColor, color,    }) => {
    return (
        <Button style={{ backgroundColor: bgColor, color: color, border: "none" }}>
            {title}
        </Button>
    );
};
