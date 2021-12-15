import { useEffect, useState } from "react"
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import _ from 'lodash';

function Statistics() {
    const [chartData, setChartData] = useState([])

    const fetchChartData = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(responseData => {
            let tempStats = _(responseData).groupBy('activity');
            setChartData(tempStats.map((element, id) => ({
                activity: id,
                minutes: _.sumBy(element, 'duration')
            })).value());
        })
        /* .then(groupedArrays.forEach(element => console.log(element))) */
        .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchChartData();
    }, [])

    return(
    <div>
        <BarChart width={730} height={500} data={chartData} style={{margin: "auto", marginTop: "50px"}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="minutes" fill="#3c9690" />
        </BarChart>
    </div>
    )
}

export default Statistics