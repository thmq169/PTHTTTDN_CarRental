import React, { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { DatePicker } from 'antd';

import { verifyRentalPeriod } from '../../utils/verifyPeriodDate'

import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom'

import moment from 'moment'

import isBetween from 'dayjs/plugin/isBetween'

import { AuthContext } from '../../contexts/AuthContext'
import { RentContext } from '../../contexts/RentContext'
import { CarContext } from '../../contexts/CarContext'
import { MessageContext } from '../../contexts/MessageContext'

import { plusOneDate, minusOneDate, countDate, dayInThePast } from '../../utils/dateFunction'

export default function RentingForm({ carInfor: { id, price, dayRentalOfCar } }) {
    const { authState: { user }, isUserLogin } = useContext(AuthContext)
    const { rentState: { rentLoading }, verifyRentalDate, RentACar } = useContext(RentContext)
    const { notifyMessage } = useContext(MessageContext)

    const { RangePicker } = DatePicker;

    const navigate = useNavigate()

    const initState = {
        start_day: "",
        end_day: "",
        delivery_location: "",
        returning_location: "",
        car_ID: id,
        customer_ID: user ? user._id : null,
        payment_choice: 0.3,
        totalBill: 0
    }

    const [isFormValid, setIsFormValid] = useState(true)

    const [endDateValid, setEndDateValid] = useState([])

    const [rentingForm, setRentingForm] = useState(initState)
    const { start_day, end_day, delivery_location, returning_location,
        car_ID, customer_ID, payment_choice } = rentingForm

    const handleOnChangeRentingForm = async (e) => {
        setRentingForm({ ...rentingForm, [e.target.name]: e.target.value })
    }

    console.log(rentingForm)

    useEffect(() => {
        if (start_day === end_day && end_day !== '') {
            setIsFormValid(false)
            notifyMessage("warning", "Ngày bắt đầu và ngày kết thúc trùng nhau")
        } else {
            if (verifyRentalPeriod(start_day, end_day, dayRentalOfCar).length) {
                setIsFormValid(false)
                setEndDateValid(verifyRentalPeriod(start_day, end_day, dayRentalOfCar))
            } else {
                setEndDateValid([])
                setIsFormValid(true)
            }
        }

        setRentingForm({ ...rentingForm, totalBill: countDate(start_day, end_day) * price })

        verifyRentalDate('carUnvaliableInDateEnd', end_day, car_ID)

    }, [end_day])

    const veriryDate = (current) => {
        const disableDate = dayRentalOfCar

        for (let index = 0; index < disableDate.length; index++) {
            const date = disableDate[index];
            if (current > dayjs(date[0]).add(-1, 'day') && current < dayjs(date[1]).add(2, "day")) {
                return true;
            }
        }

        return false;
    }

    const disabledDate = (current) => {
        // Can not select days before today and today

        return veriryDate(current) || current < dayjs().endOf('day');

        // console.log(date)
        // return dayjs(current).isBetween(date[0], dayjs(date[1]).add(1, 'day'));
    }

    const hangeDatePickerChange = (e) => {
        if (e) {
            setRentingForm({
                ...rentingForm
                , start_day: moment(dayjs(e[0]).toISOString()).format('YYYY-MM-DD')
                , end_day: moment(dayjs(e[1]).toISOString()).format('YYYY-MM-DD')
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!await isUserLogin()) {
            navigate("/login")
        }
        if (delivery_location === '') {
            notifyMessage("warning", "Vui lòng nhập địa điểm nhận xe")
            return false
        }
        if (returning_location === '') {
            notifyMessage("warning", "Vui lòng nhập địa điểm trả xe")
            return false
        }

        const rentalInvoiceData = await RentACar(rentingForm)

        if (rentalInvoiceData) {
            navigate('/payment')
        }


    }

    return (
        <Form noValidate onSubmit={onSubmit}>
            <RangePicker size='large' disabledDate={disabledDate}
                onChange={hangeDatePickerChange} />
            <Form.Group className="form-group">
                <Form.Label>Ngày nhận xe (MM/DD/YYYY):</Form.Label>
                <Form.Control type="date"
                    name='start_day'
                    value={start_day}
                    readOnly
                    onChange={handleOnChangeRentingForm}
                    className='' />
            </Form.Group>




            <Form.Group className='form-group'>
                <Form.Label>Ngày trả xe (MM/DD/YYYY):</Form.Label>
                <Form.Control type="date"
                    name='end_day'
                    value={end_day}
                    readOnly
                    onChange={handleOnChangeRentingForm}
                    className='' />
                {
                    endDateValid.length !== 0 ? (
                        <Form.Control.Feedback className='d-block' type="invalid">
                            Xe đã được thuê trong các ngày (MM/DD/YYYY): <br /> {
                                endDateValid.map(date => <> <span>{moment(date).format('MM/DD/YYYY')}</span> <br /> </>)
                            }
                        </Form.Control.Feedback>
                    ) : (<></>)
                }
            </Form.Group>
            <div className="detail-attention bg-warning px-3 mb-4 d-flex justify-content-between">
                <div>
                    <span>Thời gian nhận xe (dự kiến):</span>
                    <span>Thời gian trả xe (dự kiến):</span>
                </div>

                <div>
                    <span>07:00-22:00 {start_day !== '' ? moment(minusOneDate(start_day)).format('MM/DD/YYYY') : ''}</span>
                    <span>07:00-22:00 {end_day !== '' ? moment(plusOneDate(end_day)).format('MM/DD/YYYY') : ''}</span>
                </div>
            </div>
            <Form.Group className='form-group'>
                <Form.Label>Địa điểm giao xe:</Form.Label>
                <Form.Control type="text"
                    name='delivery_location'
                    value={delivery_location}
                    onChange={handleOnChangeRentingForm}
                    className='' />
            </Form.Group>
            <Form.Group className='form-group'>
                <Form.Label>Địa điểm trả xe (dự kiến):</Form.Label>
                <Form.Control type="text"
                    name='returning_location'
                    value={returning_location}
                    onChange={handleOnChangeRentingForm}
                    className='' />
            </Form.Group>
            <Form.Group className='form-group'>
                <Form.Label>Lựa chọn thanh toán trước:</Form.Label>
                <Form.Check type="radio"
                    defaultChecked
                    name='payment_choice'
                    value={0.3}
                    onChange={handleOnChangeRentingForm}
                    label='30%'
                    className='d-inline-block' />

                <Form.Check type="radio"
                    name='payment_choice'
                    value={1}
                    onChange={handleOnChangeRentingForm}
                    label='100%'
                    className='d-inline-block' />
            </Form.Group>

            <Form.Group className='form-group'>
                <Form.Label>Tổng hóa đơn: {new Intl.NumberFormat().format(rentingForm.totalBill)} VNĐ</Form.Label>
            </Form.Group>

            <Form.Group className='form-group'>
                <Form.Label>Trả trước: {new Intl.NumberFormat().format(rentingForm.totalBill * rentingForm.payment_choice)} VNĐ</Form.Label>
            </Form.Group>
            {
                rentLoading && (
                    <Button variant='success' disabled className='w-100'>Loading</Button>
                )
            }

            {
                !rentLoading && (
                    <Button variant='success' disabled={!isFormValid} className='w-100' type='submit'>Thuê</Button>
                )
            }
        </Form>
    )
}
