import React, { useState } from 'react';
import { GoArrowDownRight } from "react-icons/go";
import { Column } from '@ant-design/plots';
import DateMoney from '../components/DateMoney';

const HomePage = () => {
    const data = [
        { type: 'Jan', sales: 38 },
        { type: 'Feb', sales: 52 },
        { type: 'Mar', sales: 61 },
        { type: 'Apr', sales: 145 },
        { type: 'May', sales: 48 },
        { type: 'Jun', sales: 11 },
        { type: 'July', sales: 77 },
        { type: 'Aug', sales: 55 },
        { type: 'Sept', sales: 86 },
        { type: 'Oct', sales: 32 },
        { type: 'Nov', sales: 46 },
        { type: 'Dec', sales: 67 },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return '#ffd333';
        },
        label: {
            // Change position to a valid value: 'top', 'bottom', 'middle'
            position: 'top',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: 'Month' },
            sales: { alias: 'Income' },
        },
    };
    return (
        <div>
            <h3 className='mb-4 title'>Dashboard</h3>
            <div className="d-flex algin-items-center gap-3 justify-content-between row">
                <div className="d-flex justify-content-between align-items-center col-4 flex-grow-1 bg-white p-3 rounded-3">
                    <div className="">
                        <p className='desc'>Total</p>
                        <h4 className='mb-0 sub-title'>$ 1000</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6><GoArrowDownRight /> 32%</h6>
                        <p className='mb-0 desc'>Compared to Aprid 2024</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center col-4 flex-grow-1 bg-white p-3 rounded-3">
                    <div className="">
                        <p className='desc'>Total</p>
                        <h4 className='mb-0 sub-title'>$ 1000</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className='red'><GoArrowDownRight /> 32%</h6>
                        <p className='mb-0 desc'>Compared to Aprid 2024</p>
                    </div>
                </div>
                <div className="col-4 flex-grow-1 bg-white p-3 rounded-3">
                    <DateMoney />
                </div>
            </div>
            <div className="mt-4">

            </div>
            <div className="mt-4 ">
                <h3 className='mb-4 title'>Income Static</h3>
                <Column {...config} />
            </div>
        </div>
    );
}

export default HomePage;
