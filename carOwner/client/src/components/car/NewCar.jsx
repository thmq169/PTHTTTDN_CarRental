import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'

import { uploadImageCloud } from '../../utils/uploadImageCloud'

import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';

import moment from 'moment'

import { FileUploader } from "react-drag-drop-files";

import { CarContext } from '../../contexts/CarContext'
import { MessageContext } from '../../contexts/MessageContext'

function NewCar() {
    const { postCar, carState: { carsLoading } } = useContext(CarContext)
    const { notifyMessage } = useContext(MessageContext)

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    console.log(carsLoading, '---------------------')

    const [carImage, setCarImage] = useState(null)

    const initState = {
        name: "",
        license_plates: "",
        image: "",
        type: "",
        manufacturer: "",
        manufacturer_year: "",
        fuel: "",
        seat: 0,
        transmission: "",
        registration_license: "",
        registration_date: "",
        inspection_license: "",
        inspection_date: "",
        insurance_license: "",
        insurance_date: "",
        start_day: "",
        end_day: "",
        totalRentalDate: 0
    }

    const [newCarForm, setNewCarForm] = useState(initState)

    const handleOnChangeNewCarForm = (e) => {
        setNewCarForm({ ...newCarForm, [e.target.name]: e.target.value })
    }

    const onSubmitNewCar = async (e) => {
        e.preventDefault()
        try {
            const { url } = await uploadImageCloud(file)
            setNewCarForm({ ...newCarForm, image: url })
        } catch (error) {
            notifyMessage('warning', 'Gửi yêu cầu không thành công')
            setNewCarForm({ ...initState })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (newCarForm.image == "") {
                return
            }
            const postCarData = await postCar(newCarForm)
            if (postCarData) {
                notifyMessage('success', 'Gửi yêu cầu thành công')

            } else {
                notifyMessage('warning', 'Gửi yêu cầu không thành công')
            }
            setNewCarForm({ ...initState })
        }

        fetchData()

    }, [newCarForm.image])

    console.log(newCarForm)

    useEffect(() => {
        if (file) {
            setCarImage(URL.createObjectURL(file))
            console.log(URL.createObjectURL(file))
        }
    }, [file])

    useEffect(() => {
        setNewCarForm({ ...newCarForm, end_day: moment(newCarForm.start_day).add(newCarForm.totalRentalDate, 'day').format('YYYY-MM-DD') })
    }, [newCarForm.start_day, newCarForm.totalRentalDate])

    return (
        <div>
            <h2 className="page-header">
                Yêu cầu cho thuê xe
            </h2>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form className='mb-3' onSubmit={onSubmitNewCar}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='me-4'>
                                            <span className='fw-bold'>Hình ảnh</span>
                                            <FileUploader
                                                multiple={false}
                                                handleChange={handleChange}
                                                types={["JPEG", "PNG", "JPG"]}
                                            />
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
                                            <img height={'300px'} width={'500px'} src={carImage} alt="" />
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
                                    <div className='col'>
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
                                                <span className='fw-bold'>Ngày đăng ký bảo hiểm</span>
                                                <Form.Group>
                                                    <Form.Control className='w-auto' type="date"
                                                        name='insurance_date'
                                                        value={newCarForm.insurance_date}
                                                        onChange={handleOnChangeNewCarForm}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
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
                                        </div>
                                    </div>
                                </div>


                                <div className='d-flex justify-content-center mt-3'>
                                    {!carsLoading && (

                                        <Button variant='primary'
                                            type='submit'
                                        >Gửi yêu cầu</Button>)
                                    }
                                    {carsLoading && (

                                        <Button variant='primary'
                                            type='submit'
                                        >Loading</Button>)
                                    }

                                </div>
                            </Form>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default NewCar