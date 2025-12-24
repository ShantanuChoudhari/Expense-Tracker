const CustomTooltip = (props) => {
    const { active, payload, colors, data } = props;

    if (active && payload && payload.length) {
        const name = payload[0].name;

        const index = data.findIndex(item => item.name === name);
        const color = colors[index % colors.length];

        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold mb-1" style={{ color: color }}>
                    {name}
                </p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        ${payload[0].value}
                    </span>
                </p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
