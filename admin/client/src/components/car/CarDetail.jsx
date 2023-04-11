import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { URL_BACKEND } from '../../store/actions/constants'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'
import './car.css'
import { useReactToPrint } from "react-to-print";
import CarOwnerContract from "../contract/CarOwnerContract"


import moment from 'moment'

function CarDetail({ idCar }) {
    const rentalStatus = {
        "UNAVAILABLE": "warning",
        "AVAILABLE": "success",
        "STOP_RENTING": "danger"
    }

    const inspectionStatus = {
        "WAITING UPDATE": "warning",
        "VERIFIED": "success",
        "PENDING": "primary"
    }

    const [newCarForm, setNewCarForm] = useState({})

    const handleOnChangeNewCarForm = (e) => {
        setNewCarForm({ ...newCarForm, [e.target.name]: e.target.value })
    }

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault()
    //     setCarState(carState)
    //     handleHideForm()
    //     console.log(carState);
    // }

    console.log(newCarForm)

    const handleOnSubmitVerifyCar = async (e) => {
        e.preventDefault()

        try {
            const updateDate = await axios.put(URL_BACKEND + "/api/staff/cars/" + idCar, newCarForm)
            alert('Bạn đã cập nhật xe thành công')
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/cars/" + idCar)
            .then((response) =>
                response.data
            ).then(data => {
                console.log(data);
                let { start_day, end_day } = data.car

                const totalRentalDate = moment(end_day).diff((moment(start_day)), 'day')

                setNewCarForm({ ...data.car, totalRentalDate, price: data.car.price ? data.car.price : 0 })
            })
    }, [idCar])

    useEffect(() => {
        setNewCarForm({ ...newCarForm, end_day: moment(newCarForm.start_day).add(newCarForm.totalRentalDate, 'day').format('YYYY-MM-DD') })
    }, [newCarForm.start_day, newCarForm.totalRentalDate])


    useEffect(() => {
        if (newCarForm.registration_status === 'VERIFIED' && newCarForm.inspection_license_status === 'VERIFIED' && newCarForm.insurance_status === 'VERIFIED') {
            setNewCarForm({ ...newCarForm, inspection_status: "VERIFIED" })
        } else {
            setNewCarForm({ ...newCarForm, inspection_status: "PENDING" })
        }
    }, [newCarForm.registration_status, newCarForm.inspection_license_status, newCarForm.insurance_status])


    const refComponent = useRef()
    const handlePrint = useReactToPrint({
        content: () => refComponent.current,
        onAfterPrint: () => hideContractArea(),
        documentTitle: "hop-dong",
    })

    const hideContractArea = () => {
        const contractArea = document.getElementById('contractArea')

        contractArea.className = "contract d-none justify-content-center"

    }

    const handlePrintPdf = () => {
        const contractArea = document.getElementById('contractArea')
        console.log(contractArea)


        contractArea.className = "contract d-flex justify-content-center"

        handlePrint()
    }

    return (
        newCarForm && (
            <div>
                <h2 className="page-header">
                    Yêu cầu cho thuê xe
                    {newCarForm._id}
                </h2>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Form className='mb-3' onSubmit={handleOnSubmitVerifyCar}>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='me-4'>
                                                <span className='fw-bold'>Hình ảnh</span>
                                            </div>

                                            <div className='me-4 mt-3'>
                                                <span className='fw-bold'>Tên xe</span>
                                                <Form.Group>
                                                    <Form.Control className='w-75' type="text"
                                                        name='name'
                                                        value={newCarForm.name}
                                                        onChange={handleOnChangeNewCarForm}
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className='me-4 mt-3'>
                                                <span className='fw-bold'>Biển số</span>
                                                <Form.Group>
                                                    <Form.Control className='w-auto' type="text"
                                                        name='license_plates'
                                                        value={newCarForm.license_plates}
                                                        onChange={handleOnChangeNewCarForm}
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className='me-4 mt-3'>
                                                <span className='fw-bold'>Loại</span>
                                                <Form.Select
                                                    name='type'
                                                    value={newCarForm.type}
                                                    onChange={handleOnChangeNewCarForm}
                                                    className='w-auto' aria-label="Default select example">
                                                    <option>Chọn phân loại</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Sedan">Sedan</option>
                                                    <option value="Pickup truck">Bán tải</option>
                                                    <option value="Coupe">Coupe</option>
                                                    <option value="Hatchback">Hatchback</option>
                                                    <option value="Orther">Khác</option>
                                                </Form.Select>
                                            </div>

                                            <div className='me-4 mt-3'>
                                                <span className='fw-bold'>Hãng sản xuất</span>
                                                <Form.Select
                                                    name='manufacturer'
                                                    value={newCarForm.manufacturer}
                                                    onChange={handleOnChangeNewCarForm}
                                                    className='w-auto' aria-label="Default select example">
                                                    <option>Chọn nhà sản xuất</option>
                                                    <option value="Toyota">Toyota</option>
                                                    <option value="Ford">Ford</option>
                                                    <option value="Honda">Honda</option>
                                                    <option value="Kia">Kia</option>
                                                    <option value="Suzuki">Suzuki</option>
                                                    <option value="Mazda">Mazda</option>
                                                </Form.Select>
                                            </div>

                                            <div className='me-4 mt-3'>
                                                <span className='fw-bold'>Năm sản xuất</span>
                                                <Form.Group>
                                                    <Form.Control className='w-auto' type="number"
                                                        name='manufacturer_year'
                                                        value={newCarForm.manufacturer_year}
                                                        onChange={handleOnChangeNewCarForm}
                                                    />
                                                </Form.Group>
                                            </div>

                                        </div>
                                        <div className='col'>
                                            <div className='me-4'>
                                                <img height={'300px'} width={'500px'} src={newCarForm.image} alt="" />
                                            </div>
                                            <div>
                                                <span className='fw-bold'>THÔNG SỐ KỸ THUẬT</span>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <Form.Group className='mt-3'>
                                                            <Form.Label>Truyền động</Form.Label>
                                                            <Form.Select
                                                                name='transmission'
                                                                value={newCarForm.transmission}
                                                                onChange={handleOnChangeNewCarForm}
                                                                className='w-auto' aria-label="Default select example">
                                                                <option>Chọn nhà sản xuất</option>
                                                                <option value="Manual">Số sàn</option>
                                                                <option value="Automatic">Số tự động</option>
                                                                <option value="Semi-automatic">Bán tự động</option>
                                                                <option value="Orther">Khác</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </div>
                                                    <div className='col'>
                                                        <Form.Group className='mt-3'>
                                                            <Form.Label>Nhiên liệu</Form.Label>
                                                            <Form.Select
                                                                name='fuel'
                                                                value={newCarForm.fuel}
                                                                onChange={handleOnChangeNewCarForm}
                                                                className='w-auto' aria-label="Default select example">
                                                                <option>Chọn loại nhiên liệu</option>
                                                                <option value="Gasoline">Xăng</option>
                                                                <option value="Diesel">Dầu</option>
                                                                <option value="Electric">Điện</option>
                                                                <option value="Hybrid">Hybrid</option>
                                                                <option value="Orther">Khác</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </div>

                                                </div>
                                                <div className='row'>
                                                    <Form.Group className='mt-3'>
                                                        <Form.Label>Số chổ</Form.Label>
                                                        <Form.Control className='w-25' type="number"
                                                            name='seat'
                                                            value={newCarForm.seat}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <div className='row'>
                                                <div className='col-6 mt-3'>
                                                    <span className='fw-bold'>Giấy đăng ký xe</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-100' type="text"
                                                            name='registration_license'
                                                            value={newCarForm.registration_license}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Ngày đăng ký</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            name='registration_date'
                                                            value={newCarForm.registration_date}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Tình trạng</span>
                                                    <Form.Select
                                                        name='registration_status'
                                                        value={newCarForm.registration_status}
                                                        onChange={handleOnChangeNewCarForm}
                                                        className='w-auto' aria-label="Default select example">
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6 mt-3'>
                                                    <span className='fw-bold'>Giấy đăng kiểm xe</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-100' type="text"
                                                            name='inspection_license'
                                                            value={newCarForm.inspection_license}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Ngày đăng kiểm</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            name='inspection_date'
                                                            value={newCarForm.inspection_date}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Tình trạng</span>
                                                    <Form.Select
                                                        name='inspection_license_status'
                                                        value={newCarForm.inspection_license_status}
                                                        onChange={handleOnChangeNewCarForm}
                                                        className='w-auto' aria-label="Default select example">
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6 mt-3'>
                                                    <span className='fw-bold'>Giấy bảo hiểm xe</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-100' type="text"
                                                            name='insurance_license'
                                                            value={newCarForm.insurance_license}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Ngày cấp</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            name='insurance_date'
                                                            value={newCarForm.insurance_date}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span className='fw-bold'>Tình trạng</span>
                                                    <Form.Select
                                                        name='insurance_status'
                                                        value={newCarForm.insurance_status}
                                                        onChange={handleOnChangeNewCarForm}
                                                        className='w-auto' aria-label="Default select example">
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-6 mt-3'>
                                                    <span className='fw-bold'>Tình trạng kiểm tra</span>
                                                    <Form.Select
                                                        disabled
                                                        name='inspection_status'
                                                        value={newCarForm.inspection_status}
                                                        onChange={handleOnChangeNewCarForm}
                                                        className='w-auto' aria-label="Default select example">
                                                        <option value="PENDING">PENDING</option>
                                                        <option value="VERIFIED">VERIFIED</option>
                                                    </Form.Select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <span className='fw-bold mt-3 mb-2'>THÔNG TIN CHỦ XE</span>
                                                {
                                                    newCarForm.owner_ID && (
                                                        <>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <span>Họ và tên</span>
                                                                    <Form.Group>
                                                                        <Form.Control className='w-auto' type="text"
                                                                            placeholder='phone_number'
                                                                            disable
                                                                            value={newCarForm.owner_ID.fullname}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                                <div className="col">
                                                                    <span>Số điện thoại</span>
                                                                    <Form.Group>
                                                                        <Form.Control className='w-auto' type="text"
                                                                            placeholder='phone_number'
                                                                            disable
                                                                            value={newCarForm.owner_ID.phone_number}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <span>Địa chỉ</span>
                                                                    <Form.Group>
                                                                        <Form.Control className='w-1000' type="text"
                                                                            placeholder='phone_number'
                                                                            disable
                                                                            value={newCarForm.owner_ID.address}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='row'>
                                                <span className='fw-bold mt-3'>THÔNG TIN CHO THUÊ</span>
                                                <div className='col-4 mt-3'>
                                                    <span>Số ngày cho thuê</span>
                                                    <Form.Group>
                                                        <Form.Select
                                                            name='totalRentalDate'
                                                            value={newCarForm.totalRentalDate}
                                                            onChange={handleOnChangeNewCarForm}
                                                            className='w-auto' aria-label="Default select example">
                                                            <option>Chọn số ngày cho thuê</option>
                                                            <option value={60}>60 ngày</option>
                                                            <option value={90}>90 ngày</option>
                                                            <option value={120}>120 ngày</option>
                                                            <option value={150}>150 ngày</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col mt-3'>
                                                    <span>Ngày bắt đầu</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            placeholder='phone_number'
                                                            name='start_day'
                                                            value={newCarForm.start_day}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span>Ngày kết thúc</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            placeholder='phone_number'
                                                            name='phone_number'
                                                            disabled
                                                            value={newCarForm.end_day}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                                <div className='col mt-3'>
                                                    <span>Giá cho thuê (VNĐ/Ngày)</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="number"
                                                            name='price'
                                                            value={newCarForm.price}
                                                            onChange={handleOnChangeNewCarForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='d-flex justify-content-center mt-3'>
                                        <Button variant='primary'
                                            type='submit'
                                        >Cập nhật</Button>
                                    </div>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Button variant='warning' onClick={handlePrintPdf}
                                        >Print</Button>
                                    </div>
                                </Form>
                            </div>
                        </div >
                    </div >
                </div >
                <div id="contractArea" className={`contract d-none justify-content-center`} ref={refComponent} >
                    <CarOwnerContract data={{ newCarForm, owner: newCarForm.owner_ID, document: newCarForm.carowner_documents }} />
                </div>
            </div >

        ))
}

export default CarDetail