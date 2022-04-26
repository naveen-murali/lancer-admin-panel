import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getBarChartSlice, resetBarChart } from '../../features/BarChart/barChartSlice';
import { getAsyncMonthlyBarChartData, getAsyncWeeklyBarChartData } from '../../features/BarChart/barChartAction';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
};

const labels = [];

export const initialData = {
    labels,
    datasets: [
        {
            label: 'Completed',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Ongoing',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Cancelled',
            data: [],
            backgroundColor: 'rgba(53, 0, 235, 0.5)',
        },
    ],
};

export const BarChart = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("weekly");
    const [data, setData] = useState(initialData);
    const barChartData = useSelector(getBarChartSlice);

    const valueChangeHandler = (e) => {
        setValue(e.target.value)
    };

    // useEffect(() => {
    //     dispatch(getAsyncWeeklyBarChartData());
    // }, [dispatch]);

    useEffect(() => {
        if (barChartData) {
            setData((prev) => ({
                ...prev,
                labels: barChartData.map(chartData => chartData.date),
                datasets: [
                    {
                        ...prev.datasets[0],
                        data: barChartData.map(chartData => chartData.completed)
                    },
                    {
                        ...prev.datasets[1],
                        data: barChartData.map(chartData => chartData.ongoing)
                    },
                    {
                        ...prev.datasets[2],
                        data: barChartData.map(chartData => chartData.cancelled)
                    }
                ]
            }));
            barChartData.map(data => data.date);
        }
    }, [barChartData]);

    useEffect(() => {
        if (value === 'weekly')
            dispatch(getAsyncWeeklyBarChartData());
        if (value === 'monthly')
            dispatch(getAsyncMonthlyBarChartData());
        
        return ()=> dispatch(resetBarChart())
    }, [dispatch, value])

    return (
        <>
            <Col xs={12} className="d-flex justify-content-between">
                {/* <Form.Group controlId='from' className='d-flex align-items-center' style={{width:"fit-content"}}>
                        <Form.Label>From:</Form.Label>
                        <Form.Control type="date" className="shadow rounded border p-2 mx-2" />
                    </Form.Group> */}
                
                <h4 className="letter-spacing-0">
                    order reports
                </h4>

                <Form>
                    <Form.Select
                        aria-label="Default select"
                        className="shadow rounded border us-btn-outline px-3 py-1"
                        value={value}
                        onChange={valueChangeHandler}
                        style={{ width: "fit-content" }}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </Form.Select>
                </Form>
            </Col>
            <Bar options={options} height="100px" data={data} />
        </>
    );
};