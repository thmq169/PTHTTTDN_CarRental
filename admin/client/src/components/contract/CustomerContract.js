import moment from "moment/moment"
import './contract.css'
function CustomerContract({data:{ invoiceRental, carDocument, rentalDocument }}) {

    const CCCD = rentalDocument.find((document) => {
        return document.type.includes('Citizen Identification Card') 
    })

    const GPLX = rentalDocument.find((document) => {
        return document.type.includes('Driver license') 
    })

    const giayKiemDinhXe = carDocument.find((document) => {
        return document.type.includes('Inspection certificate') 
    })
    
    const giayDangKyXe = carDocument.find((document) => {
        return document.type.includes('Registration certificate') 
    })

    console.log(invoiceRental, GPLX, giayKiemDinhXe, giayDangKyXe)

    return(
        GPLX && giayKiemDinhXe && giayDangKyXe && (
            <div class="c13 doc-content">
            <p class="c14"><span class="c10">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span></p>
            <p class="c14"><span class="c1">Độc Lập – Tự Do – Hạnh Phúc</span>
            </p>
            <p class="c14"><span class="c10">HỢP ĐỒNG THUÊ XE</span></p>
            <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ Bộ Luật Dân sự số 91/2015/QH13 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;</span></p>
            <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ luật thương mại số 36/2005/QH11 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;</span></p>
            <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ vào nhu cầu và khả năng cung ứng của các bên dưới đây.
            </span></p>
            <p class="c2"><span class="c1">Hôm nay, ngày</span><span> {moment(invoiceRental.start_day).add(-1, 'day').get('date')}  </span> <span> tháng {moment(invoiceRental.start_day).get('month') + 1} năm {moment(invoiceRental.date_contract).get('year')} chúng tôi gồm : </span></p>
            <p class="c2"><span class="c10">BÊN A: (Bên thuê) Cá nhân
            </span></p>
            <p class="c2"><span class="c1">- Ông/ bà: <b>{invoiceRental.customer_ID.fullname}</b></span></p>
            <p class="c2"><span class="c1">- Sinh năm: <b>{moment(invoiceRental.birth_day).get('year')}</b></span></p>
        
            <p class="c2"><span class="c1">- CMND/CCCD số: <b> {CCCD.lincense_ID}</b> cấp ngày <b>{moment(CCCD.date).get('date')}</b> tháng <b>{moment(CCCD.date).get('month') + 1}</b> năm <b>{moment(CCCD.date).get('year')}</b> </span></p>
            <p class="c2"><span class="c1">- GPLX số: <b> {GPLX.lincense_ID}</b> cấp ngày <b>{moment(GPLX.date).get('date')}</b> tháng <b>{moment(GPLX.date).get('month') + 1}</b> năm <b>{moment(GPLX.date).get('year')}</b> </span></p>
            <p class="c2"><span class="c1">- Địa chỉ:  <b>{invoiceRental.customer_ID.address}</b></span></p>
            <p class="c2"><span class="c1">- Số điện thoại: <b>{invoiceRental.customer_ID.phone_number}</b>  </span></p>
            <p class="c2"><span class="c10">BÊN B: (Bên cho thuê) Công Ty HiringCar</span></p>
            <p class="c2"><span class="c1">- Đại diện: Nguyen Nhut Huy</span></p>
            <p class="c2"><span class="c1">- Địa chỉ: Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh</span></p>
            <p class="c2"><span class="c1">- Điện thoại: 0366599445</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c11">Sau khi bàn bạc, thỏa thuận, hai bên thống nhất ký kết </span><span class="c11 c19">Hợp đồng thuê xe </span><span class="c1">với các điều khoản như sau:</span></p>
            <p class="c2"><span class="c10">ĐIỀU 1 : NỘI DUNG HỢP ĐỒNG</span></p>
            <p class="c2"><span class="c1">Bên A đồng ý thuê của bên B thuê một xe ô tô</span></p>
            <p class="c2"><span class="c1">+ Tên xe: <b>{invoiceRental.car_ID.name}</b> </span></p>
            <p class="c2"><span class="c1">+ Sn xuất năm: <b>{invoiceRental.car_ID.manufacturer_year}</b> </span></p>
            <p class="c2"><span class="c1">+ Biển số kiểm soát: <b>{invoiceRental.car_ID.license_plates}</b></span></p>
            <p class="c2"><span class="c1">+ Giấy đăng ký xe số: <b>{giayDangKyXe.lincense_ID}</b>  cấp ngày <b>{moment(giayDangKyXe.date).get('date')}</b> tháng <b>{moment(giayDangKyXe.date).get('month') + 1}</b> năm <b>{moment(giayDangKyXe.date).get('year')}</b></span></p>
            <p class="c2"><span class="c1">+ Giấy chứng nhận kiểm định số: <b>{giayKiemDinhXe.lincense_ID}</b>  cấp ngày <b>{moment(giayKiemDinhXe.date).get('date')}</b> tháng <b>{moment(giayKiemDinhXe.date).get('month') + 1}</b> năm <b>{moment(giayKiemDinhXe.date).get('year')}</b></span></p>
            <p class="c2"><span class="c10">ĐIỀU 2 : GIÁ TRỊ HỢP ĐỒNG, PHƯƠNG THỨC THANH TOÁN</span></p>
            <p class="c2"><span class="c11">- Giá thuê xe là: <b>{new Intl.NumberFormat().format(invoiceRental.car_ID.price)}</b> đồng/ngày ( Giá thuê đã bao gồm thuế GTGT )</span></p>
            <p class="c2"><span class="c3">- Bên A sẽ thanh toán cho Bên B theo hình thức thanh toán online</span></p>
            <p class="c2"><span class="c10">ĐIỀU 3 : TRÁCH NHIỆM CỦA CÁC BÊN</span></p>
            <p class="c2"><span class="c7">3.1. Trách nhiệm của bên B (bên cho thuê):</span></p>
            <p class="c2"><span class="c11">- Tiến hành xác minh các loại giấy tờ cần thiết. Giấy tờ cần thiết bao gồm: CMND/CCCD, giấy phép lái xe B1 hoặc B2, sổ hộ khẩu..</span></p>
            <p class="c2"><span class="c3">- Bên B giữ bản photocopy kèm công chứng của ba loại giấy tờ trên và thực hiện trả lại cho bên A khi hợp đồng hết hiệu lực.</span></p>
            <p class="c2"><span class="c3">- Tiến hành xác minh và nhận xe trước 1 ngày khi hợp đồng có hiệu lực</span></p>
            <p class="c2"><span class="c3">- Giao xe và toàn bộ giấy tờ liên quan đến xe ngay sau khi hợp đồng có hiệu lực cho bên A. Giấy tờ liên quan đến xe gồm: giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe.</span></p>
            <p class="c2"><span class="c3">- Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe.</span></p>
            <p class="c2"><span class="c1">- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của hợp đồng.</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c7">3.2. Trách nhiệm, quyền hạn của bên A (bên thuê):</span></p>
            <p class="c2"><span class="c1">- Chuẩn bị giấy tờ bản gốc và bản photocopy kèm công chứng của các giầy tờ cần thiết để tiến hành xác minh và kích hoạt hợp đồng cho thuê. Giấy tờ cần thiết bao gồm: CMND/CCCD, GPLX, Sổ hộ khẩu</span></p>
            <p class="c2"><span class="c11 c20">- Thanh toán trước 30% trên tổng hóa đơn cho thuê hoặc thanh toán toàn bộ hóa đơn trước khi kích hoạt hợp đồng với bên B</span><span class="c3"></span></p>
            <p class="c2"><span class="c1">- Thanh toán tiền thuê xe còn lại (nếu đã thanh toán trước 30%) cho bên B sau khi hợp đồng kết thúc</span></p>
            <p class="c2"><span class="c3">- Thực hiện liên hệ nhân viên và trả xe trong vòng 36 tiếng ngay sau khi kết thúc hợp đồng.</span></p>
            <p class="c2"><span class="c3">- Chịu toàn bộ chi phí xăng dầu khi sử dụng xe.</span></p>
            <br />
            <p class="c2"><span class="c10">ĐIỀU 4 : HIỆU LỰC HỢP ĐỒNG</span></p>
            <p class="c2"><span class="c1">- Hợp đồng có giá trị kể từ <b>0h</b>  ngày <b>{moment(invoiceRental.start_day).get('date')}</b> tháng <b>{moment(invoiceRental.start_day).get('month') + 1}</b> năm <b>{moment(invoiceRental.start_day).get('year')}</b> đến hết <b>23h59p</b> ngày <b>{moment(invoiceRental.end_day).get('date')}</b> tháng <b>{moment(invoiceRental.end_day).get('month') + 1}</b> năm <b>{moment(invoiceRental.end_day).get('year')}</b> (tối thiểu 60 ngày)</span></p>
            <p class="c2"><span class="c1">- Nếu một trong hai bên, bên nào muốn chấm dứt Hợp đồng trước thời hạn thì phải thông báo cho Bên kia trước ít nhất 02 ngày sau</span></p>
            <p class="c2"><span class="c10">ĐIỀU 5 : ĐIỀU KHOẢN CHUNG</span></p>
            <p class="c2"><span class="c11">- Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau bằng văn bản để cùng bàn bạc giải quyết</span></p>
            <p class="c2"><span class="c1">- Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi, đình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật</span></p>
            <p class="c2"><span class="c1">- Hợp đồng này có hiệu lực từ ngày ký và coi như được thanh lý sau khi hai bên thực hiện xong nghĩa vụ của mình và không còn bất kỳ khiếu nại nào.</span></p>
            <p class="c2"><span class="c1">Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, Bên A giữ 01 bản. Bên B giữ 01 bản</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p>
            <p class="c2"><span class="c1">&nbsp;</span></p><a id="t.0744cb0ee0edf28a2011f40228ce678a51024411"></a><a
                id="t.0"></a>
            <table class="c9">
                <tr class="c16">
                    <td class="c15" colspan="1" rowspan="1">
                        <p class="c4"><span class="c12 c6">ĐẠI DIỆN BÊN A</span></p>
                        <p class="c4"><span class="c6 c12">(Ký và ghi rõ họ tên)</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c4"><span class="c12 c6">ĐẠI DIỆN BÊN B</span></p>
                        <p class="c4"><span class="c6 c12">(Ký và ghi rõ họ tên)</span></p>
                    </td>
                </tr>
            </table>
            <p class="c0"><span class="c12 c17">&nbsp;</span></p>
            <p class="c8"><span class="c12 c17"></span></p>
        </div>
        )

) 
}
export default CustomerContract