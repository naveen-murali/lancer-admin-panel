import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncDoughnutChartData } from '../../features/DoughnutChart/doughnutChartAction';
import { getDoughnutChart } from '../../features/DoughnutChart/doughnutChartSlice';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const datas = {
    labels: [],
    datasets: [
        {
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export const DoughnutChart = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(datas);
    const graphData = useSelector(getDoughnutChart);

    useEffect(() => {
        dispatch(getAsyncDoughnutChartData());
    }, [dispatch]);

    useEffect(() => {
        setData(prev => ({
            ...prev,
            labels: Object.keys(graphData).map(key =>
                `${key[0].toUpperCase()}${key.slice(1, key.length)}`
            ),
            datasets: [{
                ...prev.datasets[0],
                data: Object.values(graphData)
            }]
        }));
    }, [graphData]);

    return <Doughnut height="100px" data={data} />;
};