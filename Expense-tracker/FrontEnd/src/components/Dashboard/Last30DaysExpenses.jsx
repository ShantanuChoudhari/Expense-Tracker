import { useState, useEffect } from "react";
import { prepareExpanseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = (prop) => {
    const { data } = prop;

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpanseBarChartData(data);
        setChartData(result);

        return () => { };
    }, [data]);

    return (
        <div className="card col-span-1" >
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} />
        </div >
    );
}

export default Last30DaysExpenses;