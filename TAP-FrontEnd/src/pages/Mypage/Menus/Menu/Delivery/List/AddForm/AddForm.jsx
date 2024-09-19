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
    const [regexData, setRegexData] = useState({
        name:false,
        phone: false,
        address:false,
        detailed_address:false,
        zipcode:false
    })
    const [checkAll, setCheckAll] = useState();
    useEffect(() => {
        const allTrue = Object.values(regexData).every(value => value === true);
        setCheckAll(allTrue)
        //  console.log(regexData)
    }, [regexData])

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
                        <input type="text" value={data.detailed_address} placeholder='상세주소를 입력해주세요.' name='detailed_address' onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        수령인
                    </div>
                    <div className={styles.content2}>
                        <input type="text" name='name' value={data.name} onChange={handleChange} placeholder='받으실분 성함을 입력해주세요.'/>
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.content1}>
                        휴대폰번호
                    </div>
                    <div className={styles.content2}>
                        <input type="text" placeholder='ex) 010-1111-1111' name='phone' value={data.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <Mybutton setcheck={setCheck} handleConfirm={handleConfirm} checkAll={checkAll} />
                </div>
            </div>
        </div>
    )
}
export default AddForm;