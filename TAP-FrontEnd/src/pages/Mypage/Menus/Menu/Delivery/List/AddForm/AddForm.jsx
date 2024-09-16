import styles from './AddForm.module.css';
import Mybutton from './../../../../MyButton/Mybutton';
import { useEffect, useState } from 'react';
import { api } from './../../../../../../../config/config';
import Swal from 'sweetalert2';

const AddForm = ({ setCheck,setList }) => {
    const [data, setData] = useState({
        seq:'',
        member_id: '',
        address: '',
        detailed_address: '',
        zipcode: '',
        name: '',
        phone: ''
    });
    const handleConfirm = () => {
        api.post(`/delivery`,data).then((resp)=>{
            setCheck(false);
            setList((prev)=>{
                return[...prev,{...data,seq:resp.data}]
            })
            Swal.fire({
                icon:'success',
                title:'배송',
                text:'배송지가 추가 됬습니다.'
            })
        })
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setData(prev => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }))
            },
        }).open()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value };
        })
    }

    // useEffect(() => {
    //     console.log(data);
    // }, [data])
    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        우편번호
                    </div>
                    <div className={styles.content2}>
                        <input type="text" value={data.zipcode} disabled={true} />
                        <button className={styles.addressBtn} onClick={handleAddressSearch}>
                            주소 검색
                        </button>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        기본주소
                    </div>
                    <div className={styles.content2}>
                        <input type="text" value={data.address} disabled={true} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        상세주소
                    </div>
                    <div className={styles.content2}>
                        <input type="text" value={data.detailed_address} name='detailed_address' onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        수령인
                    </div>
                    <div className={styles.content2}>
                        <input type="text" name='name' value={data.name} onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        휴대폰번호
                    </div>
                    <div className={styles.content2}>
                        <input type="text" placeholder='-포함 입력' name='phone' value={data.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <Mybutton setcheck={setCheck} handleConfirm={handleConfirm} />
                </div>
            </div>
        </div>
    )
}
export default AddForm;