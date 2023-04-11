import moment from "moment/moment"
function CarOwnerContract({data:{ newCarForm, owner, document}}) {
    return(
        owner && document && (
        <div class="c13 doc-content">
    <p class="c14"><span class="c10">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span></p>
    <p class="c14"><span class="c1">Độc Lập – Tự Do – Hạnh Phúc</span>
    </p>
    <p class="c14"><span class="c10">HỢP ĐỒNG THUÊ XE</span></p>
    <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ Bộ Luật Dân sự số 91/2015/QH13 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;</span></p>
    <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ luật thương mại số 36/2005/QH11 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;</span></p>
    <p class="c2"><span class="c11">- </span><span class="c3">Căn cứ vào nhu cầu và khả năng cung ứng của các bên dưới đây.
    </span></p>
    <p class="c2"><span class="c1">Hôm nay, ngày</span><span> {moment(newCarForm.start_day).add(-1, 'day').get('date')}  </span> <span> tháng {moment(newCarForm.start_day).get('month') + 1} năm {moment(newCarForm.start_day).get('year')} chúng tôi gồm : </span></p>
    <p class="c2"><span class="c10">BÊN A: Chủ xe
    </span></p>
    <p class="c2"><span class="c1">- Ông/ bà: <b>{newCarForm.owner_ID.fullname}</b> 
    </span></p>

    <p class="c2"><span class="c1">- CMND/CCCD số: <b> {document.lincense_ID}</b> cấp ngày <b>{moment(document.date).get('date')}</b> tháng <b>{moment(document.date).get('month') + 1}</b> năm <b>{moment(document.date).get('year')}</b> </span></p>
    <p class="c2"><span class="c1">- Địa chỉ:  <b>{owner.address}</b></span></p>
    <p class="c2"><span class="c1">- Số điện thoại: <b>{owner.phone_number}</b>  </span></p>
    <p class="c2"><span class="c10">BÊN B: (Bên thuê) Công Ty HiringCar</span></p>
    <p class="c2"><span class="c1">- Đại diện: Nguyen Nhut Huy</span></p>
    <p class="c2"><span class="c1">- Địa chỉ: Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh</span></p>
    <p class="c2"><span class="c1">- Điện thoại: 0366599445</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c11">Sau khi bàn bạc, thỏa thuận, hai bên thống nhất ký kết </span><span class="c11 c19">Hợp đồng thuê xe </span><span class="c1">với các điều khoản như sau:</span></p>
    <p class="c2"><span class="c10">ĐIỀU 1 : NỘI DUNG HỢP ĐỒNG</span></p>
    <p class="c2"><span class="c1">Bên A đồng ý cho bên B thuê một xe ô tô</span></p>
    <p class="c2"><span class="c1">+ Tên xe: <b>{newCarForm.name}</b> </span></p>
    <p class="c2"><span class="c1">+ Sn xuất năm: <b>{newCarForm.manufacturer_year}</b> </span></p>
    <p class="c2"><span class="c1">+ Biển số kiểm soát: <b>{newCarForm.license_plates}</b></span>
    </p>
    <p class="c2"><span class="c1">+ Giấy đăng ký xe số: <b>{newCarForm.registration_license}</b>  cấp ngày <b>{moment(newCarForm.registration_date).get('date')}</b> tháng <b>{moment(newCarForm.registration_date).get('month') + 1}</b> năm <b>{moment(newCarForm.registration_date).get('year')}</b></span></p>
    <p class="c2"><span class="c1">+ Giấy chứng nhận kiểm định số: <b>{newCarForm.inspection_license}</b> cấp ngày <b>{moment(newCarForm.inspection_certificate_date).get('date')}</b> tháng <b>{moment(newCarForm.inspection_date).get('month') + 1}</b> năm <b>{moment(newCarForm.inspection_date).get('year')}</b></span></p>
    <p class="c2"><span class="c10">ĐIỀU 2 : TRÁCH NHIỆM CỦA CÁC BÊN</span>
    </p>
    <p class="c2"><span class="c7">2.1. Trách nhiệm của bên B (bên thuê):</span>
    </p>
    <p class="c2"><span class="c11">- Tiến hành xác minh các loại giấy tờ cần thiết liên quan đến xe. Giấy tờ cần thiết bao gồm: giấy đăng ký xe, giấy chứng nhận kiểm định, giấy bảo hiểm xe.</span></p>
    <p class="c2"><span class="c3">- Bên B giữ bản gốc của ba loại giấy tờ trên và thực hiện trả lại cho bên A khi hợp đồng hết hiệu lực</span></p>
    <p class="c2"><span class="c3">- Tiến hành xác minh và nhận xe trước 1 ngày khi hợp đồng có hiệu lực</span></p>
    <p class="c2"><span class="c1">- Mua bảo hiểm xe và đăng kiểm xe cho các lần kế tiếp trong thời hạn hiệu lực của hợp đồng.</span></p>
    <p class="c2"><span class="c7">2.2. Trách nhiệm, quyền hạn của bên A (chủ xe):</span></p>
    <p class="c2"><span class="c1">- Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe</span></p>
    
    <p class="c2"><span class="c11 c20">- Chuẩn bị giấy tờ bản chính các giấy tờ cần thiết để tiến hành xác minh và kích hoạt hợp đồng cho thuê. Giấy tờ cần thiết bao gồm: </span><span class="c11">giấy đăng ký xe, giấy chứng nhận kiểm định, giấy bảo hiểm xe</span><span class="c3"></span></p>
    
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">- Giao xe và toàn bộ giấy tờ bản gốc liên quan đến xe bên trên ngay sau khi hợp đồng có hiệu lực cho Bên B. Xe sẽ được vận chuyển và đậu tại bãi xe của công ty thuê xe</span></p>
    <p class="c2"><span class="c3">- Sau mỗi xe được thuê và kết thúc hợp đồng thuê, chủ xe sẽ nhận được 70% trên tổng hóa đơn hợp đồng thuê xe.</span></p>
    <br />
    
    <p class="c2"><span class="c10">ĐIỀU 3 : HIỆU LỰC HỢP ĐỒNG</span></p>
    <p class="c2"><span class="c1">- Hợp đồng có giá trị kể từ ngày <b>{moment(newCarForm.start_day).get('date')}</b> tháng <b>{moment(newCarForm.start_day).get('month') + 1}</b> năm <b>{moment(newCarForm.start_day).get('year')}</b> đến hết ngày <b>{moment(newCarForm.end_day).get('date')}</b> tháng <b>{moment(newCarForm.end_day).get('month') + 1}</b> năm <b>{moment(newCarForm.end_day).get('year')}</b> (tối thiểu 60 ngày)</span></p>
    <p class="c2"><span class="c1">- Nếu chủ xe muốn ngừng cho thuê xe tức là chấm dứt hợp đồng trước thời hạn thì phải thông báo cho công ty ít nhất là 2 này khi kết thúc hợp đồng. Trường hợp xe còn đang trong hợp đồng thuê với bên khách hàng thì chủ xe phải đợi đến khi kết thúc chuyến xe thì mới được yêu cầu ngừng cho thuê xe</span></p>
    <p class="c2"><span class="c10">ĐIỀU 4 : ĐIỀU KHOẢN CHUNG</span></p>
    <p class="c2"><span class="c11">- Hợp đồng có giá trị </span><span class="c11 c21">tối thiểu trong 60 ngày</span></p>
    <p class="c2"><span class="c1">- Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau bằng văn bản để cùng bàn bạc giải quyết.</span></p>
    <p class="c2"><span class="c1">- Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi, đình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật.</span></p>
    <p class="c2"><span class="c1">- Hợp đồng này có hiệu lực từ ngày ký và coi như được thanh lý sau khi hai bên thực hiện xong nghĩa vụ của mình và không còn bất kỳ khiếu nại nào</span></p>
   
    <p class="c2"><span class="c1">Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, Bên A giữ 01 bản. Bên B giữ 01 bản</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p><a id="t.0744cb0ee0edf28a2011f40228ce678a51024411"></a><a
        id="t.0"></a>

    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
    <p class="c2"><span class="c1">&nbsp;</span></p>
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
</div>)
) 
}
export default CarOwnerContract